function getDateCalendar(minusDays = 0){

    var d1 = new Date();
    d1.setDate(d1.getDate() + minusDays);
    console.log(d1);

    var day = d1.getDate(),
        month = d1.getMonth() + 1,
        year = d1.getFullYear();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;

    var today = year + "-" + month + "-" + day;

    return today;

}

function runQuery(query, callback){

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            data = JSON.parse(this.responseText);
            // console.log(data);
            
            if(data['status'] != 'success'){
                alert('Erro ao carregar os dados');
                return false;
            }
            
            var data = data['data'];

            if(data['success']['empty'] == false){
                window[callback](data['success']);
                return data['success'];

            }
            return false;
        }
    });

    xhr.open("GET", "https://api.inapplet.com/va/api/tenant/sql/?account_slug=" + window.trackview_slug + "&token=" + window.trackview_token + "&query=" + query);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

}