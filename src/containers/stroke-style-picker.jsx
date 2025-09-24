import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';;
import React from 'react';

import StrokeStylePicker from '../components/stroke-style-picker.jsx';

class StrokeStylePicker extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
        ]);
    }
    render () {
        return (
            <StrokeStylePickerComponent
            />
        );
    }
}

StrokeStylePicker.propTypes = {
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StrokeStylePicker);
