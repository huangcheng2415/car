<template>
    <div class="main bg_white">
        <el-container class="height">
            <el-header class="header colfff flex align_center">
                <img src="../assets/user.png" style="width: 40px;" alt="">
                <div class="l_info">
                    <div class="bold">{{userInfo.username}}</div>
                    <div>欢迎光临！{{loginTime}}</div>
                </div>
                <div class="flex1 flex justify_center">
                    <el-space wrap :size="40">
                        <div class="center pointer" @click="handleParkingCar">
                            <img src="../assets/icon-zzt.png" style="width: 20px;" alt="">
                            <p>在场车辆</p>
                        </div>
                        <div class="center pointer" @click="handleParkingLog">
                            <img src="../assets/icon-zzt.png" style="width: 20px;" alt="">
                            <p>出入日志</p>
                        </div>
                        <div class="center pointer" @click="handleChargeDetails">
                            <img src="../assets/icon-zzt.png" style="width: 20px;" alt="">
                            <p>收费明细</p>
                        </div>
                        <div class="center pointer" @click="handleCarOwner">
                            <img src="../assets/icon-zzt.png" style="width: 20px;" alt="">
                            <p>车主信息</p>
                        </div>
                        <div class="center pointer" @click="handleSwitch">
                            <img src="../assets/icon-zzt.png" style="width: 20px;" alt="">
                            <p>交班</p>
                        </div>
                        <div class="center pointer" @click="loginOut">
                            <img src="../assets/icon-zzt.png" style="width: 20px;" alt="">
                            <p>注销</p>
                        </div>
                        <div class="center pointer" @click="handleUpPwd">
                            <img src="../assets/icon-zzt.png" style="width: 20px;" alt="">
                            <p>修改密码</p>
                        </div>
                    </el-space>
                </div>
                <div class="r_info align_center text_right f16">
                  <!-- {{stores.state.about.totle!=-1?stores.state.about.totle:carFree}} -->
                  <!-- {{carFree}}  -->
                    剩余车位：{{stores.state.about.totle!=-1?stores.state.about.totle.free:carFree }}
                    <!--，现金总额：0元-->
                </div>
            </el-header>
            <el-main class="main">
                <router-view/>
            </el-main>
            <el-dialog
          title="交班明细"
            v-model.sync="dialogVisible"
            width="30%"
            custom-class="jd_"
            center
          >
            <div class="Jb_cenrer">
              <p>当班开始时间：{{stores.state.about.shift_info.shift_start}}</p>
              <p>当班结束时间：{{formatDatePicker(new Date(),true)}}</p>
              <p>总收金额：{{stores.state.about.money}}元</p>
              <p>出场收费：{{stores.state.about.shift_info.leave_fee}}元</p>
              <p>入场收费：{{stores.state.about.shift_info.enter_fee}}元</p>
              <p>充值缴费 ：{{stores.state.about.shift_info.charge_fee}}元</p>
              <p>中心收费 ：{{stores.state.about.shift_info.center_fee}}元</p>
              <p>退卡退费 ：{{stores.state.about.shift_info.return_fee}}元</p>
            </div>
          <span  class="dialog-footer" center>
            <el-button @click="getExsle">导出</el-button>
            <el-button type="primary" @click="handleSwitch(false)">确认交班</el-button>
          </span>
        </el-dialog>
        </el-container>
        
        <UpdatePassword ref="upPwd"></UpdatePassword>
        <ParkingCar ref="pCar"></ParkingCar>
        <ParkingLog ref="pLog"></ParkingLog>
        <CarOwner ref="cOwner"></CarOwner>
        <ChargeDetails ref="cDetailes"></ChargeDetails>
     
    </div>
</template>

