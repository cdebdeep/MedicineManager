angular.module('app.services', [])

    .factory('BlankFactory', [function () {

    }])

    .service('MedicineMasterService', ['$localStorage','$ionicPopup', function ($localStorage,$ionicPopup) {
        var MedicineMasterService = {};
        $localStorage = $localStorage.$default({
            MedicieMasterCollection: []
        });
        MedicineMasterService.PostMedicieMaster = function (obj) {
            $localStorage.MedicieMasterCollection.push(
                {
                    MedicineName: obj.MedicineName,
                    GenericName: obj.GenericName
                }
            );
            return $localStorage.MedicieMasterCollection;
        };
        MedicineMasterService.GetMedicieMaster = function (MedicineName) {
            angular.forEach($localStorage.MedicieMasterCollection, function (v, k) {
                if (v.MedicineName == MedicineName)
                    return v;
                else
                    return null;
            });

        };
        MedicineMasterService.GetAllMedicieMaster = function () {
            return $localStorage.MedicieMasterCollection;
        };
        MedicineMasterService.DeleteMedicieMaster = function () {
            $localStorage.MedicieMasterCollection = [];
        };
        MedicineMasterService.DeleteRecord=function ($index) {
            $localStorage.MedicieMasterCollection.splice($index,1);  
            return $localStorage.MedicieMasterCollection;           
            
                
  };
        return MedicineMasterService;
    }]);

