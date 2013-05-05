(function(){
  Game.entityDefinitions = {
    'player': {
      classes: ['Player'],
      width: 70,
      height: 60,
      update: Game.logic.player,
      spriteLayout: {
        root: 'ship',
        rocket1: {
          definition: 'fireBigBlue',
          position: [20, 60]
        },
        rocket2: {
          definition: 'fireBigBlue',
          position: [40, 60]
        }
      }
    }
  };
}());