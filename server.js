require('dotenv').config();

const express = require('express');
const app = express();

// o mongoose é o que modela a nossa base de dados
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// para esconder o usuario e senha usa-se o .env e faz que nem o processo abaixo no mongoose.connect
mongoose.connect(process.env.CONNECTIONSTRING,
     /**  {useNewUrlParser: true, useUnifiedTopology: true} */
    {useFindAndModify: false})
.then(() => {
    console.log('MongoDB conectado.')
    app.emit('Mongo conectado')
})
.catch((error,req,res,next) => {
    console.log(error)
});
// session é pra identificar o navegador do cliente e os cookies
const session = require('express-session');
// salvar as sessoes em base de dados pq default iria salvar na memoria
const MongoStore = require('connect-mongo');
// mensagens autodestrutivas salvas em sessao 
const flash = require('connect-flash');


const routes = require('./routes') // rotas da APLICACAO
const path = require('path');// ajuda a trabalhar com os caminhos
const helmet = require('helmet'); 
app.use(helmet.referrerPolicy({ policy: ["origin", "unsafe-url"] }));
const csrf = require('csurf');// ajuda na seguranca
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet()) // irei comentar isso pois pode dar erro no localhost, porem em servidores normais é bom utilizar
// para a seguranca do sistema
app.use(express.urlencoded({extended: true})); // para poder transformar em objeto as requisicoes do body
// permite o envio de formularios para dentro da nossa aplicacao em forma de requisicao
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public'))); // define os estaticos da pagina
const sessionOptions = session({
    secret: 'afd275de276d0091de17bcead75f37', // random mesmo
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        //milisegundo*min*hora*dia*Qtd de dias
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure:false

    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // setando a pasta de views
 // forma absoluta - utilizando path e __dirname
app.set('view engine', 'ejs'); // setando a view engine 

app.use(csrf());

//nossos proprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError)
app.use(csrfMiddleware)
app.use(routes);

app.on('Mongo conectado', () => {
    app.listen(3000, () => {
    console.log('Servidor executando na porta 3000')
    })
})