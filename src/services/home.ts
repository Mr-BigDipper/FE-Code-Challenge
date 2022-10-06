import axios from 'axios';
import { apiPrefix3, apiPrefix2 } from "../utils/constant";


/**
 * 获取所有国家
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

/**
 * 获取所有国家
 * @param params 
 * @returns 
 */
export const searchCountry = (params: { fields: Array<string> }) => {
    let url = `${apiPrefix3}all`
    return axios.get(url, {
        params: {
            fields: params.fields.join(",")
        }
    })
}



/**
 * 获取地区
 * @param params 
 * @returns 
 */
export const getRegions = (params: { region: string; fields: Array<string> }) => {
    // let url = `${apiPrefix3}region/${params.region}`
    // return axios.get(url);
    let url = `${apiPrefix2}region/${params.region}`
    return axios.get(url, {
        params: {
            fields: params.fields.join(",")
        }
    })
}