const notifOptions = function({ title, message }) {
  return {
    type: 'basic',
    iconUrl: './icons/icon48.png',
    silent: false,
    priority: 2,
    title,
    message,
  };
};
