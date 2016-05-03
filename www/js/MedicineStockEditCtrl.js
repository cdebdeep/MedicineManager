/**
 * Created by debdeep.chaudhuri on 5/3/2016.
 */
angular.module('app.controllers')

.controller('MedicineStockEditCtrl', function($scope, $stateParams, $ionicPopup, MedicineMasterService, MedicineStockService) {
    function ViewModel(ItemId,MedicineName,BatchNo,PurchaseDate,Quantity,ExpDate,NotifyMeBefore,NotifyType){
        this.ItemId=ItemId;
        this.MedicineName=MedicineName;
        this.BatchNo=BatchNo;
        this.PurchaseDate=new Date(PurchaseDate);
        this.Quantity=Quantity;
        this.ExpDate=new Date(ExpDate);
        this.NotifyMeBefore=NotifyMeBefore;
        this.NotifyType=NotifyType;
    }
    function SetDetails(ItemId) {
      var Medicine = MedicineStockService.GetById(ItemId)
      console.log(Medicine);
      $scope.New= new ViewModel(Medicine.ItemId,Medicine.MedicineName,Medicine.BatchNo,Medicine.PurchaseDate,Medicine.Quantity,
        Medicine.ExpDate,Medicine.NotifyMeBefore,Medicine.NotifyType)
    }
    function init(){
            if(typeof $stateParams.ItemId !='undefined' )   {
                console.log($stateParams.ItemId);
                SetDetails($stateParams.ItemId);
            }

          $scope.NotifyTypeCollection=[
                {'NotifyType':'hour'},
                {'NotifyType':'day'},
                {'NotifyType':'week'},
                {'NotifyType':'month'}
            ];
        }
    init();
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
                    title: 'Error',
                    template: 'Record can not be saved'
                });
            }

        }
})
