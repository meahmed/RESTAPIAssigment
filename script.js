function getBatteryData() {
    axios.get('http://127.0.0.1:5000/api/batteries')
        .then(response => {
            const tableBody = document.getElementById('data');
            tableBody.innerHTML = "";
            const jsonData = response.data;
            const data = Object.values(jsonData);
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.facilityName}</td>
                    <td>${row.serialNumber}</td>
                    <td>${row.status}</td>
                    <td>${row.ahIn}</td>
                    <td>${row.ahOut}</td>
                    <td>${row.temperature}</td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error(error));
}
function getData() {
    var start_date = document.getElementById("start_date").value;
    var end_date = document.getElementById("end_date").value;
    if (start_date == "" || end_date == "" || (start_date > end_date)) {
        alert("Please enter correct value:");
        document.getElementById("start_date").value = "";
        document.getElementById("end_date").value = "";
        let chartStatus = Chart.getChart("myChart"); // <canvas> id
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
        document.querySelector("#forklift").innerHTML = "";
    }
    else {
        axios.post('http://127.0.0.1:5000/api/forklifts', {
            start_date: start_date,
            end_date: end_date
        })
            .then(response => {
                const data = response.data;
                let forkliftElement = document.querySelector("#forklift");

                // Append the forkliftdata string to the h2 element
                forkliftElement.innerHTML = "ID: " + data.forklift + ", Date Range: " + start_date + " - " + end_date;
                const dates = data.data.map(d => new Date(d.date).toLocaleString());
                const soc = data.data.map(d => d.soc);
                const maxTemp = data.data.map(d => d.maxTemp);
                const minTemp = data.data.map(d => d.minTemp);
                const maxAmpDraw = data.data.map(d => d.maxAmpDraw);
                const avgAmpDraw = data.data.map(d => d.avgAmpDraw);
                let chartStatus = Chart.getChart("myChart"); // <canvas> id
                if (chartStatus != undefined) {
                    chartStatus.destroy();
                }
                const chart = new Chart('myChart', {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [
                            {
                                label: 'SOC',
                                data: soc,
                                borderColor: 'blue',
                                fill: false,
                                yAxisID: 'y-axis-1'
                            },
                            {
                                label: 'Max Temperature',
                                data: maxTemp,
                                borderColor: 'red',
                                fill: false,
                                yAxisID: 'y-axis-2'
                            },
                            {
                                label: 'Min Temperature',
                                data: minTemp,
                                borderColor: 'green',
                                fill: false,
                                yAxisID: 'y-axis-2'
                            },
                            {
                                label: 'Max Amp Draw',
                                data: maxAmpDraw,
                                borderColor: 'purple',
                                fill: false,
                                yAxisID: 'y-axis-3'
                            },
                            {
                                label: 'Avg Amp Draw',
                                data: avgAmpDraw,
                                borderColor: 'orange',
                                fill: false,
                                yAxisID: 'y-axis-3'
                            }
                        ]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                type: 'time',
                                time: {
                                    unit: 'minute',
                                    tooltipFormat: 'YYYY-MM-DD HH:mm:ss'
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }],
                            yAxes: [
                                {
                                    id: 'y-axis-1',
                                    position: 'left',
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'SOC (%)'
                                    },
                                    ticks: {
                                        beginAtZero: true,
                                        max: 100
                                    }
                                },
                                {
                                    id: 'y-axis-2',
                                    position: 'right',
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Temperature (°C)'
                                    },
                                    ticks: {
                                        beginAtZero: false
                                    }
                                },
                                {
                                    id: 'y-axis-3',
                                    position: 'right',
                                    offset: true,
                                    scaleLabel: {
                                        display: true, labelString: 'Amp Draw (A)'
                                    },
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }
                            ]
                        }
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}