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
  $scope.hasData = false;
  $scope.insuranceList = [];
  // $scope.insuranceList = [
  //   {
  //     clientId: 1,
  //     fname: 'Frank',
  //     lname: 'Beans',
  //     covers: [
  //       {
  //         id: 1,
  //         insurerName: 'AIA',
  //         coverName: 'Life Cover',
  //         coverPrice: '$15000',
  //       },
  //       {
  //         id: 6,
  //         insurerName: 'Partners Life',
  //         coverName: 'Trauma Cover',
  //         coverPrice: '$17000',
  //       },
  //     ],
  //   },
  //   {
  //     clientId: 2,
  //     fname: 'Anna',
  //     lname: 'Sthesia',
  //     covers: [
  //       {
  //         id: 1,
  //         insurerName: 'AIA',
  //         coverName: 'Life Cover',
  //         coverPrice: '$15000',
  //       },
  //       {
  //         id: 4,
  //         insurerName: 'Asteron',
  //         coverName: 'Trauma Cover',
  //         coverPrice: '$17000',
  //       },
  //     ],
  //   },
  // ];
  const arrayReverseObj = (obj) => {
    let newArray = [];

    Object.keys(obj)
      .sort()
      .reverse()
      .forEach((key, index) => {
        console.log(key);
        newArray.push({
          key: key,
          id: index,
          insurers: obj[key],
          clientDetails: obj[key][0],
        });
      });

    console.log(newArray);
    return newArray;
  };
  setTimeout(() => {
    chrome.storage.local.get('clientsInsaApp', function(items) {
      if (!!items) {
        $scope.hasData = true;
        const insuranceList = (items.clientsInsaApp || []).reduce(function(
          r,
          a,
        ) {
          r[a.InvitedClientID] = r[a.InvitedClientID] || [];
          r[a.InvitedClientID].push(a);
          return r;
        },
        Object.create(null));
        $scope.insuranceList = arrayReverseObj(insuranceList);
        console.log('scopescopescope clientsInsaApp', $scope.insuranceList);
      } else {
        $scope.hasData = false;
      }

      $scope.$apply();
    });
  }, 500);

  $scope.toggleProfile = function() {
    $scope.isHideProfile = !$scope.isHideProfile;
  };
});
