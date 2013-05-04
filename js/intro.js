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

  function nextScene () {
    currentScene = scenes[scenes.indexOf(currentScene) + 1];

    if (currentScene) {
      console.log('starting scene', scenes.indexOf(currentScene));

      var duration = currentScene.getAttribute('data-duration') * 1000;

      currentScene.classList.add('on');

      setTimeout(function(){
        exitCurrentScene();
      }, duration);      
    }

  }

  if (audio.readyState === 0) {
    audio.play();
    nextScene();
  }
  else {
    audio.addEventListener('canplay', start, false);  
  }

}());