"use strict";
namespace app.Services {
    export class PinService {
        private pinResource;

        public getAll() {
            return this.pinResource.query()
        }
        public getPin(pinId)    {
            return this.pinResource.get({ id: pinId });
        }
        public savePin(pin) {
            return this.pinResource.save(pin).$promise;
        }
        public updatePin(pin)   {
            return this.pinResource.update({ id: pin._id }).$promise;
        }
        public deletePin(pin)   {
            return this.pinResource.delete({ id: pin._id }).$promise;
        }

        constructor(
            private $resource: ng.resource.IResourceService
        ){
            this.pinResource = $resource("/api/pins/:id", null, {
                "update": {method: "PUT"}
            });
        }
    }
    angular.module("app").service("PinService", PinService);
}
