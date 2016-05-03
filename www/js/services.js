angular.module('app.services', [])

    .factory('BlankFactory', [function () {

    }])

    .service('MedicineMasterService', ['$localStorage','$ionicPopup', function ($localStorage,$ionicPopup) {
        var MedicineMasterService = {};
        $localStorage = $localStorage.$default({
            MedicineMasterCollection: []
        });

        MedicineMasterService.Post = function (obj) {
          var result =false;
          var NewId=0;
            angular.forEach($localStorage.MedicineMasterCollection,function (v,k) {
              if(v.Id>NewId){
                NewId=v.Id;
              }
            });
          NewId=NewId+1;

            $localStorage.MedicineMasterCollection.push(
                {
                    Id:NewId,
                    MedicineName: obj.MedicineName,
                    GenericName: obj.GenericName
                });
                result=true;
            return result;
        };

        MedicineMasterService.Put = function (obj) {
        var result =false;
        angular.forEach($localStorage.MedicineMasterCollection,function (v,k) {
          if(v.Id===obj.Id){
            v.MedicineName=obj.MedicineName;
            v.GenericName=obj.GenericName;
            result=true;
          }
        });
          return result;
      };

        MedicineMasterService.Get = function (MedicineName) {
          var obj=null;
            angular.forEach($localStorage.MedicineMasterCollection, function (v, k) {
                if (v.MedicineName == MedicineName){
                  obj= v;
                }
            });
          return obj;
        };

        MedicineMasterService.GetById = function (Id) {
          var obj=null;
          angular.forEach($localStorage.MedicineMasterCollection, function (v, k) {
            if (v.Id === Id){
              obj= v;
            }
          });
          return obj;
      };

        MedicineMasterService.GetAll = function () {
            return $localStorage.MedicineMasterCollection;
        };

        MedicineMasterService.DeleteAll = function () {
          $localStorage.$reset({
            MedicineMasterCollection: []
          });
          return true;
        };

        MedicineMasterService.Delete=function (ItemId)  {
          var index=-1;
          for(var i=0;i<=$localStorage.MedicineMasterCollection.length-1;i++){
            if($localStorage.MedicineMasterCollection[i].Id==ItemId)
              index=i;
          }
          if(index>=0){
            $localStorage.MedicineMasterCollection.splice(index,1);
            return true;
          }
          else
            return false;
        };

        return MedicineMasterService;
    }]);

