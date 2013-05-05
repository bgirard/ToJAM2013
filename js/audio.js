(function(){

  var soundCache = {};

  window.Sound = {
    play: function (name) {
      var original = soundCache[name];
      if (original) {
        var clone = original.cloneNode(true);
        clone.play();
        return clone;
      }      
    },
    loadAudioNodes: function (progressCallback, loadedCallback) {
      Sound.gatherAudioNodes();

      var keys = Object.keys(soundCache);

      function check () {
        var loaded = 0;

        keys.forEach(function(name){
          if (soundCache[name].readyState > 2) {
            loaded++;
          }
        });

        if (loaded < keys.length) {
          progressCallback(loaded / keys.length);
          setTimeout(check, 20);
        }
        else {
          loadedCallback();
        }
      }

      check();
    },
    gatherAudioNodes: function () {
      if (window.location.search.indexOf('nosound') > -1) {
        return;
      }

      var audioNodes = document.querySelectorAll('audio');

      Array.prototype.forEach.call(audioNodes, function(node){
        var name = node.getAttribute('data-name');
        var type = node.getAttribute('data-type') || 'sound';

        if (window.location.search.indexOf('nomusic') > -1 && type === 'music') {
          return;
        }

        soundCache[name] = node;
        node.load();
      });
    }
  };

}());

