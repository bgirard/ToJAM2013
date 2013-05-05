(function(){
  
  var TIME_BETWEEN_SCENES = 1000;

  var audio = document.querySelector('audio');

  var scenes = Array.prototype.slice.call(document.querySelectorAll('section'));
  var currentScene;

  function exitCurrentScene () {
    currentScene.classList.remove('on');
    setTimeout(function(){
      nextScene();
    }, TIME_BETWEEN_SCENES);
  }

  function writeTransition (element, transition) {
    element.style.webkitTransition = transition;
    element.style.WebkitTransition = transition;
    element.style.mozTransition = transition;
    element.style.MozTransition = transition;
    element.style.transition = transition;
  }

  function setupCurrentScene (duration) {
    var ins = currentScene.querySelectorAll('[data-in]');
    var outs = currentScene.querySelectorAll('[data-out]');

    var parallax = currentScene.querySelectorAll('.parallax');

    Array.prototype.forEach.call(ins, function (item) {
      setTimeout(function(){
        item.classList.add('on');
      }, item.getAttribute('data-in') * 1000);
    });

    Array.prototype.forEach.call(outs, function (item) {
      setTimeout(function(){
        item.classList.remove('on');
      }, item.getAttribute('data-out') * 1000);
    });

    Array.prototype.forEach.call(parallax, function (item) {
      var transitions = item.getAttribute('data-transitions');
      var durations = item.getAttribute('data-durations');

      if (transitions) {
        transitions = transitions.split(';');
        if (durations) {
          durations = durations.split(';');
        }
        else {
          durations = [];
        }

        var transitionStrings = [];

        transitions.forEach(function(t, i){
          var itemDuration = durations[i] || duration/1000;
          var pieces = t.split(':');
          transitionStrings.push(pieces[0] + ' ' + itemDuration + 's linear');
          setTimeout(function(){
            if (pieces[0][0] === ' ') {
              pieces[0] = pieces[0].substr(1);
            }
            item.style[pieces[0]] = pieces[1];
          }, 0);
        });

        writeTransition(item, transitionStrings.join(','));
      }
    });

    currentScene.classList.add('on');
  }

  function nextScene () {
    currentScene = scenes[scenes.indexOf(currentScene) + 1];

    if (currentScene) {
      console.log('starting scene', scenes.indexOf(currentScene));

      var duration = currentScene.getAttribute('data-duration') * 1000;

      setupCurrentScene(duration);

      setTimeout(function(){
        exitCurrentScene();
      }, duration);      
    }

  }

  function start () {
    audio.play();
    nextScene();    
  }

  if (audio.readyState > 0) {
    start();
  }
  else {
    audio.addEventListener('canplay', start, false);  
  }

}());