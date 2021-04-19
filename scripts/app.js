var app = angular.module('AngularChromeEx', []);

app.config([
  '$compileProvider',
  function($compileProvider) {
    // ...
    $compileProvider.imgSrcSanitizationWhitelist(
      /^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/,
    );
  },
]);

app.controller('pagerCtrl', function($scope) {
  $scope.message = 'COOL ANGULAR WORKING';
  $scope.isHideProfile = false;
  $scope.insuranceList = [
    {
      clientId: 1,
      fname: 'Frank',
      lname: 'Beans',
      covers: [
        {
          id: 1,
          insurerName: 'AIA',
          coverName: 'Life Cover',
          coverPrice: '$15000',
        },
        {
          id: 6,
          insurerName: 'Partners Life',
          coverName: 'Trauma Cover',
          coverPrice: '$17000',
        },
      ],
    },
    {
      clientId: 2,
      fname: 'Anna',
      lname: 'Sthesia',
      covers: [
        {
          id: 1,
          insurerName: 'AIA',
          coverName: 'Life Cover',
          coverPrice: '$15000',
        },
        {
          id: 4,
          insurerName: 'Asteron',
          coverName: 'Trauma Cover',
          coverPrice: '$17000',
        },
      ],
    },
  ];

  $scope.toggleProfile = function() {
    $scope.isHideProfile = !$scope.isHideProfile;
  };
});
