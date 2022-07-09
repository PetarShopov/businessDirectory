import axios from "axios";
import { toast } from 'react-toastify';

export default class DataService {
    static get(url: string, options?: any) {
        return axios
            .get(url, options)
            .catch(this.handleError);
    }
    private static handleError(error: any) {
        toast.error(error.message || 'Error');
    }
}