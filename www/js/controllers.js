angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {

})

.controller('medicineMasterCtrl', function($scope,MedicineMasterService,MedicineStockService,$ionicPopup) {
  function ViewModel(){
    this.Id=0;
    this.MedicineName='';
    this.GenericName='';
  }
    function init(){
      $scope.MedicineMasterCollection=[];
      $scope.MedicineMasterCollection =MedicineMasterService.GetAll();
      $scope.New = new ViewModel();
    }

    $scope.Post=function(NewItem) {
      if($scope.IsDuplicateName(NewItem.MedicineName)){
        $ionicPopup.alert({
          title: 'Duplicate Name Error',
          template: 'Medicine name already present.'
        });
      }
      else{
        NewItem.Id=0;
        var result = MedicineMasterService.Post(NewItem);
        if(result){
          $ionicPopup.alert({
            title: 'Success',
            template: 'Record saved successfully'
          });
          $scope.New = new ViewModel();
        }else{
          $ionicPopup.alert({
            title: 'Success',
            template: 'Record can not be saved'
          });
        }
      }
    };

    $scope.GetAll=function() {
         $scope.MedicineMasterCollection=[];
         var TempCollection =MedicineMasterService.GetAll();
        angular.forEach(TempCollection,function(v,k){
            $scope.MedicineMasterCollection.push(v);
        });
    };

    $scope.Delete=function(Item) {
        if($scope.IsInUse(Item)){
          $ionicPopup.alert({
            title: 'Reference Error',
            template: 'This record can not be deleted, reference found.'
          });
        }else{

          var confirm = $ionicPopup.confirm({
            title:'Confirm Delete',
            template:'Are you sure to delete !'
          });
          confirm.then(function(res){
            if(res){
              var result =  MedicineMasterService.Delete(Item.Id);
              if(result){
                $ionicPopup.alert({
                  title: 'Success',
                  template: 'Record deleted successfully'
                });
              }
              else{
                $ionicPopup.alert({
                  title: 'Error',
                  template: 'Record can not be deleted'
                });
              }

            }
          });
        }
    };

    $scope.IsInUse=function(Item){
    collection=[];
     collection = MedicineStockService.GetByMedicineName(Item.MedicineName);
    if(collection.length>0){
      return true
    }
    else {
      return false
    }
  }

    $scope.IsDuplicateName=function (MedicineName) {
      var result =false;
      angular.forEach($scope.MedicineMasterCollection,function (v,k) {
        if(v.MedicineName===MedicineName){
          result=true;
        }
      })
      return result;
    }

    init();
})

.controller('medicineStockCtrl', function($scope) {

});
