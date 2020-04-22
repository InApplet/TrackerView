window.showViewsListUrl = function ( data) {
    console.log(data);

    var rawRows = data['rows'];

    var dataValues = [];
    var labelValues = [];

    var html = '';

    for (const key in rawRows) {
        if (rawRows.hasOwnProperty(key)) {
            const element = rawRows[key];
            console.log(element);

            html += '<li class="text-break list-group-item d-flex justify-content-between align-items-center">'+element['value']+' <span class="badge badge-primary badge-pill">'+element['conta']+'</span></li>';

        }
    }

    this.document.getElementById('viewListUrlDiv').innerHTML = html;


    
}

function getViewsListUrl() {
    var stringQuery = "SELECT%20count(evt.id)%20as%20conta%2C%20ppt.value%20FROM%20%60properties%60%20as%20ppt%20INNER%20JOIN%20%60events%60%20as%20evt%20ON%20evt.id%20%3D%20ppt.event_id%20AND%20evt.ref_event%20%3D1%20where%20ppt.ref_propertie%20%3D%203%20group%20by%20ppt.value%20order%20by%20conta%20DESC%20LIMIT%205";
    runQuery(stringQuery, 'showViewsListUrl');
}

getViewsListUrl();