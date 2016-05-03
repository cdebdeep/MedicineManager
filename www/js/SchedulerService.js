/**
 * Created by debdeep.chaudhuri on 5/3/2016.
 */
angular.module('app.services')
  .service('SchedulerService',['$localStorage','$cordovaLocalNotification',function($localStorage,$cordovaLocalNotification) {
    var SchedulerService={};
    $localStorage.$default({
      ScheduleCollection: []
    });
    function ScheduleModel(Id,StockId,ScheduleType,ScheduleStartdate,ScheduleCreationDate,Status){
      this.Id=Id;
      this.StockId=StockId;
      this.ScheduleType=ScheduleType;
      this.ScheduleStartdate=ScheduleStartdate;
      this.ScheduleCreationDate=ScheduleCreationDate;
      this.Status=Status;
    }



    SchedulerService.Post=function(StockId,ScheduleType,ScheduleStartdate,ScheduleCreationDate,Status) {
      console.log('called')
      var result =false;
      var NewId=0;
      angular.forEach($localStorage.ScheduleCollection,function (v,k) {
        if(v.Id>NewId){
          NewId=v.Id;
        }
      });
      NewId=NewId+1;
      var NewItem = new ScheduleModel(NewId,StockId,ScheduleType,ScheduleStartdate,ScheduleCreationDate,Status)
      $cordovaLocalNotification.schedule({
        id: NewId,
        title: 'Notification Schedule',
        text: 'Your notification is schedule at' + ScheduleStartdate.toString(),
        led: "FFFF00",
        every: ScheduleType,
      }).then(function (result) {
        $localStorage.ScheduleCollection.push(NewItem);
        console.log($localStorage.ScheduleCollection);
        result =true;
      });
      return result;
    }

    SchedulerService.Put=function(StockId,ScheduleType,ScheduleStartdate,ScheduleCreationDate,Status) {
      var result =false;
      angular.forEach($localStorage.ScheduleCollection,function (v,k) {
        if(v.StockId===StockId){
          $cordovaLocalNotification.schedule({
            id: v.Id,
            title: 'Notification Schedule',
            text: 'Your notification is schedule at' + ScheduleStartdate.toString(),
            led: "FFFF00",
            every: ScheduleType,
          }).then(function (result) {
            v.ScheduleType=ScheduleType;
            v.ScheduleStartdate=ScheduleStartdate;
            v.ScheduleCreationDate=ScheduleCreationDate;
            v.Status=Status;
            result =true;
          });
        }
      });
      return result;
    }

    SchedulerService.Delete=function (StockId)  {
      var index=-1;
      var Id=-1;
      for(var i=0;i<=$localStorage.ScheduleCollection.length-1;i++){
        if($localStorage.ScheduleCollection[i].StockId==StockId){
          index=i;
          Id=$localStorage.ScheduleCollection[i].Id;
        }
      }
      if(index>=0 && Id>=0){
        $cordovaLocalNotification.cancel(1).then(function (result) {
          $localStorage.ScheduleCollection.splice(index,1);
          return true;
        })
      }
      else{
        return false;
      }
    };

    SchedulerService.DeleteAll = function () {
      var result =false;
      $cordovaLocalNotification.cancelAll().then(function (result) {
        $localStorage.$reset({
          ScheduleCollection: []
        });
        result =true;
      });
      return result;
    };
    return SchedulerService;
  }]);
