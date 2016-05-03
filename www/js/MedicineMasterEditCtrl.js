/**
 * Created by debdeep.chaudhuri on 5/3/2016.
 */
angular.module('app.controllers')
  .controller('MedicineMasterEditCtrl', function($scope,$stateParams,$state,MedicineMasterService,$ionicPopup) {
    function ViewModel(Id,MedicineName,GenericName){
      this.Id=Id;
      this.MedicineName=MedicineName;
      this.GenericName=GenericName;
    }
    function SetDetails(Id) {
      var Medicine = MedicineMasterService.GetById(Id)
      console.log(Medicine);
      $scope.New= new ViewModel(Medicine.Id,Medicine.MedicineName,Medicine.GenericName)
    }
    function init(){
      if(typeof $stateParams.Id !='undefined' ){
        console.log($stateParams.Id);
        SetDetails($stateParams.Id);
      }
    }

    $scope.Put=function(NewItem) {
      var result = MedicineMasterService.Put(NewItem);
      if(result){
        $ionicPopup.alert({
          title: 'Success',
          template: 'Record saved successfully'
        });
        $state.go('menu.medicineMaster')
      }else{
        $ionicPopup.alert({
          title: 'Success',
          template: 'Record can not be saved'
        });
      }
    };
    init();
  })
