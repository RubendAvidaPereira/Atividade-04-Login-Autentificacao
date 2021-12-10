
// Pacotes necessários para fazer scrape de dados das bombas de combustível
const cheerio = require('cheerio');

const axios = require('axios');


//-------------------- Retribui ao Cliente um JSON com as bombas da BP de Lisboa
const bombas_bp = [] 
exports.bp = (req, res) => {
    if (bombas_bp.length === 0){
        //-------------------- Get Data BP
        axios.get('https://www.precocombustiveis.com/lisboa/lisboa/')
        .then((response) => {

            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("BP")', html).each(function () {
                const bomba_combustivel = $(this).text().trim()
                const url = $(this).attr('href')
                var uri = encodeURI(url)

                bombas_bp.push({
                    bomba_combustivel,
                    uri,
                })
            })
            res.json(bombas_bp)

        }).catch((err) => console.log(err))
    }
    else {
        res.json(bombas_bp)
    }
}


//-------------------- Retribui ao Cliente um JSON com as bombas da GALP de Lisboa
const bombas_galp = [] 
exports.galp = (req, res) => {
    if (bombas_galp.length === 0){
        //-------------------- Get Data Galp
        axios.get('https://www.precocombustiveis.com/lisboa/lisboa/')
        .then((response) => {

        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("GALP")', html).each(function () {
            const bomba_combustivel = $(this).text().trim()
            const url = $(this).attr('href')
            var uri = encodeURI(url)

            bombas_galp.push({
                bomba_combustivel,
                uri,
            })
        })
        res.json(bombas_galp)

        }).catch((err) => console.log(err))
    }
    else { 
        res.json(bombas_galp)
    }
}


//-------------------- Informação de uma Bomba em Específico da BP 
exports.bomba_combustivel_bp = (req, res) => {

    const info_bomba = []

    bombas_bp.forEach(bp => {
        if (bp.bomba_combustivel !== `${req.params.bomba_combustivel}`) {

        } else {
            axios.get(bp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    let scrape = $('#fala').children('div').children('div').first()

                    var horario_semana = $('span:contains("Segunda")').text()

                    var domingos = $('span:contains("Domingos")').text()

                    var bomba = $(`span:contains("${bp.bomba_combustivel}")`).text().trim()

                    var morada = $('address').children('p').children('span').text().slice(0, -6)

                    var gasoleo_simples =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().children('span').text().trim()

                    var gasoleo_especial =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().next().next().children('span').text().trim()

                    var gasolina_simples =
                        scrape.next().next().next().next().next().children('span').text().trim()

                    var gasolina_especial =
                        scrape.next().next().next().children('span').text().trim()

                    var gasolina_98 =
                        scrape.next().next().next().next().next().next().children('span').text().trim()

                    info_bomba.push({
                        bomba,
                        morada,
                        horario_semana,
                        domingos,
                        gasoleo_simples,
                        gasoleo_especial,
                        gasolina_simples,
                        gasolina_especial,
                        gasolina_98,
                    })
                    res.json(info_bomba)

                }).catch((err) => console.log(err))
        }
    })
}


//-------------------- Informação de uma Bomba em Específico da Galp 
exports.bomba_combustivel_galp = (req, res) => {

    const info_bomba = []

    bombas_galp.forEach(galp => {
        if (galp.bomba_combustivel !== `${req.params.bomba_combustivel}`) {

        } else {
            axios.get(galp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    let scrape = $('#fala').children('div').children('div').first()

                    var horario_semana = $('span:contains("Segunda")').text().trim()

                    var domingos = $('span:contains("Domingos")').text().trim()

                    var bomba = $(`span:contains("${galp.bomba_combustivel}")`).text().trim()

                    var morada = $('address').children('p').children('span').text().slice(0, -6)

                    var gasoleo_simples =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().children('span').text().trim()

                    var gasoleo_especial =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().next().next().children('span').text().trim()

                    var gasolina_simples =
                        scrape.next().next().next().children('span').text().trim()

                    var gasolina_especial =
                        scrape.next().next().next().next().next().children('span').text().trim()

                    var gasolina_98 =
                        scrape.next().next().next().next().next().next().children('span').text().trim()

                    info_bomba.push({
                        bomba,
                        morada,
                        horario_semana,
                        domingos,
                        gasoleo_simples,
                        gasoleo_especial,
                        gasolina_simples,
                        gasolina_especial,
                        gasolina_98,
                    })
                    res.json(info_bomba)
                }).catch((err) => console.log(err))
        }
    })
}


//-------------------- Precos das Bombas Galp
// Gasoleo Simples e Aditivado
const gasoleo_simples_precos = []
exports.gasoleo_simples_galp = (req, res) => {
    if (gasoleo_simples_precos.length === 0) {
        bombas_galp.forEach(galp => {
            axios.get(galp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    var bomba = galp.bomba_combustivel
                    var gasoleo_simples =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().children('span').text().trim()
                    gasoleo_simples_precos.push({
                        bomba,
                        gasoleo_simples
                    })
                }).catch((err) => console.log(err))
        })
        res.json(gasoleo_simples_precos)
    }
    else {
        res.json(gasoleo_simples_precos)
    }
}


