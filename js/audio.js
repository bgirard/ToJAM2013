(function(){

  var SoundCache = {};

  window.preloadSound = function(sfx) {
    if (SoundCache[sfx] == null) {
      SoundCache[sfx] = new Audio();
      SoundCache[sfx].autobuffer = true;
      SoundCache[sfx].preload = "auto";
      SoundCache[sfx].src = sfx;
    }
  };

  window.playSound = function(sfx) {
    window.preloadSound(sfx);
    SoundCache[sfx].play();
  };
}());

// Preload sound here if youw ant
window.preloadSound("audio/death.ogg");

