"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BoardDetailsController = (function () {
            function BoardDetailsController(HomeService, PinService, $routeParams, $location) {
                this.HomeService = HomeService;
                this.PinService = PinService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.board = HomeService.getBoard($routeParams["id"]);
            }
            BoardDetailsController.prototype.addPin = function () {
                var _this = this;
                this.pin.board = this.board._id;
                this.PinService.savePin(this.pin).then(function (res) {
                    _this.board.pins.push(res);
                });
            };
            BoardDetailsController.prototype.deletePin = function (pin) {
                var _this = this;
                this.PinService.deletePin(pin).then(function (res) {
                    _this.board.pins.splice(_this.board.pins.indexOf(pin), 1);
                });
            };
            return BoardDetailsController;
        })();
        Controllers.BoardDetailsController = BoardDetailsController;
        angular.module("app").controller("BoardDetailsController", BoardDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
