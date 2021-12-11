Chart.defaults.color = "#fff"

const token = sessionStorage.getItem("token")
const myInit = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
}
const request_simples_aditivada = new Request('/api/mais_informacoes/galp/galp_gasolina', myInit)
const request_simples_aditivado = new Request('/api/mais_informacoes/galp/galp_gasoleo', myInit)
const request_gasoleo_simples = new Request('/api/mais_informacoes/galp/gasoleo_simples', myInit)
const request_gasoleo_aditivado = new Request('/api/mais_informacoes/galp/gasoleo_aditivado', myInit)
const request_gasolina_simples = new Request('/api/mais_informacoes/galp/gasolina_simples', myInit)
const request_gasolina_aditivada = new Request('/api/mais_informacoes/galp/gasolina_aditivada', myInit)

async function draw_simples_aditivada() {

    const response = await fetch(request_simples_aditivada)
    const data = await response.json()

    const simples = []
    const aditivado = []
    const x_label = []

    for (const y of data) {
        x_label.push(y.bomba)
        if (y.gasolina_simples === undefined) {
            let gasolina_simples = 0
            simples.push(gasolina_simples)
        }
        else if (y.gasolina_especial === undefined) {
            let gasolina_aditivada = 0
            aditivado.push(gasolina_aditivada)
        }
        else {
            let gasolina_simples = y.gasolina_simples.slice(0, 5).replace(",", ".")
            let gasolina_aditivada = y.gasolina_especial.slice(0, 5).replace(",", ".")
            simples.push(gasolina_simples)
            aditivado.push(gasolina_aditivada)
        }
    }

    const ctx = document.getElementById('chart6').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: x_label,
            datasets: [{
                label: 'Gasolina Simples',
                data: simples,
                backgroundColor: [
                    '#64cf007c',
                ],
                borderColor: [
                    '#64cf00',
                ],
                borderWidth: 1,
            }, {
                label: 'Gasolina Aditivada',
                data: aditivado,
                backgroundColor: [
                    '#f1790983',
                ],
                borderColor: [
                    '#f17909',
                ],
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                yAxes: {
                    beginAtZero: true,
                    display: true,
                    type: 'linear',
                    min: 1,
                    max: 1.95,
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                        stepSize: 0.005
                    }
                },
                xAxes: {
                    display: false,
                    grid: {
                        display: false,
                    },
                },
            },
            responsive: true,
            gridLines: {
                display: false
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            weight: 'bold',
                            size: 14,
                        }
                    },
                    display: true
                },
                tooltip: {
                    intersect: true,
                    bodyAlign: 'center',
                    cornerRadius: 5,
                    borderWidth: 0.2,
                    backgroundColor: '#757370',
                    borderColor: '#000000',
                    rtl: true,
                    xAlign: 'center',
                    yAlign: 'bottom',
                }
            },
        },
    });
}


async function draw_simples_aditivado() {

    const response = await fetch(request_simples_aditivado)
    const data = await response.json()

    const simples = []
    const aditivado = []
    const x_label = []

    for (const y of data) {
        x_label.push(y.bomba)
        let gasoleo_simples = y.gasoleo_simples.slice(0, 5).replace(",", ".")
        let gasoleo_aditivado = y.gasoleo_especial.slice(0, 5).replace(",", ".")
        simples.push(gasoleo_simples)
        aditivado.push(gasoleo_aditivado)
    }

    const ctx = document.getElementById('chart5').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: x_label,
            datasets: [{
                label: 'Gasóleo Simples',
                data: simples,
                backgroundColor: [
                    'rgba(255, 255, 255, 0.75)',
                ],
                borderColor: [
                    'rgba(255, 255, 255, 1)',
                ],
                borderWidth: 1,
            }, {
                label: 'Gasóleo Aditivado',
                data: aditivado,
                backgroundColor: [
                    '#00bee096',
                ],
                borderColor: [
                    '#00bfe0',
                ],
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                yAxes: {
                    beginAtZero: true,
                    display: true,
                    type: 'linear',
                    min: 1,
                    max: 1.95,
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                        stepSize: 0.005
                    }
                },
                xAxes: {
                    display: false,
                    grid: {
                        display: false,
                    },
                },
            },
            responsive: true,
            gridLines: {
                display: false
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            weight: 'bold',
                            size: 14,
                        }
                    },
                    display: true
                },
                tooltip: {
                    intersect: true,
                    bodyAlign: 'center',
                    cornerRadius: 5,
                    borderWidth: 0.2,
                    backgroundColor: '#757370',
                    borderColor: '#000000',
                    rtl: true,
                    xAlign: 'center',
                    yAlign: 'bottom',
                }
            },
        },
    });
}


