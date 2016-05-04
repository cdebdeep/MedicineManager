angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('menu', {
      url: '/side-menu21',
      templateUrl: 'templates/menu.html',
      abstract:true
    })  

  .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  }) 
  
  .state('menu.medicineMaster', {
      url: '/medicinemaster',
      views: {
        'side-menu21': {
          templateUrl: 'templates/MedicineMaster.html',
          controller: 'medicineMasterCtrl'
        }
      }
    }) 

    .state('menu.MedicineMasterEdit', {
      url: '/MedicineMasterEdit',
      params:{
        Id:null
      },
      views: {
        'side-menu21': {
          templateUrl: 'templates/MedicineMasterEdit.html',
          controller: 'MedicineMasterEditCtrl'
        }
      }
    })

  .state('menu.MedicineStock', {
      url: '/stock',
      views: {
        'side-menu21': {
          templateUrl: 'templates/MedicineStock.html',
          controller: 'MedicineStockAddCtrl'
        }
      }
    })

  .state('menu.MedicineStockAdd', {
    url: '/addstock',
    views: {
      'side-menu21': {
        templateUrl: 'templates/MedicineStockAdd.html',
        controller: 'MedicineStockAddCtrl'
      }
    }
  })

  .state('menu.EditMedicineDetails', {
    url: '/editstock',
    params:{
      ItemId:null
    },
    views: {
      'side-menu21': {
        templateUrl: 'templates/MedicineStockEdit.html',
        controller: 'MedicineStockEditCtrl'
      }
    }
  });


$urlRouterProvider.otherwise('/side-menu21/home');

});
