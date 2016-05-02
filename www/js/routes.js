angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.addMedicineDetails', {
    url: '/add',
    views: {
      'side-menu21': {
        templateUrl: 'templates/addMedicineDetails.html',
        controller: 'MedicineDetailsCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.medicineMaster', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/medicineMaster.html',
        controller: 'medicineMasterCtrl'
      }
    }
  })

.state('menu.medicineStock', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/medicineStock.html',
        controller: 'MedicineDetailsCtrl'
      }
    }
  })
  /*.state('menu.medicineStock', {
    url: '/page5',
    templateUrl: 'templates/medicineStock.html',
    controller: 'medicineStockCtrl'
  })*/

$urlRouterProvider.otherwise('/side-menu21/page1')

  

});