const baseURL = 'https://api.sit.mycrm.finance/';

const userInfo = () => 'GetUserInfo';

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
    return exist ? data[keys] : `key ${keys} dont exist`;
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
      dateOfBirth: setKeys('LegalName'),
      email:
        setKeys('Email') !== 'Key Email dont exist'
          ? safeKeys(setKeys('Email')[0])('EmailAddress')
          : 'Key Email dont exist',
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
  };
};
