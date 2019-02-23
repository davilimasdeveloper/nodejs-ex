angular.module("app").controller("cotacaoController", function ($scope, cotacaoAPI, produtoAPI, respostaAPI) {
    $scope.tituloApp = "Lista de Cotações";
    $scope.cotacoes = [];
    $scope.produtos = [];
    $scope.resposta = [];
    $scope.cotacao = null;
    $scope.produtoInserir = null;
    $scope.indexList = null;
    var carregaCotacao = function () {
        cotacaoAPI.getCotacao()
            .then(function (response) {
                $scope.cotacoes = response.data;
            })
            .catch(function (response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };
    var carregaProduto = function () {
        produtoAPI.getProduto()
            .then(function (response) {
                $scope.produtos = response.data;
            })
            .catch(function (response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = mensagem;
            });
    };

    $scope.adicionarItemLista = function (item) {
        if ($scope.indexList != undefined) {
            $scope.cotacao.itens.splice($scope.indexList, 1);
        }
        $scope.cotacao.itens.push(item);
        $scope.produtoInserir = null;
        $scope.indexList = null;
    }

    $scope.editaItemLista = function (item, index) {
        $scope.produtoInserir = angular.copy(item);
        $scope.indexList = index;
    }

    $scope.excluirItemLista = function (index) {
        $scope.cotacao.itens.splice(index, 1);
    }


    $scope.adicionarCotacao = function (cotacao) {
        var novaCotacao = angular.copy(cotacao);
        cotacaoAPI.savarCotacao(novaCotacao)
            .then(function (response) {
                delete $scope.cotacao;
                $scope.cotacaoForm.$setPristine();
                carregaCotacao();
            })
            .catch(function (response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    $scope.removerCotacao = function (cotacaoParaRemover) {
        if (!confirm('Deseja realmente excluir?')) {
            return;
        };
        cotacaoAPI.removerCotacao(cotacaoParaRemover)
            .then(function (response) {

            })
            .catch(function (response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
                carregaCotacao();
            });
    };

    $scope.verRespostasItem = function (item) {
        respostaAPI.getResposta()
            .then(function (response) {
                $scope.respostas = response.data;
                $scope.resposta = $scope.respostas[0];
            })
            .catch(function (response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    }

    $scope.editarCotacao = function (cotacaoParaEditar) {
        cotacaoParaEditar.dataCotacao = new Date(cotacaoParaEditar.dataCotacao);
        $scope.cotacao = angular.copy(cotacaoParaEditar);
        $scope.produtoInserir = null;
        $scope.indexList = null;
    };
    $scope.temCotacaoSelecionado = function (cotacao) {
        return cotacao.some(function (item) {
            return item.selecionado;
        });
    };
    $scope.ordenarPor = function (nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregaCotacao();
    carregaProduto();
});