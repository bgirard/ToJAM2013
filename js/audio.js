(function(){

  var SoundCache = {};

  window.preloadSound = function(sfx) {
    if (SoundCache[sfx] == null) {
      SoundCache[sfx] = document.createElement('audio');
      document.body.appendChild(SoundCache[sfx]);
      SoundCache[sfx].autobuffer = true;
      SoundCache[sfx].preload = "auto";
      SoundCache[sfx].src = sfx;
    }
  };

  window.playSound = function(sfx) {
    window.preloadSound(sfx);
    var clone = SoundCache[sfx].cloneNode(true);
    clone.play();
    document.body.appendChild(clone);
    clone.onended = function () {
      document.body.removeChild(clone);
      console.log(1);
    };
    return clone;
  };
}());

// Preload sound here if youw ant
window.preloadSound("audio/death.ogg");

