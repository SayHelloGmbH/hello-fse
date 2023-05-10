import { registerBlockType } from '@wordpress/blocks';
import { AlignmentToolbar, BlockControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { title as icon } from '@wordpress/icons';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;

registerBlockType(block_name, {
	icon,
	edit: (props) => {
		const { attributes, setAttributes } = props;
		const { textAlign } = attributes;
		const blockProps = useBlockProps({
			className: !textAlign ? '' : `has-text-align-${textAlign}`,
		});

		return (
			<div {...blockProps}>
				<BlockControls key="controls">
					<AlignmentToolbar value={textAlign} onChange={(textAlign) => setAttributes({ textAlign })} />
				</BlockControls>
				<ServerSideRender block={block_name} attributes={attributes} />
			</div>
		);
	},
});