async function draw_gasoleo_aditivado() {
    const response = await fetch(request_gasoleo_aditivado)
    const data = await response.json()

    const y_label = []
    const x_label = []

    for (const y of data) {
        x_label.push(y.bomba)
        let gasoleo = y.gasoleo_especial.slice(0, 5).replace(",", ".")
        y_label.push(gasoleo)
    }

    const ctx = document.getElementById("chart2").getContext('2d')
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: x_label,
            datasets: [{
                label: 'Gasóleo Aditivado',
                data: y_label,
                backgroundColor: [
                    '#00bee096',
                ],
                borderColor: [
                    '#00bfe0',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: {
                    beginAtZero: true,
                    display: true,
                    type: 'linear',
                    min: 1.55,
                    max: 1.75,
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                        stepSize: 0.005
                    }
                },
                xAxes: {
                    display: false,
                    grid: {
                        display: false,
                    },
                },
            },
            responsive: true,
            gridLines: {
                display: false
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            weight: 'bold',
                            size: 14,
                        }
                    },
                    display: true
                },
                tooltip: {
                    intersect: true,
                    bodyAlign: 'center',
                    cornerRadius: 5,
                    borderWidth: 0.2,
                    backgroundColor: '#757370',
                    borderColor: '#000000',
                    rtl: true,
                    xAlign: 'center',
                    yAlign: 'bottom',
                }
            },
        },
    });
}


async function draw_gasoleo_simples() {

    const response = await fetch(request_gasoleo_simples)
    const data = await response.json()

    const y_label = []
    const x_label = []

    for (const y of data) {
        x_label.push(y.bomba)
        let gasoleo = y.gasoleo_simples.slice(0, 5).replace(",", ".")
        y_label.push(gasoleo)
    }

    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: x_label,
            datasets: [{
                label: 'Gasóleo Simples',
                data: y_label,
                backgroundColor: [
                    'rgba(255, 255, 255, 0.75)',
                ],
                borderColor: [
                    'rgba(255, 255, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: {
                    beginAtZero: true,
                    display: true,
                    type: 'linear',
                    min: 1.55,
                    max: 1.75,
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                        stepSize: 0.005
                    }
                },
                xAxes: {
                    display: false,
                    grid: {
                        display: false,
                    },
                },
            },
            responsive: true,
            gridLines: {
                display: false
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            weight: 'bold',
                            size: 14,
                        }
                    },
                    display: true
                },
                tooltip: {
                    intersect: true,
                    bodyAlign: 'center',
                    cornerRadius: 5,
                    borderWidth: 0.2,
                    backgroundColor: '#757370',
                    borderColor: '#000000',
                    rtl: true,
                    xAlign: 'center',
                    yAlign: 'bottom',
                }
            },
        },
    });
}


async function draw_gasolina_simples() {

    const response = await fetch(request_gasolina_simples)
    const data = await response.json()

    const y_label = []
    const x_label = []

    for (const y of data) {
        x_label.push(y.bomba)
        if (y.gasolina_simples === undefined) {
            let gasoleo = 0
            y_label.push(gasoleo)
        }
        else {
            let gasoleo = y.gasolina_simples.slice(0, 5).replace(",", ".")
            y_label.push(gasoleo)
        }
    }

    const ctx = document.getElementById('chart3').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: x_label,
            datasets: [{
                label: 'Gasolina Simples',
                data: y_label,
                backgroundColor: [
                    '#64cf007c',
                ],
                borderColor: [
                    '#64cf00',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: {
                    beginAtZero: true,
                    display: true,
                    type: 'linear',
                    min: 1.65,
                    max: 1.95,
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                        stepSize: 0.005
                    }
                },
                xAxes: {
                    display: false,
                    grid: {
                        display: false,
                    },
                },
            },
            responsive: true,
            gridLines: {
                display: false
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            weight: 'bold',
                            size: 14,
                        }
                    },
                    display: true
                },
                tooltip: {
                    intersect: true,
                    bodyAlign: 'center',
                    cornerRadius: 5,
                    borderWidth: 0.2,
                    backgroundColor: '#757370',
                    borderColor: '#000000',
                    rtl: true,
                    xAlign: 'center',
                    yAlign: 'bottom',
                }
            },
        },
    });
}


async function draw_gasolina_aditivada() {

    const response = await fetch(request_gasolina_aditivada)
    const data = await response.json()
    console.log(data)

    const y_label = []
    const x_label = []

    for (const y of data) {
        console.log(y.gasolina_especial)
        x_label.push(y.bomba)
        let gasoleo = y.gasolina_especial.slice(0, 5).replace(",", ".")
        y_label.push(gasoleo)
    }

    const ctx = document.getElementById('chart4').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: x_label,
            datasets: [{
                label: 'Gasolina Aditivada',
                data: y_label,
                backgroundColor: [
                    '#f1790983',
                ],
                borderColor: [
                    '#f17909',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: {
                    beginAtZero: true,
                    display: true,
                    type: 'linear',
                    min: 1.65,
                    max: 1.95,
                    grid: {
                        display: false,
                    },
                    ticks: {
                        stepSize: 0.005
                    }
                },
                xAxes: {
                    display: false,
                    grid: {
                        display: false,
                    },
                },
            },
            responsive: true,
            gridLines: {
                display: false
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            weight: 'bold',
                            size: 14,
                        }
                    },
                    display: true
                },
                tooltip: {
                    intersect: true,
                    bodyAlign: 'center',
                    cornerRadius: 5,
                    borderWidth: 0.2,
                    backgroundColor: '#757370',
                    borderColor: '#000000',
                    rtl: true,
                    xAlign: 'center',
                    yAlign: 'bottom',
                }
            },
        },
    });
}


async function drawCharts() {
    await draw_simples_aditivada()
    await draw_simples_aditivado()
    await draw_gasoleo_simples()
    await draw_gasoleo_aditivado()
    await draw_gasolina_simples()
    await draw_gasolina_aditivada()
}
