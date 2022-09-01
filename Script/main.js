var myTextStyle = new TextStyle('bold arial 40px', 'left', 'top', 'black');

function init() {
  //runs as soon as engine starts
}

function update() {
  //runs every update tick configured in engine.js
}

function r_update() {
  //runs rendering
  r_drawText(`x: ${I_mouseX}; y: ${I_mouseY}`, I_mouseX, I_mouseY, myTextStyle);
}
