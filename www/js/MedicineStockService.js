/**
 * Created by debdeep.chaudhuri on 5/2/2016.
 */
angular.module('app.services')
    .service('MedicineStockService',['$localStorage','$q','$ionicPopup','SchedulerService', function ($localStorage,$q,$ionicPopup,SchedulerService){
    var MedicineStockService={};
    $localStorage.$default({
            MedicineStockCollection: []
        });
    MedicineStockService.GetAll=function () {
            return $localStorage.MedicineStockCollection;
    };
    MedicineStockService.GetById=function (ItemId) {
        var obj=null;
        angular.forEach($localStorage.MedicineStockCollection,function (v,k) {
            if(v.ItemId==ItemId){
                obj=v;
            }
        });
        return obj;
    };
    MedicineStockService.GetByMedicineName=function (MedicineName) {
            var match=[];
            angular.forEach($localStorage.MedicineStockCollection,function (v,k) {
                if(v.MedicineName==MedicineName){
                    match.push(v);
                }
            });
            return match;
        };
    MedicineStockService.PostItem=function (NewItem) {
        var retResult =false;
        var NewId=0;
        angular.forEach($localStorage.MedicineStockCollection,function (v,k) {
          if(v.Id>NewId){
            NewId=v.Id;
          }
        });
        NewId=NewId+1;
        var ScheduleStartDate = new Date();
        ScheduleStartDate.setDate(NewItem.ExpDate.getDate() -NewItem.NotifyMeBefore);
        console.log(ScheduleStartDate);
        var promiseResult = SchedulerService.Post(NewId,NewItem.NotifyType,ScheduleStartDate,new Date(),1);
       return promiseResult.then(function(result){
          if(result){
            $localStorage.MedicineStockCollection.push({
              ItemId:NewId,
              MedicineName:NewItem.MedicineName,
              BatchNo:NewItem.BatchNo,
              PurchaseDate:NewItem.PurchaseDate,
              Quantity:NewItem.Quantity,
              ExpDate:NewItem.ExpDate,
              NotifyMeBefore:NewItem.NotifyMeBefore,
              NotifyType:NewItem.NotifyType
            });
            retResult=true;
            return retResult;
          }
        });
    };
    MedicineStockService.PutItem=function (Item) {
        var retResult =false;
        var ScheduleStartDate = new Date();
        ScheduleStartDate.setDate(Item.ExpDate.getDate() -Item.NotifyMeBefore);
        var promiseResult = SchedulerService.Put(NewId,Item.NotifyType,ScheduleStartDate,new Date(),1);
      return promiseResult.then(function (result) {
        if(result){
          angular.forEach($localStorage.MedicineStockCollection,function (v,k) {
            if(v.ItemId===Item.ItemId){
              v.MedicineName=Item.MedicineName,
                v.BatchNo=Item.BatchNo,
                v.PurchaseDate=Item.PurchaseDate,
                v.Quantity=Item.Quantity,
                v.ExpDate=Item.ExpDate,
                v.NotifyMeBefore=Item.NotifyMeBefore,
                v.NotifyType=Item.NotifyType
                retResult=true;
            }
          });
          return retResult;
        }
      });
        };
    MedicineStockService.DeleteItem=function (ItemId) {
        var index=-1;
        for(var i=0;i<=$localStorage.MedicineStockCollection.length-1;i++){
            if($localStorage.MedicineStockCollection[i].ItemId==ItemId)
                index=i;
        }
        if(index>=0){
            $localStorage.MedicineStockCollection.splice(index,1);
            return true;
        }
        else
            return false;

    };
    MedicineStockService.DeleteAll=function () {
        $localStorage.$reset({
            MedicineStockCollection: []
        });
        return true;
    };

        return MedicineStockService;
}]);
