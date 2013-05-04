(function(){

  var COMPY_PRINT_SPEED = 10;

  window.BossOs = function (initOptions) {
    var hudContainer = initOptions.hudContainer;
    var consoleTextArea = hudContainer.querySelector('.hud-element.console > .textarea');

    var playerKeyStates = initOptions.playerKeyStates;
    var playerKeyMap = initOptions.playerKeyMap;

    var leftThruster = hudContainer.querySelector('.left.thruster');
    var rightThruster = hudContainer.querySelector('.right.thruster');

    var leftThrusterFront = leftThruster.querySelector('.front');
    var rightThrusterFront = rightThruster.querySelector('.front');

    var buttonMap = {
      'left': leftThruster.querySelector('.button:nth-child(1)'),
      'right': leftThruster.querySelector('.button:nth-child(2)'),
      'up': rightThruster.querySelector('.button:nth-child(1)'),
      'down': rightThruster.querySelector('.button:nth-child(2)'),
      'power': hudContainer.querySelector('.power'),
      'shield': hudContainer.querySelector('.shield')
    };

    var keys = Object.keys(playerKeyMap);
    keys.forEach(function(key){
      var action = playerKeyMap[key];
      if(buttonMap[action])
        buttonMap[action].innerHTML = key;
    });

    function writeConsoleLine (str) {
      var line = document.createElement('div');
      var strIndex = 0;
      line.className = 'line';
      line.innerHTML = '';
      consoleTextArea.insertBefore(line, consoleTextArea.firstChild);
      var lineInterval = setInterval(function(){
        line.innerHTML = line.innerHTML + str[strIndex++];
        if (strIndex === str.length) {
          clearInterval(lineInterval);
        }
      }, COMPY_PRINT_SPEED);
    }

    this.update = function (playerEntity) {
      var x = playerEntity.velX;
      var y = playerEntity.velY;
      x *= x;
      y *= y;

      rightThrusterFront.style.height = Math.min(100, Math.sqrt(x + y) / playerEntity.maxVel * 100) + '%';

      leftThrusterFront.style.height = Math.abs(playerEntity.rotationVel) / playerEntity.maxVel * 100 + '%';
    };

    this.playerKeyStateChange = function (key, state) {
      if (buttonMap[key]) {
        if (state) {
          buttonMap[key].classList.add('on');
        }
        else {
          buttonMap[key].classList.remove('on');
        }
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

    var bossScript = [
      [1, function() { writeConsoleLine('BossOS v0.29 (c) 2184 -- DO NOT DISTRIBUTE\n'); }],
      [2, function() { writeConsoleLine('Loading kernel modules...'); }],
      [2, function() { writeConsoleLine('Restoring consciousness. DO NOT POWER OFF.'); }]
    ];

    function stepBossAI () {
      var step = bossScript.shift();
      if (step) {
        step[1]();
        setTimeout(stepBossAI, step[0] * 1000); // convert from ms -> seconds
      }
    }

    stepBossAI();
  };

}());