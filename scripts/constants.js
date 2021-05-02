const sampleInsuranceLis = [
  {
    id: 1,
    providerName: 'AIA',
    providerNameLowerCases: 'aia',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 3,
    providerName: 'Fidelity',
    providerNameLowerCases: 'fidelity',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 4,
    providerName: 'Asteron Life',
    providerNameLowerCases: 'asteron_life',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 5,
    providerName: 'NIB',
    providerNameLowerCases: 'nib',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 6,
    providerName: 'Partners Life',
    providerNameLowerCases: 'partners_life',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 8,
    providerName: 'AMP',
    providerNameLowerCases: 'amp',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 9,
    providerName: 'Cigna',
    providerNameLowerCases: 'cigna',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 10,
    providerName: 'Southern Cross',
    providerNameLowerCases: 'southern_cross',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 11,
    providerName: 'Accuro',
    providerNameLowerCases: 'accuro',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
];

const listOFClientInsurances = [
  {
    PersonId: 11,
    FamilyId: 2704817,
    fullName: 'John Doe',
    fname: 'FullName',
    lname: 'FullName',
    email: 'sample@gmail.com',
    Gender: 'Male',
    DateOfBirth: 'Jul 13, 1994',
    isConnected: false,
    insurances: [
      {
        providerId: 4,
        providerName: 'Asteron Life',
        statusName: 'In Force',
        isSync: false,
        benefits: [
          {
            benefitName: 'Life Cover',
            coverAmount: '$5000',
          },
        ],
      },
      {
        providerId: 9,
        providerName: 'Cigna',
        statusName: 'In Force',
        isSync: false,
        benefits: [
          {
            benefitName: 'Life Cover',
            coverAmount: '$5000',
          },
        ],
      },
    ],
  },
];

const compareData = {
  myCRMClient: {},
  myCRMInsurances: {},
  syncData: {
    sumData: 15000,
  },
};

const getSyncDataClient = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('ClientInformGet', function(items) {
      if (!!items.ClientInformGet) {
        compareData.myCRMClient = items.ClientInformGet;
        resolve(items.ClientInformGet);
      }
    });
  });
};

const getSyncDataInsurance = (syncID) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('clientsInsurances', function(items) {
      if (!!items.clientsInsurances) {
        const myCRMInsurances = items.clientsInsurances.find(
          (insurance) => insurance.syncID === syncID,
        );
        resolve(myCRMInsurances);
      }
    });
  });
};
