window.showViewsListUrl = function ( data) {

    console.log(data);

    var rawRows = data['rows'];

    var dataValues = [];
    var labelValues = [];

    var html = '';

    for (const key in rawRows) {
        if (rawRows.hasOwnProperty(key)) {
            const element = rawRows[key];

            html += '<li class="text-break list-group-item d-flex justify-content-between align-items-center">'+element['value']+' <span class="badge badge-primary badge-pill">'+element['conta']+'</span></li>';

        }
    }

    document.getElementById('viewListMorePages').innerHTML = html;    
}

function getViewsListUrl() {
    
    var date1 = sessionStorage.getItem('trackview_control_date1'),
        date2 = sessionStorage.getItem('trackview_control_date2'),
        filterDate = "DATE(evt.created_at) BETWEEN '"+date1+"' AND '"+date2+"'";

    var stringQuery = "SELECT count(evt.id) as conta, ppt.value FROM `properties` as ppt INNER JOIN `events` as evt ON evt.id = ppt.event_id AND evt.ref_event =1 where ("+filterDate+") AND ppt.ref_propertie = 3 group by ppt.value order by conta DESC LIMIT 10";
    runQuery(stringQuery, 'showViewsListUrl');
}

getViewsListUrl();

/*

SELECT 
    count(evt.id) as conta, 
    ppt.value 
FROM 
    `properties` as ppt 
INNER JOIN 
    `events` as evt 
ON 
    evt.id = ppt.event_id 
    AND 
    evt.ref_event =1 
WHERE 
    ppt.ref_propertie = 3 
GROUP BY 
    ppt.value 
ORDER BY conta DESC 
LIMIT 5

*/