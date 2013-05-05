(function(){

  var COMPY_PRINT_SPEED = 10;

  var KEY_MAP = {
     'A': 65
    ,'B': 66
    ,'C': 67
    ,'D': 68
    ,'E': 69
    ,'F': 70
    ,'G': 71
    ,'H': 72
    ,'I': 73
    ,'J': 74
    ,'K': 75
    ,'L': 76
    ,'M': 77
    ,'N': 78
    ,'O': 79
    ,'P': 80
    ,'Q': 81
    ,'R': 82
    ,'S': 83
    ,'T': 84
    ,'U': 85
    ,'V': 86
    ,'W': 87
    ,'X': 88
    ,'Y': 89
    ,'Z': 90
  };

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

    var laser = hudContainer.querySelector('.weapon-2');
    var missile = hudContainer.querySelector('.weapon-1');

    var laserFront = laser.querySelector('.front');

    var buttonMap = {
      'left': leftThruster.querySelector('.button:nth-child(1)'),
      'right': rightThruster.querySelector('.button:nth-child(1)'),
      'up': speedThruster.querySelector('.button:nth-child(1)'),
      'down': speedThruster.querySelector('.button:nth-child(2)'),
      'laser': laser.querySelector('.button'),
      'missile': missile.querySelector('.button')
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
      preventTyping = preventTyping || false;

      if (str.length === 0) {
        str = '&nbsp;';
        preventTyping = true;
      }

      line.innerHTML = preventTyping ? str : ' ';
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
      [3, function() { writeLine('Restoring consciousness...'); }],
      [3, function() { writeLine(''); writeLine(''); writeLine(''); }],
      [1, function() { writeLine('Welcome back.'); }],
      [3, function() { writeLine('Please identify yourself.'); }],
      [5, function() { writeLine('Identify yourself immediately.'); }],
      [5, function() { writeLine('If you cannot speak, press the "Dangerously Incapacitated" button.'); }],
      [3, function() { writeLine('Central command will be alerted.'); }],
      [3, function() { writeLine('WARNING: Respond within 5 seconds. Refusal will be deadly.'); }],
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

    var currentSwitchMap = {};

    function switchButtons () {
      var actions = Object.keys(buttonMap);
      var keyMapKeys = Object.keys(KEY_MAP);
      var randomAction = actions[Math.floor(Math.random() * actions.length)];
      var actionKey;

      if (currentSwitchMap[randomAction]) {
        return;
      }

      keys.forEach(function(key){
        var action = playerKeyMap[key];
        if (action === randomAction) {
          actionKey = key;
        }
      });

      var randomKey = actionKey;
      while (keys.indexOf(randomKey) > -1) {
        randomKey = keyMapKeys[Math.floor(Math.random() * keyMapKeys.length)];
      }

      playerKeyStates[randomAction] = false;
      delete playerKeyMap[actionKey];
      playerKeyMap[randomKey] = randomAction;
      buttonMap[randomAction].innerHTML = randomKey;
      currentSwitchMap[randomAction] = actionKey;
      buttonMap[randomAction].classList.remove('on');
      buttonMap[randomAction].classList.add('blink');

      setTimeout(function(){
        buttonMap[randomAction].classList.remove('blink');
        buttonMap[randomAction].classList.remove('on');
        delete playerKeyMap[randomKey];
        playerKeyMap[actionKey] = randomAction;
        buttonMap[randomAction].innerHTML = actionKey;
        delete currentSwitchMap[randomAction];
        playerKeyStates[randomAction] = false;
      }, Math.round(2000 + Math.random()*5000));
    }

    function runAI () {
      var currentTime = Date.now();

      var timeSinceLastDecision = currentTime - timeAtLastDecision;
      var timeSinceLastScriptAction = currentTime - timeAtLastScriptAction;

      var nextScriptAction = bossScript[0];

      if (timeAtLastDecision > -1 && timeSinceLastDecision > randomTimeUntilNextDecision) {
        randomTimeUntilNextDecision = Math.random() * 5000 + 5000;
        timeAtLastDecision = currentTime;
        switchButtons();
      }
      else if (nextScriptAction && timeSinceLastScriptAction > nextScriptAction[0] * 1000) {
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

      laserFront.style.height = playerEntity.weaponCooldown['Laser'] / playerEntity.weaponReloadTime['Laser'] * 100 + '%';

      runAI();
    };

    this.playerKeyStateChange = function (action, state) {
      if (buttonMap[action]) {
        if (state) {
          buttonMap[action].classList.add('on');
        }
        else {
          buttonMap[action].classList.remove('on');
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
