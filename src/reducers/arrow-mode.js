import log from '../log/log';
import ArrowTool from '../helper/tools/arrow-tool';

const CHANGE_ARROW_LINE_WIDTH = 'scratch-paint/arrow-mode/CHANGE_ARROW_LINE_WIDTH';
const initialState = { lineWidth: 24 };

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case CHANGE_ARROW_LINE_WIDTH:
            if (isNaN(action.lineWidth)) {
                log.warn(`Invalid arrow line_width: ${action.lineWidth}`);
                return state;
            }
            const value = Math.max(0, action.lineWidth);
            ArrowTool.arrowSettings.lineWidth = value;
            return { lineWidth: value };
        default:
            return state;
    }
};

// Action creators ===================================
const changeArrowLineWidth = function (lineWidth) {
    return {
        type: CHANGE_ARROW_LINE_WIDTH,
        lineWidth: lineWidth
    };
};

export {
    reducer as default,
    changeArrowLineWidth
};
