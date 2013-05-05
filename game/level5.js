(function() {

var id = 'level5';
function level() {

  var div = document.createElement('div');
  div.classList.add('Level');
  div.id = id;
  div.levelNo = 5;
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
