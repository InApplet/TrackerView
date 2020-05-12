window.showViewsOriginModel = function ( data) {

    console.log(data);

    var rawRows = data['rows'];

    var dataValues = [];
    var labelValues = [];

    var html = '';

    for (const key in rawRows) {
        if (rawRows.hasOwnProperty(key)) {
            const element = rawRows[key];

            html += '<li class="text-break list-group-item d-flex justify-content-between align-items-center">'+element['value']+' <span class="badge badge-info badge-pill">'+element['conta']+'</span></li>';
        }
    }

    this.document.getElementById('viewListOriginMethod').innerHTML = html;
}

function getViewsOriginModel() {

    var date1 = sessionStorage.getItem('trackview_control_date1'),
        date2 = sessionStorage.getItem('trackview_control_date2'),
        filterDate = "DATE(u1.created_at) BETWEEN '"+date1+"' AND '"+date2+"'";

    var stringQuery = "SELECT count(u1.id) as conta, CONCAT(q1.value1, '_', q2.value2) as value FROM events AS u1 INNER JOIN (SELECT event_id, value as value1 FROM properties WHERE ref_propertie = 100) as q1 ON u1.id = q1.event_id INNER JOIN (SELECT event_id, value as value2 FROM properties WHERE ref_propertie = 101) as q2 ON u1.id = q2.event_id WHERE ref_event = 1 AND ("+filterDate+") GROUP BY value ORDER BY conta DESC";
    runQuery(stringQuery, 'showViewsOriginModel');
}

getViewsOriginModel();

/*

SELECT count(u1.id) as conta, CONCAT(q1.value1, '_', q2.value2) as value 
FROM events AS u1 
INNER JOIN (SELECT event_id, value as value1 FROM properties WHERE ref_propertie = 100) as q1 ON u1.id = q1.event_id 
INNER JOIN (SELECT event_id, value as value2 FROM properties WHERE ref_propertie = 101) as q2 ON u1.id = q2.event_id 
WHERE 
ref_event = 1 
GROUP BY value 
ORDER BY conta DESC

*/