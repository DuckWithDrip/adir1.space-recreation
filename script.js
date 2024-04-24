let activeColor = "#79cef4";
let defaultColor = "#336666";
let activeItem = ""; // last clicked element
let elementList = []; // array with all the elements based on hovered/clicked element
let lineCoords = []; // 2 dim array[startX, startY, endX, endY] for the lines drawn between the elements

//canvas
var width = document.getElementById("main").offsetWidth;
var height = document.getElementById("main").offsetHeight;
const canvas = document.getElementById("lineCanvas");
const ctx = canvas.getContext("2d");

$(document).ready(function () {

  // get size of div for drawing the line. update canvas if user resizes the window.
  $(window).resize(function () {
    width = document.getElementById("main").offsetWidth;
    height = document.getElementById("main").offsetHeight;
    updateCanvas();
    drawLine();
  });

  $("li span").hover(
    function () {
      var leftElements = this.parentElement.className;
      var currentElement = $(this).parent().attr("id");
      var rightElements = this.className;

      // if there is no selected element
      if (activeItem === "") {
        $(this).css({ color: "#79cef4", "text-shadow": "#fff 1px 0 10px" }); // set hovered element to activeState
        updateCanvas();

        if (leftElements != "") {
          // if hovered item contains elements to the left, than loop through all of them and add them to the elementList
          leftElementsArray = leftElements.split(" ");
          leftRecursion(leftElementsArray, currentElement);
        }

        if (rightElements != "") {
          rightElementsArray = rightElements.split(" ");
          rightRecursion(rightElementsArray, currentElement);
        }

        changeState(activeColor);
      }
    },
    function () {
      if (this.innerHTML != activeItem) {
        $(this).css({ color: "", "text-shadow": "" }); // set unhovered element to defaultState

        if (activeItem === "") {
          changeState(defaultColor);
          updateCanvas();
        }
      }
    }
  );
  $("li span").click(function () {
    var leftElements = this.parentElement.className;
    var currentElement = $(this).parent().attr("id");
    var rightElements = this.className;

    $("#" + currentElement).css({ color: "#79cef4", "text-shadow": "#fff 1px 0 10px", }); // set clicked element to activeState

    if (activeItem === "") {
      // if user clicks an element
      changeState(activeColor);
      activeItem = currentElement;

    } else if (activeItem != currentElement) {
      // else if user clicks something else
      elementList.push(activeItem);
      changeState(defaultColor);

      if (leftElements != "") {
        leftElementsArray = leftElements.split(" ");
        leftRecursion(leftElementsArray, currentElement);
      }

      if (rightElements != "") {
        rightElementsArray = rightElements.split(" ");
        rightRecursion(rightElementsArray, currentElement);
      }

      changeState(activeColor);
      activeItem = currentElement;

    } else {
      // else if user clicks the same element
      $("#" + activeItem).css({ color: "#336666", "text-shadow": "" });
      changeState(defaultColor);
    }
  });





  // randomize colors
  const randomHexColor = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  };
  function updateCanvas() {
    ctx.canvas.width = window.width - 3;
    ctx.canvas.height = window.height;
  }





  function changeState(color) {
    let i = 0;
    while (i < elementList.length) {
      let item = elementList[i];
      document.getElementById(item).style.color = color;
      document.getElementById(item).style.textShadow = "";
      i++;
    }

    if (color === defaultColor) {
      updateCanvas();
      activeItem = "";
      elementList = [];
      lineCoords = [];

    } else {
      drawLine();
    }
  }




  // Recursion Logic:
  // After hovering/clicking an element, we iterate through all the elements to the left.
  // If those elements also have left elements, we recursively do the same thing again.
  // This way we can add all the elements we need to the elementList and all the coordinates to lineCoords.

  function leftRecursion(leftElementsArray, middle) {
    var midOffset = document.getElementById(middle).getBoundingClientRect();
    var startX = midOffset.left;
    var startY = midOffset.top - 90;

    leftElementsArray.forEach((element) => {
      if (element.className != "") {
        elementList.push(element);

        var elementOffset = document
          .getElementById(element)
          .getBoundingClientRect();
        var endX = elementOffset.right;
        var endY = elementOffset.top - 90;
        lineCoords.push([startX, startY, endX, endY]);

        let leftElement = document.getElementById(element);
        elementArray = leftElement.className.split(" ");

        if (elementArray != "") {
          leftRecursion(elementArray, element);
        }
      }
    });
  }

  function rightRecursion(rightElementsArray, middle) {
    var midOffset = document.getElementById(middle).getBoundingClientRect();
    var startX = midOffset.right;
    var startY = midOffset.top - 90;

    rightElementsArray.forEach((element) => {
      if (element != "") {
        var elementOffset = document
          .getElementById(element)
          .getBoundingClientRect();
        var endX = elementOffset.left;
        var endY = elementOffset.top - 90;
        lineCoords.push([startX, startY, endX, endY]);

        elementList.push(element);
        let rightElement = document.getElementById(element).firstChild;
        elementArray = rightElement.className.split(" ");

        if (elementArray != "") {
          rightRecursion(elementArray, element);
        }
      }
    });
  }

  function drawLine() {
    let i = 0;
    let strokeColor = randomHexColor();

    while (i < lineCoords.length) {
      let startX = lineCoords[i][0];
      let startY = lineCoords[i][1];
      let endX = lineCoords[i][2];
      let endY = lineCoords[i][3];

      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      i++;
    }
  }
});