(function(){

  window.BossOs = function (initOptions) {
    var hudContainer = initOptions.hudContainer;
    var consoleTextArea = hudContainer.querySelector('.hud-element.console > textarea');

    var playerKeyStates = initOptions.playerKeyStates;
    var playerKeyMap = initOptions.playerKeyStates;


    var leftThruster = hudContainer.querySelector('.left.thruster');
    var rightThruster = hudContainer.querySelector('.right.thruster');

    function writeConsoleLine (str) {
      consoleTextArea.innerHTML = str + consoleTextArea.innerHTML;
    }

    this.update = function (playerEntity) {
      leftThruster.querySelector('.front').style.height = Math.abs(playerEntity.velX) / playerEntity.maxVel * 100 + '%';
      rightThruster.querySelector('.front').style.height = Math.abs(playerEntity.velY) / playerEntity.maxVel * 100 + '%';
    };

    writeConsoleLine("BossOS v0.29 (c) 2184 -- DO NOT DISTRIBUTE");
    writeConsoleLine("");
  };

}());