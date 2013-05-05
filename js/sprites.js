(function(){
  
  function Sprite (definition, element) {
    element = element || document.createElement('div');

    var spriteElement = document.createElement('div');

    var animationIndex = 0;

    element.appendChild(spriteElement);

    spriteElement.style.backgroundImage = 'url(' + Sprite.urlPrefix + definition.image + ')';
    spriteElement.style.backgroundSize = definition.width + ' ' + definition.height;
    spriteElement.style.backgroundPosition = '0 0';
    spriteElement.style.position = 'absolute';
    spriteElement.style.width = '100%';
    spriteElement.style.height = '100%';
    spriteElement.style.zIndex = 5;

    element.classList.add('sprite');

    element.style.width = definition.width / definition.numFrames + 'px';
    element.style.height = definition.height + 'px';

    var indexFunctions = {
      lock: function() {
        if (animationIndex === definition.lock[1]) {
          animationIndex = definition.lock[0];
        }
        else {
          animationIndex++;
        }
      },
      normal: function() {
        animationIndex = (animationIndex + 1) % definition.numFrames;
        if (definition.lock && animationIndex > definition.lock[0]) {
          indexFunction = indexFunctions.lock;
        }
      },
      reverseToStart: function() {
        animationIndex = Math.max(0, animationIndex - 1);
      }
    };

    var indexFunction = indexFunctions.normal;

    element.resetSprite = function() {
      animationIndex = 0;
      indexFunction = indexFunctions.normal;
    };

    element.updateSprite = function () {
      indexFunction();
      spriteElement.style.backgroundPosition = definition.width - (definition.width / definition.numFrames * animationIndex) + 'px 0';
    };

    element.reverseSpriteToStart = function () {
      indexFunction = indexFunctions.reverseToStart;
    };

    element.continueSprite = function () {
      indexFunction = indexFunctions.normal;
    };

    return element;
  }

  Sprite.createFromLayout = function (layout, element) {
    element = element || document.createElement('div');
    element.childSprites = element.childSprites || {};
    Sprite(Game.spriteDefinitions[layout.definition], element);
    if (layout.children) {
      Object.keys(layout.children).forEach(function(name){
        var childLayout = layout.children[name];
        var childDefinition = Game.spriteDefinitions[childLayout.definition];
        var childElement = Sprite(childDefinition);
        element.appendChild(childElement);
        childElement.style.position = 'absolute';
        childElement.style.left = childLayout.position[0] + 'px';
        childElement.style.top = childLayout.position[1] + 'px';
        childElement.style.zIndex = 3;
      });
    }
  };

  Sprite.urlPrefix = '';

  Game.Sprite = Sprite;

  Game.spriteDefinitions = {
    'fireBigBlue': {
      image: 'images/ships/thrusterFire/fireBigBlue.png',
      numFrames: 6,
      width: 240,
      height: 88,
      lock: [4, 5]
    },
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
    },
    'ship': {
      image: 'images/ships/ship.png',
      numFrames: 1,
      width: 70,
      height: 60      
    }
  };

}());