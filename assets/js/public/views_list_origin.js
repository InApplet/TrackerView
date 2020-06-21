window.showViewsOrigin = function ( data) {

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

    this.document.getElementById('viewListOrigin').innerHTML = html;    
}

function getViewsOrigin() {

    var source_id = localStorage.getItem('trackview_source_id');

    if(source_id == false){
        return false;
    }

    var date1 = sessionStorage.getItem('trackview_control_date1'),
        date2 = sessionStorage.getItem('trackview_control_date2'),
        filterDate = "DATE(created_at) BETWEEN '"+date1+"' AND '"+date2+"'";

    var stringQuery = "SELECT count(id) as conta, value  FROM `properties` WHERE `ref_propertie` = "+source_id+" AND ("+filterDate+") GROUP BY `value` ORDER BY conta DESC";
    runQuery(stringQuery, 'showViewsOrigin');
}

getViewsOrigin();

/*
SELECT 
    count(id) as conta, 
    value  
FROM 
    `properties` 
WHERE 
    `ref_propertie` = 100 
GROUP BY 
    `value` 
ORDER BY 
    conta DESC
*/