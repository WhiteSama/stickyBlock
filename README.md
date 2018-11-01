# jQuery stickyBlock

A plugin that adds the ability to stick a block to a page scrolling position and stop its relative other block on the page. 

## Settings

| Option  | Type | Default  | Description |
| --- | :-- | :--: | :-- |
| **`stopper`**  | jQuery selector, object (DOM node), jQuery object  | **this.parent()**  | Object to determine where the sticky block stops  |
| **`offsetTop`**  | number  | **0**  | Offset from the top of the sticky block where it starts to scroll  |
| **`offsetBottom`**  | number  | **0**  | Offset from the bottom of the sticky block where it stops to scroll  |
| **`endPoint`**  | string  | **bottom**  | To decide on which position of the stopper the sticky block will stop. Can be **top** and **bottom** |
| **`debug`**  | boolen  | **false**  | Displays information for debug in the console. |

## Methods

```javascript
//Init method
$(element).stickyBlock("init", {
	stopper: $(stopper-element),
	offsetTop: 100,
	offsetBottom: 200,
  	endPoint: "top"
})

//Reinit method
$(element).stickyBlock("reinit");
```

| Method  | Call | Description  |
| :--: | :-- | :-- |
| **`init`** | $(element).stickyBlock("**init**", { settings }) | For plugin initialisation |
| **`reinit`** | $(element).stickyBlock("**reinit**") | For example for reinit sticky block after ajax content load |
