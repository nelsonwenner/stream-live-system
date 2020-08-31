const getIceServers = () => {
  const envVar = `${process.env.REACT_APP_ICE_SERVERS}`;
  try {
    
    return envVar !== '' 
    ? envVar.split(',').map(serve => ({url: `stun:${serve}`}))
    : []

  } catch (e) {
    return [];
  }
};

export default getIceServers;