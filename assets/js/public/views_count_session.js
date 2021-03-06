window.showCountSession = function ( data) {
    console.log(data);

    var rawRows = data['rows'];

    var dataValues = [];
    var labelValues = [];

    var html = '';

    for (const key in rawRows) {
        if (rawRows.hasOwnProperty(key)) {
            const element = rawRows[key];

            this.console.log(element);

            document.getElementById('viewCountSession').innerText = element['count'];
        }
    }
}

function getViewsCountSession() {

    var date1 = sessionStorage.getItem('trackview_control_date1'),
        date2 = sessionStorage.getItem('trackview_control_date2'),
        filterDate = "DATE(created_at) BETWEEN '"+date1+"' AND '"+date2+"'";

    var stringQuery = "SELECT count(id) as `count` FROM `sessions` WHERE ("+filterDate+") ORDER BY id DESC ";
    runQuery(stringQuery, 'showCountSession');
}

getViewsCountSession();

/*

SELECT 
count(id) as `count` 
FROM 
`sessions` 
WHERE 
date(`created_at`) >= '2020-05-01' 
AND 
date(`created_at`) <= '2020-05-06' 
ORDER BY 
id DESC 
*/