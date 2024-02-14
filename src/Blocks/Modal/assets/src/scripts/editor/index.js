import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { menu as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;

registerBlockType(block_name, {
	icon,
	edit: (props) => {
		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={['core/paragraph', 'gravityforms/form']}
					template={[
						['core/paragraph', { placeholder: 'Add your content here' }],
						['gravityforms/form', {}],
					]}
				/>
			</div>
		);
	},
	save: () => {
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div class="c-modal">
					<div className="c-modal__toggle-wrap">
						<button aria-controls="testmodal" className="c-modal__toggle" aria-expanded="false" type="button">
							Toggle modal
						</button>
					</div>
					<div className="c-modal__inner" id="testmodal" aria-hidden="true">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
});
