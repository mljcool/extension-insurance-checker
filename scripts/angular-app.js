var delivcardDefaultData = [
  {
    id: '2618-3157',
    price: 25,
    requests: 5,
    pledge: 150,
    weight: 50,
    sender: 'Edward Norton',
    senderImg:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/deliv-sender.jpg',
    themeColor: 'purple',
    themeColorHex: '#BA68C8',
    bgImgUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/deliv-1.jpg',
    rating: 5,
    ratingCount: 26,
    fromStreet: 'W 90th St',
    fromCity: 'New York, NY 10025',
    toStreet: '46th Ave',
    toCity: 'Woodside, NY 11101',
    delivTime: '06:30 pm',
    delivDate: 'May 16, 2015',
    delivDateNoun: 'Today',
    reqDl: '24 minutes',
  },
  {
    id: '2618-3156',
    price: 37,
    requests: 7,
    pledge: 222,
    weight: 66,
    sender: 'Edward Norton',
    senderImg:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/deliv-sender.jpg',
    themeColor: 'green',
    themeColorHex: '#52A43A',
    bgImgUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/deliv-2.jpg',
    rating: 4,
    ratingCount: 21,
    fromStreet: 'W 85th St',
    fromCity: 'New York, NY 1025',
    toStreet: 'E 30th Ave',
    toCity: 'New York, NY 1001',
    delivTime: '07:30 am',
    delivDate: 'May 16, 2015',
    delivDateNoun: 'Today',
    reqDl: '33 minutes',
  },
  {
    id: '2618-3155',
    price: 12,
    requests: 3,
    pledge: 80,
    weight: 20,
    sender: 'Edward Norton',
    senderImg:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/deliv-sender.jpg',
    themeColor: 'orange',
    themeColorHex: '#F7AA17',
    bgImgUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/deliv-3.jpg',
    rating: 5,
    ratingCount: 15,
    fromStreet: 'W 79th St',
    fromCity: 'New York, NY 1024',
    toStreet: 'W 139th Ave',
    toCity: 'New York, NY 1030',
    delivTime: '09:22 pm',
    delivDate: 'May 16, 2015',
    delivDateNoun: 'Today',
    reqDl: '15 minutes',
  },
  {
    id: '2618-3154',
    price: 80,
    requests: 25,
    pledge: 550,
    weight: 250,
    sender: 'Edward Norton',
    senderImg:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/deliv-sender.jpg',
    themeColor: 'red',
    themeColorHex: '#EF5350',
    bgImgUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/deliv-4.jpg',
    rating: 5,
    ratingCount: 66,
    fromStreet: 'W 90th St',
    fromCity: 'New York, NY 125',
    toStreet: '46th Ave',
    toCity: 'Woodside, NY 11',
    delivTime: '06:30 pm',
    delivDate: 'May 16, 2015',
    delivDateNoun: 'Today',
    reqDl: '24 minutes',
  },
  {
    id: '2618-3153',
    price: 49,
    requests: 17,
    pledge: 299,
    weight: 149,
    sender: 'Edward Norton',
    senderImg:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/deliv-sender.jpg',
    themeColor: 'purple',
    themeColorHex: '#BA68C8',
    bgImgUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/deliv-5.jpg',
    rating: 5,
    ratingCount: 26,
    fromStreet: 'W 90th St',
    fromCity: 'New York, NY 1025',
    toStreet: '46th Ave',
    toCity: 'Woodside, NY 11101',
    delivTime: '06:30 pm',
    delivDate: 'May 16, 2015',
    delivDateNoun: 'Today',
    reqDl: '24 minutes',
  },
];

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
  $scope.hasData = true;
  $scope.cards = delivcardDefaultData;
  // $scope.insuranceList = [];
  $scope.insuranceList = [
    {
      clientDetails: {
        clientId: 1,
        ClientFirstName: 'Frank',
        ClientLastName: 'Beans',
      },
      insurers: [
        {
          ProviderID: 1,
          ProviderName: 'AIA',
          coverName: 'Life Cover',
          TotalPremiums: '$15000',
        },
        {
          ProviderID: 6,
          ProviderName: 'Partners Life',
          coverName: 'Trauma Cover',
          TotalPremiums: '$17000',
        },
      ],
    },
    {
      clientDetails: {
        clientId: 2,
        ClientFirstName: 'Sarah',
        ClientLastName: 'Dawn',
      },
      insurers: [
        {
          ProviderID: 1,
          ProviderName: 'AIA',
          coverName: 'Life Cover',
          TotalPremiums: '$15000',
        },
        {
          ProviderID: 6,
          ProviderName: 'Partners Life',
          coverName: 'Trauma Cover',
          TotalPremiums: '$17000',
        },
      ],
    },
  ];

  $scope.viewDetails = (data) => {
    console.log('viewDetails', data);
    var w = 450;
    var h = 850;
    const left = screen.width / 2 - w / 2;
    const top = screen.height / 2 - h / 2;
    chrome.windows.create({
      url:
        chrome.extension.getURL('insurer-details.html') + '?sample=' + 'MARK',
      type: 'panel',
      height: 650,
      width: 450,
      left: left,
      top: top,
    });
  };

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

  $scope.getClientData = () => {
    setTimeout(() => {
      chrome.storage.local.get('clientsInsaApp', function(items) {
        if (!!items) {
          $scope.hasData = true;
          $scope.isResync = false;
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
  };

  $scope.toggleProfile = function() {
    $scope.isHideProfile = !$scope.isHideProfile;
  };
  $scope.getClientData();

  $scope.isResync = false;
  $scope.resyncData = () => {
    $scope.isResync = true;
    chrome.notifications.clear('OFF', () => {
      chrome.runtime.sendMessage('', {
        type: 'notification',
        notificationId: 'ON',
        options: notifOptions({
          title: 'Insurance checker is running.',
          message: 'checking all providers for clients.',
        }),
      });
    });
    $scope.getClientData();
    setTimeout(() => {
      getScopeFromPage();
      clearStatusNotifications();
    }, 500);
  };

  // listner from myCrm

  // chrome.storage.local.get('sampleCool', function(items) {
  //   $scope.message = items;
  //   $scope.$apply();
  // });
  // chrome.runtime.onMessage.addListener((message) => {
  //   if (message.senderFrom === 'myCRM') {
  //     chrome.storage.local.get('sampleCool', function(items) {
  //       $scope.message = items;
  //       $scope.$apply();
  //     });
  //   }
  // });
});
