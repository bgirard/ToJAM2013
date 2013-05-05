(function() {

var id = 'level2';
function level() {

  var div = document.createElement('div');
  div.classList.add('Level');
  div.id = id;
  div.nextId = 'level1';

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
      x: 100,
      y: 100,
      update: Game.logic.player
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 200,
      y: 200,
      width: 288 / 4,
      height: 72,
      life: 150,
      img: "images/ship1.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.ai,
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 210,
      y: 210,
      width: 288 / 4,
      height: 72,
      life: 150,
      img: "images/ship1.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.ai,
    })
  , new Game.Entity({
      classes: ['Pirate'],
      x: 230,
      y: 211,
      width: 288 / 4,
      height: 72,
      life: 150,
      img: "images/ship1.png",
      spriteFrameTime: 100, //ms
      spriteFrameX: 0,
      spriteMaxFrameX: 4,
      update: Game.logic.default,
      ai: Game.logic.ai,
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
