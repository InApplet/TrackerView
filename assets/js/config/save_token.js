window.runGetFieldId = function ( data) {
    console.log(data);

    var rawRows = data['rows'];

    localStorage.setItem('trackview_source_id', false);
    localStorage.setItem('trackview_medium_id', false);

    if(data['empty']){
        window.location = '/';
        return false;
    }

    rawRows.forEach(element => {
        if(element['name'] == 'param_utm_source'){
            localStorage.setItem('trackview_source_id', element['id']);
        }

        if(element['name'] == 'param_utm_medium'){
            localStorage.setItem('trackview_medium_id', element['id']);
        }
    });

}

// function getFieldId(){
    var stringQuery = "SELECT id, name FROM `properties_list` where name = 'param_utm_source' OR name = 'param_utm_medium'";
    runQuery(stringQuery, 'runGetFieldId');
// }

document.getElementById('formConfig').addEventListener('submit', function(e){
    e.preventDefault();

    var tokenValue = document.getElementById('configInputToken').value;
    localStorage.setItem('trackview_token', tokenValue);

    var slugValue = document.getElementById('configInputSlug').value;
    localStorage.setItem('trackview_slug', slugValue);

    window.location = '/';
});