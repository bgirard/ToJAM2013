(function(){
  var degToRad = 0.0174532925;

  function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
  }
  window.clamp = clamp;

  function sign(number) {
    if(0 === number) return 0;
    return (number/Math.abs(number) > 0) ? 1 : -1;
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

  function setTransform(element, transform) {
    element.style.transform = transform;
    element.style.webkitTransform = transform;
    element.style.mozTransform = transform;
    element.style.msTransform = transform;
    element.style.oTransform = transform;
  }
  window.setTransform = setTransform;

  var nextEntityId = 0;
  function Entity(options) {
    options = options || {};

    var entityDefinition = {};
    if (options.type) {
      entityDefinition = Game.entityDefinitions[options.type];
    }

    var id = options['id'] || 'Entity' + nextEntityId++;
    var img = options['img'];
    var width = entityDefinition.width || options['width'] || 10;
    var height = entityDefinition.height || options['height'] || 10;
    var extraClasses = options['classes'] || [];

    var div;

    if (entityDefinition.spriteLayout && entityDefinition.spriteLayout.root) {
      console.log(entityDefinition.spriteLayout.root, Game.Sprite);
    }

    div = div || document.createElement('div');

    div.options = options;
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
      //div.style.backgroundColor = "red";
    }
    div.style.width = width + 'px';
    div.style.height = height + 'px';

    div.x = options['x'] || 0;
    div.y = options['y'] || 0;
    div.velX = options['velX'] || 0.0;
    div.velY = options['velY'] || 0.0;
    div.velMax = 0.5;
    div.drag = 0.000;
    div.accel = 0.01;
    div.rotation = 0;
    div.rotationVel = options['rotationVel'] || 0;
    div.rotationAccel = options['rotationAccel'] || 0.002;
    div.rotationDrag = 0.15;
    div.maxRotationVel = .2;
    div.velDamp = 0.1;
    div.rotationDamp = 0.1;
    div.scaling = options['scaling'];
    div.update = options['update'] ? options['update'].bind(div) : undefined;
    div.ai = options['ai'] ? options['ai'].bind(div) : undefined;

    // Sprite properties
    div.spriteFrameX = options.spriteFrameX;
    div.spriteFrameY = options.spriteFrameY;
    div.spriteFrameTime = options['spriteFrameTime'] || 100;
    div.frameTimeRemaining = div.spriteFrameTime;

    // Weapon properties
    div.weaponReloadTime = 1000;
    div.weaponCooldown = 0;

    div.centerX = function() {
      return this.x+this.width/2;
    }

    div.centerY = function() {
      return this.y+this.height/2;
    }

    div.faceAngle = function (player) {
      return Math.atan2(player.y - this.y, player.x - this.x)/degToRad + 90;
    }

    div.distanceTo = function distanceTo(player) {
      return Math.sqrt((this.centerX() - player.centerX())*(this.centerX() - player.centerX()) + (this.centerY() - player.centerY())*(this.centerY() - player.centerY()));
    }

    div.thrust = function thrust(div, dt, dirAngle, thrustDirSign) {
      // Thrust
      var newVelX = div.velX;
      var newVelY = div.velY;

      if (thrustDirSign) {
        newVelX = div.velX + thrustDirSign * dt * div.accel * -Math.sin(dirAngle * degToRad);
        newVelY = div.velY + thrustDirSign * dt * div.accel * Math.cos(dirAngle * degToRad);
      }

      // Clamping & Damping
      var velMag = Math.sqrt(newVelX*newVelX + newVelY*newVelY);

      if (velMag != 0) {
        var dampVelX = window.clamp(velMag * Math.pow(div.velDamp, dt/1000), -div.velMax, div.velMax) * (newVelX/velMag);
        var dampVelY = window.clamp(velMag * Math.pow(div.velDamp, dt/1000), -div.velMax, div.velMax) * (newVelY/velMag);

        div.velX = dampVelX;
        div.velY = dampVelY;
      }
    }

    div.render = function render() {
      div.style.marginLeft = -div.clientHeight/2 + 'px';
      div.style.marginTop = -div.clientTop/2 + 'px';
      div.style.left = (div.x - window.Game.Camera.x()) + 'px';
      div.style.top = (div.y - window.Game.Camera.y()) + 'px';
      var transformStr = "";
      transformStr += " rotate("+div.rotation+"deg)";

      if (div.spriteFrameX != null || div.spriteFrameY != null) {
        var frameX = div.spriteFrameX || 0;
        var frameY = div.spriteFrameY || 0;
        div.style.backgroundPosition = div.width * frameX + "px " + div.height * frameY + "px";
      }

      if (div.scaling != null) {
        transformStr += " scale("+div.scaling+","+div.scaling+")";
      }
      if (transformStr != "") {
        setTransform(div, transformStr);
      }
    };

    if (options.create) {
      options.create.call(div);
    }

    return div;
  };

  var tmp = 0;

  var logic = {
    motion: function(dt) {
      if(this.velX > 0) {
        this.velX = Math.max(0, this.velX - Math.max(0, dt * this.drag * Math.sin(this.rotation * degToRad)));
      } else {
        this.velX = Math.min(0, this.velX + Math.max(0, dt * this.drag * -Math.sin(this.rotation * degToRad)));
      }

      if(this.velY > 0) {
        this.velY = Math.max(0, this.velY - Math.max(0, dt * this.drag * -Math.cos(this.rotation * degToRad)));
      } else {
        this.velY = Math.min(0, this.velY + Math.max(0, dt * this.drag * Math.cos(this.rotation * degToRad)));
      }

      this.x += dt * this.velX;
      this.y += dt * this.velY;

      this.frameTimeRemaining -= dt;
      this.rotation = (this.rotation + this.rotationVel * dt) % 360;

      if (this.frameTimeRemaining < 0) {
        if (this.spriteFrameX != null) {
          this.spriteFrameX = (this.spriteFrameX + 1) % this.options.spriteMaxFrameX;
        }
        if (this.spriteFrameY != null) {
          this.spriteFrameY = (this.spriteFrameY + 1) % this.options.spriteMaxFrameY;
        }
        this.frameTimeRemaining = this.spriteFrameTime;
      }
    },
    weapon: function(dt) {
      this.weaponCooldown = Math.max(0, this.weaponCooldown - dt);
      if(Game.playerKeyStates.fire && !this.weaponCooldown) {
        this.weaponCooldown = this.weaponReloadTime;
        var rot = degToRad * this.rotation;
        var vMag = Math.sqrt(this.velX*this.velX + this.velY*this.velY);
        var vDirX = Math.sin(rot);
        var vDirY = -Math.cos(rot);
        document.spawn(new Game.Entity({
          classes: ['Bullet'],
          x: (-Math.sin(rot) * this.height/2) + this.x,
          y: (Math.cos(rot) * this.height/2) + this.y,
          velX: 2 * this.velMax * vDirX,
          velY: 2 * this.velMax * vDirY,
          img: "images/bullet1.png",
          width: 16,
          height: 16,
          update: function(dt) {
            logic.motion.call(this, dt);
          }
        }));
      }
    },
    ai: function(dt) {
      // Seek player
      var player = document.getElementById("player"); 
      if (this.distanceTo(player) < 500) {
        // Aquire player
        var changeToAngle = this.rotation - this.faceAngle(player);
        if (changeToAngle > 180) {
          changeToAngle = 360 - changeToAngle;
        }
        if (changeToAngle < -180) {
          changeToAngle = changeToAngle + 360;
        }
        if (Math.abs(changeToAngle) > 0.1 * dt) {
          changeToAngle = sign(changeToAngle) * 0.1 * dt;
        }
        this.rotation -= changeToAngle % 360;

        if (this.distanceTo(player) > 100) {
          this.thrust(this, dt/10, this.faceAngle(player), -1);
        }
      }
    },
    default: function(dt) {
      logic.motion.call(this, dt);
    },
    player: function(dt) {
      logic.motion.call(this, dt);
      logic.weapon.call(this, dt);
    }
  };

  var Game = {
    Entity: Entity,
    Camera: {
      // Fix to the player
      x: function() {
        var offset = document.getLevel().offsetWidth;
        return document.getPlayer().x - offset / 2;
      },
      y: function() {
        var offset = document.getLevel().offsetHeight;
        return document.getPlayer().y - offset / 2;
      },
    },
    levels: {},
    logic: logic
  };

  window.Game = Game;

}());

