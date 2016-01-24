'use strict';
namespace app.Controllers {
  export class HomeController {
      public boards;

      public delete(id) {
          this.HomeService.deleteBoard(id).then((res) =>{
              this.boards = this.boards.filter((b) => b._id !== id );
          });
      }
    constructor(private HomeService: app.Services.HomeService) {
                this.boards = HomeService.getAll();
    }
  }

  angular.module('app').controller('HomeController', HomeController);
}
