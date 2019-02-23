angular.module("app").config(AppConfig);

AppConfig.$inject = ['$routeProvider'];
function AppConfig($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .when('/cotacao', {
            templateUrl: 'views/cotacao.html',
            controller: 'cotacaoController'
        })

        .when('/resposta', {
            templateUrl: 'views/resposta.html',
            controller: 'respostaController'
        })

        .when('/produtos', {
            templateUrl: 'views/produtos.html',
            controller: 'produtosController'
        })
        .when('/meusContatos', {
            templateUrl: 'views/meusContatos.html'

        })
        .otherwise({ redirectTo: "/" });
}

