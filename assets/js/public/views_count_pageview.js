window.showCountPageview = function ( data) {
    console.log(data);

    var rawRows = data['rows'];

    var dataValues = [];
    var labelValues = [];

    var html = '';

    for (const key in rawRows) {
        if (rawRows.hasOwnProperty(key)) {
            const element = rawRows[key];

            this.console.log(element);

            document.getElementById('viewCountPageviews').innerText = element['count'];

        }
    }
}

function getViewsCountPageview() {

    var date1 = sessionStorage.getItem('trackview_control_date1'),
        date2 = sessionStorage.getItem('trackview_control_date2'),
        filterDate = "DATE(created_at) BETWEEN '"+date1+"' AND '"+date2+"'";

    var stringQuery = "SELECT count(id) as `count` FROM `events` WHERE `ref_event` = 1 AND ("+filterDate+") ORDER BY id DESC";
    runQuery(stringQuery, 'showCountPageview');
}

getViewsCountPageview();

/*

SELECT 
    count(id) 
FROM 
    `events` 
WHERE 
    `ref_event` = 1  
    AND 
    date(`created_at`) >= '2020-05-01' 
    AND 
    date(`created_at`) <= '2020-05-01' 
ORDER BY 
    id DESC 
*/