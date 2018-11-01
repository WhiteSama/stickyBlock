# jQuery stickyBlock

A plugin that adds the ability to stick a block to a page scrolling position and stop its relative other block on the page.

## Init example
```javascript
$(element).stickyBlock("init", {
	stopper: $(stopper-element),
	offsetTop: 100,
	offsetBottom: 200,
  emdPoint: "top"
})
```

## Settings

| Option  | Type | Default  | Description |
| --- | :-- | :--: | :-- |
| `stopper`  | jQuery selector, object (DOM node), jQuery object  | **this.parent()**  | Object to determine where the sticky block stops  |
| `offsetTop`  | number  | 0  | Offset from the top of the sticky block where it starts to scroll  |
| `offsetBottom`  | number  | 0  | Offset from the bottom of the sticky block where it stops to scroll  |
| `endPoint`  | string  | bottom  | To decide on which position of the stopper the sticky block will stop. Can be **top** and **bottom** |
| `debug`  | boolen  | false  | Displays information for debug in the console. |

## Methods

| Method  | Argument | Description  |
| --- | :--: | :-- |
| Option  | Type | Default  |
