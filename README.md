# Hello FSE

Hello FSE is a starting point for development of a professional WordPress Theme, which uses NPM build processes for assets (JavaScript and CSS)
as well as an object-oriented approach to PHP development with autoloading and a quality control process which uses [PHPStan](https://phpstan.org/)
to ensure that there is no dirty code.

## Development Practices

### Object-oriented PHP

This theme follows modern PHP practices to keep the codebase maintainable, testable and easy to understand.

- **Autoloading & class layout**: PHP source lives under `src/`. This theme uses a custom autoloader registered in `functions.php` via `spl_autoload_register`, not Composer's generated autoloader. The autoloader maps the `SayHello\\Theme\\` namespace prefix to the `src/` directory (see `functions.php` for the implementation). Classes are organised by feature and responsibility (for example, see [src/Controller/Assets.php](src/Controller/Assets.php), [src/Controller/BlockEditor.php](src/Controller/BlockEditor.php) and other files under [src/Controller/](src/Controller/)). Each class has a focused responsibility (assets registration, block setup, general hooks, etc.) and typically exposes a small public API such as a `register()` or `run()` method, or registers its WordPress hooks in the constructor. This reduces global functions and makes individual classes easy to unit-test.

- **Namespaces & file structure**: Class namespaces follow a PSR-4-style layout so that namespaces correspond to file paths under `src/` (for example, `\SayHello\Theme\Controller\Assets` → `src/Controller/Assets.php`). The active autoloader in `functions.php` performs this mapping at runtime. The theme's entry point (`functions.php`) also instantiates key controller classes (for example, `Controller\Assets`, `Controller\BlockEditor`, `Controller\General`, `Controller\Language`, `Controller\Navigation`) and calls their `run()` methods to register hooks and filters. If you prefer to use Composer for autoloading instead, you can configure `composer.json` and enable Composer autoload instead.

- **Why `run()` instead of registering hooks in the constructor**: The project intentionally separates object construction from WordPress hook registration. The pattern used here is:
	- The **constructor** initialises the object's internal state and dependencies but does not call `add_action()`/`add_filter()`.
	- The public **`run()`** (or `register()`) method is called from the procedural entrypoint (`functions.php`) to actually register hooks and start the object's behaviour.

	Benefits of this approach:
	- **Predictable side-effects:** Instantiation is free of global side-effects, making object creation safe in contexts where WordPress functions may not be available (for example, during static analysis, unit tests, or certain bootstrap phases).
	- **Control over timing and order:** Calling `run()` from the entrypoint ensures hooks are registered at the intended point in the bootstrap sequence and allows explicit ordering when multiple controllers must register in a specific sequence.
	- **Easier testing:** Tests can instantiate classes without triggering hooks; tests then call `run()` only when they need to exercise hook behaviour, or they can assert internal state without interacting with the global WP hooks API.
	- **Dependency injection & composition:** Separating construction from registration makes it simpler to pass mocked dependencies into constructors and to compose objects before they attach to WordPress.
	- **Clear lifecycle:** The `new` + `run()` pattern documents the lifecycle explicitly in `functions.php`, improving readability: you can see which objects are created and when they begin participating in the WordPress hook system.

	See `functions.php` for the exact usage where controller instances are created and `run()` is called.

- **Coding standards and static analysis**:
	- **PHPCS**: A `phpcs.xml` configuration enforces coding style and best practices. Run PHPCS (or your project's composer script) before committing to catch style issues early.
	- **EditorConfig**: Use an `.editorconfig` file (editor support required) to maintain consistent indentation, line endings and file encoding across contributors.
	- **PHPStan**: Static analysis is configured via `phpstan.neon` to detect type and API issues before runtime; running `vendor/bin/phpstan analyse` (after `composer install`) helps catch bugs early.

These tools complement each other: EditorConfig keeps files consistent, PHPCS enforces style and basic correctness, and PHPStan provides deeper static analysis. See `phpcs.xml` and `phpstan.neon` for the exact rules used in this project.

### Asset generation - JavaScript and CSS

**Front-end asset workflow**: JavaScript and CSS source lives under `assets/` and in block-specific `assets/` folders under `src/Blocks/`. NPM build scripts (in `package.json`) compile, bundle and minify assets for production.

This theme uses a Gulp-based build pipeline with embedded Webpack bundling for JavaScript. The gulp configuration is in `gulpfile.babel.js` and task implementations live in the `.build/gulp/` folder.

- Entry: Run the default task with `npm start` which invokes `gulp` (see the `start` script in `package.json`). The default task runs the `watch` task which watches source files and triggers the appropriate build tasks on change.

- Configuration: `gulpfile.babel.js` exports task functions and a `config` object that defines key paths used by the tasks:
	- `assetsDir` — the public `assets/` folder used by the theme.
	- `assetsBuild` — the working input folder `./.build/assets/` that contains canonical build sources for global assets.
	- `blockScriptsSrc` / `blockStylesSrc` — globs under `src/Blocks/**/assets/src/` where block-specific JS/SCSS sources live.
	- `blockScriptsDist` / `blockStylesDist` — where compiled block assets are written (usually back into each block's `assets/dist/` folder).

- Global scripts (`.build/gulp/task-scripts.js`):
	- Reads each folder in `./.build/assets/scripts/` and builds a Webpack entry per bundle (expects an `index.js`).
	- Uses `webpack-stream` with `babel-loader` to transpile modern JS and with loaders to allow importing SCSS from JS.
	- Uses `@wordpress/dependency-extraction-webpack-plugin` to externalise WordPress dependencies (so packages like `wp-element` are not bundled but referenced as external WP globals).
	- Outputs built bundles to `assets/scripts/` using the `[name].js` filename pattern. `jquery` is treated as an external global.

- Global styles (`.build/gulp/task-styles.js`):
	- Compiles SCSS files from `./.build/assets/styles/**/*.scss` using `sass` and `gulp-sass`.
	- Applies `sassImportJson` to allow importing JSON into SCSS, runs `autoprefixer`, writes unminified CSS to `assets/styles/`, then minifies with `clean-css` and writes `.min.css` alongside it.
	- Special handling via `gulp-editor-styles` is used for editor/admin stylesheet output.

- Block-level scripts & styles (`task-block-scripts.js` / `task-block-styles.js`):
	- Block sources are located under each block's `assets/src/` folder. The block scripts task globs `src/Blocks/**/assets/src/scripts` and creates Webpack entries for each block/editor/view script, then outputs compiled files into each block's `assets/dist/scripts/` folder.
	- Block styles compile SCSS in `assets/src/styles` and write both normal and `.min.css` files to `assets/dist/styles` for the block.

- SVG optimisation (`task-svg.js`):
	- Minifies `.svg` files in `assets/` (skips already-minified `*.min.svg`) and writes `*.min.svg` next to the originals.

- Watching & reload:
	- The `watch` task observes block sources, `.build/assets/*`, and `theme.json`, and triggers the relevant tasks. Gulp uses polling in the provided configuration for reliable watching on some platforms.

In short: you author JS/SCSS in the `src/Blocks/` or the canonical `.build/assets/` folders, then run `npm start` to build and watch. Webpack (via `webpack-stream`) handles JS bundling and the WP dependency extraction plugin keeps WordPress packages external, while Gulp orchestrates file-level compilation, minification and placement of outputs into the theme's `assets/` and each block's `assets/dist/` directories.

## Author

[Say Hello GmbH](https://sayhello.ch/) in Spiez, Switzerland. Specifically Mark Howells-Mead since 2024.

## License

This theme is licensed under the GNU General Public License version 2 (GPLv2).

Summary of key points:

- **Freedom to use:** You may use the theme for any purpose.
- **Freedom to study and modify:** You may inspect and modify the source code to suit your needs.
- **Freedom to redistribute:** You may redistribute the theme or modified versions, but any distributed copies or derivatives must also be licensed under the GPL (copyleft requirement).
- **No warranty:** The theme is provided "as-is", without any warranty. The authors are not liable for damages arising from its use.

For the full license text see the GNU website:
https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
