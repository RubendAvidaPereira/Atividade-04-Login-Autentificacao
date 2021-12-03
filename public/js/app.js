async function getBP() {
    const response = await fetch('/bp');
    const data = await response.json()

    let nome_bomba = document.getElementById("BP")
    let text = ""

    for (const bomba of data) {

        text +=
            `
            <div class="d-grid gap-2 col-12 mt-2">
                <a class="btn btn-outline-success" href="/bp/${bomba.bomba_combustivel}">${bomba.bomba_combustivel}</a>
            </div>
            `
    }
    nome_bomba.innerHTML = text
}

async function getGALP() {
    const response = await fetch('/galp');
    const data = await response.json();
    console.log(data)

    let nome_bomba = document.getElementById("galp")
    let text = ""

    for (const bomba of data) {
        text +=
            `
            <div class="d-grid gap-2 col-12 mt-2">
                <a class="btn btn-outline-danger" href="/galp/${bomba.bomba_combustivel}">${bomba.bomba_combustivel}</a>
            </div>
            `
    }
    nome_bomba.innerHTML = text
}
