import Axios from 'axios';

export const base = Axios.create({
  baseURL: `${process.env.REACT_APP_MICRO_BACKEND_MANAGER_URL}/api`,
  headers: {
    "Content-Type": "application/json"
  }
})

export const getLive = async (liveSlug, isBroadcaster) => {
  const { data } = await base.get(`/lives/${liveSlug}`);
  if (isBroadcaster && data.status === 'done') {
    throw new Error('This live has already been held');
  }
  return data;
}
