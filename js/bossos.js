(function(){

  window.BossOs = function (options) {

    var textContainer = options.textContainer;

    function writeLine (str) {
      textContainer.innerHTML = str + textContainer.innerHTML;
    }

    writeLine("BossOS v0.29 (c) 2184 -- DO NOT DISTRIBUTE");
    writeLine("");
  };

}());