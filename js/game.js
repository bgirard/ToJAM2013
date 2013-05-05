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

    var optionKeys = ['id', 'img', 'classes', 'width', 'height',
                      'x', 'y', 'width', 'height', 'type', 'update',
                      'ai', 'scaling', 'spriteFrameTime',
                      'velX', 'velY', 'rotationVel', 'rotationAccel',
                      'ttl'];

    var entityDefinition = {};
    if (options.type) {
      entityDefinition = Game.entityDefinitions[options.type];
    }

    optionKeys.forEach(function(key){
      options[key] = options[key] || entityDefinition[key];
    });

    var id = options['id'] || 'Entity' + nextEntityId++;
    var img = options['img'];
    var width = options.width || 10;
    var height = options.height || 10;
    var extraClasses = options['classes'] || [];

    var div = document.createElement('div');

    if (entityDefinition.spriteLayout && entityDefinition.spriteLayout) {
      Game.Sprite.createFromLayout(entityDefinition.spriteLayout, div);
    }
    else {
      if(img) {
        div.style.backgroundImage = "url(" + img + ")";
      }
    }

    div.options = options;
    div.classList.add('Entity');
    extraClasses.forEach(function(className) {
      div.classList.add(className);
    });
    div.id = id;
    div.width = width;
    div.height = height;

    div.style.width = width + 'px';
    div.style.height = height.toFixed(1) + 'px';

    div.hitBox = entityDefinition.hitBox || [width*.8, height*.8];

    div.x = options['x'] || 0;
    div.y = options['y'] || 0;
    div.velX = options['velX'] || 0.0;
    div.velY = options['velY'] || 0.0;
    div.velMax = 0.5;
    if (div.className.indexOf("Pirate") != -1) {
      div.velMax = 0.5/2;
    }
    div.drag = 0.000;
    div.accel = 0.01;
    div.rotation = 0;
    div.rotationVel = options['rotationVel'] || 0;
    div.rotationAccel = options['rotationAccel'] || 0.002;
    div.rotationDrag = 0.15;
    div.maxRotationVel = .2;
    div.velDamp = 0.1;
    if (div.className.indexOf("Pirate") != -1) {
      div.velDamp = 0.001;
    }
    div.rotationDamp = 0.1;
    div.scaling = options.scaling;
    div.update = options.update ? options.update.bind(div) : undefined;
    div.ai = options['ai'] ? options['ai'].bind(div) : undefined;

    // Sprite properties
    div.spriteFrameX = options.spriteFrameX;
    div.spriteFrameY = options.spriteFrameY;
    div.spriteFrameTime = options['spriteFrameTime'] || 100;
    div.frameTimeRemaining = div.spriteFrameTime;

    // Weapon properties
    div.weaponReloadTime = 0;
    div.weaponCooldown = 0;
    div.ttl = options['ttl'] || null;

    div.centerX = function() {
      return this.x;
    };

    div.centerY = function() {
      return this.y;
    };

    div.faceAngle = function (x, y) {
      return Math.atan2(y - this.y, x - this.x)/degToRad + 90;
    };

    div.distanceTo = function distanceTo(x, y) {
      return Math.sqrt((this.centerX() - x)*(this.centerX() - x) + (this.centerY() - y)*(this.centerY() - y));
    };

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
    };

    div.style.marginLeft = -div.width/2 + 'px';
    div.style.marginTop = -div.height/2 + 'px';

    if (window.location.search.indexOf('hitbox') > -1) {
      var hitBoxElement = document.createElement('div');
      hitBoxElement.className = 'hitbox';
      hitBoxElement.style.top = (div.height - div.hitBox[1])/2 + 'px';
      hitBoxElement.style.bottom = (div.height - div.hitBox[1])/2 + 'px';
      hitBoxElement.style.left = (div.width - div.hitBox[0])/2 + 'px';
      hitBoxElement.style.right = (div.width - div.hitBox[0])/2 + 'px';
      div.appendChild(hitBoxElement);
    }

    div.render = function render() {
      div.style.left = (div.x - window.Game.Camera.x()) + 'px';
      div.style.top = (div.y - window.Game.Camera.y()) + 'px';
      var transformStr = "";
      transformStr += " rotate("+div.rotation.toFixed(1)+"deg)";

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
          x: (-Math.sin(rot) * -this.height/2) + this.x,
          y: (Math.cos(rot) * -this.height/2) + this.y,
          velX: 2 * this.velMax * vDirX,
          velY: 2 * this.velMax * vDirY,
          img: "images/bullet1.png",
          width: 16,
          height: 16,
          ttl: 2000,
          update: function(dt) {
            this.ttl = Math.max(0, this.ttl - dt);
            if(!this.ttl) {
              document.kill(this);
              return;
            }
            logic.motion.call(this, dt);
          }
        }));
      }
    },
    ai: function(dt) {
      // Seek player
      var player = document.getElementById("player"); 
      if (this.distanceTo(player.centerX(), player.centerY()) < 500) {
        this.seekX = player.centerX();
        this.seekY = player.centerY();
      }

      var self = this;
      window.noCollisionDetection(this, "Bounds", function(pirate) {
        var bounds = document.getElementsByClassName("Bounds")[0];
        self.seekX = bounds.centerX();
        self.seekY = bounds.centerY();
      });

      if (this.seekX != null && this.seekY != null) {
        // Aquire player
        var changeToAngle = this.rotation - this.faceAngle(this.seekX, this.seekY);
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

        if (this.distanceTo(this.seekX, this.seekY) > 200) {
          this.thrust(this, dt, this.faceAngle(this.seekX, this.seekY), -1);
          document.title = "> 100";
        } else {
          this.thrust(this, dt, this.faceAngle(this.x, this.y), 0);
          document.title = "< 100";
        }
      } else {
        this.thrust(this, dt, this.faceAngle(this.x, this.y), 0);
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
        var cameraNewX = document.getPlayer().x - offset / 2;
        if (Game.Camera.cameraOldX != null && Math.abs(Game.Camera.cameraOldX - cameraNewX) > 50) {
          cameraNewX = Game.Camera.cameraOldX - 10 * sign(Game.Camera.cameraOldX - cameraNewX);
        }
        Game.Camera.cameraOldX = cameraNewX;
        return cameraNewX;
      },
      y: function() {
        var offset = document.getLevel().offsetHeight;
        var cameraNewY = document.getPlayer().y - offset / 2;
        if (Game.Camera.cameraOldY != null && Math.abs(Game.Camera.cameraOldY - cameraNewY) > 50) {
          cameraNewY = Game.Camera.cameraOldY - 10 * sign(Game.Camera.cameraOldY - cameraNewY);
        }
        Game.Camera.cameraOldY = cameraNewY;
        return cameraNewY;
      },
    },
    levels: {},
    logic: logic
  };

  window.Game = Game;

}());

