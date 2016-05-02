/**
 * Created by debdeep.chaudhuri on 5/2/2016.
 */
angular.module('app.controllers')

.controller('MedicineDetailsCtrl', function($scope,MedicineMasterService,MedicineStockService) {

        function init(){
            $scope.MedicineMasterCollection=[];
            var TempCollection =MedicineMasterService.GetAllMedicieMaster();
            angular.forEach(TempCollection,function(v,k){
                $scope.MedicineMasterCollection.push(v);
            });
            console.log($scope.MedicineMasterCollection);    
            
            $scope.NotifyTypeCollection=[
                {'NotifyType':'hour'},
                {'NotifyType':'day'},
                {'NotifyType':'week'},
                {'NotifyType':'month'}
            ];
            var model ={};
            model.ItemId=0;
            model.MedicineName='';
            model.BatchNo='';
            model.PurchaseDate='';
            model.Quantity=0;
            model.ExpDate='';
            model.NotifyMeBefore=0;
            model.NotifyType='';
            $scope.New=model;

            $scope.MedicineStockCollection=MedicineStockService.GetAll();
        }
        init();
        $scope.Post=function (NewItem) {
            NewItem.ItemId=0;
            console.log(NewItem);
            MedicineStockService.PutItem(NewItem);
            
        }
        $scope.Put=function(Item) {            
            MedicineStockService.PutItem(Item);
    
        }
        $scope.Delete=function (Item) {
            MedicineStockService.DeleteItem(Item.ItemId);
        }
        $scope.DeleteAll=function (Item) {
            MedicineStockService.DeleteAll();
        }
})