const e_html_canvas = document.getElementById("i_main_canvas");
const ctx = e_html_canvas.getContext('2d');
const r_reqAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
  setTimeout(callback, 1000 / 30);
};

var r_isError = false;

//Config
var r_clearScreen = true;

//Camera
class Camera {
  constructor(position) {
    this.position = position;
  }
}

//Text setup object
class TextStyle {
  constructor(font, alignment, vertAlignment, color) {
    this.font = font;
    this.alignment = alignment; //left, center, right, start, end
    this.vertAlignment = vertAlignment; //top, middle, alphabetical, bottom
    this.color = color;
  }
}

var r_globalCamera = new Camera(new Vector2(0, 0));


function r_redraw() {
  //clear screen on bool
  if(r_clearScreen) ctx.clearRect(0, 0, e_html_canvasWidth, e_html_canvasHeight);

  r_update();
  ctx.globalAlpha = 1;

  r_reqAnimationFrame(r_redraw);
}


//shapes
function r_drawTexture(path, x, y, width, height) {
    //setup image
    let _img = new Image();

    //gather path
    if(path != null && path != undefined) _img.src = path;
    else _img.src = "./Engine/assets/e_noTexture.png";

    //render image
    ctx.drawImage(_img, x - r_globalCamera.position.x, y - r_globalCamera.position.y, width, height);
}

function r_drawNGon(x, y, side_num, radius, color) {
  let a = 2 * Math.PI / side_num;
  ctx.fillStyle = color;
  ctx.beginPath();
  for(let i=0; i<side_num; i++) {
    ctx.lineTo(x + radius * Math.cos(a * i) - r_globalCamera.position.x, y + radius * Math.sin(a * i) - r_globalCamera.position.y);
  }
  ctx.closePath();
  ctx.fill();
}

function r_strokeNGon(x, y, side_num, radius, color, thickness) {
  let a = 2 * Math.PI / side_num;
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.beginPath();
  for(let i=0; i<side_num; i++) {
    ctx.lineTo(x + radius * Math.cos(a * i) - r_globalCamera.position.x, y + radius * Math.sin(a * i) - r_globalCamera.position.y);
  }
  ctx.closePath();
  ctx.stroke();
}

function r_getV(r) {
  let s = r/2;
  return Math.sqrt(r*r-s*s)
}

function r_drawRectangle(x, y, width, height, style, alpha) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = style;
  ctx.fillRect(x - r_globalCamera.position.x, y - r_globalCamera.position.y, width, height);
  ctx.globalAlpha = 1;
}

function r_strokeRectangle(x, y, width, height, style, thickness, alpha) {
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = style;
  ctx.lineWidth = thickness;
  ctx.strokeRect(x - r_globalCamera.position.x, y - r_globalCamera.position.y, width, height);
  ctx.globalAlpha = 1;
}

function r_drawPixel(x, y, style) {
  ctx.fillStyle = style;
  ctx.fillRect(x - r_globalCamera.position.x, y - r_globalCamera.position.y, 1, 1);
}

function r_drawText(text, x, y, style) {
  //setup style if present
  if(style == undefined) {
    //default values
    ctx.font = 'Arial 16px';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'black';
  } else {
    ctx.font = style.font;
    ctx.textAlign = style.alignment;
    ctx.textBaseline = style.vertAlignment;
    ctx.fillStyle = style.color;
  }

  ctx.fillText(text, x, y);
}
