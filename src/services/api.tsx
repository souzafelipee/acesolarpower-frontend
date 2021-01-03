import axios from 'axios'
import { trackPromise} from 'react-promise-tracker';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
}
);
const get = (params:any):any => trackPromise(api.get(params));
const post = (params:any, body:any):any => trackPromise(api.post(params, body));
const put = (params:any, body:any):any => trackPromise(api.put(params, body));
const del = (params:any):any => trackPromise(api.delete(params));
export default {get,post,put,del};