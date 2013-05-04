(function(){
  var keymap = {
    65: 'A',
    68: 'D',
    83: 'S',
    87: 'W'
  };
  var keycodes = Object.keys(keymap);

  function handleKeyEvent(state, evt) {
    var i;
    var code = evt.keyCode;
    for(i = 0, l = keycodes.length; i < l; ++ i) {
      if(code == keycodes[i]) {
        var key = keymap[code];
        var playerKey = playerKeyMap[key];
        playerKeyStates[playerKey] = state;
        return;
      }
    }
  };

  var playerKeyMap = {
    'A': 'left',
    'D': 'right',
    'W': 'up',
    'S': 'down'
  };

  var playerKeyStates = {
    'left': false,
    'right': false,
    'up': false,
    'down': false
  };

  window.onload = function (e) {
    console.log('game start!');

    document.addEventListener('keydown', handleKeyEvent.bind(undefined, true));
    document.addEventListener('keyup', handleKeyEvent.bind(undefined, false));

    var entity = new Game.Entity({
      classes: ['Player']
    });
    document.body.appendChild(entity);

    var frame = 0;
    var cachedTime = Date.now();
    function main() {
      window.requestAnimationFrame(main);
      var t = Date.now();
      var dt = t - cachedTime;
      var i;

      var playerEntity = document.getElementsByClassName('Player')[0];
      playerEntity.velX += (playerKeyStates.left ? -0.01 : 0.0) + (playerKeyStates.right ? 0.01 : 0.0);
      playerEntity.velY += (playerKeyStates.up ? -0.01 : 0.0) + (playerKeyStates.down ? 0.01 : 0.0);
      console.log(playerEntity.velX, playerEntity.velY)

      var entities = document.getElementsByClassName('Entity');

      // Update entities
      for(i = 0, l = entities.length; i < l; ++ i) {
        entities[i].update(dt);
      }

      // Flush render state to DOM
      for(i = 0, l = entities.length; i < l; ++ i) {
        entities[i].render();
      }

      cachedTime = t;
    };
    window.requestAnimationFrame(main);
  };

}());

