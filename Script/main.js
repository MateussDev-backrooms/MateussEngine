var test = 0;

function init() {
//runs as soon as engine starts
}

function update() {
  //runs every update tick configured in engine.js
  if(I_mouseDown) {
    test+=1
  }
}

function r_update() {
  //runs rendering
  ra_drawImage('./Assets/Texture/t_jeff.png', I_mouseX, I_mouseY, 256, 128, 0.5, 0.5, n_toRad(test), 1);
}
