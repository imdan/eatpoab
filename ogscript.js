$(function() {
        
    var $button = $("#button");
    var $score = $("#score");
    var $player = $("#player");
    var $header = $("h1");
    var $header2 = $("h3");
    
    
    function startTimer(duration, display) {
        var timer = duration, minutes;
        setInterval(function() {
           minutes = parseInt(timer / 60, 10);
           
           minutes = minutes < 10 ? "00" + minutes : minutes;
           minutes = minutes >= 10 ? "0" + minutes : minutes;
           minutes = minutes >= 100 ? minutes : minutes;
            
           display.text(minutes);
            
           if (++timer < 0) {
               timer = duration;
           }    
        }, 1000);
    }
    
    $button.on('click', function(e) {
        e.preventDefault();
        
        var start = 60 * 0,
            display = $score;
        startTimer(start, display);
        
        $button.fadeOut("slow");
        $header.fadeOut("slow");
        $header2.fadeOut("slow");
    });
    
    $score.on('dblclick', function(e) {
        e.preventDefault();
        $score.html("SUP");
    });
    
    $header.on('click', function(e) {
        e.preventDefault();
        if(e.shiftKey) {
          $header.html("NOTHING");
  }
    });
    
    
    
    
});
