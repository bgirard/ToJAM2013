(function(){
  
  var FRAME_DURATION = 40;

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

    var rewound = false;

    var indexFunctions = {
      lock: function(dt) {
        if (animationIndex === definition.lock[1]) {
          animationIndex = definition.lock[0];
        }
        else {
          animationIndex++;
        }
      },
      normal: function(dt) {
        if (rewound) {
          spriteElement.style.visibility = 'visible';
          rewound = false;
        }
        
        animationIndex++;

        if (definition.lock && animationIndex > definition.lock[0]) {
          indexFunction = indexFunctions.lock;
        }
        else if (animationIndex === definition.numFrames) {
          if (definition.loop !== false) {
            animationIndex = 0;
          }
          else {
            animationIndex--;
          }
        }
      },
      reverseToStart: function(dt) {
        animationIndex--;
        if (animationIndex === -1 && rewound === false) {
          rewound = true;
          if (definition.hideWhenRewound) {
            spriteElement.style.visibility = 'hidden';
          }
        }
        animationIndex = Math.max(0, animationIndex);
      }
    };

    var indexFunction = indexFunctions.normal;

    element.resetSprite = function() {
      animationIndex = 0;
      indexFunction = indexFunctions.normal;
    };

    var frameTime = 0;
    element.updateSprite = function (dt) {
      frameTime += dt;
      while (frameTime > FRAME_DURATION) {
        indexFunction(dt);
        frameTime = Math.max(0, frameTime - FRAME_DURATION);
      }
      spriteElement.style.backgroundPosition = definition.width - (definition.width / definition.numFrames * animationIndex) + 'px 0';
    };

    element.reverseSpriteToStart = function () {
      indexFunction = indexFunctions.reverseToStart;
    };

    element.continueSprite = function () {
      indexFunction = indexFunctions.normal;
    };

    element.isRewound = function () {
      return rewound;
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
        element.childSprites[name] = childElement;
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
      lock: [4, 5],
      hideWhenRewound: true
    },
    'missile': {
      image: 'images/explosions/missileHit.png',
      numFrames: 8,
      width: 304,
      height: 44
    },
    'spaceBuoy': {
      image: 'images/environment/spaceBuoy.png',
      numFrames: 15,
      width: 1290,
      height: 84
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
      height: 128,
      loop: false
    },
    'laserHit': {
      image: 'images/explosions/laserHit.png',
      numFrames: 5,
      width: 110,
      height: 27,
      loop: false
    },
    'ship': {
      image: 'images/ships/ship.png',
      numFrames: 1,
      width: 70,
      height: 60
    },
    'wormhole': {
      image: 'images/wormhole.png',
      numFrames: 7,
      width: 1960,
      height: 280
    }
  };

}());
