/**
 * Created by debdeep.chaudhuri on 5/2/2016.
 */
angular.module('app.services')
    .service('MedicineStockService',['$localStorage','$ionicPopup', function ($localStorage,$ionicPopup){
    var MedicineStockService={};
    $localStorage.$default({
            MedicineStockCollection: []
        });        
    MedicineStockService.GetAll=function () {        
            return $localStorage.MedicineStockCollection;
    }
    MedicineStockService.GetById=function (ItemId) {
        var obj=null;
        angular.forEach($localStorage.MedicineStockCollection,function (v,k) {
            if(v.ItemId==ItemId){
                obj=v;
            }
        })
        return obj;
    }
    MedicineStockService.GetByMedicineName=function (MedicineName) {
            var match=[];
            angular.forEach($localStorage.MedicineStockCollection,function (v,k) {
                if(v.MedicineName==MedicineName){
                    match.push(v);
                }
            })
            return match;
        }
    MedicineStockService.PostItem=function (NewItem) {
        $localStorage.MedicineStockCollection.push({
        ItemId:$localStorage.MedicineStockCollection.length+1,    
        MedicineName:NewItem.MedicineName,
        BatchNo:NewItem.BatchNo,
        PurchaseDate:NewItem.PurchaseDate,
        Quantity:NewItem.Quantity,
        ExpDate:NewItem.ExpDate,
        NotifyMeBefore:NewItem.NotifyMeBefore,
        NotifyType:NewItem.NotifyType
        });
        return true;
    }
    MedicineStockService.PutItem=function (Item) {
        var result =false;
        angular.forEach($localStorage.MedicineStockCollection,function (v,k) {
            if(v.ItemId===ItemId){
                v.MedicineName=tem.MedicineName,
                v.BatchNo=BatchNo,
                v.PurchaseDate=PurchaseDate,
                v.Quantity=Quantity,
                v.ExpDate=ExpDate,
                v.NotifyMeBefore=NotifyMeBefore,
                v.NotifyType=NotifyType

                result=true;
            }
        })
        return result;
        }
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
            
    }
    MedicineStockService.DeleteAll=function () {
        $localStorage.$reset({
            MedicineStockCollection: []
        });
        return true;
    }

        return MedicineStockService;
}]);
