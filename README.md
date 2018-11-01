# stickyBlock
jQuery Sticky Block plugin

*Settings*
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `stopper` | jQuery selector, object (DOM node), jQuery object | this.parent() | Object to determine where the sticky block stops  | 
| `offsetTop` | number | 0 | Offset from the top of the screen to sticky block where it starts to scroll |

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

*Methods*
$(element).stickyBlock('init');
