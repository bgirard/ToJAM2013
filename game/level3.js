(function() {

var id = 'level3';
function level() {

  var div = document.createElement('div');
  div.classList.add('Level');
  div.id = id;
  div.levelNo = 3;
  div.nextId = 'level4';

  [
    new Game.Entity({
      type: 'wormhole',
      classes: ['Wormhole'],
      x: 1800,
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
      x: 200,
      y: 1000,
      rotation: 90,
      update: Game.logic.player
    })

  , new Game.Entity({
      classes: ['Pirate'],
      x: 800,
      y: 1000,
      width: 204,
      height: 162,
      life: 200,
      rotation: Math.floor(Math.random() * 180),
      rotationVel: 0.01,
      img: "images//environment/asteroid0.png",
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.idle,
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 500,
      y: 430,
      width: 204,
      height: 162,
      life: 200,
      rotation: Math.floor(Math.random() * 180),
      rotationVel: 0.01,
      img: "images//environment/asteroid0.png",
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.idle,
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 620,
      y: 450,
      width: 204,
      height: 162,
      life: 200,
      rotation: Math.floor(Math.random() * 180),
      rotationVel: 0.01,
      img: "images//environment/asteroid0.png",
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.idle,
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 900,
      y: 700,
      width: 114,
      height: 90,
      life: 100,
      rotation: Math.floor(Math.random() * 180),
      rotationVel: 0.01,
      img: "images//environment/asteroid1.png",
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.idle,
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 1300,
      y: 1500,
      width: 114,
      height: 90,
      life: 100,
      rotation: Math.floor(Math.random() * 180),
      rotationVel: 0.01,
      img: "images//environment/asteroid1.png",
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.idle,
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 900,
      y: 700,
      width: 114,
      height: 90,
      life: 100,
      rotation: Math.floor(Math.random() * 180),
      rotationVel: 0.01,
      img: "images//environment/asteroid1.png",
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.idle,
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 1300,
      y: 1500,
      width: 55,
      height: 68,
      life: 100,
      rotation: Math.floor(Math.random() * 180),
      rotationVel: 0.01,
      img: "images//environment/asteroid2.png",
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.idle,
    })

  // Row 1 Group 1
  , new Game.Entity({
      classes: ['Pirate'],
      x: 2000,
      y: 500,
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
      x: 2040,
      y: 550,
      width: 80,
      height: 62,
      life: 300,
      bulletType: "BulletStrong",
      img: "images/ships/enemy2.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      //spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.ai,
    })

  , new Game.Entity({
      classes: ['Bounds'],
      x: 1000,
      y: 1000,
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
