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
    createLoop: function (name) {
      var original = soundCache[name];

      var stopFlag = false;
      var currentClone;
      var clone1, clone2;

      function loop () {
        if (!stopFlag) {
          if (currentClone) {
            if (currentClone.currentTime > currentClone.duration - .1) {
              currentClone.pause();
              currentClone = currentClone === clone1 ? clone2 : clone1;
              currentClone.currentTime = 0;
              currentClone.play();
            }
          }
          window.requestAnimFrame(loop);
        }
      }

      if (original) {
        clone1 = original.cloneNode(true);
        clone2 = original.cloneNode(true);
        currentClone = clone1;
      }

      return {
        play: function() {
          if (currentClone) {
            currentClone.play();
            stopFlag = false;
            window.requestAnimFrame(loop);
          }
        },
        pause: function() {
          if (currentClone) {
            stopFlag = true;
            clone1.pause();
            clone2.pause();
          }
        }
      };
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

