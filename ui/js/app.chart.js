'use strict';

app.namespace('app.chart.build');
app.namespace('app.chart.config');

app.chart.config = (function() {
    const lineColour = '#444555';
    const canvas = document.getElementsByTagName('canvas')[0];
    const config = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Requests done',
                borderColor: lineColour,
                data: [],
                borderWidth: 1,
            }],
            fill: true,
        },
        options: {
            elements: {
                point: {
                    radius: 0,
                },
            },
            responsive: true,
            title: {
                display: true,
                text: 'Results',
            },
            tooltips: {
                enabled: false,
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true,
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        callback: (dataLabel, index) => {
                            return index % 10 === 0 ? dataLabel : '';
                        },
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time',
                    },
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value',
                    },
                    gridLines: {
                        display: false,
                        zeroLineWidth: 1.5,
                    },
                }],
            },
        },
    };

    const chart = {
        btn: document.getElementsByClassName('buildchart-btn')[0],
        url: '/api/data',
        ctx: canvas.getContext('2d'),
    };

    return {
        chart: chart,
        config: config,
    };
})();

app.chart.build = (function() {
    let chartSerrings = app.chart.config;

    window.onload = (event) => {
        window.chart = new Chart(chartSerrings.chart.ctx, chartSerrings.config);
    };
})();
