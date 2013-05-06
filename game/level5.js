(function() {

function drop_special() {
  document.spawn(new Game.Entity({
    x: 2000,
    y: 650,
    type: 'powerup',
    spriteFrameTime: 100, //ms
    img: "images/environment/powerup.png",
  }));
}

function spawnWave(div, dt) {
  var killedWave = document.getElementsByClassName("Wave").length == 0;
  if (killedWave) {
    div.timeUntilNextWave -= dt;
  }
  if (killedWave && div.timeUntilNextWave < 0) {
    if (div.currentWave == 5) {
      drop_special();
    }
    div.currentWave++;
    div.timeUntilNextWave = 5000;
    [
      new Game.Entity({
        classes: ['Pirate', 'Wave'],
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
        classes: ['Pirate', 'Wave'],
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
        classes: ['Pirate', 'Wave'],
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

var id = 'level5';

function level() {

  var div = document.createElement('div');
  div.classList.add('Level');
  div.id = id;
  div.levelNo = 5;
  div.nextId = 'level1';
  div.currentWave = 0;

  div.timeInLevel = 0;
  div.timeUntilNextWave = 5000;
  div.update = function(dt) {
    div.timeInLevel += dt;
    spawnWave(div, dt);
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
