document.getElementById('formConfig').addEventListener('submit', function(e){
    e.preventDefault();

    var tokenValue = document.getElementById('configInputToken').value;
    localStorage.setItem('trackview_token', tokenValue);

    var slugValue = document.getElementById('configInputSlug').value;
    localStorage.setItem('trackview_slug', slugValue);

    window.location = '/';
});