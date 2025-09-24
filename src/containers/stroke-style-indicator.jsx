import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import Modes from '../lib/modes';

import StrokeStyleIndicatorComponent from '../components/stroke-style-indicator.jsx';

class StrokeStyleIndicator extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
        ]);
    }
    render () {
        return (
            <StrokeStyleIndicatorComponent
                disabled={this.props.disabled}
            />
        );
    }
}

const mapStateToProps = state => ({
    disabled: state.scratchPaint.mode === Modes.BRUSH ||
        state.scratchPaint.mode === Modes.TEXT ||
        state.scratchPaint.mode === Modes.FILL,
});
const mapDispatchToProps = dispatch => ({
});

StrokeStyleIndicator.propTypes = {
    disabled: PropTypes.bool.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StrokeStyleIndicator);
