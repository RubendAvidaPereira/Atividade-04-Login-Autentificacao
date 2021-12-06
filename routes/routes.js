module.exports = app => {
    
    const controller = require("../controllers/controller_main_data.js") // Controlador da DATA 

    var router = require("express").Router() // Router do servidor

    // Pedidos ao controlador
    app.use('/api', router)

    //-------------------- Bombas BP
    router.get('/bp', controller.bp)

    //-------------------- Bombas GALP
    router.get('/galp', controller.galp)

    //-------------------- Bomba em especifico BP
    router.get('/bp/:bomba_combustivel/mais_info', controller.bomba_combustivel_bp)

    //-------------------- Bomba em especifico GALP
    router.get('/galp/:bomba_combustivel/mais_info', controller.bomba_combustivel_galp)

    /** PRECOS DOS COMBUSTIVEIS GALP
     * 
     * Gasoleo Simples e Aditivado
     * Gasolina Simples e Aditivada
     * 
     */
    router.get('/mais_informacoes/galp/gasoleo_simples', controller.gasoleo_simples_galp)

    router.get('/mais_informacoes/galp/gasoleo_aditivado', controller.gasoleo_aditivado_galp)

    router.get('/mais_informacoes/galp/gasolina_simples', controller.gasolina_simples_galp)

    router.get('/mais_informacoes/galp/gasolina_aditivada', controller.gasolina_aditivada_galp)

    router.get('/mais_informacoes/galp/galp_gasolina', controller.galp_gasolina)

    router.get('/mais_informacoes/galp/galp_gasoleo', controller.galp_gasoleo)

    /** PRECOS DOS COMBUSTIVEIS BP
     * 
     * Gasoleo Simples e Aditivado
     * Gasolina Simples e Aditivada
     * 
    */
    router.get('/mais_informacoes/bp/gasoleo_simples', controller.gasoleo_simples_bp)

    router.get('/mais_informacoes/bp/gasoleo_aditivado', controller.gasoleo_aditivado_bp)
 
    router.get('/mais_informacoes/bp/gasolina_simples', controller.gasolina_simples_bp)
 
    router.get('/mais_informacoes/bp/gasolina_aditivada', controller.gasolina_aditivada_bp)
 
    router.get('/mais_informacoes/bp/bp_gasolina', controller.bp_gasolina)
 
    router.get('/mais_informacoes/bp/bp_gasoleo', controller.bp_gasoleo)

    //-------------------- Pagina de Comparacao de Precos BP e GALP
    router.get('/mais_informacoes/bp_galp', controller.bp_vs_galp)

}