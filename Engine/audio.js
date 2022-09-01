function a_playPlainSound(path, volume, pitch, loop) {
  let _snd = new Audio(path);
  if(loop != undefined) _snd.loop = loop;
  if(volume != undefined) _snd.volume = volume;
  if(pitch != undefined) _snd.volume = volume;
  _snd.play();
}

class AdvancedSound {
  constructor(path, position, power, pitch, loop) {
    this.path = path;
    this.position = position;
    this.power = power;
    this.pitch = pitch;
    this.loop = loop;
    this.plays;
    this.sound;
  }
  start() {
    this.sound = new Audio(this.path);
    this.sound.loop = this.loop;
    this.sound.play();
  }
  updateVolume(listenerPos) {
    if(v_distance(listenerPos, this.position) <= 200*this.power) {
      this.sound.volume = 1 - (v_distance(listenerPos, this.position)/200*this.power)
    } else {
      this.sound.volume = 0;
    }
  }
}
var a_advancedSoundsArray = [];

function a_playAdvancedSound(path, power, pitch, position, loop, listenerPos) {
  //plays sound with volume based on position and listener position (both vectors)

  //lookup whether the sound is already saved
  let _exists = false;
  let _index = -1;
  //console.log('fetching sound')
  a_advancedSoundsArray.forEach((adv_sound, i) => {
    if(adv_sound.path = path) {
      _exists = true;
      _index = i;
    }
  });


  if(_exists) {
    //console.log('sound exists!')
    //if sound already exists

    //ovveride data
    a_advancedSoundsArray[_index].power = power;
    a_advancedSoundsArray[_index].pitch = pitch;
    a_advancedSoundsArray[_index].position = position;

    //start sound if is not playing
    if(!a_advancedSoundsArray[_index].plays) {
      //console.log('starting sound')
      a_advancedSoundsArray[_index].plays = true;
      a_advancedSoundsArray[_index].start();

    } else {
      //update volume on position;
      a_advancedSoundsArray[_index].updateVolume(listenerPos);
      //console.log('updating position')
    }


  } else if(!_exists) {
    console.log("sound doesn't exist!")
    //if sound doesn't exist
    console.log('creating sound')
    let _add_i = a_advancedSoundsArray.length;
    a_advancedSoundsArray.push(new AdvancedSound(path, position, power, pitch, loop));
  }

}
