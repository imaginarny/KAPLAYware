import { Comp, KAPLAYCtx } from "kaplay";
import { MinigameCtx } from "../types";

// Keep track of the current draggin item
export let curDraggin = null;

export function setCurDragging(value: any) {
	curDraggin = value;
}

export interface dragComp extends Comp {
	dragging: boolean;
	pick(): void;
	onDrag(action: () => void): void;
	onDragUpdate(action: () => void): void;
	onDragEnd(action: () => void): void;
}

// A custom component for handling drag & drop behavior
function drag(k: KAPLAYCtx | MinigameCtx): dragComp {
	// The displacement between object pos and mouse pos
	let offset = k.vec2(0);

	return {
		// Name of the component
		id: "drag",
		// This component requires the "pos" and "area" component to work
		require: ["pos", "area"],
		get dragging() {
			return curDraggin == this;
		},
		pick() {
			// Set the current global dragged object to this
			curDraggin = this;
			offset = k.mousePos().sub(this.pos);
			this.trigger("drag");
		},
		// "update" is a lifecycle method gets called every frame the obj is in scene
		update() {
			if (curDraggin === this) {
				this.pos = k.mousePos().sub(offset);
				this.trigger("dragUpdate");
			}
		},
		onDrag(action) {
			return this.on("drag", action);
		},
		onDragUpdate(action) {
			return this.on("dragUpdate", action);
		},
		onDragEnd(action) {
			return this.on("dragEnd", action);
		},
	};
}

export function dragCompPlugin() {
	return {
		drag,
	};
}
