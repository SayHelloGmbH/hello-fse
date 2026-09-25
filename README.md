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

**Front-end asset workflow**: JavaScript and SCSS sources live in `.build/assets/` and in block-specific `assets/src/` folders under `src/Blocks/`. Compiled files are written to `assets/` and to each block's `assets/dist/` folder, and are committed to the repository.

JavaScript is bundled by `@wordpress/scripts` (Webpack) using `webpack.config.js`. CSS and SVG are handled by Gulp using `gulpfile.mjs`, with task implementations in `.build/gulp/`.

- Commands (see `package.json`):
	- `npm run build` — builds JavaScript, CSS and SVG once.
	- `npm start` — builds, then watches JavaScript (Webpack) and CSS/SVG (Gulp) in parallel. Both watchers use polling for reliable watching on network volumes.
	- `npm run build:js`, `npm run build:css`, `npm run build:svg` — build one asset type.
	- `npm run lint:js`, `npm run lint:css` — lint the sources using the `@wordpress/scripts` defaults.

- Scripts (`webpack.config.js`):
	- Each folder in `.build/assets/scripts/` which contains an `index.js` becomes its own bundle, e.g. `ui/index.js` → `assets/scripts/ui.js`.
	- Each folder in `src/Blocks/{Block}/assets/src/scripts/` which contains an `index.js` becomes `src/Blocks/{Block}/assets/dist/scripts/{folder}.js`.
	- The `@wordpress/scripts` default configuration provides Babel, SCSS imports and the `DependencyExtractionWebpackPlugin`, which externalises WordPress packages (and `jquery`) and writes a `{name}.asset.php` file next to each bundle. The PHP enqueue logic reads the dependencies and version from this file.
	- Scripts are always built in production mode (minified), including in watch mode.

- Global styles (`.build/gulp/task-styles.mjs`):
	- Compiles `.build/assets/styles/**/*.scss` (partials starting with `_` are skipped), runs `autoprefixer`, writes unminified CSS to `assets/styles/`, then minifies with `clean-css` and writes `.min.css` alongside it. The subfolder structure (e.g. `blocks/core/`) is preserved.
	- `admin-editor.css` is scoped to `.editor-styles-wrapper` using `gulp-editor-styles`.

- Block styles (`.build/gulp/task-block-styles.mjs`):
	- Compiles `src/Blocks/{Block}/assets/src/styles/**/*.scss` and writes both normal and `.min.css` files to `src/Blocks/{Block}/assets/dist/styles/`.

- SVG optimisation (`.build/gulp/task-svg.mjs`):
	- Minifies `.svg` files in `assets/` (skips already-minified `*.min.svg`) and writes `*.min.svg` next to the originals.

### Enqueuing the assets

Assets (JavsScript and CSS) get enqueued in three places. 

#### Frontend

Use `wp_enqueue_style` or `wp_enqueue_script` on the `wp_enqueue_scripts` hook. The non-minified version of CSS is usually loaded if `wp_get_environment_type()` is `develop`. JS is always minified. This is also the place to enqueue WOFF2 files and all other frontend CSS. This function is currently in the [_Assets_ Controller](https://github.com/SayHelloGmbH/hello-fse/blob/main/src/Controller/Assets.php).

#### WordPress Admin

Use `wp_enqueue_style` or `wp_enqueue_script` on the `admin_enqueue_scripts` hook. This hook passes a parameter `$hook_suffix` if you need to do any conditional loading.

#### Block Editor and Site Editor. 

Use `wp_enqueue_style` or `wp_enqueue_script` on the `enqueue_block_assets` hook. 

Using this hook will enqueue the asset file in the frontend, WordPress Admin _and_ the Block Editor. If you only want the asset to load in the Block and Site Editors, use `if(!is_admin()){ … }` to bail early in the called function.

##### enqueue_block_editor_assets

This action is specifically for adding styles and scripts that impact the editor **interface** (e.g., the Block Sidebar or Toolbar). For styling editor **content**, use `enqueue_block_assets`.

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
