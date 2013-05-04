(function(){

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

    var div = document.createElement('div');
    div.classList.add('Entity');
    div.id = id;
    if(img) {
      div.style.backgroundImage = "url(" + img + ")";
    } else {
      div.style.backgroundColor = "red";
    }
    div.style.width = width + 'px';
    div.style.height = height + 'px';

    div.x = 0;
    div.y = 0;
    div.velX = 0;
    div.velY = 0;
    div.rotation = 0;

    div.update = function update(dt) {
      div.x += dt * div.velX;
      div.y += dt * div.velY;
      div.rotation += 6;
    };

    div.render = function render() {
      div.style.left = (div.x - window.Game.Camera.x()) + 'px';
      div.style.top = (div.y - window.Game.Camera.y()) + 'px';
      div.style.transform="rotate("+div.rotation+"deg)"
    };

    return div;
  };

  var tmp = 0;

  var Game = {
    Entity: Entity,
    Camera: {
      // Fix to the player
      x: function() {
        return tmp-=0.1;
      },
      y: function() {
        return tmp-=0.1;
      },
    }
  };

  window.Game = Game;

}());

