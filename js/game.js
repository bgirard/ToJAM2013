(function(){

  function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
  }

  function extend(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  var nextEntityId = 0;
  function Entity(options) {
    options = options || {};

    var id = options['id'] || 'Entity' + nextEntityId++;
    var img = options['img'];
    var width = options['width'] || 10;
    var height = options['height'] || 10;
    var extraClasses = options['classes'] || [];

    var div = document.createElement('div');
    div.classList.add('Entity');
    extraClasses.forEach(function(className) {
      div.classList.add(className);
    });
    div.id = id;
    div.width = width;
    div.height = height;
    if(img) {
      div.style.backgroundImage = "url(" + img + ")";
    } else {
      div.style.backgroundColor = "red";
    }
    div.style.width = width + 'px';
    div.style.height = height + 'px';

    div.x = options['x'] || 0;
    div.y = options['y'] || 0;
    div.velX = 0.0;
    div.velY = 0.0;
    div.maxVel = 0.1;
    div.rotation = 0;

    // Sprite properties
    div.spriteFrameX = options.spriteFrameX;
    div.spriteFrameY = options.spriteFrameY;
    div.spriteFrameTime = options['spriteFrameTime'] || 100;
    div.frameTimeRemaining = div.spriteFrameTime;

    div.update = function update(dt) {
      div.velX = clamp(div.velX, -div.maxVel, div.maxVel);
      div.velY = clamp(div.velY, -div.maxVel, div.maxVel);
      div.x += dt * div.velX;
      div.y += dt * div.velY;
      div.frameTimeRemaining -= dt;

      if (div.frameTimeRemaining < 0) {
        if (div.spriteFrameX != null) {
          div.spriteFrameX = (div.spriteFrameX + 1) % options.spriteMaxFrameX;
        }
        if (div.spriteFrameY != null) {
          div.spriteFrameY = (div.spriteFrameY + 1) % options.spriteMaxFrameY;
        }
        div.frameTimeRemaining = div.spriteFrameTime;
      }
    };

    div.render = function render() {
      div.style.left = (div.x - window.Game.Camera.x()) + 'px';
      div.style.top = (div.y - window.Game.Camera.y()) + 'px';
      div.style.transform="rotate("+div.rotation+"deg)"

      if (div.spriteFrameX != null || div.spriteFrameY != null) {
        var frameX = div.spriteFrameX || 0;
        var frameY = div.spriteFrameY || 0;
        div.style.backgroundPosition = div.width * frameX + "px " + div.height * frameY + "px";
      }
    };

    return div;
  };

  var tmp = 0;

  var Game = {
    Entity: Entity,
    Camera: {
      // Fix to the player
      x: function() {
        return 0;
      },
      y: function() {
        return 0;
      },
    }
  };

  window.Game = Game;

}());

