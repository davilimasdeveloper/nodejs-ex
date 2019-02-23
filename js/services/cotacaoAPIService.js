angular.module("app").factory("cotacaoAPI", function ($http, configAPI) {
    var _getCotacao = function () {
        return $http.get(configAPI.resourceCotacao);
    };

    var _savarCotacao = function (cotacao) {
        if (!!cotacao.idCotacao) {
            return $http.put(configAPI.resourceCotacao, cotacao)
        }
        return $http.post(configAPI.resourceCotacao, cotacao);
    };

    var _removerCotacao = function (cotacaoParaRemover) {
        var url = configAPI.resourceCotacao + "/" + cotacaoParaRemover.idCotacao;
        return $http.delete(url);
    }

    return {
        getCotacao: _getCotacao,
        savarCotacao: _savarCotacao,
        removerCotacao: _removerCotacao
    };
});