(function() {

  var limit = 20 * 60 * 1000;
  var cooldown = 60 * 60 * 1000;

  function startCountdown(startTime) {
    localStorage.setItem('_youtube_start_time', startTime);
    var endTime = new Date(startTime.getTime() + limit);
    var clearTime = new Date(startTime.getTime() + cooldown);

    console.log("Countdown to ", endTime);

    setTimeout(function() {
      document.body.innerHTML = '<html><head><style>body {max-width: 740px; margin: 80px auto; font-size: 18px};</style></head><body><h2>no more youtube until</h2><h1>' + clearTime + '</h1></body></html>';
    }, endTime - new Date());

    setTimeout(function() {
      window.location.reload();
    }, clearTime - new Date() + 100);
  }

  var now = new Date();
  var startTime = localStorage.getItem('_youtube_start_time');

  if(startTime) {
    startTime = new Date(startTime);
  } else {
    startTime = now;
  }

  var clearTime = new Date(startTime.getTime() + cooldown);

  if(now < clearTime) {
    startCountdown(startTime);
  } else {
    startCountdown(now);
  }

})();
