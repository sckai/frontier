import { Get } from '@/plugin/axios/index'

const router = {
  USER_LIST: ''
}

/** 取得 User data
//  * @param { Array } list
*/
export const GetUserList:any = (paramsData: any) => {
  return Get(router.USER_LIST, { params: paramsData })
}