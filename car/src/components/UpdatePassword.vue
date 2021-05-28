<template>
    <el-dialog title="修改密码" v-model="show" width="600px">
        <el-form ref="refForm" :model="form" :rules="rules" label-width="100px" style="width: 80%;margin: auto;">
            <el-form-item label="旧密码" prop="oldPwd">
                <el-input placeholder="旧密码" v-model="form.oldPwd" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
                <el-input placeholder="新密码" v-model="form.newPwd" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePwd">
                <el-input placeholder="确认密码" v-model="form.rePwd" show-password></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
              <el-button @click="show = false">取 消</el-button>
              <el-button type="primary" @click="updatePwd">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
  import {defineComponent, reactive, toRefs, ref} from 'vue';
  import {updatePwdFn} from '../api/main';
  import {getStorage} from '../storage';
  import {ElMessage} from 'element-plus';

  export default defineComponent({
    name: 'UpdatePassword',
    setup(props, context) {
      //重复密码验证
      const validatePass = (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== form.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const data = reactive({
        show: false,
        rules: {
          oldPwd: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
          newPwd: [{required: true, message: '请输入新密码', trigger: 'blur'}],
          rePwd: [{required: true, validator: validatePass, trigger: 'blur'}],
        },
      });

      //修改密码
      const form = reactive({
        oldPwd: '',
        newPwd: '',
        rePwd: '',
      });
      //密码表单
      const refForm = ref(null);

      //修改密码
      function updatePwd() {
        const {validate} = refForm.value as any;
        validate((valid: any) => {
          if (valid) {
            updatePwdFn({
              account: getStorage('userInfo').account,
              old_pwd: form.oldPwd,
              new_pwd: form.newPwd,
            }).then((res: any) => {
              if (res.data.status === 'ok') {
                ElMessage.success('密码修改成功！');
                data.show = false;
              } else {
                ElMessage.error(res.data.reason);
              }
            });
          } else {
            return false;
          }
        });
      }

      return {...toRefs(data), form, refForm, updatePwd};
    },
  });
</script>

<style scoped>

</style>