(function() {

function spawnWave(div) {
  div.currentWave++;
  if (true || div.currentWave == 1) {
    [
      new Game.Entity({
        classes: ['Pirate'],
        x: 1750,
        y: 700,
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
        x: 2000,
        y: 650,
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
        x: 2250,
        y: 700,
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
    ].forEach(function(entity) {
      div.appendChild(entity);
    });
  }
}

var id = 'level1';
function level() {

  var div = document.createElement('div');
  div.classList.add('Level');
  div.id = id;
  div.levelNo = 5;
  div.nextId = 'level1';
  div.currentWave = 0;

  var timeInLevel = 0;
  var timeUntilNextWave = 1000;
  div.update = function(dt) {
    timeInLevel += dt;
    timeUntilNextWave -= dt;
    if (timeUntilNextWave < 0) {
      spawnWave(div);
      timeUntilNextWave = 30000;
    }
  };

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
      life: 2000,
      bulletType: "Missile",
      x: 2000,
      y: 1000,
      rotation: 0,
      update: Game.logic.player
    })
  , new Game.Entity({
      id: "Mothership",
      classes: ['Pirate', 'Mothership'],
      x: 2000,
      y: 500,
      width: 840,
      height: 346,
      life: 999999,
      rotationAccel: 0,
      img: "images/environment/enemyMotherShip.png",
      update: Game.logic.default,
      ai: Game.logic.idle,
    })
  , new Game.Entity({
      classes: ['Bounds'],
      x: 2000,
      y: 1000,
      width: 4000,
      height: 2000,
    })
  ].forEach(function(entity) {
    div.appendChild(entity);
  });

  return div;

};

Game.levels[id] = level;

})();
