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
      writeTransition(item, 'right ' + duration/1000 + 's');
      setTimeout(function(){
        item.style.right = item.getAttribute('data-ro');
      }, 0);
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