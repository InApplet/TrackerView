window.showViewsByHour = function (data) {
    // console.log(data);

    var rawRows = data['rows'];

    console.log('---------------');
    console.log(data);
    console.log('---------------');

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

            dayFormated = moment(element['date'], axeFormat);

            dataValues[key] = element['conta'];
            labelValues[key] = dayFormated;
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
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: axeUnit
                    },
                }]
            },
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
    console.log(stringQuery);
    runQuery(stringQuery, 'showViewsByHour');
}

getViewsByHour();

// SELECT DATE_ADD("2017-06-15", INTERVAL t1.i DAY)
// FROM (
//     select i from ints) as t1

// http://www.brianshowalter.com/calendar_tables

// SELECT
//   DATE('2010/01/01') + INTERVAL (NR * 60) MINUTE AS mydate
// FROM (
//   SELECT d2.a*10+d1.a  AS nr FROM (
//    SELECT 0  a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 
//    UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8  UNION ALL SELECT 9) AS d1
//    CROSS JOIN (
//    SELECT 0 a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4  ) AS d2
// WHERE d2.a*10+d1.a BETWEEN 0 AND 47
// ) AS parameter
// ORDER BY nr

// with digit as (
//     select 0 as d union all 
//     select 1 union all select 2 union all select 3 union all
//     select 4 union all select 5 union all select 6 union all
//     select 7 union all select 8 union all select 9        
// ),
// seq as (
//     select a.d + (10 * b.d) + (100 * c.d) + (1000 * d.d) as num
//     from digit a
//         cross join
//         digit b
//         cross join
//         digit c
//         cross join
//         digit d
//     order by 1        
// )
// select current_date - seq.num as "Date"
// from seq;