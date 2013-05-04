(function(){
  
  function Sprite (definition, element) {
    element = element || document.createElement('div');

    var animationIndex = 0;

    element.style.backgroundImage = 'url(' + Sprite.urlPrefix + definition.image + ')';
    element.style.backgroundSize = definition.width + ' ' + definition.height;
    element.classList.add('sprite');

    element.style.width = definition.width / definition.numFrames + 'px';
    element.style.height = definition.height + 'px';

    element.updateSprite = function () {
      animationIndex = (animationIndex + 1) % definition.numFrames;
      element.style.backgroundPosition = definition.width / definition.numFrames * animationIndex + ' ' + definition.height;
    };

    return element;
  }

  Sprite.urlPrefix = '';

  Game.Sprite = Sprite;

  Game.spriteDefinitions = {
    'missile': {
      image: 'images/explosions/missleHit.png',
      numFrames: 8,
      width: 304,
      height: 44
    },
    'laser': {
      image: 'images/explosions/laserHit.png',
      numFrames: 5,
      width: 110,
      height: 27
    },
    'explosion': {
      image: 'images/explosions/explosion.png',
      numFrames: 13,
      width: 1664,
      height: 128
    }
  };

}());