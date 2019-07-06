module.exports = {
    server: {
        HOST     : 'localhost',
        PORT     : 3636
    },
    database    : {
        url     : 'mongodb://localhost:27017/pizza-orderring',
        urlCloud: 'mongodb+srv://ngocduy799:maimaiyem250912@pizzaorderclouddb-bvcbc.mongodb.net/PizzaOrder?retryWrites=true&w=majority',

    },
    auth         : {
        secretKey: 'wecandoeverything'
    },
    
}