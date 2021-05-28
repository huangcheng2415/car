import axios from '../http';

//修改密码
interface UpdatePwdParams {
  account: string;  //账号
  old_pwd: string;  //旧密码
  new_pwd: string;  //新密码
  scenery?: string;  //如果是云停车系统，添加scenery=parking_app
}

export function updatePwdFn(params: UpdatePwdParams) {
  return axios.post('api/change_password', params);
}

//交班
interface OffWorkParams {
  action: string;  //固定shift_duty
  sys_org_id: string;  //停车场ID
  user_code: string;  //人员编号
  mode: string;  //交班模式 (1=上班，0=下班)
}

export function offWorkFn(params: OffWorkParams) {
  return axios.post('api/parking', params);
}

//在场车辆
interface ParkCarsParams {
  action: string;  //固定get_parking_cars
  parking_id: string;  //停车场ID
  name?:string;   //车主姓名 （可模糊匹配）
  plate?: string;  //车牌号码（可模糊匹配）
  noplate?: string|number;  //是无牌车
  color?: string;  //车牌颜色
  kind?: string;  //卡种
  kahao?: string;  //卡号（可模糊匹配）
  remark?: string;  //备注（可模糊匹配）
  channel?: string;  //入口通道号
  before?: string;  //入场时间在此之前（含）eg:2021-03-31
  after?: string;  //入场时间在此之后 （含）eg:2021-03-31
  order?: string;  //排序 (asc|desc) 默认asc
  limit?: string | number;  //最大数据量 默认10
  offset?: string | number;  //数据偏移量 默认0
  download?: string;  /*为1时，返回符合条件的所有数据的excel文件
                        为2时，返回json数据，且结果的url字段为导出excel文件的下载url
                        不指定时返回正常的json数据，当指定时limit和offset无效*/
}

export function parkCarsFn(params: ParkCarsParams):any | void {
  return axios.post('api/parking', params);
}

//车主信息
interface MembersParams {
  action: string;  //固定get_members
  parking_id: string;  //停车场ID
  name?: string;  //姓名 (可模糊匹配)
  plate?: string;  //车牌号 (可模糊匹配)
  lease_before?: string;  //有效期在此日期前 （含）
  lease_after?: string;  //有效期在此日期后 （含）
  gender?: string;  //性别 （男|女）
  kind?: string;  //卡种类
  kahao?: string;  //会员卡号 （会员编号） (可模糊匹配)
  phone?: string;  //联系电话 (可模糊匹配)
  status?: string;  //状态 （启用|禁用）
  remark?: string;  //备注 (可模糊匹配)
  limit?: string | number;  //数据获取量 （默认为10）
  offset?: string | number;  //数据偏移量 （默认为0）
}

export function membersFn(params: MembersParams) {
  return axios.post('api/parking', params);
}

//出入日志
interface AccessRecordsParams {
  action: string;  //固定get_access_records
  sys_org_id: string;  //停车场ID
  station_id?: string;  //岗亭编号
  channel_id?: string;  //通道编号
  user_code?: string;  //人员编码
  plate?: string;  //车牌号码（可以模糊匹配）
  name?: string;  //车主名称 （可以模糊匹配）
  kahao?: string;  //会员卡号 （会员编号） (可模糊匹配)
  remark?: string;  //备注 (可模糊匹配)
  after?: string;  //起始时间
  before?: string;  //结束时间
  limit?: string | number;  //数据获取量 （默认为10）
  offset?: string | number;  //数据偏移量 （默认为0）
  order?: string | number;  //排序 asc | desc (默认asc)
  download?: string;  /*为1时，返回符合条件的所有数据的excel文件
                        为2时，返回json数据，且结果的url字段为导出excel文件的下载url
                        不指定时返回正常的json数据，当指定时limit和offset无效*/
}

export function AccessRecordsFn(params: AccessRecordsParams) {
  return axios.post('api/parking', params);
}

//收费明细
interface RecordsParams {
  action: string;  //固定get_payment_records
  sys_org_id: string;  //停车场ID
  station_id?: string;  //岗亭编号
  channel_id?: string;  //通道编号
  user_code?: string;  //人员编号
  pay_type?: string;  //缴费类型  (现金|微信|支付宝)
  before?: string;  //交易在此之前 （含）
  after?: string;  //交易在此之后 （含）
  enter_before?: string;  //进场在此之前 （含）
  enter_after?: string;  //进场在此之后 （含）
  plate?: string;  //车牌号码
  noplate?: string | number;  //为1或true时，查询无牌车 （和plate共用无效）
  kahao?: string;  //卡号
  remark?: string;  //备注 (可模糊查询)
  limit?: string;  //数据获取量 (默认0)
  offset?: string | number;  //数据偏移量 (默认10)
  order?: string;  //时间排序 (asc | desc) 默认asc
  download?: string;  /*为1时，返回符合条件的所有数据的excel文件
                        为2时，返回json数据，且结果的url字段为导出excel文件的下载url
                        不指定时返回正常的json数据，当指定时limit和offset无效*/
}

export function paymentRecordsFn(params: RecordsParams) {
  return axios.post('api/parking', params);
}
