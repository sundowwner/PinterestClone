"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BoardUpdateController = (function () {
            function BoardUpdateController(HomeService, $location, $routeParams) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.board = HomeService.getBoard($routeParams["id"]);
            }
            BoardUpdateController.prototype.update = function (id) {
                var _this = this;
                this.HomeService.updateBoard(this.board).then(function (res) {
                    _this.$location.path("/");
                });
            };
            return BoardUpdateController;
        })();
        Controllers.BoardUpdateController = BoardUpdateController;
        angular.module("app").controller("BoardUpdateController", BoardUpdateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
