import paper from '@scratch/paper';
import Modes from '../../lib/modes';
import {styleShape} from '../style-path';
import {clearSelection} from '../selection';
import {getSquareDimensions} from '../math';
import BoundingBoxTool from '../selection-tools/bounding-box-tool';
import NudgeTool from '../selection-tools/nudge-tool';

const sideCount = {
    value: 4
};

/**
 * Tool for drawing ovals.
 */
class OvalTool extends paper.Tool {
    static set sideCount (value) {
        sideCount.value = value;
    }
    static get sideCount () {
        return sideCount.value;
    }

    static get TOLERANCE () {
        return 2;
    }
    /**
     * @param {function} setSelectedItems Callback to set the set of selected items in the Redux state
     * @param {function} clearSelectedItems Callback to clear the set of selected items in the Redux state
     * @param {function} setCursor Callback to set the visible mouse cursor
     * @param {!function} onUpdateImage A callback to call when the image visibly changes
     */
    constructor (setSelectedItems, clearSelectedItems, setCursor, onUpdateImage) {
        super();
        this.setSelectedItems = setSelectedItems;
        this.clearSelectedItems = clearSelectedItems;
        this.onUpdateImage = onUpdateImage;
        this.boundingBoxTool = new BoundingBoxTool(
            Modes.OVAL,
            setSelectedItems,
            clearSelectedItems,
            setCursor,
            onUpdateImage
        );
        const nudgeTool = new NudgeTool(Modes.OVAL, this.boundingBoxTool, onUpdateImage);

        // We have to set these functions instead of just declaring them because
        // paper.js tools hook up the listeners in the setter functions.
        this.onMouseDown = this.handleMouseDown;
        this.onMouseDrag = this.handleMouseDrag;
        this.onMouseMove = this.handleMouseMove;
        this.onMouseUp = this.handleMouseUp;
        this.onKeyUp = nudgeTool.onKeyUp;
        this.onKeyDown = nudgeTool.onKeyDown;

        this.oval = null;
        this.colorState = null;
        this.isBoundingBoxMode = null;
        this.active = false;
    }
    createCustomCircle(center, radius, points) {
        var path = new paper.Path();
        var angleStep = 360 / points;
        
        for (var i = 0; i < points; i++) {
            var angle = i * angleStep;
            var x = center.x + radius * Math.cos(angle * Math.PI / 180);
            var y = center.y + radius * Math.sin(angle * Math.PI / 180);
            path.add(new paper.Point(x, y));
        }
        
        path.closed = true;
        path.smooth();
        return path;
    }
    makeCircle(center) {
        if (sideCount.value == 4) {
            const oval = new paper.Shape.Ellipse({
                point: center,
                size: 100
            })
            const path_oval = oval.toPath(true);
            oval.remove();
            return path_oval
            
        } else {
            return this.createCustomCircle(
                center,
                50,
                sideCount.value
            )
        }
    }
    getHitOptions () {
        return {
            segments: true,
            stroke: true,
            curves: true,
            fill: true,
            guide: false,
            match: hitResult =>
                (hitResult.item.data && (hitResult.item.data.isScaleHandle || hitResult.item.data.isRotHandle)) ||
                hitResult.item.selected, // Allow hits on bounding box and selected only
            tolerance: OvalTool.TOLERANCE / paper.view.zoom
        };
    }
    /**
     * Should be called if the selection changes to update the bounds of the bounding box.
     * @param {Array<paper.Item>} selectedItems Array of selected items.
     */
    onSelectionChanged (selectedItems) {
        this.boundingBoxTool.onSelectionChanged(selectedItems);
    }
    setColorState (colorState) {
        this.colorState = colorState;
    }
    handleMouseDown (event) {
        if (event.event.button > 0) return; // only first mouse button
        this.active = true;

        if (this.boundingBoxTool.onMouseDown(
            event, false /* clone */, false /* multiselect */, false /* doubleClicked */, this.getHitOptions())) {
            this.isBoundingBoxMode = true;
        } else {
            this.isBoundingBoxMode = false;
            clearSelection(this.clearSelectedItems);
        }
    }
    handleMouseDrag (event) {
        if (event.event.button > 0 || !this.active) return; // only first mouse button

        if (this.isBoundingBoxMode) {
            this.boundingBoxTool.onMouseDrag(event);
            return;
        }

        if (this.oval) {
            this.oval.remove();
        }

        // idk how paper works so we use rectangle to make a oval
        const oval = new paper.Rectangle(event.downPoint, event.point);
        const squareDimensions = getSquareDimensions(event.downPoint, event.point);
        if (event.modifiers.shift) {
            oval.size = squareDimensions.size.abs();
        }

        this.oval = this.makeCircle(event.downPoint);
        this.oval.scale(oval.size.width / 100, oval.size.height / 100, event.downPoint);
        if (event.modifiers.alt) {
            this.oval.position = event.downPoint;
        } else if (event.modifiers.shift) {
            this.oval.position = squareDimensions.position;
        } else {
            const dimensions = event.point.subtract(event.downPoint);
            this.oval.position = event.downPoint.add(dimensions.multiply(0.5));
        }

        styleShape(this.oval, this.colorState);
    }
    handleMouseUp (event) {
        if (event.event.button > 0 || !this.active) return; // only first mouse button

        if (this.isBoundingBoxMode) {
            this.boundingBoxTool.onMouseUp(event);
            this.isBoundingBoxMode = null;
            return;
        }

        if (this.oval) {
            if (this.oval.area < OvalTool.TOLERANCE / paper.view.zoom) {
                // Tiny oval created unintentionally?
                this.oval.remove();
                this.oval = null;
            } else {
                this.oval.selected = true;
                this.setSelectedItems();
                this.onUpdateImage();
                this.oval = null;
            }
        }
        this.active = false;
    }
    handleMouseMove (event) {
        this.boundingBoxTool.onMouseMove(event, this.getHitOptions());
    }
    deactivateTool () {
        this.boundingBoxTool.deactivateTool();
    }
}

export default OvalTool;
