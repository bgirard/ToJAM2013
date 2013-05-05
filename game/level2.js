(function() {

var id = 'level2';
function level() {

  var div = document.createElement('div');
  div.classList.add('Level');
  div.id = id;
  div.levelNo = 2;
  div.nextId = 'level3';

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


  // Row 1 Group 2
  , new Game.Entity({
      classes: ['Pirate'],
      x: 2000,
      y: 1500,
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
      y: 1550,
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

  // Row 2 Group 1
  , new Game.Entity({
      classes: ['Pirate'],
      x: 3000,
      y: 250,
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
      x: 3040,
      y: 300,
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


  // Row 2 Group 2
  , new Game.Entity({
      classes: ['Pirate'],
      x: 3000,
      y: 2000-250,
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
      x: 3040,
      y: 2000-300,
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

  // Row 3 Group 1
  , new Game.Entity({
      classes: ['Pirate'],
      x: 3000 + 1000,
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
      x: 3000 + 1040,
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


  // Row 3 Group 2
  , new Game.Entity({
      classes: ['Pirate'],
      x: 3000 + 1000,
      y: 1500,
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
      x: 3000 + 1040,
      y: 1550,
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

  // Row 4 Group 1
  , new Game.Entity({
      classes: ['Pirate'],
      x: 3000 + 2000,
      y: 250,
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
      x: 3000 + 2040,
      y: 300,
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


  // Row 4 Group 2
  , new Game.Entity({
      classes: ['Pirate'],
      x: 3000 + 2000,
      y: 2000-250,
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
      x: 3000 + 2040,
      y: 2000-300,
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

  // Row 3 Group 1
  , new Game.Entity({
      classes: ['Pirate'],
      x: 5000 + 1000,
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
      x: 5000 + 1040,
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


  // Row 3 Group 2
  , new Game.Entity({
      classes: ['Pirate'],
      x: 5000 + 1000,
      y: 1500,
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
      x: 5000 + 1040,
      y: 1550,
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
