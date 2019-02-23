angular.module("app").factory("produtoAPI", function ($http, configAPI) {
    var _getProduto = function () {
        return $http.get(configAPI.resourceProduto);
    };

    var _saveProduto = function (produto) {
        if (!!produto.idProduto) {
            return $http.put(configAPI.resourceProduto, produto)
        }
        return $http.post(configAPI.resourceProduto, produto);
    };

    var _removeProduto = function (produtoParaRemover) {
        var url = configAPI.resourceProduto + "/" + produtoParaRemover.idProduto;
        return $http.delete(url);
    }

    return {
        getProduto: _getProduto,
        saveProduto: _saveProduto,
        removeProduto: _removeProduto
    };
});