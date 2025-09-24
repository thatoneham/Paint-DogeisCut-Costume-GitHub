import log from '../log/log';
import OvalTool from '../helper/tools/oval-tool';

const CHANGE_OVAL_SIDE_COUNT = 'scratch-paint/oval-mode/CHANGE_OVAL_SIDE_COUNT';
const initialState = { ovalPolyCount: 4 };

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case CHANGE_OVAL_SIDE_COUNT:
            if (isNaN(action.ovalPolyCount)) {
                log.warn(`Invalid side count: ${action.ovalPolyCount}`);
                return state;
            }
            const value = Math.max(2, action.ovalPolyCount);
            OvalTool.sideCount = value;
            return { ovalPolyCount: value };
        default:
            return state;
    }
};

// Action creators ===================================
const changeOvalPolyCount = function (ovalPolyCount) {
    return {
        type: CHANGE_OVAL_SIDE_COUNT,
        ovalPolyCount: ovalPolyCount
    };
};

export {
    reducer as default,
    changeOvalPolyCount
};
