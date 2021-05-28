import axios from '../http';
import {setStorage} from '../storage';

//停车场客户端短信登录
interface LoginParams {
  account: string;  //手机号码
  password: string; //用户密码
  scenery: string;  //固定为parking_app
}

export function loginFn(params: LoginParams) {
  const result = axios.post('api/login', params);
  result.then(res => {
    //保存token
    setStorage('token', res.headers.token);
    //保存refresh_token
    setStorage('refresh_token', res.headers.refresh_token);
  });
  return result;
}


//获取岗亭、通道和设备
interface ParkingParams {
  action: string  //获取岗亭、通道和设备信息 固定为get_station_list
  sys_org_id: string //停车场ID
  user_code?: string  //岗亭人员代码 (指定时仅匹配该负责人所在岗亭)
}

export function parkingFn(params: ParkingParams) {
  return axios.post('api/parking', params);
}
