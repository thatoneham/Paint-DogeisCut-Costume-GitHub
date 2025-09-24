import React from 'react';
import PropTypes from 'prop-types';
import ToolSelectComponent from '../tool-select-base/tool-select-base.jsx';

import lockIcon from './lock.svg';

const LockModeComponent = props => (
    <ToolSelectComponent
        imgDescriptor={{
            defaultMessage: 'Lock/Unlock',
            description: 'Label for the lock tool, which locks shapes',
            id: 'paint.lockMode.lock'
        }}
        imgSrc={lockIcon}
        isSelected={props.isSelected}
        onMouseDown={props.onMouseDown}
    />
);

LockModeComponent.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    onMouseDown: PropTypes.func.isRequired
};

export default LockModeComponent;