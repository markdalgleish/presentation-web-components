(function() {
  var

    makeTimer = function(selector, minutes) {
      var startTime,
        lastInnerHTML,
        timerEl = document.querySelector(selector),

        start = function() {
          startTime = new Date().getTime();
          timerEl.classList.add('active');
        },

        format = function(ms) {
          var leadingZero = function(n) { return n < 10 ? '0' + n : '' + n; },
            modulus = function(i) { return function(n) { return n % i; } },
            msRemaining = ((minutes * 60 * 1000) + 1000) - ms,
            s = msRemaining / 1000,
            m = s / 60,
            h = m / 60;

          return [m, s]
            .map(Math.floor)
            .map(modulus(60))
            .map(leadingZero)
            .join(':');
        };

      (function tick() {
        window.requestAnimationFrame(tick);
        var innerHTML = format(startTime === undefined ? 0 : new Date().getTime() - startTime);
        if (innerHTML !== lastInnerHTML) timerEl.innerHTML = lastInnerHTML = innerHTML;
      }());

      return {
        start: start
      };
    },

    timer = makeTimer('section.timer h1', 15),

    deck = bespoke.horizontal.from('article', {
      bullets: 'li, .bullet',
      scale: true,
      hash: true,
      progress: true,
      state: true
    });

  deck.on('activate', function(e) {
    if (e.slide.classList.contains('timer')) {
      timer.start();
    }
  });

}());
