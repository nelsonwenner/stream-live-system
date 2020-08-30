const getIceServers = () => {
  const envVar = process.env.REACT_APP_ICE_SERVERS;
  try {
    return JSON.parse(envVar || '');
  } catch (e) {
    return null;
  }
};

export default getIceServers;