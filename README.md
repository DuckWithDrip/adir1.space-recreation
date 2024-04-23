# adir1.space Recreation

In this project I recreated the logic of a simple website from scratch to increase my knowledge of JavaScript and jQuery. The website no longer exists and is only available through the Wayback Machine [here](https://web.archive.org/web/20221128171933/http://www.adir1.space/goo/).

## Installation 

If you wish to try it out locally to see how it looks like you could 
either:

1. Download this project as a ZIP file.
    * Extract it.
    * Open **index.html** inside your browser.

> [!NOTE]
> There is a bug where the lines are not shown if you're using dark mode addons (e.g. [dark reader](https://darkreader.org/)) for your browser. 

2. or visit [codepen](https://codepen.io/DuckWithDrip-the-sans/pen/MWRZpvx).

## Logic 

Here I'll explain basic logic and structure and go over the most crucial parts of the JavaScript code. For some in-depth code explanation, refer to the comments inside *script.js* and look at the jQuery docs for some further insights.

### First, the code structure:
Very basic jQuery. We have a function for when
* the user hovers over an element 
* when a user unhovers an element
* when the user clicks an element



```
$("li span").hover(
    function () {
        // hover element

    },
    function () {
        // unhover element

    }
);
$("li span").click(function () {
    // clicked element

});
```

## License