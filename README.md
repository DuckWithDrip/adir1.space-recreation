# adir1.space Recreation

This README is a work in progress.

TODO:
- [ ] add gif to showcase recursion logic

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


# Logic 

Here I'll explain basic logic and structure and go over the most crucial parts of the JavaScript code. For some in-depth code explanation, refer to the comments inside *script.js* and look at the jQuery docs for some further insights.

### Code structure for user input

Very basic jQuery. We have a function for when...
* when the user hovers over an element 
* when the user unhovers an element
* when the user clicks an element

Inside the hover element function, we set the colors of the hovered element and get all the neighbours. 

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


## How do we get the neighbours?

Example HTML

```
<li class="chromite monazite" id="chromium"><span class="hexite solerium titanium-chromide">Chromium</span></li>
```

This is a lot of information in one single line and it might appear complicated at first glance. However, it represents the fundamental structure of our element alongside its neighbouring relationships. With ```this``` ([what is "this"?](https://www.w3schools.com/js/js_this.asp)) we get the whole object we're hovering over. In our case this would be:

```<span class="hexite solerium titanium-chromide">Chromium\</span> ```

### Elements to the right

The elements to the right are inside the span class. We access the string with ```this.className```. To get an array of new elements (which we'll iterate through to draw the lines), we'll split the string by spaces with ```this.className.split(" ");```. Now we have an array that looks like this: ```["hexite", "solerium", "titanium-chromide"]```. The next step would be to iterate through the array, color them and draw the lines. Refer to the JavaScript code to see how this is done.

### Elements to the left

We'll do a similar process for the left elements, but this time we want to access the parentElement ```this.parentElement.className.split(" ");```. We need parentElement to access the outer element since the class is inside the \<li> tag. In this example, the array would look like this: ```["chromite", "monazite"]```.


## Recursion logic

Here lies the most crucial part of my code. I'm using recursion with a [depth-first search](https://en.wikipedia.org/wiki/Depth-first_search) to iterate through every element and draw the lines. Each time we find out that the current element has neighbours, we start another recursion. We have seperate functions for the left and right recursion. 

## License

GNU General Public License, version 2.