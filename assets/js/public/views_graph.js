window.showViewsByHour = function ( data) {
    // console.log(data);

    var rawRows = data['rows'];

    var dataValues = [];
    var labelValues = [];

    for (const key in rawRows) {
        if (rawRows.hasOwnProperty(key)) {
            const element = rawRows[key];
            // console.log(element);
            dataValues[key] = element['conta'];
            labelValues[key] = element['date'];
        }
    }
    
    var ctx = document.getElementById('viewByHour').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelValues,
            datasets: [{
                label: 'Visualizações',
                data: dataValues,
                borderColor: 'rgba(0,123,255,1)',
                backgroundColor: 'rgba(0,123,255, .3)',                
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function getViewsByHour() {

    var date1 = sessionStorage.getItem('trackview_control_date1'),
        date2 = sessionStorage.getItem('trackview_control_date2'),
        filterDate = "DATE(created_at) BETWEEN '"+date1+"' AND '"+date2+"'";

    
        var control_period = sessionStorage.getItem('trackview_control_period'),
        sql_period_hour = "HOUR(created_at) as dategroup, DATE_FORMAT(created_at,'%d/%m/%Y %k:00') as date",
        sql_period_day = "DATE(created_at) as dategroup, DATE_FORMAT(created_at,'%d/%m/%Y') as date",
        sql_period_month = "MONTH(created_at) as dategroup, DATE_FORMAT(created_at,'%m/%Y') as date";

    var sql_select;

    switch (control_period) {
        case 'hour':
            sql_select = sql_period_hour;
            break;
        case 'day':
            sql_select = sql_period_day;
            break;
        case 'month':
            sql_select = sql_period_month;
            break;
        default:
            sql_select = sql_period_day;
            break;
    }

    var stringQuery = "SELECT "+sql_select+", count(id) as conta FROM `events` WHERE ref_event = 1 AND ("+filterDate+") GROUP BY dategroup";
    runQuery(stringQuery, 'showViewsByHour');
}

getViewsByHour();