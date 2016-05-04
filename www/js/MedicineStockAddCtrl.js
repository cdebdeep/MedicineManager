/**
 * Created by debdeep.chaudhuri on 5/2/2016.
 */
angular.module('app.controllers')

.controller('MedicineStockAddCtrl', function($scope, $stateParams, $state,$ionicPopup, MedicineMasterService, MedicineStockService) {
    function ViewModel(){
        this.ItemId=0;
        this.MedicineName='';
        this.BatchNo='';
        this.PurchaseDate='';
        this.Quantity=0;
        this.ExpDate='';
        this.NotifyMeBefore=0;
        this.NotifyType='';
    }
        function init(){
            $state.forceReload();
            $scope.MedicineMasterCollection=[];
            var TempCollection =MedicineMasterService.GetAll();
            angular.forEach(TempCollection,function(v,k){
                $scope.MedicineMasterCollection.push(v);
            });

            $scope.MedicineStockCollection=MedicineStockService.GetAll();


            $scope.NotifyTypeCollection=[
                {'NotifyType':'hour'},
                {'NotifyType':'day'},
                {'NotifyType':'week'},
                {'NotifyType':'month'}
            ];
            $scope.New = new ViewModel();


        }
        init();
        $scope.Post=function (NewItem) {
            NewItem.ItemId=0;
           var promiseResult = MedicineStockService.PostItem(NewItem);
          promiseResult.then(function (result) {
            if(result){
              $ionicPopup.alert({
                title: 'Success',
                template: 'Record saved successfully'
              });
              $scope.New = new ViewModel();
            }else{
              $ionicPopup.alert({
                title: 'Error',
                template: 'Record can not be saved'
              });
            }
          }).catch(function (err) {
            console.log(err);
            $ionicPopup.alert({
              title: 'Error',
              template: 'Record can not be saved'
            });
          });
        };
        $scope.Put=function(Item) {
            var result =  MedicineStockService.PutItem(Item);
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

        };
        $scope.Delete=function (ItemId) {
            var confirm = $ionicPopup.confirm({
                title:'Confirm Delete',
                template:'Are you sure to delete !'
            });
            confirm.then(function(res){
                if(res){
                    var result =  MedicineStockService.DeleteItem(ItemId);
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
        };
        $scope.DeleteAll=function (Item) {
            var confirm = $ionicPopup.confirm({
                title:'Confirm Delete',
                template:'All records will be deleted, are you sure to continue!'
            });
            confirm.then(function(res){
                if(res){
                    MedicineStockService.DeleteAll();
                }
            });
        };

});
