"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService($resource) {
                this.$resource = $resource;
                this.BoardResource = $resource("/boards/:id", null, {
                    "update": { method: "PUT" }
                });
            }
            HomeService.prototype.getAll = function () {
                return this.BoardResource.query();
            };
            HomeService.prototype.getBoard = function (boardId) {
                return this.BoardResource.get({ id: boardId });
            };
            HomeService.prototype.saveBoard = function (board) {
                return this.BoardResource.save(board).$promise;
            };
            HomeService.prototype.updateBoard = function (board) {
                return this.BoardResource.update({ id: board._id }, board).$promise;
            };
            HomeService.prototype.deleteBoard = function (boardId) {
                return this.BoardResource.delete({ _id: boardId }).$promise;
            };
            return HomeService;
        })();
        Services.HomeService = HomeService;
        angular.module('app').service('HomeService', HomeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
