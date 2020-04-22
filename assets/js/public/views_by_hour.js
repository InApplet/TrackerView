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
                borderColor: 'rgba(0,255,100,1)',
                backgroundColor: 'rgba(0,255,100,.3)',                
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
    var stringQuery = "SELECT%20hour(%20created_at%20)%20as%20hora%2C%20day(%20created_at%20)%20as%20dia%2CCONCAT(hour(%20created_at%20)%2C%20'%2F'%2C%20day(%20created_at%20))%20as%20date%2C%20created_at%2C%20count(id)%20as%20conta%20FROM%20%60events%60%20where%20ref_event%20%3D%201%20%20group%20by%20date%20LIMIT%2050";
    runQuery(stringQuery, 'showViewsByHour');
}

getViewsByHour();