<?php

/**
 * Title: 404
 * Slug: sht/404
 * Categories: hidden
 * Inserter: no
 */
?>
<!-- wp:group {"metadata":{"name":"Site Blocks Inner Wrapper"},"style":{"spacing":{"blockGap":"var:preset|spacing|xlarge"}},"className":"wp-site-blocks__inner","layout":{"type":"default"}} -->
<div class="wp-block-group wp-site-blocks__inner"><!-- wp:template-part {"slug":"header","tagName":"header"} /-->

	<!-- wp:group {"tagName":"main","metadata":{"name":"Page Content"},"className":"c-main"} -->
	<main class="wp-block-group c-main"><!-- wp:group {"layout":{"inherit":true,"type":"constrained"}} -->
		<div class="wp-block-group"><!-- wp:heading {"level":1} -->
			<h1 class="wp-block-heading"><?php echo __('Inhalt nicht gefunden', 'sht'); ?></h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p><?php echo __('Die Seite, die Sie suchten, ist leider nicht (oder nicht mehr) auf der Website vorhanden.', 'sht'); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:search {"label":"Diese Website durchsuchen","placeholder":"Suchbegriff eingeben","buttonText":"Suchen"} /-->
		</div>
		<!-- /wp:group -->
	</main>
	<!-- /wp:group -->

	<!-- wp:template-part {"slug":"footer","tagName":"footer","className":"c-footer"} /-->
</div>
<!-- /wp:group -->