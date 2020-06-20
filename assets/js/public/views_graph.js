window.showViewsByHour = function (data) {
    // console.log(data);

    var rawRows = data['rows'];

    var dataValues = [];
    var labelValues = [];

    for (const key in rawRows) {
        if (rawRows.hasOwnProperty(key)) {
            const element = rawRows[key];
            // console.log(element);

            var typePeriod = sessionStorage.getItem('trackview_control_period');

            var axeUnit, axeFormat;

            switch (typePeriod) {
                case 'hour':
                    axeUnit = 'day';
                    axeFormat = 'hA';
                    break;

                case 'day':
                    axeUnit = 'day';
                    axeFormat = 'MMM D';
                    break;
                case 'month':
                    axeUnit = 'month';
                    axeFormat = 'MMM YYYY';
                    break;

                default:
                    break;
            }

            // dayFormated = moment(element['date'], axeFormat);

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
                label: 'Views',
                data: dataValues,
                borderColor: 'rgba(0,123,255,1)',
                backgroundColor: 'rgba(0,123,255, .3)',                
                borderWidth: 1,
                tooltips: {
                    enabled: true
                },
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }],
                // xAxes: [{
                //     type: 'time',
                //     time: {
                //         unit: axeUnit
                //     },
                // }]
            },
        }
    });
}

function getViewsByHour() {

    var date1 = sessionStorage.getItem('trackview_control_date1'),
        date2 = sessionStorage.getItem('trackview_control_date2'),
        control_period = sessionStorage.getItem('trackview_control_period'),
        sql_select;

    var date1_f = new Date(date1),
        date2_f = new Date(date2);
    
    var date_diff = ((date2_f.getTime() - date1_f.getTime()) / (1000 * 3600 * 24)) + 1;

    sql_select = "select count(id) as conta, DATE_ADD('"+date1+"', INTERVAL aux.i DAY) as date from ";
	sql_select += "(select i from dfl_date.ints order by i limit "+date_diff+") as aux ";
    sql_select += "left join (select date(created_at) as date, id from events WHERE ref_event = 1) as evt ";
	sql_select += "on evt.date = DATE_ADD('"+date1+"', INTERVAL aux.i DAY) ";
    sql_select += "GROUP by DATE_ADD('"+date1+"', INTERVAL aux.i DAY)";

    runQuery(sql_select, 'showViewsByHour');
}

getViewsByHour();

// hour
// select count(id), DATE_ADD("2020-06-14", INTERVAL i HOUR) as dtae from 
// (select i from datee_test.ints order by i limit 250) as aux
// left join (select DATE_FORMAT(created_at,'%Y-%m-%d %k:00:00') as date, id from events WHERE ref_event = 1) as evt
// on evt.date = DATE_ADD("2020-06-14", INTERVAL i HOUR)
// GROUP by DATE_ADD("2020-06-14", INTERVAL i HOUR) order by dtae asc

//day
// select count(id), DATE_ADD('2020-06-08', INTERVAL aux.i DAY) as m_date from"
// (select i from datee_test.ints order by i limit 7) as aux"
// left join (select date(created_at) as date, id from events WHERE ref_event = 1) as evt"
// on evt.date = DATE_ADD('2020-06-08', INTERVAL aux.i DAY)"
// GROUP by DATE_ADD('2020-06-08', INTERVAL aux.i DAY)"

// http://www.brianshowalter.com/calendar_tables