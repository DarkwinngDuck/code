'use strict';

app.namespace('app.data.display');

app.data.display = (function() {
    let get = app.ajax.get;
    let chart = app.chart.config.chart;
    let displayData = app.utilities.displayData;
    let btn = chart.btn;

    btn.addEventListener('click', (event) => {
        get(chart.url, displayData);
    });
})();
