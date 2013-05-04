(function() {

var id = 'level2';
function level() {

  var div = document.createElement('div');
  div.classList.add('Level');
  div.id = id;
  div.nextId = 'level1';

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
      classes: ['Player'],
      id: 'player',
      x: 300,
      y: 300,
      width: 288 / 4,
      height: 72,
      img: "images/ship1.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      spriteMaxFrameX: 4,
      update: Game.logic.player
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 200,
      y: 200,
      width: 288 / 4,
      height: 72,
      img: "images/ship1.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      spriteMaxFrameX: 4,
      update: Game.logic.default
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 210,
      y: 210,
      width: 288 / 4,
      height: 72,
      img: "images/ship1.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      spriteMaxFrameX: 4,
      update: Game.logic.default
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 230,
      y: 211,
      width: 288 / 4,
      height: 72,
      img: "images/ship1.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      spriteMaxFrameX: 4,
      update: Game.logic.default
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