const gasoleo_aditivado_precos = []
exports.gasoleo_aditivado_galp = (req, res) => {
    if (gasoleo_aditivado_precos.length === 0) {
        bombas_galp.forEach(galp => {
            axios.get(galp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    var bomba = galp.bomba_combustivel
                    var gasoleo_especial =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().next().next().children('span').text().trim()
                    gasoleo_aditivado_precos.push({
                        bomba,
                        gasoleo_especial
                    })
                }).catch((err) => console.log(err))
        })
        res.json(gasoleo_aditivado_precos)
    }
    else {
        res.json(gasoleo_aditivado_precos)
    }
}


// Gasolina Simples e Aditivada
const gasolina_simples_precos = []
exports.gasolina_simples_galp = (req, res) => {
    if (gasolina_simples_precos.length === 0) {
        bombas_galp.forEach(galp => {
            axios.get(galp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    let scrape = $('#fala').children('div').children('div').first()

                    var bomba = galp.bomba_combustivel
                    var gasolina_simples =
                        scrape.next().next().next().children('span').text().trim()
                    gasolina_simples_precos.push({
                        bomba,
                        gasolina_simples
                    })
                }).catch((err) => console.log(err))
        })
        res.json(gasolina_simples_precos)
    }
    else {
        res.json(gasolina_simples_precos)
    }
}

const gasolina_aditivada_precos = []
exports.gasolina_aditivada_galp = (req, res) => {
    if (gasolina_aditivada_precos.length === 0) {
        bombas_galp.forEach(galp => {
            axios.get(galp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    let scrape = $('#fala').children('div').children('div').first()

                    var bomba = galp.bomba_combustivel
                    var gasolina_especial =
                        scrape.next().next().next().next().next().children('span').text().trim()
                    gasolina_aditivada_precos.push({
                        bomba,
                        gasolina_especial
                    })
                }).catch((err) => console.log(err))
        })
        res.json(gasolina_aditivada_precos)
    }
    else {
        res.json(gasolina_aditivada_precos)
    }
}


const galp_gasolina = []
exports.galp_gasolina = (req, res) => {
    if (galp_gasolina.length === 0) {
        bombas_galp.forEach(bp => {
            axios.get(bp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    let scrape = $('#fala').children('div').children('div').first()

                    var bomba = bp.bomba_combustivel
                    var gasolina_simples =
                        scrape.next().next().next().next().next().children('span').text().trim()
                    var gasolina_especial =
                        scrape.next().next().next().children('span').text().trim()
                    galp_gasolina.push({
                        bomba,
                        gasolina_especial,
                        gasolina_simples
                    })
                }).catch((err) => console.log(err))
        })
        res.json(galp_gasolina)
    }
    else {
        res.json(galp_gasolina)
    }
}


const galp_gasoleo = []
exports.galp_gasoleo = (req, res) => {
    if (galp_gasoleo.length === 0) {
        bombas_galp.forEach(bp => {
            axios.get(bp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    var bomba = bp.bomba_combustivel
                    var gasoleo_simples =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().children('span').text().trim()
                    var gasoleo_especial =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().next().next().children('span').text().trim()
                    galp_gasoleo.push({
                        bomba,
                        gasoleo_simples,
                        gasoleo_especial
                    })
                }).catch((err) => console.log(err))
        })
        res.json(galp_gasoleo)
    }
    else {
        res.json(galp_gasoleo)
    }
}


//-------------------- Precos das Bombas BP
// Gasoleo Simples e Aditivado
const gasoleo_simples_preco = []
exports.gasoleo_simples_bp = (req, res) => {
    if (gasoleo_simples_preco.length === 0) {
        bombas_bp.forEach(bp => {
            axios.get(bp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    var bomba = bp.bomba_combustivel
                    var gasoleo_simples =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().children('span').text().trim()
                    gasoleo_simples_preco.push({
                        bomba,
                        gasoleo_simples
                    })
                }).catch((err) => console.log(err))
        })
        res.json(gasoleo_simples_preco)
    }
    else {
        res.json(gasoleo_simples_preco)
    }
}


const gasoleo_aditivado_preco = []
exports.gasoleo_aditivado_bp =  (req, res) => {
    if (gasoleo_aditivado_preco.length === 0) {
        bombas_bp.forEach(bp => {
            axios.get(bp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    var bomba = bp.bomba_combustivel
                    var gasoleo_especial =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().next().next().children('span').text().trim()
                    gasoleo_aditivado_preco.push({
                        bomba,
                        gasoleo_especial
                    })
                }).catch((err) => console.log(err))
        })
        res.json(gasoleo_aditivado_preco)
    }
    else {
        res.json(gasoleo_aditivado_preco)
    }
}


