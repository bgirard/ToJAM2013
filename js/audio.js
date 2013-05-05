(function(){

  var SoundCache = {};

  window.preloadSound = function(sfx) {
    if (SoundCache[sfx] == null) {
      SoundCache[sfx] = document.createElement('audio');
      SoundCache[sfx].autobuffer = true;
      SoundCache[sfx].preload = "auto";
      SoundCache[sfx].src = sfx;
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
  //window.preloadSound('audio/07 Seven.mp3');
  window.preloadSound('audio/laserHit.wav');
  window.preloadSound('audio/explosion.wav');
  window.preloadSound("audio/death.ogg");
}

