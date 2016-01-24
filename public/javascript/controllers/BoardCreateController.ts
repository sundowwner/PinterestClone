"use strict";
namespace app.Controllers {
    export class BoardCreateController {
        public board = {};

        public createBoard()    {
            this.HomeService.saveBoard(this.board).then((res) => {
                this.$location.path("/")
            })
        }

        constructor(
            private HomeService: app.Services.HomeService,
            private $location: ng.ILocationService
        ){}
    }
    angular.module("app").controller("BoardCreateController", BoardCreateController);
}
