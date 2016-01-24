"use strict";
namespace app.Services {
  export class HomeService {
      public BoardResource;

      public getAll()   {
          return this.BoardResource.query()
      }
      public getBoard(boardId)  {
          return this.BoardResource.get({ id: boardId });
      }
      public saveBoard(board)   {
          return this.BoardResource.save(board).$promise;
      }
      public updateBoard(board) {
          return this.BoardResource.update({ id: board._id }, board).$promise;
      }
      public deleteBoard(boardId)   {
          return this.BoardResource.delete({ _id: boardId }).$promise;
      }


    constructor(
        private $resource: ng.resource.IResourceService
    ) {
        this.BoardResource = $resource("/boards/:id", null, {
            "update": { method: "PUT" }
        });
    }
  }

  angular.module('app').service('HomeService', HomeService);
}
