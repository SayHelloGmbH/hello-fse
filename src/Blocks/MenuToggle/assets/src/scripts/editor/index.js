import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
//import { sanitize } from '@wordpress/dom';
import { menu as icon } from '@wordpress/icons';

//import { decodeEntities } from '@wordpress/html-entities';

import { cleanForSlug } from '@wordpress/url';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;

registerBlockType(block_name, {
	icon,
	edit: (props) => {
		const { attributes, setAttributes } = props;
		const { target } = attributes;
		const blockProps = useBlockProps();

		const handleTargetChange = (target) => {
			setAttributes({ target: cleanForSlug(target) });
		};

		return (
			<div {...blockProps}>
				<InspectorControls>
					<PanelBody title="Link Settings">
						<TextControl label="Target" value={target} onChange={handleTargetChange} />
					</PanelBody>
				</InspectorControls>
			</div>
		);
	},
});
