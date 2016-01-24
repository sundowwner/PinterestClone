"use strict";
namespace app.Controllers {
    export class BoardUpdateController {
        public board;

        public update(id)   {
            this.HomeService.updateBoard(this.board).then((res) => {
                this.$location.path("/");
            });
        }

        constructor(
            private HomeService: app.Services.HomeService,
            private $location: ng.ILocationService,
            private $routeParams: ng.route.IRouteParamsService
        ){
            this.board = HomeService.getBoard($routeParams["id"]);
        }
    }
    angular.module("app").controller("BoardUpdateController", BoardUpdateController)
}
