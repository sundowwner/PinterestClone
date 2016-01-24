"use strict";
namespace app.Controllers {
    export class BoardDetailsController {
        public board;
        public pin;

        public addPin() {
            this.pin.board = this.board._id
            this.PinService.savePin(this.pin).then((res) => {
                this.board.pins.push(res);
            });
        }

        public deletePin(pin)   {
            this.PinService.deletePin(pin).then((res) => {
                this.board.pins.splice(this.board.pins.indexOf(pin), 1);
            });
        }

        constructor(
            private HomeService: app.Services.HomeService,
            private PinService: app.Services.PinService,
            private $routeParams: ng.route.IRouteParamsService,
            private $location: ng.ILocationService
        ){
            this.board = HomeService.getBoard( $routeParams["id"]);
        }
    }
    angular.module("app").controller("BoardDetailsController",BoardDetailsController);
}
