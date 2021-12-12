# Atividade 04 de Desenvolvimento Web

### API com Register e Login (Autenticação)
> Realizado por Ruben Pereira, nº30003325 \
> Professor Laércio Cruvinel \
> Engenharia Informática, Universidade Autónoma de Lisboa \

### Índice

1. Objetivo da Atividade
2. Dependências da Atividade
3. Introdução da Atividade
4. Utilização da Aplicação

### 1. Objetivo da Atividade
* Nesta atividade foi proposto a criação de um *frontend* para a API desenvolvida na Ativida 03. Além disso também será ncessário criar um portal de autenticação capaz de bloquear conteúdos específicos da API caso o utilizador não esteja autenticado.

### 2. Dependências da Atividade
* Para a realização desta atividade, o *backend* foi desenvolvido com a framework do `node.js` como temos vindo a aprender no decorrer do semestre na presente cadeira.
* Nesta atividade e na atividade 03, foi necessário a inclusão de várias bibliotecas de *javascript*. Ou seja, para a produção desta aplicação web/api foi necessária a instalação das seguintes dependências (as três primeiras foram necessárias para a atividade 03):
  * express.js -> Para a instalação `npm install express`
  * axios -> Para a instalação `npm install axios`
  * cheerio -> Para a instalação `npm install cheerio`
  * bcrypt -> Para a instalação `npm install bcrypt`
  * cors -> Para a instalação `npm install cors`
  * dotenv -> Para a instalação `npm install dotenv`
  * jsonwebtoken -> Para a instalação `npm install jsonwebtoken`
  * nedb -> Para a instalação `npm install nedb`
  * nodemon -> Para a instalação `npm install nodemon` (Esta dependência serve apenas para propósitos de desenvolvimento e não deve ser utilizada em produção)
  * Alternativamente, visto que o ficheiro **package.json** inclui todas as dependências necessárias, o comando `npm install` irá instalar automaticamente todas as dependências.

### 3. Introdução da Atividade
* Para esta atividade, a resolução proposta foi a seguinte: 
* Uma API capaz de fazer *scrape* de informação e entregar ao cliente num *frontend* intuitivo. O tema escolhido foi o preço dos combustíveis na região de Lisboa, com as bombas da BP e da Galp.
* O utilizador da aplicação web será capaz de ver os preços dos combustíveis, a morada e o horário de funcionamento de uma bomba em específico. Além disso tem 3 páginas adicionais para uma visualização interativa com base em gráficos com os preços respetivos. Uma página para compararar as bombas da BP e Galp em simultâneo e uma página dedicada a cada marca de combustíveis. 
* Além da informação a ser entregue, também foi criado um portal de autenticação, onde um utilizador é capaz de fazer login e logout como registar-se. 
* Nem todas as páginas e informação estão disponíveis para todos os utilizadores. Para aceder às páginas dos gráficos é necessária autenticar-se. Ou seja, proceder ao registo e login no website. O controlo do Login é feito no *client side* e no *server side*, isto permite uma responsividade maior, mas também inclui maior segurança.

### 4. Utilização da Aplicação
* A aplicação está em produção num container de Docker num Raspberry Pi, pode ser acedida pelo URL: nerdcave.pt:6500, caso o deploy seja feito na máquina pessoal o URL principal é 127.0.0.1:8080 ou localhost:8080.
* **Páginas Web da Aplicação:**
  * Página Inicial (url -> localhost:8080/)
  * Página de Informação de uma Bomba (url -> localhost:8080/bp/{nome_bomba} ou localhost:8080/galp/{nome_bomba})
  * Página de Comparação entre BP e Galp (url -> localhost:8080/bp_galp)
  * Página do Comparador da BP (url -> localhost:8080/comparador_bp)
  * Página do Comparador da Galp (url -> localhost:8080/comparador_galp)
  * Página Sobre (url -> localhost:8080/sobre)
* **Modal de Login e Modal de Registar**
  * Para fazer Login ou Registar basta clicar na barra de navegação nos links "Login" e "Registar". São apresentados duas janelas pequenas em pop-up onde o utilizador introduz o nome de utilizador da aplicação e a sua password. 
* **Consulta direta na API**
  * **Bombas da BP**
    * /bp
    * /bp/{nome_bomba}/mais_info
    * /mais_informacoes/bp/gasoleo_simples
    * /mais_informacoes/bp/gasoleo_aditivado
    * /mais_informacoes/bp/gasolina_simples
    * /mais_informacoes/bp/gasolina_aditivada
    * /mais_informacoes/bp/bp_gasoleo
    * /mais_informacoes/bp/bp_gasolina
  * **Bombas Galp**
    * /galp
    * /galp/{nome_bomba}/mais_info
    * /mais_informacoes/galp/gasoleo_simples
    * /mais_informacoes/galp/gasoleo_aditivado
    * /mais_informacoes/galp/gasolina_simples
    * /mais_informacoes/galp/gasolina_aditivada
    * /mais_informacoes/galp/bp_gasoleo
    * /mais_informacoes/galp/bp_gasolina
  * **Comparador BP vs Galp**
    * /mais_informacoes/bp_galp
  * **Login e Registo - Pedidos de POST**
    * Para a utilização destes terá que ser feito um pedido de POST com um body, aceder as estes URLs em específico não irá fazer nada pois não são pedidos de GET
    * /userRegister
    * /userLogin

