<?php

/**
 * Title: single
 * Slug: sht/single
 * Categories: hidden
 * Inserter: no
 */
?>
<!-- wp:group {"metadata":{"name":"Site Blocks Inner Wrapper"},"style":{"spacing":{"blockGap":"var:preset|spacing|xlarge"}},"className":"wp-site-blocks__inner","layout":{"type":"default"}} -->
<div class="wp-block-group wp-site-blocks__inner"><!-- wp:template-part {"slug":"header","tagName":"header","className":"c-header"} /-->

	<!-- wp:group {"tagName":"main","metadata":{"name":"Post content outer wrapper"},"className":"c-main"} -->
	<main class="wp-block-group c-main"><!-- wp:group {"tagName":"header","className":"c-article__header","layout":{"inherit":true,"type":"constrained"}} -->
		<header class="wp-block-group c-article__header"><!-- wp:post-featured-image /-->

			<!-- wp:post-title /-->

			<!-- wp:post-date {"className":"c-article__date c-article__date\u002d\u002dpost"} /-->
		</header>
		<!-- /wp:group -->

		<!-- wp:group {"layout":{"inherit":false}} -->
		<div class="wp-block-group"><!-- wp:post-content {"layout":{"inherit":true}} /-->

			<!-- wp:group {"className":"c-article__meta c-article__meta\u002d\u002dpost","layout":{"inherit":true,"type":"constrained"}} -->
			<div class="wp-block-group c-article__meta c-article__meta--post"><!-- wp:group {"className":"c-article__meta-group c-article__meta-group\u002d\u002dtags","layout":{"type":"default"}} -->
				<div class="wp-block-group c-article__meta-group c-article__meta-group--tags"><!-- wp:heading {"fontSize":"medium"} -->
					<h2 class="wp-block-heading has-medium-font-size"><?php echo __('Kategorien', 'sht'); ?></h2>
					<!-- /wp:heading -->

					<!-- wp:post-terms {"term":"category"} /-->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"className":"c-article__meta-group c-article__meta-group\u002d\u002dtags","layout":{"type":"default"}} -->
				<div class="wp-block-group c-article__meta-group c-article__meta-group--tags"><!-- wp:heading {"fontSize":"medium"} -->
					<h2 class="wp-block-heading has-medium-font-size"><?php echo __('Schlagwörter', 'sht'); ?></h2>
					<!-- /wp:heading -->

					<!-- wp:post-terms {"term":"post_tag"} /-->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
	</main>
	<!-- /wp:group -->

	<!-- wp:template-part {"slug":"footer","tagName":"footer","className":"c-footer"} /-->
</div>
<!-- /wp:group -->
