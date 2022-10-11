import axios from 'axios';
import { apiPrefix3, apiPrefix2 } from "../utils/constant";


/**
 * get all country data
 * filter the  data by fields
 * @param params 
 * @returns 
 */
export const getCountryList = (params: { fields: Array<string> }) => {
    let url = `${apiPrefix3}all`
    return axios.get(url, {
        params: {
            fields: params.fields.join(",")
        }
    })
}
