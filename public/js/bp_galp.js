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

async function draw_galp_bp() {

    const response = await fetch('/mais_informacoes/bp_galp')
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
                    'rgba(25, 135, 84, 0.2)',
                ],
                borderColor: [
                    'rgba(25, 135, 84, 1)',
                ],
                borderWidth: 1,
            }, {
                type: 'line',
                label: 'Gasolina Aditivada',
                data: ga_aditivado_bp,
                backgroundColor: [
                    'rgba(220, 53, 69, 0.2)',
                ],
                borderColor: [
                    'rgba(220, 53, 69, 1)',
                ],
                borderWidth: 1,
            }, {
                type: 'line',
                label: 'Gasóleo Simples',
                data: go_simples_bp,
                backgroundColor: [
                    'rgba(0, 0, 0, 0.2)',
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                ],
                borderWidth: 1,
            }, {
                type: 'line',
                label: 'Gasóleo Aditivado',
                data: go_aditivado_bp,
                backgroundColor: [
                    'rgba(13, 110, 253, 0.2)',
                ],
                borderColor: [
                    'rgba(13, 110, 253, 1)',
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

    const ctx1 = document.getElementById('chart2').getContext('2d');
    new Chart(ctx1, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Gasolina Simples',
                data: ga_simples_galp,
                backgroundColor: [
                    'rgba(25, 135, 84, 0.2)',
                ],
                borderColor: [
                    'rgba(25, 135, 84, 1)',
                ],
                borderWidth: 1,
            }, {
                type: 'line',
                label: 'Gasolina Aditivada',
                data: ga_aditivado_galp,
                backgroundColor: [
                    'rgba(220, 53, 69, 0.2)',
                ],
                borderColor: [
                    'rgba(220, 53, 69, 1)',
                ],
                borderWidth: 1,
            }, {
                type: 'line',
                label: 'Gasóleo Simples',
                data: go_simples_galp,
                backgroundColor: [
                    'rgba(0, 0, 0, 0.2)',
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                ],
                borderWidth: 1,
            }, {
                type: 'line',
                label: 'Gasóleo Aditivada',
                data: go_aditivado_galp,
                backgroundColor: [
                    'rgba(13, 110, 253, 0.2)',
                ],
                borderColor: [
                    'rgba(13, 110, 253, 1)',
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

window.addEventListener('load', async () => {
    await draw_galp_bp();

    if (!document.cookie.includes('gasolina')) {
        setTimeout(() => {
            document.cookie = 'gasolina=true';
            location.reload();
        }, 1000);
    }
});