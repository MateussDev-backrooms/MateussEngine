const e_html_canvas = document.getElementById("i_main_canvas");
const ctx = e_html_canvas.getContext('2d');
const r_reqAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
  setTimeout(callback, 1000 / 30);
};

var r_isError = false;

//Config
var r_clearScreen = true;
var r_debug = false;

var r_toPreloadTextures = [
  {name: 'jeff', src: './Assets/Texture/t_jeff.png'}
]

let _validatedPaths = [
  {key: 'sum ez path', value: 'the complex path'}
]

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

function e_preloadTextures() {
  for(let tex of r_toPreloadTextures) {
    r_preloadSingleTexture(tex.name, tex.src);
  }
}

function r_preloadSingleTexture(name, src) {
  name = 'img_'+name;
  window[name] = {name: name, src: src}
}

function r_redraw() {
  //clear screen on bool
  if(r_clearScreen) ctx.clearRect(0, 0, e_html_canvasWidth, e_html_canvasHeight);

  r_update();
  ctx.globalAlpha = 1;

  r_reqAnimationFrame(r_redraw);
}

function r_validateEZPath(ez_path) {
  //adds an EZ path
  let complex_path = '';
  //adds in the default texture directory for the EZ path
  if(!ez_path.startsWith('./Assets/Texture/') && !ez_path.startsWith('Assets/Texture/')) {
    complex_path = './Assets/Texture/'+ez_path
  }

  //adds in the .png if it is not in ez_path
  if(!ez_path.endsWith('.png') && !ez_path.endsWith('.jpg') && !ez_path.endsWith('.bmp')) {
    complex_path = complex_path+'.png'
  }

  //adds it to validated
  _validatedPaths.push({key: ez_path, value: complex_path})
}

function r_findFullPathFromEZPath(ez_path) {
  for(let path of _validatedPaths) {
    if(path.key == ez_path) {
      return path.value;
    }
  }
  return undefined;
}
//shapes
function r_drawTexture(path, x, y, width, height) {
    //setup image
    let _img = new Image();

    //gather path
    if((path.startsWith('./Assets/Texture/') || path.startsWith('Assets/Texture/')) && (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.bmp'))) {
      if(!_img.complete) {
        _img.src = "./Engine/assets/e_noTexture.png";
      } else {
        _img.src = path;
      }
    } else {
      let _cmpl_path = r_findFullPathFromEZPath(path);
      if(_cmpl_path == undefined) {
        r_validateEZPath(path)
        _cmpl_path = r_findFullPathFromEZPath(path);
      }

      //missing texture texture
      if(!_img.complete) {
        _img.src = "./Engine/assets/e_noTexture.png";
      } else {
        _img.src = _cmpl_path;
      }
    }

    

    

    //render image
    ctx.drawImage(_img, x - r_globalCamera.position.x, y - r_globalCamera.position.y, width, height);

    if(r_debug) {
      ctx.fillStyle = "red";
      ctx.fillRect(x-4, y-4, 8, 8) //render pivot point
    }
}

function r_drawPreloadedTexture(texture, x, y, width, height) {
    //setup image
    let _img = new Image();

    //gather path
    _img.src = texture.src;

    //render image
    ctx.drawImage(_img, x - r_globalCamera.position.x, y - r_globalCamera.position.y, width, height);

    if(r_debug) {
      ctx.fillStyle = "red";
      ctx.fillRect(x-4, y-4, 8, 8) //render pivot point
    }
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

  if(r_debug) {
    ctx.fillStyle = "red";
    ctx.fillRect(x-4, y-4, 8, 8) //render pivot point
  }
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

  if(r_debug) {
    ctx.fillStyle = "red";
    ctx.fillRect(x-4, y-4, 8, 8) //render pivot point
  }
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

  if(r_debug) {
    ctx.fillStyle = "red";
    ctx.fillRect(x-4, y-4, 8, 8) //render pivot point
  }
}

function r_strokeRectangle(x, y, width, height, style, thickness, alpha) {
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = style;
  ctx.lineWidth = thickness;
  ctx.strokeRect(x - r_globalCamera.position.x, y - r_globalCamera.position.y, width, height);
  ctx.globalAlpha = 1;

  if(r_debug) {
    ctx.fillStyle = "red";
    ctx.fillRect(x-4, y-4, 8, 8) //render pivot point
  }
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

  if(r_debug) {
    ctx.fillStyle = "red";
    ctx.fillRect(x-4, y-4, 8, 8) //render pivot point
  }
}

function r_drawUITexture(path, x, y, width, height) {
  //setup image
  let _img = new Image();

  //gather path
  if(path != null && path != undefined) _img.src = path;
  else _img.src = "./Engine/assets/e_noTexture.png";

  //render image
  ctx.drawImage(_img, x, y, width, height);
}

function r_drawUIRectangle(x, y, width, height, style, alpha) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = style;
  ctx.fillRect(x, y, width, height);
  ctx.globalAlpha = 1;
}

function ra_drawTexture(path, x, y, width, height, pivotX, pivotY, angle, alpha) {
  //pivots are a value between 0 and 2 that show where to rotate;

  //setup image
  let _img = new Image();

  //gather path

  let _cmpl_path = r_findFullPathFromEZPath(path);
  if(_cmpl_path == undefined) {
    r_validateEZPath(path)
    _cmpl_path = r_findFullPathFromEZPath(path);
  }
  if(!_img.complete) {
    _img.src = "./Engine/assets/e_noTexture.png";
  } else {
    _img.src = _cmpl_path;
  }

  //render image
  ctx.save();
  ctx.globalAlpha = alpha;

  ctx.translate(  x - (width*(pivotX)) - r_globalCamera.position.x, y - (height*(pivotY)) - r_globalCamera.position.y )
  ctx.rotate(angle)
  ctx.translate(  -x + (width*(pivotX)) - r_globalCamera.position.x, -y + (height*(pivotY)) - r_globalCamera.position.y )
  
  ctx.drawImage(_img, x - (width*(pivotX))-width - r_globalCamera.position.x, y - (height*(pivotY))-height, width, height);
  
  if(r_debug) {
    ctx.fillStyle = "red";
    ctx.fillRect(x - (width*(pivotX)) - r_globalCamera.position.x, y - (height*(pivotY)) - r_globalCamera.position.y, 8, 8) //render pivot point
  }

  ctx.restore();

}
