/* TODO

Dark mode
Better UI

 */



document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('current');
    button.addEventListener('click', function() {
        currentTime('sleep')
    });

    button = document.getElementById('goSleep');
    button.addEventListener('click', function() {
        var time = document.getElementById('sleep').value;
        var date = new Date();
        date.setHours(time.substring(0,2), time.substring(3, 5), 0, 0);
        calculateCycles(date, true);
        document.getElementById('instructions').innerHTML = "Wake up at one of the following times to wake up between sleep cycles:";
    });

    button = document.getElementById('goWake');
    button.addEventListener('click', function() {
        var time = document.getElementById('wake').value;
        var date = new Date();
        date.setHours(time.substring(0,2), time.substring(3, 5), 0, 0);
        calculateCycles(date, false);
        document.getElementById('instructions').innerHTML = "Go to bed at one of the following times to wake up between sleep cycles:";
    });

    button = document.getElementById('readme');
    button.addEventListener('click', function() {
        chrome.tabs.create({'url': "/readme.html" });
    });

    button = document.getElementById('feedback');
    button.addEventListener('click', function() {
        chrome.tabs.create({'url': "mailto:oz.anisman@gmail.com" });
    });

    /*
    button = document.getElementById('settings');
    button.addEventListener('click', function() {
        chrome.tabs.create({'url': "/options.html" });
    });
     */



});

function currentTime(id) {
    var d = new Date(),
        h = (d.getHours()<10?'0':'') + d.getHours(),
        m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    document.getElementById(id).value = h + ':' + m;
}

function calculateCycles(time, bool) { //true = sleep, false = wake
    var newTime = "";
    var cycles = "";
    if(bool) {
        time.setMinutes(time.getMinutes() + 15);
        for(var i = 1; i < 7; i++) {

            var name = "cycles" + i;
            newTime = addCycle(time);
            document.getElementById(name).innerHTML = newTime;
        }
    } else {
        time.setMinutes(time.getMinutes() - 15);
        for(var i = 6; i > 0; i--) {
            var name = "cycles" + i;
            newTime = subCycle(time);
            document.getElementById(name).innerHTML = newTime;
        }
    }


}
function addCycle(time) {
    time.setHours(time.getHours() + 1);
    time.setMinutes(time.getMinutes() + 30);
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

function subCycle(time) {
    time.setHours(time.getHours() - 1);
    time.setMinutes(time.getMinutes() - 30);
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}