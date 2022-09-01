//Engine vars
let e_version = "v3.0"

//Public engine vars (Config)
var e_html_canvasWidth = 1280;
var e_html_canvasHeight = 720;

var e_updateTick = 5;


function e_init() {
  //watermark
  console.log("Using MateussEngine "+e_version);

  //resize canvas
  e_html_canvas.width = e_html_canvasWidth;
  e_html_canvas.height = e_html_canvasHeight;

  //render error message
  if (typeof r_update == "undefined") {
    r_redraw = () => {
      ctx.clearRect(0, 0, e_html_canvasWidth, e_html_canvasHeight);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "red";
      ctx.font = "16px Arial"
      ctx.fillText("Error while rendering sceen. Check console for more info.", 64, 64);
    }
  }
  r_redraw();
  //start processess
  I_init();
  init();
  setInterval(update, e_updateTick);

}
