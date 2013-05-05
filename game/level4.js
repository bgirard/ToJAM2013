(function() {

var id = 'level4';
function level() {

  var div = document.createElement('div');
  div.classList.add('Level');
  div.id = id;
  div.levelNo = 4;
  div.nextId = 'level1';

  [
    new Game.Entity({
      type: 'wormhole',
      classes: ['Wormhole'],
      x: 7000,
      y: 1000,
      showOnMinimap: true,
      minimapColor: "black",      
      update: Game.logic.wormhole
    })
  , new Game.Entity({
      type: 'player',
      classes: ['Player'],
      id: 'player',
      life: 1000,
      bulletType: "Missile",
      x: 600,
      y: 1000,
      rotation: 90,
      update: Game.logic.player
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 3400,
      y: 750,
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
      x: 3500,
      y: 1000,
      width: 80,
      height: 62,
      life: 800,
      scaling: 2,
      bulletType: "BulletStrong",
      img: "images/ships/enemy2.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.ai,
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 3400,
      y: 1250,
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
   //    ROW 2
  , new Game.Entity({
      classes: ['Pirate'],
      x: 3400 + 2000,
      y: 750,
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
      x: 3500 + 2000,
      y: 1000,
      width: 80,
      height: 62,
      life: 900,
      scaling: 2,
      bulletType: "BulletStrong",
      img: "images/ships/enemy2.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.ai,
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 3400 + 2000,
      y: 1250,
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
      classes: ['Bounds'],
      x: 4000,
      y: 1000,
      width: 8000,
      height: 2000,
    })
  ].forEach(function(entity) {
    div.appendChild(entity);
  });

  return div;

};

Game.levels[id] = level;

})();
