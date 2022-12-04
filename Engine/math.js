//all n_function use numbers, while all v_function use vectors for ease of programming
class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  length() {
    return Math.abs(Math.sqrt(this.x*this.x + this.y*this.y));
  }
  add(b) {
    return new Vector2(this.x + b.x, this.y + b.y);
  }
  subtract(b) {
    return new Vector2(this.x - b.x, this.y - b.y);
  }
  invert() {
    //edits the vector itself. Use s_invert (safe invert) to keep values
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  s_invert() {
    //returns a new vector without editing the initial vector
    return new Vector2(-this.x, -this.y);
  }
}

function n_random() {
  //returns random value between 0 and 1
  return Math.random();
}

function n_randomRange(min, max) {
  //returns random value between min and max
  return min + (Math.random()*max);
}

function v_random() {
  //returns a random vector2 with values between 0 and 1
  return new Vector2(n_random(), n_random());
}

function v_randomRange(vmin, vmax) {
  //returns a random Vector2 with values between vmin and vmax
  return new Vector2(n_randomRange(vmin.x, vmax.x), n_randomRange(vmin.x, vmax.x));
}

function n_distance(x1, y1, x2, y2) {
  //returns distance between 2 positions. Doesn't use vectors
  let _a = x1 - x2, _b = y1 - y2;
  return Math.sqrt(Math.pow(_a, 2) + Math.pow(_b, 2));
}

function v_distance(a, b) {
  //returns distance between 2 positions. Uses vectors as arguments
  let _a = a.x - b.x, _b = a.y - b.y;
  return Math.sqrt(Math.pow(_a, 2) + Math.pow(_b, 2));
}

function n_lerp(a, b ,t) {
  //smoothly lerps between a and b in t (value between 0 and 1. Lower value - longer interpolation)
  return (1 - t) * a + t * b;
}

function v_lerp(a, b, t) {
  //smoothly lerps between vectors a and b in t (value between 0 and 1. Lower value - longer interpolation)
  return new Vector2(n_lerp(a.x, b.x, t), n_lerp(a.y, b.y, t));
}

function n_toRad(x) {
  //converts x from degrees to radians
  return x * Math.PI/180;
}

function n_toDeg(x) {
  //converts x from radians to degrees
  return x * (180/Math.PI);
}

function n_lookAtAngle(from_x, from_y, to_x, to_y) {
  //returns the angle between from position to position. Doesn't use vectors
  return Math.atan2(from_y - to_y, from_x - to_x);
}

function v_lookAtAngle(from, to) {
  //returns the angle between vectors from & to. Uses vectors as arguments
  return Math.atan2(from.y - to.y, from.x - to.x);
}

function n_normalize(value, min, max) {
  let _val = (value - min) / (max - min)
  return _val;
}

function n_sphereCollision(x1, y1, r1, x2, y2, r2) {
  if(areColliding(x1-r1, y1-r1, r1*2, r1*2, x2-r2, y2-r2, r2*2, r2*2)) {
      if(dist(x1, y1, x2, y2)<=r1+r2) {
        return true;
      }
  }
  return false;
}

function v_sphereCollision(pos1, r1, pos2, r2) {
  if(areColliding(pos1.x-r1, pos1.y-r1, r1*2, r1*2, pos2.x-r2, pos2.y-r2, r2*2, r2*2)) {
      if(dist(pos1.x, pos1.y, pos2.x, pos2.y)<=r1+r2) {
        return true;
      }
  }
  return false;
}

function n_average(arrayNum) {
  let _val = 0;
  arrayNum.forEach((num, i) => {
    _val += num;
  });

  _val = _val / arrayNum.length;
  return _val;
}

function n_clamp(x, min, max) {
  if(x < min) {
    return min;
  } else if(x > max) {
    return max;
  } else {
    return x;
  }
}