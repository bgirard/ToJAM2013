(function(){

  var SoundCache = {};

  window.preloadSound = function(sfx, name) {
    name = name || sfx;
    if (SoundCache[name] == null) {
      SoundCache[name] = document.createElement('audio');
      SoundCache[name].autobuffer = true;
      SoundCache[name].preload = "auto";
      SoundCache[name].src = sfx;
    }
  };

  window.playSound = function(sfx) {
    var original = SoundCache[sfx];
    if (original) {
      var clone = original.cloneNode(true);
      clone.play();
      return clone;
    }
  };
}());

// Preload sound here if you want

if (window.location.search.indexOf('nosound') === -1) {
  if (window.location.search.indexOf('nomusic') === -1) {
    window.preloadSound('audio/07 Seven.ogg', 'level1-sound');
  }
  window.preloadSound('audio/wormhole.wav');
  window.preloadSound('audio/laser.wav');
  window.preloadSound('audio/laserHit.wav');
  window.preloadSound('audio/explosion.wav');
  window.preloadSound("audio/death.ogg");
}

