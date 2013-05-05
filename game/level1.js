(function() {

var id = 'level1';
function level() {

  var div = document.createElement('div');
  div.classList.add('Level');
  div.id = id;
  div.nextId = 'level2';

  [
    new Game.Entity({
      type: 'wormhole',
      classes: ['Wormhole'],
      x: 200,
      y: -200,
      showOnMinimap: true,
      minimapColor: "black",      
      update: Game.logic.wormhole
    })
  , new Game.Entity({
      type: 'player',
      classes: ['Player'],
      id: 'player',
      x: -600,
      y: -600,
      update: Game.logic.player
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 200,
      y: 200,
      width: 80,
      height: 62,
      life: 100,
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
      life: 100,
      img: "images/ships/enemy2.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.ai,
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: -10,
      y: 300,
      width: 64,
      height: 62,
      life: 100,
      img: "images/asteroid.png",
      rotationVel: 0.2,
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.idle,
    })
  , new Game.Entity({
      classes: ['Bounds'],
      x: 0,
      y: 0,
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
