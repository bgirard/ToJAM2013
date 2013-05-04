(function(){
  /**
   * @param {Object} obj The Object to iterate through.
   * @param {function(*, string)} iterator The function to call for each
   * property.
   */
  function forEach(obj, iterator) {
    var prop;
    for (prop in obj) {
      if (obj.hasOwnProperty([prop])) {
        iterator(obj[prop], prop);
      }
    }
  };

  /**
   * Create a transposed copy of an Object.
   *
   * @param {Object} obj
   * @return {Object}
   */
  function getTranspose(obj) {
    var transpose = {};

    forEach(obj, function (val, key) {
      transpose[val] = key;
    });

    return transpose;
  };

  var KEY_MAP = {
     'A': 65
    ,'B': 66
    ,'C': 67
    ,'D': 68
    ,'E': 69
    ,'F': 70
    ,'G': 71
    ,'H': 72
    ,'I': 73
    ,'J': 74
    ,'K': 75
    ,'L': 76
    ,'M': 77
    ,'N': 78
    ,'O': 79
    ,'P': 80
    ,'Q': 81
    ,'R': 82
    ,'S': 83
    ,'T': 84
    ,'U': 85
    ,'V': 86
    ,'W': 87
    ,'X': 88
    ,'Y': 89
    ,'Z': 90
    ,'ESC': 27
    ,'SPACE': 32
    ,'LEFT': 37
    ,'UP': 38
    ,'RIGHT': 39
    ,'DOWN': 40
  };

  /**
   * The transposed version of KEY_MAP.
   *
   * @type {Object.<string>}
   */
  var TRANSPOSED_KEY_MAP = getTranspose(KEY_MAP);

  var playerKeyMap = {
    'A': 'left',
    'D': 'right',
    'W': 'up',
    'S': 'down',
    'SPACE': 'fire',
    'P': 'power',
    'T': 'shield',
    'M': 'missile',
    'L': 'laser'
  };
  var playerKeyStates = {};
  Object.keys(playerKeyMap).forEach(function(key) {
    var action = playerKeyMap[key];
    playerKeyStates[action] = false;
  });

  Game.playerKeyMap = playerKeyMap;
  Game.playerKeyStates = playerKeyStates;

  function nullFunction () {}

  function handleKeyEvent(state, callback, evt) {
    var i;
    var key = TRANSPOSED_KEY_MAP[evt.keyCode];
    if(!key) return;
    callback = callback || nullFunction;

    evt.preventDefault();
    if(playerKeyMap.hasOwnProperty(key)) {
      var action = playerKeyMap[key];
      playerKeyStates[action] = state;
      callback(action, state);
    }
  };

  /**
   * Run collision detection between two CSS classes such as 'entity', 'mines',
   * invoking the callback with each collision
   */
  function collisionDetection(classOne, classTwo, callback) {
    var level = document.getLevel();
    var entities1 = level.getElementsByClassName(classOne);
    var entities2 = level.getElementsByClassName(classTwo);
    for(var i = 0; i < entities1.length; ++i) {
      var entity1 = entities1[i];
      for(var j = 0; j < entities2.length; ++j) {
        var entity2 = entities2[i];
        if (entity1.x < entity2.x + entity2.width &&
            entity2.x < entity1.x + entity1.width &&
            entity1.y < entity2.y + entity2.height &&
            entity2.y < entity1.y + entity1.height) {

            callback(entity1, entity2);

        }
      }
    }
  }

  function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
  }

  document.setLevel = function setLevel(level) {
    var currentLevel = document.getLevel();
    if(currentLevel)
      currentLevel.parentNode.removeChild(currentLevel);
    document.getElementById('gameboard').appendChild(level);
    document.title = "current level: " + level.id;
  };

  document.getLevel = function getLevel() {
    return document.getElementsByClassName('Level')[0];
  };

  document.getPlayer = function getPlayer() {
    return document.getElementById('player');
  };

  document.spawn = function spawn(entity) {
    document.getLevel().appendChild(entity);
  };

  window.onload = function (e) {
    console.log('game start!');

    var bossOs = new BossOs({
      hudContainer: document.querySelector('#hud'),
      playerKeyMap: playerKeyMap,
      playerKeyStates: playerKeyStates
    });

    document.addEventListener('keydown', handleKeyEvent.bind(undefined, true, bossOs.playerKeyStateChange));
    document.addEventListener('keyup', handleKeyEvent.bind(undefined, false, bossOs.playerKeyStateChange));

    document.setLevel(Game.levels['level1']());

    var frame = 0;
    var cachedTime = Date.now();
    var changeLevelOnNextFrame = null;
    function main() {
      window.requestAnimFrame(main);

      if (changeLevelOnNextFrame) {
        document.setLevel(changeLevelOnNextFrame);
        changeLevelOnNextFrame = null;
      }
      var t = Date.now();
      var dt = t - cachedTime;
      var i;
      var l;

      var level = document.getElementsByClassName('Level')[0];
      var playerEntity = level.getElementsByClassName('Player')[0];
      if(playerEntity) {
        //playerEntity.velX += (playerKeyStates.left ? dt * -playerEntity.accel : 0.0) + (playerKeyStates.right ? dt * playerEntity.accel : 0.0);
        //playerEntity.velY += (playerKeyStates.up ? dt * -playerEntity.accel : 0.0) + (playerKeyStates.down ? dt * playerEntity.accel : 0.0);
        var deltaV = 0;
        var deltaR = 0;
        if (playerKeyStates.up) {
          deltaV += -playerEntity.accel;
        }

        if (playerKeyStates.down) {
          deltaV += playerEntity.accel;
        }
        // We don't want rotation innertia so apply the accel directly to the rotation
        if (playerKeyStates.left) {
          playerEntity.rotationVel = Math.max(-playerEntity.maxRotationVel, playerEntity.rotationVel - playerEntity.rotationAccel * dt);
          // deltaR += -playerEntity.rotationAccel;
        }
        if (playerKeyStates.right) {
          playerEntity.rotationVel = Math.min(playerEntity.maxRotationVel, playerEntity.rotationVel + playerEntity.rotationAccel * dt);
          // deltaR += playerEntity.rotationAccel;
        }
        var degToRad = 0.0174532925;
        if (deltaV != 0) {
          playerEntity.velX += dt * deltaV * -Math.sin(playerEntity.rotation * degToRad);
          playerEntity.velY += dt * deltaV * Math.cos(playerEntity.rotation * degToRad);
        }
        if (deltaR != 0) {
          playerEntity.rotation += playerEntity.rotationVel;
        }

        playerEntity.rotationVel -= playerEntity.rotationVel * playerEntity.rotationDrag;
      }

      // Update entities
      var entities = level.getElementsByClassName('Entity');

      for(i = 0, l = entities.length; i < l; ++ i) {
        var entity = entities[i];
        if('function' === typeof entity.ai)
          entity.ai(dt);
      }

      for(i = 0, l = entities.length; i < l; ++ i) {
        var entity = entities[i];
        if('function' === typeof entity.update)
          entity.update(dt);
      }

      // Collisions
      collisionDetection("Player", "Wormhole", function() {
        var nextLevel = document.getLevel().nextId;
        changeLevelOnNextFrame = Game.levels[nextLevel]();
      });
      var hasCol = false;
      collisionDetection("Player", "Bounds", function() {
        hasCol = true;
      });
      if (!hasCol) {
        var bounds = document.getElementsByClassName("Bounds")[0];
        // Outside the level
        if (playerEntity.x < bounds.x) {
          playerEntity.x += bounds.width;
        }
        if (playerEntity.y < bounds.y) {
          playerEntity.y += bounds.height;
        }
        if (playerEntity.x > bounds.x + bounds.width) {
          playerEntity.x -= bounds.width;
        }
        if (playerEntity.y > bounds.y + bounds.height) {
          playerEntity.y -= bounds.height;
        }
      }

      bossOs.update(playerEntity);

      // Flush render state to DOM
      for(i = 0, l = entities.length; i < l; ++ i) {
        entities[i].render();
      }

      var x = -5000 + (-window.Game.Camera.x()/5);
      var y = -5000 + (-window.Game.Camera.y()/5);
      window.setTransform(document.getElementById("bg2"), "translate(" + x + "px," + y + "px)");
      var x = -5000 + (-window.Game.Camera.x()/10);
      var y = -5000 + (-window.Game.Camera.y()/10);
      window.setTransform(document.getElementById("bg3"), "translate(" + x + "px," + y + "px)");

      cachedTime = t;
    };
    window.requestAnimFrame(main);
  };

}());

