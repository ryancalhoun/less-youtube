(function() {

  var limit = 20;
  var reset = 60 * 60 * 1000;
  var cooldown = 5 * 60 * 1000;
  var blocked = false;

  updateMinutes();

  function updateMinutes() {
    setTimeout(updateMinutes, 60 * 1000);

    var now = new Date();
    var minutes = localStorage.getItem('_youtube_minutes');

    if(minutes) {
      minutes = JSON.parse(minutes);
    } else {
      minutes = [];
    }

    var initialTotal = minutes.length;
    while(minutes.length > 0) {
      var time = new Date(minutes[0]);
      if(time.getTime() + reset < now.getTime()) {
        minutes.shift();
      } else {
        break;
      }
    }

    if(minutes.length >= limit) {
      var lastMinute = new Date(minutes[minutes.length - limit]);
      var nextMinute = new Date(lastMinute.getTime() + reset + cooldown);

      console.log("Time's up. Next time", nextMinute);

      document.body.innerHTML = '<html><head><style>body {max-width: 740px; margin: 80px auto; font-size: 18px};</style></head><body><h2>no more youtube until</h2><h1>' + nextMinute + '</h1></body></html>';

      blocked = true;
    } else {

      if(blocked) {
        setTimeout(window.location.reload, cooldown);

      } else {
        if(minutes.length == 0 || (now.getTime() - new Date(minutes[minutes.length-1]).getTime() >= 50 * 1000)) {
          minutes.push(now);
        }
        console.log("Currently viewing " + minutes.length + " out of " + limit);

        localStorage.setItem('_youtube_minutes', JSON.stringify(minutes));
      }

    }
  }

})();
