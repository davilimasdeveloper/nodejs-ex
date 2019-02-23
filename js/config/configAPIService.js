angular.module("app").value("configAPI", {
    resourceCotacao: "http://localhost:8080/api/cotacoes",
    resourceProduto: "http://localhost:8080/api/produtos",
    resourceResposta: "http://localhost:8080/api/cotacoes-respostas"
});