angular.module("app").controller("respostaController", function ($scope, respostaAPI, cotacaoAPI) {
    $scope.tituloApp = "Lista de Resposta";
    $scope.respostas = [];
    $scope.cotacoes = [];
    $scope.fornecedor = null;

    var carregaCotacao = function () {
        cotacaoAPI.getCotacao()
            .then(function (response) {
                $scope.cotacoes = response.data;
            })
            .catch(function (response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErroCotacao = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    var carregarResposta = function () {
        respostaAPI.getResposta()
            .then(function (response) {
                $scope.respostas = response.data;
            })
            .catch(function (response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });


        // var resposta = {
        //     cotacaoResposta: {
        //         id: 10
        //     },
        //     nome: "Bruno",
        //     email: "Teste",
        //     endereco: "teste",
        //     telefone: "teste",
        //     cnpj: "teste",
        //     dataResposta: "2018-01-01",
        //     cotacao: {

        //         idCotacao: 12,
        //         descricao: "Compra de peças de bike 2",
        //         responsavel: "Daviiii",
        //         dataCotacao: "2018-12-15"

        //     },
        //     itens: [{
        //         cotacaoItem: {
        //             idCotacaoItem: 1,
        //             descricao: "Item 1",
        //             modelo: "Modelo II",
        //             quantidade: 10,
        //             produto: {
        //                 idProduto: 1,
        //                 descricao: "descricao atualizada",
        //                 nome: "nome",
        //                 preco: 10,
        //                 quantidade: 10,
        //                 tamanho: "tes",
        //                 data: "2018-01-15"
        //             }
        //         },
        //         idCotacaoRespostaItem: 10,
        //         marca: "teste",
        //         modelo: "teste",
        //         preco: 10,
        //         quantidade: 10,
        //         disponivel: "Sim"

        //     }
        //     ]
        // }
        // $scope.respostas.push(resposta);

    };

    $scope.adicionarResposta = function (resposta) {
        var novaResposta = angular.copy(resposta);
        respostaAPI.saveResposta(novaResposta)
            .then(function (response) {
                delete $scope.resposta;
                $scope.respostaForm.$setPristine();
                carregarResposta();
            })
            .catch(function (response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };

    $scope.geraRespostaCotacao = function (cotacao) {
        if (!confirm('Deseja incluir essa cotação para responder?')) {
            return;
        };
        var novaCotacao = angular.copy(cotacao);

        var geraCotacao = {
            cotacaoRepresentation: cotacao,
            fornecedorRepresentation: $scope.fornecedor
        }


        respostaAPI.geraRespostaCotacao(geraCotacao)
            .then(function (response) {
                carregarResposta();
            })
            .catch(function (response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
                carregarResposta();
            });
    }

    $scope.removerResposta = function (respostaParaRemover) {
        if (!confirm('Deseja realmente excluir?')) {
            return;
        };
        respostaAPI.removerResposta(respostaParaRemover)
            .then(function (response) {
                carregarResposta();
            })
            .catch(function (response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                $scope.mensagemDeErro = !!response.data.mensagem ? response.data.mensagem : mensagem;
            });
    };
    $scope.editarResposta = function (respostaParaEditar) {
        $scope.resposta = angular.copy(respostaParaEditar);
    };
    $scope.temRespostaSelecionado = function (resposta) {
        return resposta.some(function (item) {
            return item.selecionado;
        });
    };
    $scope.ordenarPor = function (nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregarResposta();
    carregaCotacao();
});