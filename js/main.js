(function(){

  /**
   * Run collision detection between two CSS classes such as 'entity', 'mines', 
   * invoking the callback with each collision
   */
  function collisionDetection(classOne, classTwo, callback) {
    var level = document.getElementById("level");
    var entities1 = level.getElementsByClassName(classOne);
    var entities2 = level.getElementsByClassName(classTwo);
    for(var i = 0; i < entities1.length; ++i) {
      var entity1 = entities1[i];
      for(var j = 0; j < entities2.length; ++j) {
        var entity2 = entities2[i];
        if (entity1.x < entity2.x + entity2.width &&
            entity2.x < entity1.x + entity1.width &&
            entity1.y < entity2.y + entity2.height &&
            entity2.y < entity1.y + entity2.height) {
        
            callback(entity1, entity2);

        }
      }
    }
  }

  window.onload = function (e) {
    console.log('game start!');

    var level = document.getElementById("level");

    var entity = new Game.Entity();
    level.appendChild(entity);

    var frame = 0;
    var cachedTime = Date.now();
    function main() {
      window.requestAnimationFrame(main);
      var t = Date.now();
      var dt = t - cachedTime;
      var i;
      var l;

      var entities = level.getElementsByClassName('Entity');
      for(i = 0, l = entities.length; i < l; ++ i) {
        entities[i].update(dt);
      }
      for(i = 0, l = entities.length; i < l; ++ i) {
        entities[i].render();
      }

      cachedTime = t;
    };
    window.requestAnimationFrame(main);
  };

}());

