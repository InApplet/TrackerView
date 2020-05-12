function updateControlData(dateNumber, date){
    sessionStorage.setItem('trackview_control_date'+dateNumber, date);
    location.reload();
}

function controleDateInitialize() {

    if (sessionStorage.getItem('trackview_control_date1') == null) {
        var date1 = getDateCalendar(-28);
        sessionStorage.setItem('trackview_control_date1', date1);
    }else{
        var date1 = sessionStorage.getItem('trackview_control_date1');
    }

    if (sessionStorage.getItem('trackview_control_date2') == null) {
        var date2 = getDateCalendar();
        sessionStorage.setItem('trackview_control_date2', date2);
    }else{
        var date2 = sessionStorage.getItem('trackview_control_date2');
    }

    document.getElementById('controlsDate1').value = date1;
    document.getElementById('controlsDate2').value = date2;
}


function controlePeriodInitialize(){

    if(sessionStorage.getItem('trackview_control_period') == null){
        sessionStorage.setItem('trackview_control_period', 'day');
    }

    window.trackview_control_period = sessionStorage.getItem('trackview_control_period');

    switch (window.trackview_control_period) {
        case 'hour':
            document.getElementById('controlsBtnHour').classList.add('active');
            break;
        case 'day':
            document.getElementById('controlsBtnDay').classList.add('active');
            break;
        case 'month':
            document.getElementById('controlsBtnMonth').classList.add('active');
            break;
    
        default:
            break;
    }
}

controleDateInitialize();
controlePeriodInitialize();

// on button period click
var elements = document.querySelectorAll('.controls-btn-period');
Array.prototype.forEach.call(elements, function(el, i){
    el.addEventListener('click', function(e){
        e.preventDefault();
        
        sessionStorage.setItem('trackview_control_period', this.getAttribute('data-period'));

        location.reload();
    });
});

document.getElementById('controlsDate1').addEventListener('change', function(e){
    updateControlData(1, this.value);
});

document.getElementById('controlsDate2').addEventListener('change', function(e){
    updateControlData(2, this.value);
});