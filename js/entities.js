(function(){
  Game.entityDefinitions = {
    'wormhole': {
      width: 280,
      height: 280,
      classes: ['Wormhole'],
      spriteLayout: {
        definition: 'wormhole'
      }      
    },
    'player': {
      classes: ['Player'],
      width: 70,
      height: 60,
      update: Game.logic.player,
      spriteLayout: {
        definition: 'ship',
        children: {
          rocket1: {
            definition: 'fireBigBlue',
            position: [0, 50]
          },
          rocket2: {
            definition: 'fireBigBlue',
            position: [30, 50]
          }
        }
      }
    }
  };
}());