const go_simples_bp = []
const go_aditivado_bp = []
const ga_simples_bp = []
const ga_aditivado_bp = []
const x_bp = []

const ga_simples_galp = []
const ga_aditivado_galp = []
const go_simples_galp = []
const go_aditivado_galp = []
const x_galp = []

Chart.defaults.color = "#fff"

async function draw_galp_bp() {

    const token = sessionStorage.getItem("token")
    const myInit = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const myRequest = new Request('/api/mais_informacoes/bp_galp', myInit)
    const response = await fetch(myRequest)
    
    if (response.status == 403){
        return false
    }
    else {
        const data = await response.json()

        for (const y of data[0]) {
            x_galp.push(y.bomba)
            let gasoleo_simples = y.gasoleo_simples.slice(0, 5).replace(",", ".")
            let gasolina_simples = y.gasolina_simples.slice(0, 5).replace(",", ".")
            let gasoleo_aditivado = y.gasoleo_especial.slice(0, 5).replace(",", ".")
            let gasolina_aditivado = y.gasolina_especial.slice(0, 5).replace(",", ".")
            ga_simples_galp.push(gasolina_simples)
            ga_aditivado_galp.push(gasolina_aditivado)
            go_simples_galp.push(gasoleo_simples)
            go_aditivado_galp.push(gasoleo_aditivado)
        }

        for (const x of data[1]) {
            if (x.bomba === undefined) {

            } else {
                x_bp.push(x.bomba)
                let gasoleo_simples = x.gasoleo_simples.slice(0, 5).replace(",", ".")
                let gasolina_simples = x.gasolina_simples.slice(0, 5).replace(",", ".")
                let gasoleo_aditivado = x.gasoleo_especial.slice(0, 5).replace(",", ".")
                let gasolina_aditivado = x.gasolina_especial.slice(0, 5).replace(",", ".")
                go_simples_bp.push(gasoleo_simples)
                go_aditivado_bp.push(gasoleo_aditivado)
                ga_simples_bp.push(gasolina_simples)
                ga_aditivado_bp.push(gasolina_aditivado)
            }
        }
        const reducer = (accumulator, curr) => parseFloat(accumulator) + parseFloat(curr)

        let media_ga_simples_bp = document.getElementById('media_gasolina_simples_bp')
        let media_ga_aditivada_bp = document.getElementById('media_gasolina_aditivada_bp')
        let media_go_simples_bp = document.getElementById('media_gasoleo_simples_bp')
        let media_go_aditivado_bp = document.getElementById('media_gasoleo_aditivado_bp')

        media_ga_simples_bp.innerHTML = (ga_simples_bp.reduce(reducer) / (parseFloat(ga_simples_bp.length - 1))).toFixed(3)
        media_ga_aditivada_bp.innerHTML = (ga_aditivado_bp.reduce(reducer) / (parseFloat(ga_aditivado_bp.length))).toFixed(3)
        media_go_simples_bp.innerHTML = (go_simples_bp.reduce(reducer) / (parseFloat(go_simples_bp.length))).toFixed(3)
        media_go_aditivado_bp.innerHTML = (go_aditivado_bp.reduce(reducer) / (parseFloat(go_aditivado_bp.length))).toFixed(3)

        let media_ga_simples_galp = document.getElementById('media_gasolina_simples_galp')
        let media_ga_aditivada_galp = document.getElementById('media_gasolina_aditivada_galp')
        let media_go_simples_galp = document.getElementById('media_gasoleo_simples_galp')
        let media_go_aditivado_galp = document.getElementById('media_gasoleo_aditivado_galp')

        media_ga_simples_galp.innerHTML = (ga_simples_galp.reduce(reducer) / (parseFloat(ga_simples_galp.length))).toFixed(3)
        media_ga_aditivada_galp.innerHTML = (ga_aditivado_galp.reduce(reducer) / (parseFloat(ga_aditivado_galp.length))).toFixed(3)
        media_go_simples_galp.innerHTML = (go_simples_galp.reduce(reducer) / (parseFloat(go_simples_galp.length))).toFixed(3)
        media_go_aditivado_galp.innerHTML = (go_aditivado_galp.reduce(reducer) / (parseFloat(go_aditivado_galp.length))).toFixed(3)

        const ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
            data: {
                datasets: [{
                    type: 'line',
                    label: 'Gasolina Simples',
                    data: ga_simples_bp,
                    backgroundColor: [
                        '#64cf007c',
                    ],
                    borderColor: [
                        '#64cf00',
                    ],
                    borderWidth: 1,
                }, {
                    type: 'line',
                    label: 'Gasolina Aditivada',
                    data: ga_aditivado_bp,
                    backgroundColor: [
                        '#f1790983',
                    ],
                    borderColor: [
                        '#f17909',
                    ],
                    borderWidth: 1,
                }, {
                    type: 'line',
                    label: 'Gasóleo Simples',
                    data: go_simples_bp,
                    backgroundColor: [
                        'rgba(255, 255, 255, 0.75)',
                    ],
                    borderColor: [
                        'rgba(255, 255, 255, 1)',
                    ],
                    borderWidth: 1,
                }, {
                    type: 'line',
                    label: 'Gasóleo Aditivado',
                    data: go_aditivado_bp,
                    backgroundColor: [
                        '#00bee096',
                    ],
                    borderColor: [
                        '#00bfe0',
                    ],
                    borderWidth: 1,
                }],
                labels: x_bp
            },
            options: {
                scales: {
                    yAxes: {
                        beginAtZero: true,
                        display: true,
                        type: 'linear',
                        min: 1.3,
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
                        display: true,
                        labels: {
                            font: {
                                weight: 'bold',
                                size: 14,
                            }
                        },
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

        const ctx1 = document.getElementById('chart2').getContext('2d');
        new Chart(ctx1, {
            data: {
                datasets: [{
                    type: 'line',
                    label: 'Gasolina Simples',
                    data: ga_simples_galp,
                    backgroundColor: [
                        '#64cf007c',
                    ],
                    borderColor: [
                        '#64cf00',
                    ],
                    borderWidth: 1,
                }, {
                    type: 'line',
                    label: 'Gasolina Aditivada',
                    data: ga_aditivado_galp,
                    backgroundColor: [
                        '#f1790983',
                    ],
                    borderColor: [
                        '#f17909',
                    ],
                    borderWidth: 1,
                }, {
                    type: 'line',
                    label: 'Gasóleo Simples',
                    data: go_simples_galp,
                    backgroundColor: [
                        'rgba(255, 255, 255, 0.75)',
                    ],
                    borderColor: [
                        'rgba(255, 255, 255, 1)',
                    ],
                    borderWidth: 1,
                }, {
                    type: 'line',
                    label: 'Gasóleo Aditivado',
                    data: go_aditivado_galp,
                    backgroundColor: [
                        '#00bee096',
                    ],
                    borderColor: [
                        '#00bfe0',
                    ],
                    borderWidth: 1,
                }],
                labels: x_galp
            },
            options: {
                scales: {
                    yAxes: {
                        beginAtZero: true,
                        display: true,
                        type: 'linear',
                        min: 1.3,
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
                        display: true,
                        labels: {
                            font: {
                                weight: 'bold',
                                size: 14,
                            }
                        }
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
    
}