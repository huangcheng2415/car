import axios from '../http';

//查询通行记录
interface ParkingLogParams {
  action: string;  //固定为get_access_records
  sys_org_id: string; //停车场ID
  station_id?: string;  //岗亭编号
  channel_id?: string;  //通道编号
  user_code?: string;  //人员编码
  plate?: string;  //车牌号码
  after?: string;  //起始时间
  before?: string;  //结束时间
  offset?: string;  //起始位置 (默认为0)
  limit?: string;  //获取数量 (默认为最大10条)
  order?: string;  //排序 asc | desc (默认asc)
}

export function logFn(params: ParkingLogParams) {
  return axios.post('api/parking', params);
}

//停车场远程关闸
interface CloseChannelParams {
  action: string;   //固定位channel_close
  SerialNo?: string;   //设备序列号 （和ParkingID+Channel二选一）
  ParkingID?: string;  //停车场ID
  Channel?:string;   //通道号
}

export function closeChannelFn(params: CloseChannelParams) {
  return axios.post('api/parking', params);
}

//停车场远程开闸
interface OpenChannelParams {
  action: string;   //固定位channel_open
  SerialNo?: string;   //设备序列号 （和ParkingID+Channel二选一）
  ParkingID?: string;  //停车场ID (和设备序列号二选一)
  Channel?:string;   //通道号 (和设备序列号二选一)
  UserName?:string;   //操作人员名字
  UserCode?:string;   //操作人员code
}

export function openChannelFn(params: OpenChannelParams) {
  return axios.post('api/parking', params);
}

//停车场通道抓拍
interface PrtScParams {
  action: string;   //固定位channel_snapshot
  SerialNo?: string;   //设备序列号 （和ParkingID+Channel二选一）
  ParkingID?: string;  //停车场ID
  Channel?:string;   //通道号
}

export function prtScFn(params: PrtScParams) {
  return axios.post('api/parking', params);
}

//停车场进出业务
interface CheckServiceParams {
  action: string;   //固定位check_service
  Source: string;   //识别源 0=刷卡 1=拍照 2=无牌
  SerialNo?: string;  //设备序列号 （和停车场ID及通道号二选一）
  ParkingID?: string;  //停车场ID （和设备序列号二选一）
  Channel?:string;   //通道号（和设备序列号二选一）
  Plate?:string;   //车牌号 Source=1时必须
  ColorType?:string;   //车牌颜色 Source=1时必须
  CardNumber?:string;   //刷卡卡号 Source=0时必须
  NoPlateID?:string;   //无牌车用户识别号(openid) Source=2时必须
  ImageSrc?:string;   //照片服务器类型 (0=摄像头服务器，1=云停车服务器) 默认为0
  ImageUrl?:string;   //通道拍照照片路径 (服务器相对路径)
  UserName?:string;   //工作人员名称
  UserCode?:string;   //工作人员编码
  FakePlate?:string;   //是否伪车牌
  InitialOpen?:string;   //是否主动式开闸 (非道闸设备需携带该字段，如APP；道闸设备不要带该参数！)
}

export function checkServiceFn(params: CheckServiceParams) {
  return axios.post('api/parking', params);
}

//修改入场车车牌
interface UpdateRecordParams {
  action: string;   //固定位update_access_records
  parking_id: string;   //停车场ID
  channel_id?: string;  //通道ID (可选， 用于生成临时KH，不指定会采用000)
  plate:string;   //原车牌号
  new_plate:string;   //新车牌号
  record_id?:string;   //通行记录ID （可选）
}

export function updateRecordFn(params: UpdateRecordParams) {
  return axios.post('api/parking', params);
}

//支付平台通知费讫开闸
interface PayParams {
  action: string;   //固定位pay_success
  SerialNo?: string;   //通道设备序列号 (和停车场ID及通道号二选一)
  ParkingID?: string;   //停车场ID (和设备序列号二选一)
  Channel?: string;  //通道号 (和设备序列号二选一)
  pay_type?:string;   //支付方式 0=现金 1=支付宝 2=微信 99=免费...
  user_code?:string;   //操作员编码
  user_name?:string;   //操作员名称
  free_name?:string;   //免费名目 (若免费，必须指定免费名目)
  remark?:string;   //备注，例如免费原因 （建议输入长度<30中文字符）
}

export function payFn(params: PayParams) {
  return axios.post('api/parking', params);
}

//查询当班信息
interface ShiftInfoParams {
  action: string;   //固定位get_shift_info
  sys_org_id: string;   //停车场ID
  user_code: string;  //人员代码
}

export function shiftInfoFn(params: ShiftInfoParams) {
  return axios.post('api/parking', params);
}

//获取选项内容
interface FreeOptionsParams {
  action: string;   //固定位get_options
  user_code: string;   //操作员ID
  parking_id: string;  //停车场ID
  option: string;  //要获取选项内容的参数，目前支持[freename]
}

export function freeOptionsFn(params: FreeOptionsParams) {
  return axios.post('api/parking', params);
}
//获取停车场车位计数
interface ParkingCounting{
  action: string;   //固定位get_options
  parking_id: string;  //停车场ID
}
export function parkingcount(params:ParkingCounting){
  return axios.post('api/parking', params);
}
