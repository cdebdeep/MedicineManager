/**
 * Created by debdeep.chaudhuri on 5/2/2016.
 */
angular.module('app.controllers')

.controller('MedicineDetailsCtrl', function($scope,$ionicPopup,MedicineMasterService,MedicineStockService) {
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
            $scope.MedicineMasterCollection=[];
            var TempCollection =MedicineMasterService.GetAllMedicieMaster();
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
            /*var model ={};
            model.ItemId=0;
            model.MedicineName='';
            model.BatchNo='';
            model.PurchaseDate='';
            model.Quantity=0;
            model.ExpDate='';
            model.NotifyMeBefore=0;
            model.NotifyType='';
            $scope.New=model;*/
            $scope.New = new ViewModel();


        }
        init();
        $scope.Post=function (NewItem) {
            NewItem.ItemId=0;            
            var result = MedicineStockService.PostItem(NewItem);
            /*var model ={};
            model.ItemId=0;
            model.MedicineName='';
            model.BatchNo='';
            model.PurchaseDate='';
            model.Quantity=0;
            model.ExpDate='';
            model.NotifyMeBefore=0;
            model.NotifyType='';
            $scope.New=model;*/
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

        }
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
        }
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
        }

})