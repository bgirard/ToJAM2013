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

    var speedThruster = hudContainer.querySelector('.speed');
    var speedThrusterFront = speedThruster.querySelector('.front');

    var buttonMap = {
      'left': leftThruster.querySelector('.button:nth-child(1)'),
      'right': rightThruster.querySelector('.button:nth-child(1)'),
      'up': speedThruster.querySelector('.button:nth-child(1)'),
      'down': speedThruster.querySelector('.button:nth-child(2)'),
      // 'power': hudContainer.querySelector('.power'),
      // 'shield': hudContainer.querySelector('.shield'),
      'laser': hudContainer.querySelector('.weapon-1 .button'),
      'missile': hudContainer.querySelector('.weapon-2 .button')
    };

    var keys = Object.keys(playerKeyMap);
    keys.forEach(function(key){
      var action = playerKeyMap[key];
      if(buttonMap[action])
        buttonMap[action].innerHTML = key;
    });

    function writeLine (str, classes, preventTyping) {
      var line = document.createElement('div');
      var strIndex = 0;
      classes = classes ? ' ' + classes : '';
      line.className = 'line' + classes;
      line.innerHTML = preventTyping ? str : '';
      preventTyping = preventTyping || false;
      consoleTextArea.insertBefore(line, consoleTextArea.firstChild);
      if (str.length > 0 && !preventTyping) {
        var lineInterval = setInterval(function(){
          line.innerHTML = line.innerHTML + str[strIndex++];
          if (strIndex === str.length) {
            clearInterval(lineInterval);
          }
        }, COMPY_PRINT_SPEED);
      }
    }

    var bossScript = [
      [1, function() { writeLine('BossOS v0.29 (c) 2184 -- DO NOT DISTRIBUTE'); }],
      [2, function() { writeLine('Loading kernel modules...'); }],
      [3, function() { writeLine('Restoring consciousness. DO NOT POWER OFF.'); }],
      [3, function() { writeLine('------------------------------------'); writeLine(''); writeLine(''); }],
      [1, function() { writeLine('Please identify yourself.'); }],
      [5, function() { writeLine('Please identify yourself.'); }],
      [5, function() { writeLine('Identify yourself immediately.'); }],
      [5, function() { writeLine('If you cannot speak, press the "Dangerously Incapacitated" button.'); }],
      [1, function() { writeLine('Central command will be alerted.'); }],
      [3, function() { writeLine('WARNING: Respond within 10 seconds. Refusal will be deadly.'); }],
      [5, function() { writeLine('WARNING: 5 seconds.'); }],
      [5, function() { writeLine('ALERT: <span class="blink">ACTIVATING SELF-DESTRUCT MODE</span>.', 'alert', true); }],
      [4, function() { writeLine('...'); }],
      [2, function() { writeLine('Looks like that module is missing.'); }],
      [2, function() { writeLine('I will just have to find another way to prevent your escape.'); startDecisions(); }],
      [3, function() { writeLine('You theif!'); }]
    ];

    var timeAtLastDecision = -1;
    var timeAtLastScriptAction = Date.now();
    var randomTimeUntilNextDecision = 1000;

    function startDecisions() {
      timeAtLastDecision = Date.now();
    }

    function runAI () {
      var currentTime = Date.now();

      var timeSinceLastDecision = currentTime - timeAtLastDecision;
      var timeSinceLastScriptAction = currentTime - timeAtLastScriptAction;

      var nextScriptAction = bossScript[0];

      if (timeAtLastDecision > -1 && timeSinceLastDecision > randomTimeUntilNextDecision) {
        randomTimeUntilNextDecision = Math.random() * 5000 + 5000;
        timeAtLastDecision = currentTime;
      } else if (nextScriptAction && timeSinceLastScriptAction > nextScriptAction[0] * 1000) {
        bossScript.shift();
        timeAtLastScriptAction = currentTime;
        nextScriptAction[1]();
      }
    }

    this.update = function (playerEntity) {
      var x = playerEntity.velX;
      var y = playerEntity.velY;
      x *= x;
      y *= y;

      leftThrusterFront.style.height = (Math.min(1, Math.max(0, -playerEntity.rotationVel / playerEntity.maxRotationVel)) * 300).toFixed(1) + 'px';
      rightThrusterFront.style.height = (Math.min(1, Math.max(0, playerEntity.rotationVel / playerEntity.maxRotationVel)) * 300).toFixed(1) + 'px';

      var s = Math.round(Math.min(1, Math.max(0, Math.sqrt(x + y) / playerEntity.velMax)) * 1000)/1000;
      speedThrusterFront.style.height = s * 100 + '%';
      speedThrusterFront.style.top = -s * 50 + 50 + '%';    // lol, thanks css

      runAI();
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
  };

}());
