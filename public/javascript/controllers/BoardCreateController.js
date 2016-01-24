"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BoardCreateController = (function () {
            function BoardCreateController(HomeService, $location) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.board = {};
            }
            BoardCreateController.prototype.createBoard = function () {
                var _this = this;
                this.HomeService.saveBoard(this.board).then(function (res) {
                    _this.$location.path("/");
                });
            };
            return BoardCreateController;
        })();
        Controllers.BoardCreateController = BoardCreateController;
        angular.module("app").controller("BoardCreateController", BoardCreateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
