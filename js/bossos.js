(function(){

  window.BossOs = function (initOptions) {
    var hudContainer = initOptions.hudContainer;
    var consoleTextArea = hudContainer.querySelector('.hud-element.console > textarea');

    var playerKeyStates = initOptions.playerKeyStates;
    var playerKeyMap = initOptions.playerKeyStates;

    function writeConsoleLine (str) {
      consoleTextArea.innerHTML = str + consoleTextArea.innerHTML;
    }

    this.update = function () {
    };

    writeConsoleLine("BossOS v0.29 (c) 2184 -- DO NOT DISTRIBUTE");
    writeConsoleLine("");
  };

}());