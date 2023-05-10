import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { menu as icon } from '@wordpress/icons';
import { cleanForSlug } from '@wordpress/url';
import { __ } from '@wordpress/i18n';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;
const classNameBase = getBlockDefaultClassName(block_name);

registerBlockType(block_name, {
	icon,
	edit: (props) => {
		const { attributes, setAttributes } = props;
		const { target, textColor } = attributes;

		const handleTargetChange = (target) => {
			setAttributes({ target: cleanForSlug(target) });
		};

		const lineColor = textColor !== '' ? ` has-text-color has-${textColor}-color` : '';

		const blockProps = useBlockProps({
			className: lineColor,
		});

		return (
			<>
				<InspectorControls>
					<PanelBody title="Link Settings">
						<PanelRow>
							<TextControl label={__('Target', 'sha')} help={__('Add the ID of the target container.', 'sha')} value={target} onChange={handleTargetChange} />
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					<span className={`${classNameBase}__line ${classNameBase}__line-1`} />
					<span className={`${classNameBase}__line ${classNameBase}__line-2`} />
					<span className={`${classNameBase}__line ${classNameBase}__line-3`} />
				</div>
			</>
		);
	},
});
