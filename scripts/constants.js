const sampleInsuranceLis = [
  {
    id: 1,
    providerName: 'AIA',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 3,
    providerName: 'Fidelity',
    username: '',
    password: '',
    isConnected: true,
    isSyncing: false,
    message: '',
  },
  {
    id: 4,
    providerName: 'Asteron Life',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 5,
    providerName: 'NIB',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 6,
    providerName: 'Partners Life',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 8,
    providerName: 'AMP',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 9,
    providerName: 'Cigna',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 10,
    providerName: 'Southern Cross',
    username: '',
    password: '',
    isConnected: false,
    isSyncing: false,
    message: '',
  },
  {
    id: 11,
    providerName: 'Accuro',
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
  {
    PersonId: 12,
    FamilyId: 2704817,
    fullName: 'Sarah Doe',
    fname: 'FullName',
    lname: 'FullName',
    email: 'sample@gmail.com',
    Gender: 'Female',
    DateOfBirth: 'Jul 13, 1994',
    isConnected: false,
    insurances: [
      {
        providerId: 6,
        providerName: 'Partners Life',
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
  myCRMClient: {
    PersonId: 12,
    FamilyId: 2704817,
    fullName: 'Sarah Doe',
    fname: 'FullName',
    lname: 'FullName',
    email: 'sample@gmail.com',
    Gender: 'Female',
    DateOfBirth: 'Jul 13, 1994',
    isConnected: false,
  },
  myCRMInsurance: {
    providerId: 6,
    providerName: 'Partners Life',
    statusName: 'In Force',
    isSync: false,
    benefits: [
      {
        benefitName: 'Life Cover',
        coverAmount: '$5000',
      },
    ],
  },
  syncData: {
    sumData: 15000,
  },
};

const getSyncData = () => {
  return new Promise((resolve, reject) => {
    resolve(compareData);
  });
};
