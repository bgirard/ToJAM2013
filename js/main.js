(function(){

  window.onload = function (e) {
    console.log('game start!');

    var entity = new Game.Entity();
    document.getElementById("level").appendChild(entity);

    var frame = 0;
    var cachedTime = Date.now();
    function main() {
      window.requestAnimationFrame(main);
      var t = Date.now();
      var dt = t - cachedTime;
      var i;

      var entities = document.getElementsByClassName('Entity');
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

