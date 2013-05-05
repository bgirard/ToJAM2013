(function() {

var id = 'level1';
function level() {

  var div = document.createElement('div');
  div.classList.add('Level');
  div.id = id;
  div.nextId = 'level2';

  [
    new Game.Entity({
      classes: ['Wormhole'],
      x: 200,
      y: -200,
      width: 128,
      height: 128,
      rotationVel: 0.3,
      img: "images/wormhole.png",
      update: Game.logic.default
    })
  , new Game.Entity({
      type: 'player',
      classes: ['Player'],
      id: 'player',
      x: 100,
      y: 100,
      img: "images/ships/ship.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      //spriteMaxFrameX: 4,
      update: Game.logic.player
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 200,
      y: 200,
      width: 80,
      height: 62,
      img: "images/ships/enemy1.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.ai,
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 300,
      y: 200,
      width: 80,
      height: 62,
      img: "images/ships/enemy2.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.ai,
    })
  , new Game.Entity({
      classes: ['Bounds'],
      x: -1000,
      y: -1000,
      width: 2000,
      height: 2000,
    })
  ].forEach(function(entity) {
    div.appendChild(entity);
  });

  return div;

};

Game.levels[id] = level;

})();
