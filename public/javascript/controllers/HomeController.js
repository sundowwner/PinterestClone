'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(HomeService) {
                this.HomeService = HomeService;
                this.boards = HomeService.getAll();
            }
            HomeController.prototype.delete = function (id) {
                var _this = this;
                this.HomeService.deleteBoard(id).then(function (res) {
                    _this.boards = _this.boards.filter(function (b) { return b._id !== id; });
                });
            };
            return HomeController;
        })();
        Controllers.HomeController = HomeController;
        angular.module('app').controller('HomeController', HomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
