(function(){
  
  var scenes = Array.prototype.slice.call(document.querySelectorAll('section'));
  var currentScene;

  function exitCurrentScene () {
    nextScene();
  }

  function nextScene () {
    currentScene = scenes[scenes.indexOf(currentScene) + 1];

    if (currentScene) {
      console.log('starting scene', scenes.indexOf(currentScene));

      var duration = currentScene.getAttribute('data-duration') * 1000;

      setTimeout(function(){
        exitCurrentScene();
      }, duration);      
    }

  }

  nextScene();

}());