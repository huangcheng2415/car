<template>
    <div class="login flex align_center justify_center">
        <div class="card" ref="ddd">
            <h2 class="center" style="padding-bottom: 40px;">云停车平台</h2>
            <el-form :model="ruleForm" :rules="rules" ref="formEl">
                <el-form-item prop="account">
                    <el-input v-model="ruleForm.account" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="密码"
                              autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <el-button class="width" type="primary" @click="submitForm()">提交</el-button>
        </div>

        <el-dialog
                title="请选择需要登录的停车场："
                v-model="parkDialog"
                destroy-on-close
                :close-on-click-modal="false"
                :width="500">
            <el-select class="width" v-model="dialogForm.currPark" placeholder="请选择">
                <el-option
                        v-for="item in parkList"
                        :key="item.org_id"
                        :label="item.org_name"
                        :value="item.qr_code">
                </el-option>
            </el-select>
            <el-dialog
                    :width="450"
                    title="请选择需要登录的工作站："
                    v-model="stationDialog"
                    destroy-on-close
                    :close-on-click-modal="false"
                    append-to-body>
                <el-select class="width" v-model="dialogForm.currStation" placeholder="请选择">
                    <el-option
                            v-for="item in stationList"
                            :key="item.station_id"
                            :label="item.station_name"
                            :value="item.station_id">
                    </el-option>
                </el-select>
                <template #footer>
                    <span class="dialog-footer">
                      <el-button type="primary" @click="handleClose">确 定</el-button>
                    </span>
                </template>
            </el-dialog>
            <template #footer>
                <span class="dialog-footer">
                  <el-button type="primary" @click="selectPark()">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
  import {defineComponent, reactive, ref, nextTick} from 'vue';
  import {useRouter} from 'vue-router';
  import {ElMessage} from 'element-plus';
   import {getStorage} from '../storage';
  import {loginFn, parkingFn} from '../api/login';
  import {setStorage} from '../storage';
    import {offWorkFn} from '../api/main';
  export default defineComponent({
    name: 'Login',
    setup() {
      const router = useRouter();

      //表单参数
      const ruleForm = reactive({
        account: '18280175607',
        password: '123456',
      });

      //验证规则
      const rules = reactive({
        account: [{required: true, message: '请输入账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      });

      //提交表单
      const formEl = ref();
      const parkList = ref([]);
      const parkDialog = ref(false);
      function submitForm() {
        const {validate} = formEl.value;
        formEl.value.validate((valid: any) => {
          if (valid) {
            loginFn({
              account: ruleForm.account,
              password: ruleForm.password,
              scenery: 'parking_app',
            }).then((res: any) => {
              if (res.data.status === 'ok') {
                
                setStorage('userInfo', res.data);
                parkList.value = res.data.parkings;
                parkDialog.value = true;
                offWorkFn({ action: 'shift_duty', sys_org_id: getStorage('parkings').org_id, user_code: getStorage('userInfo').usercode, mode: '1',}).then((res: any) => {
                  if (res.data.status === 'fail') {
                    ElMessage.error(res.data.reason);
                  } else {
                    
                  }
                })
              } else {
                ElMessage.error('登录失败');
              }
            });
          } else {
            return false;
          }
        });
      }

      //选择场地
      let stationList = ref([]);
      const stationDialog = ref(false);
      const dialogForm = reactive({
        currPark: '',
        currStation: '',
      });

      function selectPark() {
        if (!dialogForm.currPark) {
          ElMessage.warning('请选择停车场');
          return;
        }
        stationDialog.value = true;
        const currOrg: any = parkList.value.find((i: any) => i.qr_code === dialogForm.currPark);
        setStorage('parkings', currOrg);
        //获取工作站信息
        parkingFn({
          action: 'get_station_list',
          sys_org_id: currOrg.org_id
        }).then((res: any) => {
          stationList.value = res.data.list;
        });
      }

      //关闭弹窗
      function handleClose() {
        if (!dialogForm.currStation) {
          ElMessage.warning('请选择工作站');
          return;
        }
        const currStn = stationList.value.find((i: any) => i.station_id === dialogForm.currStation);
        setStorage('station', currStn);
        stationDialog.value = false;
        nextTick(() => {
          parkDialog.value = false;
          dialogForm.currPark = dialogForm.currStation = '';
          router.push({name: 'Home'});
        });
      }

      return {
        formEl,
        ruleForm,
        rules,
        stationList,
        parkList,
        parkDialog,
        stationDialog,
        dialogForm,
        submitForm,
        selectPark,
        handleClose,
      };
    },
  });
</script>

<style lang="scss">
    .login {
        width: 100vw;
        height: 100vh;
        background-color: #409eff;

        .card {
            width: 360px;
            background-color: white;
            padding: 30px;
            border-radius: 4px;
        }

        .adm_tab {
            padding-top: 10px;
            line-height: 60px;
            font-size: 17px;
            color: #999999;
        }

        .act_tab {
            color: #409eff;
            font-weight: bold;
        }
    }
</style>
