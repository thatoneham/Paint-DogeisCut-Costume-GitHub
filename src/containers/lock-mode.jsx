import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import bindAll from 'lodash.bindall';
import Modes from '../lib/modes';

import {changeMode} from '../reducers/modes';
import {clearSelectedItems} from '../reducers/selected-items';
import {clearHoveredItem, setHoveredItem} from '../reducers/hover';

import {clearSelection} from '../helper/selection';
import LockTool from '../helper/tools/lock-tool';
import LockModeComponent from '../components/lock-mode/lock-mode.jsx';

class LockMode extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'activateTool',
            'deactivateTool'
        ]);
    }
    componentDidMount () {
        if (this.props.isLockModeActive) {
            this.activateTool(this.props);
        }
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.isLockModeActive && !this.props.isLockModeActive) {
            this.activateTool();
        } else if (!nextProps.isLockModeActive && this.props.isLockModeActive) {
            this.deactivateTool();
        }
    }
    shouldComponentUpdate (nextProps) {
        return nextProps.isLockModeActive !== this.props.isLockModeActive;
    }
    activateTool () {
        clearSelection(this.props.clearSelectedItems);
        this.tool = new LockTool(
            this.props.clearSelectedItems,
            this.props.setHoveredItem,
            this.props.clearHoveredItem,
        );
        this.tool.activate();


        for (const layer of paper.project.layers) {
            if (layer.data && layer.data['isPaintingLayer']) {
                layer.children.forEach(child => {
                    if (child.getLocked()) {
                        child.setSelected(true)
                    }
                })
            }
        }
    }
    deactivateTool () {
        clearSelection(this.props.clearSelectedItems);
        this.tool.deactivateTool();
        this.tool.remove();
        this.tool = null;
    }
    render () {
        return (
            <LockModeComponent
                isSelected={this.props.isLockModeActive}
                onMouseDown={this.props.handleMouseDown}
            />
        );
    }
}

LockMode.propTypes = {
    clearSelectedItems: PropTypes.func.isRequired,
    setHoveredItem: PropTypes.func.isRequired,
    clearHoveredItem: PropTypes.func.isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    isLockModeActive: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isLockModeActive: state.scratchPaint.mode === Modes.LOCK
});

const mapDispatchToProps = dispatch => ({
    clearSelectedItems: () => {
        dispatch(clearSelectedItems());
    },
    setHoveredItem: hoveredItemId => {
        dispatch(setHoveredItem(hoveredItemId));
    },
    clearHoveredItem: () => {
        dispatch(clearHoveredItem());
    },
    handleMouseDown: () => {
        dispatch(changeMode(Modes.LOCK));
    },
    deactivateTool () {
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LockMode);