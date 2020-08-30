const getIceServers = () => {
  const envVar = `${process.env.REACT_APP_ICE_SERVERS}`;
  try {
    return envVar.split(',');
  } catch (e) {
    return [];
  }
};

export default getIceServers;