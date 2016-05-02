angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {

})
   
/*.controller('addMedicineDetailsCtrl', function($scope,MedicineMasterService) {
        function init(){
        $scope.MedicineMasterCollection=[];   
        var TempCollection =MedicineMasterService.GetAllMedicieMaster();
        angular.forEach(TempCollection,function(v,k){
            $scope.MedicineMasterCollection.push(v);            
        });
    }   
    
     init();  
})*/
      
.controller('medicineMasterCtrl', function($scope,MedicineMasterService,$ionicPopup) {
    //MedicineMasterService.DeleteMedicieMaster();
    function init(){
        $scope.MedicineMasterCollection=[];   
        var TempCollection =MedicineMasterService.GetAllMedicieMaster();
        angular.forEach(TempCollection,function(v,k){
            $scope.MedicineMasterCollection.push(v);            
        });
    }
    
    $scope.PostMedicieMaster=function(NewItem) {
        $scope.MedicineMasterCollection=[];        
        MedicineMasterService.PostMedicieMaster(NewItem);        
        NewItem.MedicineName='';
        NewItem.GenericName='';
        var TempCollection =MedicineMasterService.GetAllMedicieMaster();
        angular.forEach(TempCollection,function(v,k){
            $scope.MedicineMasterCollection.push(v);            
        });          
    };
    
    $scope.GetAllMedicieMaster=function() {    
         $scope.MedicineMasterCollection=[];   
         var TempCollection =MedicineMasterService.GetAllMedicieMaster();
        angular.forEach(TempCollection,function(v,k){
            $scope.MedicineMasterCollection.push(v);            
        });
    }; 
    
    $scope.DeleteRecord=function($index) {
        var confirm = $ionicPopup.confirm({
                title:'Confirm Delete',
                template:'Are you sure to delete !'
                });
                confirm.then(function(res){
                if(res){
                    var TempCollection = MedicineMasterService.DeleteRecord($index);
                        $scope.MedicineMasterCollection=[];
                        angular.forEach(TempCollection,function(v,k){
                                $scope.MedicineMasterCollection.push(v);            
                            });                     
                }               
                });    
        
    };  
     
    init();  
})
   
.controller('medicineStockCtrl', function($scope) {

});
 