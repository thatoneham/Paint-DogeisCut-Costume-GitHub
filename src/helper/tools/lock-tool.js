import paper from '@scratch/paper';
import {getHoveredItem} from '../hover';

/**
 * Tool to handle locking and unlocking shapes.
 */
class LockTool extends paper.Tool {
    static get TOLERANCE () {
        return 2;
    }
    /**
     * @param {function} setHoveredItem Callback to set the hovered item
     * @param {function} clearHoveredItem Callback to clear the hovered item
     * @param {function} clearSelectedItems Callback to clear the set of selected items in the Redux state
     */
    constructor (clearSelectedItems, setHoveredItem, clearHoveredItem) {
        super();

        this.setHoveredItem = setHoveredItem;
        this.clearHoveredItem = clearHoveredItem;
        this.clearSelectedItems = clearSelectedItems;
        
        this.lockItem = null;
        this.prevHoveredItemId = null;

        // We have to set these functions instead of just declaring them because
        // paper.js tools hook up the listeners in the setter functions.
        this.onMouseDown = this.handleMouseDown;
        this.onMouseMove = this.handleMouseMove;
        this.onMouseUp = this.handleMouseUp;
    }
    getHitOptions () {
        const hitOptions = {
            segments: true,
            stroke: true,
            curves: true,
            fill: true,
            guide: false,
            tolerance: LockTool.TOLERANCE / paper.view.zoom,
            match: function() {
                return true;
            }
        };
        return hitOptions;
    }
    /**
     * To be called when the hovered item changes. When the select tool hovers over a
     * new item, it compares against this to see if a hover item change event needs to
     * be fired.
     * @param {paper.Item} prevHoveredItemId ID of the highlight item that indicates the mouse is
     *     over a given item currently
     */
    setPrevHoveredItemId (prevHoveredItemId) {
        this.prevHoveredItemId = prevHoveredItemId;
    }
    handleMouseDown (event) {
        this.clearHoveredItem();
    }
    handleMouseMove (event) {
        const hoveredItem = getHoveredItem(event, this.getHitOptions());
        if ((!hoveredItem && this.prevHoveredItemId) || // There is no longer a hovered item
                (hoveredItem && !this.prevHoveredItemId) || // There is now a hovered item
                (hoveredItem && this.prevHoveredItemId &&
                    hoveredItem.id !== this.prevHoveredItemId)) { // hovered item changed
            this.setHoveredItem(hoveredItem ? hoveredItem.id : null);
        }
        if (hoveredItem) {
            this.lockItem = hoveredItem;
        }
    }
    handleMouseUp (event) {
        if (event.event.button > 0) return;
        if (this.lockItem) {
            this.lockItem.setLocked(!this.lockItem.getLocked());
            this.lockItem.setSelected(this.lockItem.getLocked());
        }
    }
    deactivateTool () {
        this.clearHoveredItem();
        this.setHoveredItem = null;
        this.clearHoveredItem = null;
    }
}

export default LockTool;
