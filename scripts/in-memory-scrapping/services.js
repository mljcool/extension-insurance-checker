// SERVICES FOR API
// http://54.252.153.150/swagger/index.html

const baseIpAddress = '54.252.153.150';
const baseURL = 'http://' + baseIpAddress + '/';

const postConnectToProvider = ({ $http, details }) => {
  const urlChecker = baseURL + 'setup/set-credential';
  return $http({
    method: 'POST',
    url: urlChecker,
    data: JSON.stringify(details),
  });
};

const getConnectToProvider = ({ $http, browserId }) => {
  const urlChecker = baseURL + 'setup/get-credential';
  return $http.get(urlChecker, {
    params: { browserId },
  });
};

const getCompareToProvider = ({ $http, queries }) => {
  const { firstName, lastName, birthday, browserId, insurerName } = queries;
  const urlChecker = baseURL + 'setup/get-credential';
  return $http.get(urlChecker, {
    params: { firstName, lastName, birthday, browserId, insurerName },
  });
};
