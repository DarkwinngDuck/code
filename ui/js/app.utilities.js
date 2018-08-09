'use strict';

app.namespace('app.utilities');
app.namespace('app.utilities.global');

app.utilities = (function() {
    const tBody = document.getElementsByTagName('tbody')[0];
    const table = document.getElementsByClassName('table')[0];
    const config = app.chart.config.config;

    function displayTable(data) {
        if (tBody.children.length === 0) {
            updateTable(data);
        } else {
            let tr = document.getElementsByTagName('tr');
            let trArr = Array.prototype.slice.call(tr);
            trArr.splice(0, 1);
            for (let tr of trArr) {
                let tdKey = tr.children[0];
                let tdValue = tr.children[1];
                for (let key in data) {
                    if (data.hasOwnProperty(key) &&
                        (key === tdKey.textContent)) {
                        tdValue.textContent = data[key];
                    }
                }
            }
        }
    }

    function updateTable(data) {
        if (data) {
            table.style.display = 'table';
        }
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let tr = document.createElement('tr');
                let tdKey = document.createElement('td');
                let tdValue = document.createElement('td');
                let tdKeyText = document.createTextNode(key);
                let tdValueText = document.createTextNode(data[key]);
                tdKey.appendChild(tdKeyText);
                tdValue.appendChild(tdValueText);
                tr.appendChild(tdKey);
                tr.appendChild(tdValue);
                tBody.appendChild(tr);
            }
        }
    }

    function displayData(data) {
        let points = data.points;
        delete data.points;
        displayTable(data);
        let pointsLength = points.length;
        if (pointsLength === 1) {
            let pointX = points[0][0];
            let pointY = points[0][1];
            config.data.labels.push(pointX);
            config.data.datasets.forEach((dataset) => {
                dataset.data.push(pointY);
            });
            window.chart.update();
        } else {
            let i = pointsLength;
            while (i--) {
                let pointX = points[i][0];
                let pointY = points[i][1];
                config.data.labels.unshift(pointX);
                config.data.datasets.forEach((dataset) => {
                    dataset.data.unshift(pointY);
                });
                window.chart.update();
            }
        }
    }

    function updateForm(data) {
        let labels = document.getElementsByClassName('input-label');

        for (let label of labels) {
            label.classList.add('active');
        }

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof data[key] === 'boolean') {
                    document.getElementById(key).checked = data[key];
                } else {
                    document.getElementById(key)
                    .setAttribute('value', data[key]);
                }
            }
        }
    }
    /* function disableBtn(btn) {
        btn.classList.toggle('disabled', 'disabled-btn');
      }

      function enableBtn(btn) {
        btn.classList.remove('disabled', 'disabled-btn');
      } */
    return {
        updateTable: updateTable,
        displayTable: displayTable,
        displayData: displayData,
        updateForm: updateForm,
    };
})();


app.utilities.global = (function() {
    (function initSideNav() {
        const sideNav = document.getElementsByClassName('sidenav')[0];
        M.Sidenav.init(sideNav);
        const sideNavIns = M.Sidenav.getInstance(sideNav);

        document.getElementsByClassName('submit-btn')[0]
        .addEventListener('click', (event) => {
            sideNavIns.close();
        });
    })();
})();