// Gasolina Simples e Aditivada
const gasolina_simples_preco = []
exports.gasolina_simples_bp = (req, res) => {
    if (gasolina_simples_preco.length === 0) {
        bombas_bp.forEach(bp => {
            axios.get(bp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    let scrape = $('#fala').children('div').children('div').first()

                    var bomba = bp.bomba_combustivel
                    var gasolina_simples =
                        scrape.next().next().next().next().next().children('span').text().trim()
                    gasolina_simples_preco.push({
                        bomba,
                        gasolina_simples
                    })
                }).catch((err) => console.log(err))
        })
        res.json(gasolina_simples_preco)
    }
    else {
        res.json(gasolina_simples_preco)
    }
}


const gasolina_aditivada_preco = []
exports.gasolina_aditivada_bp = (req, res) => {
    if (gasolina_aditivada_preco.length === 0) {
        bombas_bp.forEach(bp => {
            axios.get(bp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    let scrape = $('#fala').children('div').children('div').first()

                    var bomba = bp.bomba_combustivel
                    var gasolina_especial =
                        scrape.next().next().next().children('span').text().trim()
                    gasolina_aditivada_preco.push({
                        bomba,
                        gasolina_especial
                    })
                }).catch((err) => console.log(err))
        })
        res.json(gasolina_aditivada_preco)
    }
    else {
        res.json(gasolina_aditivada_preco)
    }
}


// Comparacao entre gasolina simples e aditivada
const info_gasolina = []
exports.bp_gasolina = (req, res) => {
    if (info_gasolina.length === 0) {
        bombas_bp.forEach(bp => {
            axios.get(bp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    let scrape = $('#fala').children('div').children('div').first()

                    var bomba = bp.bomba_combustivel
                    var gasolina_simples =
                        scrape.next().next().next().next().next().children('span').text().trim()
                    var gasolina_especial =
                        scrape.next().next().next().children('span').text().trim()
                    info_gasolina.push({
                        bomba,
                        gasolina_especial,
                        gasolina_simples
                    })
                }).catch((err) => console.log(err))
        })
        res.json(info_gasolina)
    }
    else {
        res.json(info_gasolina)
    }
}


// Comparação entre gasoleo simples e aditivado
const info_gasoleo = []
exports.bp_gasoleo = (req, res) => {
    if (info_gasoleo.length === 0) {
        bombas_bp.forEach(bp => {
            axios.get(bp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    var bomba = bp.bomba_combustivel
                    var gasoleo_simples =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().children('span').text().trim()
                    var gasoleo_especial =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().next().next().children('span').text().trim()
                    info_gasoleo.push({
                        bomba,
                        gasoleo_simples,
                        gasoleo_especial
                    })
                }).catch((err) => console.log(err))
        })
        res.json(info_gasoleo)
    }
    else {
        res.json(info_gasoleo)
    }
}


// BP vs Galp
const bombas_b = []
const bombas_g = []
exports.bp_vs_galp = (req, res) => {
    if (bombas_b.length === 0 && bombas_g.length === 0) {
        bombas_bp.forEach(bp => {
            axios.get(bp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    let scrape = $('#fala').children('div').children('div').first()

                    var bomba = bp.bomba_combustivel
                    var gasoleo_simples =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().children('span').text().trim()
                    var gasoleo_especial =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().next().next().children('span').text().trim()
                    var gasolina_simples =
                        scrape.next().next().next().next().next().children('span').text().trim()
                    var gasolina_especial =
                        scrape.next().next().next().children('span').text().trim()
                    bombas_b.push({
                        bomba,
                        gasoleo_simples,
                        gasoleo_especial,
                        gasolina_simples,
                        gasolina_especial
                    })
                    bombas_b.push(bomba)
                }).catch((err) => console.log(err))
        })
        bombas_galp.forEach(galp => {
            axios.get(galp.uri)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    let scrape = $('#fala').children('div').children('div').first()

                    bomba = galp.bomba_combustivel

                    var gasoleo_simples =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().children('span').text().trim()
                    var gasoleo_especial =
                        $('#fala')
                            .children('div')
                            .children('div')
                            .first().next().next().children('span').text().trim()
                    var gasolina_simples =
                        scrape.next().next().next().children('span').text().trim()
                    var gasolina_especial =
                        scrape.next().next().next().next().next().children('span').text().trim()
                    bombas_g.push({
                        bomba,
                        gasoleo_simples,
                        gasoleo_especial,
                        gasolina_simples,
                        gasolina_especial,
                    })
                }).catch((err) => console.log(err))
        })
        res.json([bombas_g, bombas_b])
    } else {
        res.json([bombas_g, bombas_b])
    }
}