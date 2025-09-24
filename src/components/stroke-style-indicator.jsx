import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-popover';

import Dropdown from './dropdown/dropdown.jsx';
import ColorButton from './color-button/color-button.jsx';
import InputGroup from './input-group/input-group.jsx';
import Label from './forms/label.jsx';

import GradientTypes from '../lib/gradient-types';
import StrokeStylePicker from './stroke-style-picker/stroke-style-picker.jsx';

const StrokeStyleIndicatorComponent = props => (
    <InputGroup
        className={props.className}
        disabled={props.disabled}
    >
        <Dropdown
            onClick={props.onOpenStyle}
             popoverContent={
                <StrokeStylePicker
                />
            }
        >
            Style
        </Dropdown>
    </InputGroup>
);

StrokeStyleIndicatorComponent.propTypes = {
    className: PropTypes.string,
    onOpenStyle: PropTypes.func.isRequired,
};

export default StrokeStyleIndicatorComponent;
