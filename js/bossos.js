(function(){

  window.BossOs = function (initOptions) {
    var hudContainer = initOptions.hudContainer;
    var consoleTextArea = hudContainer.querySelector('.hud-element.console > textarea');

    var playerKeyStates = initOptions.playerKeyStates;
    var playerKeyMap = initOptions.playerKeyStates;

    var leftThruster = hudContainer.querySelector('.left.thruster');
    var rightThruster = hudContainer.querySelector('.right.thruster');

    var leftThrusterFront = leftThruster.querySelector('.front');
    var rightThrusterFront = rightThruster.querySelector('.front');

    var leftThrusterButton = leftThruster.querySelector('.button'):
    var rightThrusterButton = rightThruster.querySelector('.button'):

    function writeConsoleLine (str) {
      consoleTextArea.innerHTML = str + consoleTextArea.innerHTML;
    }

    this.update = function (playerEntity) {
      leftThrusterFront.style.height = Math.abs(playerEntity.velX) / playerEntity.maxVel * 100 + '%';
      rightThrusterFront.style.height = Math.abs(playerEntity.velY) / playerEntity.maxVel * 100 + '%';

      if (playerKeyStates.up || playerKeyStates.down) {

      }
    };

    consoleTextArea.onmousedown = function (e) {
      e.preventDefault();
      return false;
    };

    consoleTextArea.onselectstart = function (e) {
      e.preventDefault();
      return false;
    };

    writeConsoleLine("BossOS v0.29 (c) 2184 -- DO NOT DISTRIBUTE");
    writeConsoleLine("");
  };

}());