'use strict';

app.namespace('app.ajax');

app.ajax = (function() {
    function get(url, callback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                callback(JSON.parse(request.responseText));
            }
        };
        request.open('GET', url, true);
        request.send(null);
    }

    function postPut(type, url, body) {
        let request = new XMLHttpRequest();
        /* request.onload = function () {
            callback(JSON.parse(request.responseText));
        }; */
        request.open(type, url, true);
        request.setRequestHeader('Content-type', 'application/json');
        request.send(body);
    }
    return {
        get: get,
        postPut: postPut,
    };
})();
