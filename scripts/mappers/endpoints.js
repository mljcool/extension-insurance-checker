const baseURL = 'https://api.sit.mycrm.finance/';

const userInfo = () => baseURL + 'GetUserInfo';

const getClientInfoURL = (familyId) => {
  const url =
    baseURL +
    'contacts/ClientInformGet?familyId=' +
    familyId +
    '&clientId=null';

  return url;
};

const existingInsuranceURL = (familyID) => {
  const url =
    baseURL +
    'insurance-application?familyId=' +
    familyID +
    '&isFireAndGeneral=false&policyNumber=&providerId=0&status=Existing';
  return url;
};

// all Mappers

const safeKeys = (data = {}) => {
  return (keys) => {
    const exist = (data || {}).hasOwnProperty(keys);
    return exist ? data[keys] : null;
  };
};

const getRequest = (urlStr) => {
  const mytime = JSON.parse(localStorage.getItem('mycrm-tokens'));
  const settings = {
    url: urlStr,
    method: 'GET',
    timeout: 0,
    headers: {
      Authorization: 'Bearer ' + ((mytime || {}).accessToken || {}).value,
    },
  };
  return $.ajax(settings);
};

const getFormattedDate = (date) => {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return month + '/' + day + '/' + year;
};

const setSyncID = () => {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

const setInitials = (fname, lname) => {
  const strsFormat = (str) => str.charAt(0).toUpperCase();
  const setNames = strsFormat(fname) + '' + strsFormat(lname);
  return setNames;
};

const mapClientsInfo = (clientList = []) => {
  const clientMapper = (data = {}) => {
    const setKeys = safeKeys(data);
    return {
      personId: setKeys('PersonId'),
      lastName: setKeys('LastName'),
      fullName: setKeys('FullName'),
      firstName: setKeys('FirstName'),
      middleName: setKeys('MiddleName'),
      legalName: setKeys('LegalName'),
      preferredName: setKeys('PreferredName'),
      gender: setKeys('Gender'),
      initialName: setInitials(setKeys('FirstName'), setKeys('LastName')),
      dateOfBirth: !setKeys('DateOfBirth')
        ? null
        : getFormattedDate(new Date(setKeys('DateOfBirth'))),
      email:
        setKeys('Email') !== null
          ? safeKeys(setKeys('Email')[0])('EmailAddress')
          : null,
    };
  };

  return clientList.map(clientMapper);
};

const mapClientsInsurance = (insuranceList = []) => {
  const benefitsMapper = (data) => {
    const setKeys = safeKeys(data);
    return {
      id: setKeys('ID'),
      familyClientID: setKeys('FamilyClientID'),
      clientID: setKeys('ClientID'),
      benefitName: setKeys('BenefitName'),
      coverAmount: setKeys('CoverAmount'),
      firstName: setKeys('FirstName'),
      lastName: setKeys('LastName'),
      benefitTotalPremium: setKeys('BenefitTotalPremium'),
      isSync: false,
      initialName: setInitials(setKeys('FirstName'), setKeys('LastName')),
    };
  };

  const clientMapper = (data = {}) => {
    const setKeys = safeKeys(data);
    return {
      providerID: setKeys('ProviderID'),
      providerID: setKeys('ProviderID'),
      providerName: setKeys('ProviderName'),
      statusName: setKeys('StatusName'),
      isApplication: setKeys('IsApplication'),
      benefitDetails: setKeys('BenefitDetails').map(benefitsMapper),
      isSync: false,
      syncID: setSyncID(),
    };
  };

  return insuranceList.map(clientMapper);
};

const mapAdviserInfo = (adviserData = {}) => {
  const setKeys = safeKeys(adviserData);
  return {
    firstName: setKeys('FirstName'),
    lastName: setKeys('LastName'),
    preferredFullName: setKeys('PreferredFullName'),
    accessType: setKeys('AccessType'),
    email: setKeys('Email'),
    clientId: setKeys('ClientId'),
  };
};
