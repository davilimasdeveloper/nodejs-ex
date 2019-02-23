angular.module("app").factory("respostaAPI", function ($http, configAPI) {
    var _getResposta = function () {
        return $http.get(configAPI.resourceResposta);
    };

    var _saveResposta = function (resposta) {
        if (!!resposta.idResposta) {
            return $http.put(configAPI.resourceResposta, resposta)
        }
        return $http.post(configAPI.resourceResposta, resposta);
    };

    var _removeResposta = function (respostaParaRemover) {
        var url = configAPI.resourceResposta + "/" + respostaParaRemover.idResposta;
        return $http.delete(url);
    }

    var _geraRespostaCotacao = function (geraCotacao) {
        return $http.post(configAPI.resourceResposta + "/gera-resposta", geraCotacao);
    };

    return {
        getResposta: _getResposta,
        saveResposta: _saveResposta,
        removeResposta: _removeResposta,
        geraRespostaCotacao: _geraRespostaCotacao
    };
});