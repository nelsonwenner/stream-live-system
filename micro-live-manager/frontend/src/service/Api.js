import Axios from 'axios';

const base = Axios.create({
  baseURL: `${process.env.REACT_APP_MICRO_BACKEND_MANAGER_URL}`,
  headers: {
    "Content-Type": "application/json"
  }
})

export default base;