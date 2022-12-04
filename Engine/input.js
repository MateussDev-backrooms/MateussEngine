var I_keypress = new Array(256).fill(false)
var I_mouseX = 0; var I_mouseY = 0; var I_mousePosition = new Vector2(0, 0);
var I_mouseDown = false; var I_mouseUp = false; var I_mouseMoving = false;


function I_init() {
  //Mouse handling
  window.addEventListener("mousemove", (e) => {
    I_mouseX = e.pageX //- e_html_canvas.offsetLeft;
    I_mouseY = e.pageY //- e_html_canvas.offsetTop;
    I_mousePosition = new Vector2(e.pageX - e_html_canvas.offsetLeft, e.pageY - e_html_canvas.offsetTop);
    I_mouseMoving = true;
  });
  I_mouseMoving = false;
  window.addEventListener("mouseup", _mouseup); //calls an input.js function onMouseUp()
  window.addEventListener("mousedown", _mousedown); //calls a main.js function onMouseDown()

  if (typeof onMouseUp != "undefined") {
      window.addEventListener("mouseup", onMouseUp); //calls a main.js function onMouseUp()
  }
  if (typeof onMouseDown != "undefined") {
      window.addEventListener("mousedown", onMouseDown); //calls a main.js function onMouseDown()
  }

  //Keyboard events
  if (typeof OnKeyDown != "undefined") {
      window.addEventListener("keydown", (e) => {
          I_keypress[e.keyCode] = true;
          OnKeyDown(e.keyCode); //calls a main.js function onKeyDown(key)
      });
  } else {
      window.addEventListener("keydown", (e) => {
          I_keypress[e.keyCode] = true;
      });
  }
  if (typeof OnKeyUp != "undefined") {
      window.addEventListener("keyup", (e) => {
          I_keypress[e.keyCode] = false;
          OnKeyUp(e.keyCode); //calls a main.js function onKeyUp(key)
      });
  } else {
      window.addEventListener("keyup", (e) => {
          I_keypress[e.keyCode] = false;
      });
  }
}
function I_I_keypress(keycode) {
  if(I_keypress[keycode] == 1) {
    return true;
  }
  return false;
}

function I_isAnyKeyPressed() {
  I_keypress.forEach((key, i) => {
    if (key==true) return true;
  });
  return false;
}

function _mouseup() {
  I_mouseUp = true;
  I_mouseDown = false;
}
function _mousedown() {
  I_mouseUp = false;
  I_mouseDown = true;
}

function _input_update() {
  if(I_mouseUp) {
    I_mouseUp = false; //resets mouseup after finding out it works

  }
}
