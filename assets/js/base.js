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

            }else{
                alert("Sem dados");
                return false;
            }
        }
    });

    xhr.open("GET", "https://api.inapplet.com/va/api/tenant/sql/?account_slug=" + window.trackview_slug + "&token=" + window.trackview_token + "&query=" + query);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

}