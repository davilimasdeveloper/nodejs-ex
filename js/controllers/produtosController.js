angular.module("app").controller("produtosController", function ($scope, $http, $injector) {
    $scope.app = "Cadastro de Produto";
    $scope.produtos = [];
    $scope.produto = null;
    var ProdutoService = $injector.get('produtoAPI');
    function _carregarProduto() {
        ProdutoService.getProduto()
            .then(function (response) {
                $scope.produtos = response.data;
            })
            .catch(function (response) {
                $scope.mensagemErro = "Ocorreu um problema ao consultar os produto: "
                    + response.status + " - " + response.statusText + " " + response.data;
            });
    };

    $scope.salvarProduto = function (produto) {
        console.log(produto);
        //produto.data = '2018-01-15';
        _salvarProduto(produto);
    };

    function _salvarProduto(registroProduto) {
        ProdutoService.saveProduto(registroProduto)
            .then(function (response) {
                delete $scope.produto;
                $scope.produtoForm.$setPristine();
                _carregarProduto();
            })
            .catch(function (response) {
                $scope.mensagemErro = "Ocorreu um problema ao salvar o produto: "
                    + response.status + " - " + response.statusText + " " + response.data;
            });
    };

    function _removerProduto(produto) {
        ProdutoService.removeProduto(produto)
            .then(function (response) {

                //todo - verificar pq n carregou  

            })
            .catch(function (response) {
                $scope.mensagemErro = "Ocorreu um problema ao remover o produto: "
                    + response.status + " - " + response.statusText + " " + response.data;
                _carregarProduto();
            });

    }


    $scope.removerProduto = function (produto) {
        _removerProduto(produto);
    };

    $scope.editarProduto = function (produto) {
        produto.data = new Date(produto.data);
        $scope.produto = angular.copy(produto);
    };

    $scope.isProdutoSelecionado = function (produtos) {
        return produtos.some(function (produto) {
            return produto.selecionado;
        });
    };

    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    _carregarProduto();
});