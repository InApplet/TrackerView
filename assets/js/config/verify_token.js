if(location.pathname != '/configuracoes/'){

    if((localStorage.getItem('trackview_token') == null) || (localStorage.getItem('trackview_slug') == null)){
        window.location = '/configuracoes/';
    }else{
        window.trackview_token = localStorage.getItem('trackview_token');
        window.trackview_slug = localStorage.getItem('trackview_slug');
    }

}