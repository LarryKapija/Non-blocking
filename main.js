function getAsync(){
    startTimer()
    
    for(var i = 1; i < 26; i++){
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", 'http://localhost:8080/sync/images/' + i, true);
        xhttp.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById(i + '.jpg')
                .setAttribute(
                    'src', 'data:image/png;base64,' + xhttp.responseText);
    
            };
        }
        xhttp.onerror = function (e) {
            console.error(xhr.statusText);
        }
        xhttp.overrideMimeType('text/plain; charset=x-user-defined');
        xhttp.send(null);
    }
    // TODO validar que se cargaron todas las imagenes

    
    stopTimer()
}


function getSequential(){
    
    startTimer()
    
    for(var i = 1; i < 26; i++){
        xhttp = new XMLHttpRequest();
        console.log("wtf");
        xhttp.open('GET', 'http://localhost:8080/sync/images/'+ i, false);
        xhttp.overrideMimeType('text/plain; charset=x-user-defined');
        xhttp.send(null);
        if(xhttp.status == 200){
            document.getElementById(i + '.jpg')
            .setAttribute(
                'src',  'data:image/png;base64,' + xhttp.responseText)
            
        }
    }
    console.log("Finished");
    stopTimer();
}



var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function onReset(){
    reseTimer()
}

function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}

function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
    }
}
  
function timerCycle() {
    var timer = document.getElementById("stopwatch"); 
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec + 1;

        if (sec == 60) {
        min = min + 1;
        sec = 0;
        }

        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }

        if (sec < 10 || sec == 0) { 
            sec = '0' + sec;
        }

        if (min < 10 || min == 0) {
            min = '0' + min;
        }
        
        if (hr < 10 || hr == 0) {
            hr = '0' + hr;
        }

        timer.innerHTML = hr + ':' + min + ':' + sec;

        setTimeout("timerCycle()", 1000);
    }
}

function resetTimer() {
    timer.innerHTML = '00:00:00';
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
}


function encode64(inputStr){
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var outputStr = "";
    var i = 0;
    
    while (i> 2){
        var enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
        var enc3, enc4;
        if (isNaN(byte2)){
          enc3 = enc4 = 64;
        } else  {
          enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
          if (isNaN(byte3)){
            enc4 = 64;
          } else {
              enc4 = byte3 & 63;
          }
        }
        outputStr +=  b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4);
    } 
    return outputStr;
} 