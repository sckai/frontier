import axios from "axios"
import { axiosConfig } from "./config"
import type { ResObject } from "./interface"

// create
const axiosIns = axios.create(axiosConfig)

// ==============================================================================
// GetMethod
interface AnyParams {
  [key: string]: any;
}

export const Get = (
  url: string,
  params: AnyParams,
  useMask = false
): Promise<ResObject> => {
  return new Promise<ResObject>(resolve => {
    axiosIns
      .get(`${url}`, params)
      .then((response: any) => resolve(response));
  })
}
