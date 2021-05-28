
import store from '../index'
import {shiftInfoFn} from '../../api/home'
import {getStorage} from '../../storage';

const about = {
    state: {
        totle: -1, //剩余车位
        shift_info:'',//当班信息
        money:0,//当班金额
        pickerOptions: { //快捷选项
            shortcuts: [
            {
                text: '今天',
                onClick(picker:any) {
                    picker.$emit('pick', new Date());
                }
            },
            {
              text: '最近一周',
              onClick(picker:any) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker:any) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker:any) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
    },
    mutations: {
        MUTATIONS(state:any, value:any) {
            state.totle = value
        },
        SHIFTINFOFN(state:any, value:any){ 
            state.shift_info=value
            state.money = value.leave_fee +  value.enter_fee
        }
        
    },
    actions: {
        SHIFTINFOFN(state:any,value:any){ //当前当班信息
            return new Promise((resolve:any,e:any)=>{
                shiftInfoFn({ action: 'get_shift_info', sys_org_id: getStorage('userInfo').org_id, user_code: getStorage('userInfo').usercode,}).then((res:any)=>{

                    store.commit('SHIFTINFOFN', res.data.data)
                    resolve((res.data.data))
                   
                })
            })
        },
     
        OFFWORKFN(state:any,value:any){ //上下班处理
          // offWorkFn({action: 'shift_duty', sys_org_id: getStorage('parkings').org_id, user_code: getStorage('userInfo').usercode,}).then((res:any)=>{

          // })
       
        }
    }
}

export default about;
