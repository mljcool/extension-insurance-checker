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

const safeKeys = (data) => {
  return (keys) => {
    const exist = data.hasOwnProperty(keys);
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
      Authorization: 'Bearer ' + (mytime || {}).accessToken.value,
    },
  };
  return $.ajax(settings);
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
      preferredName: setKeys('LegalName'),
      dateOfBirth: setKeys('DateOfBirth'),
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
    };
  };

  const clientMapper = (data = {}) => {
    const setKeys = safeKeys(data);
    return {
      providerID: setKeys('ProviderID'),
      statusName: setKeys('StatusName'),
      isApplication: setKeys('IsApplication'),
      benefitDetails: setKeys('BenefitDetails').map(benefitsMapper),
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
