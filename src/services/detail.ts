import axios from "axios";
import { apiPrefix3 } from "../utils/constant";

/**
 * get country detail data by the  alpha code
 * @param params
 * @returns
 */
export const getCountryDetail = (params: { alpha: string | any }) => {
  let url = `${apiPrefix3}alpha`;
  return axios.get(url, {
    params: {
      codes: params.alpha,
    },
  });
};