<script lang="ts">
  import {defineComponent, reactive, toRefs, defineAsyncComponent, ref} from 'vue';
  import {useRouter} from 'vue-router';
  import {pad,formatDatePicker} from '../components/common/global';
  import {getStorage} from '../storage';
  import {ElMessage, ElMessageBox} from 'element-plus';
  import {offWorkFn} from '../api/main';
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'Main',
    components: {
      UpdatePassword: defineAsyncComponent(() => import('../components/UpdatePassword.vue')),
      ParkingCar: defineAsyncComponent(() => import('../components/ParkingCar.vue')),
      ParkingLog: defineAsyncComponent(() => import('../components/ParkingLog.vue')),
      CarOwner: defineAsyncComponent(() => import('../components/CarOwner.vue')),
      ChargeDetails: defineAsyncComponent(() => import('../components/ChargeDetails.vue'))
    },
    setup() {
      const router = useRouter();
      const data = reactive({
        loginTime: '',
        userInfo: getStorage('userInfo'),
        updatePwdVisible: false,
        carFree: 0,
        dialogVisible:false,
        stores:useStore()
      });
  
      setInterval(() => {
        data.carFree = getStorage('carFree');
      }, 500);

      //日期时间
      const loginTime = ref('');
      setInterval(() => {
        const now = new Date();
        loginTime.value = `${now.getFullYear()}-${pad(now.getMonth() + 1, 2)}-${pad(now.getDate(),
          2)} ${pad(now.getHours(), 2)}:${pad(now.getMinutes(), 2)}`;
      }, 1000);
       function getExsle(){ //导出交班明细
          const jsonData=data.stores.state.about.shift_info
            let str = `开始时间,结束时间,总结金额,出场收费,入场收费,充值缴费,中心收费,退卡退费\n`;
              for(let item in jsonData){
                  if(item=='shift_end'){
                    jsonData[item]=formatDatePicker(new Date(),true) //结束时间为当前时间
                  }
                 str+=`${jsonData[item] + '\t'},`; 
              }

          let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
          let link = document.createElement("a");
            link.href = uri;
            link.download =  "交班明细.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
      }
      //在场车辆
      const pCar = ref<any>(null);

      function handleParkingCar() {
        pCar.value.dialogVisible = true;
        pCar.value.getTableData();
      }
      //交班
      const Details =ref<any>(null);
      function detailsClinke (){
          Details.value.dialogVisible = true;
          // Details.value.getTableData();
      }
      //出入记录
      const pLog = ref<any>(null);

      function handleParkingLog() {
        pLog.value.dialogVisible = true;
        pLog.value.getTableData();
      }
    
      //收费明细
      const cDetailes = ref<any>(null);

      function handleChargeDetails() {
        cDetailes.value.dialogVisible = true;
        cDetailes.value.getTableData();
      }

      //车主信息
      const cOwner = ref<any>(null);

      function handleCarOwner() {
        cOwner.value.dialogVisible = true;
        cOwner.value.getTableData();
      }

      //交班
      function handleSwitch(is=true) {
        if(is){
          data.stores.dispatch('SHIFTINFOFN').then(()=>{data.dialogVisible=true})
        }else{
          ElMessageBox.confirm('您确定要交班吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          offWorkFn({
            action: 'shift_duty',
            sys_org_id: getStorage('parkings').org_id,
            user_code: getStorage('userInfo').usercode,
            mode: '0',
          }).then((res: any) => {
            if (res.data.status === 'fail') {
              ElMessage.error(res.data.reason);
              data.dialogVisible=true
            } else {
              
              window.localStorage.removeItem('token');
              router.replace({name: 'Login'});
            }
          })
        }).catch(()=>{ });;
        }
       
        
      }

      //退出登录
      function loginOut() {
        ElMessageBox.confirm('您确定要注销吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          window.localStorage.removeItem('token');
          router.replace({name: 'Login'});
        });
      }

      //密码弹窗
      const upPwd = ref<any>(null);

      function handleUpPwd() {
        upPwd.value.show = true;
      }

      //获取websocket数据
      let createWS: any, ws: any;
      const channelIds = [...getStorage('station')?.channel].map((i: any) => i.channel_id);
      // (createWS = function() {
      //   ws = new WebSocket(`ws://47.108.199.44:8081`);
      //   ws.onopen = function(evt: any) {
      //     ws.send(`{ "client":"parking", "intent":["subscribe", "get"], "org_id": "${getStorage(
      //       'parkings').org_id}", "channels":${JSON.stringify(channelIds)} }`);
      //   };
      //   ws.onmessage = function(evt: any) {
      //     const evtObj = JSON.parse(evt.data);
      //     console.log(66666)
      //     if (evtObj?.status === 'ok') {
      //       evtObj.channel_info.forEach((d: any) => {

      //       });
      //     } else {
      //       switch (evtObj.update) {
      //         case 'lastpass':

      //           break;
      //         case 'devstat':
      //           break;
      //         case 'paystat':
      //           break;
      //         case 'openstat':
      //           break;
      //         case 'closestat':
      //           break;
      //         case 'snapstat':
      //           break;
      //         case 'snapshot':
      //           break;
      //       }
      //     }
      //   };

      //   ws.onclose = function(ev: any) {
      //     console.log('WebSocket close:', ev);
      //   };
      //   ws.onerror = function(ev: any) {
      //     ws.onclose();
      //     createWS();
      //     console.log('WebSocket error:', ev);
      //   };
      // });

      return {
        ...toRefs(data),
        upPwd,
        loginTime,
        pCar,
        pLog,
        cOwner,
        cDetailes,
        loginOut,
        handleUpPwd,
        handleSwitch,
        handleParkingCar,
        handleParkingLog,
        handleCarOwner,
        handleChargeDetails,
        detailsClinke,
        formatDatePicker,
        getExsle
    
      };
    },
  });
</script>

<style lang="scss">
    .main {
        min-width: 1200px;
        height: 100vh;

        .header {
            background: #3a8ee6;

            .l_info {
                width: 220px;
                padding-left: 20px;
            }

            .r_info {
                width: 280px;
            }
        }
        .jd_{
          .el-dialog__body{
            text-align:center;
          }
          .Jb_cenrer{
            text-align:left;
            margin-bottom: 20px;
            p{
              margin-bottom: 5px;
            }
          }
        }
        .main {
            padding: 0;
        }
    }
</style>
