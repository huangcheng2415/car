<template>
    <el-dialog
            title="车主信息"
            v-model="dialogVisible"
            custom-class="parking_dialog"
            width="1200px">
        <el-form class="width" ref="form" :inline="true" :model="formModel" label-width="80px" size="mini">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="姓名">
                        <el-input v-model="formModel.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="人员编码">
                        <el-input v-model="formModel.kahao"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="车牌号">
                        <el-input v-model="formModel.Plate"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="手机号">
                        <el-input v-model="formModel.phone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="状态">
                        <el-select class="width" v-model="formModel.status" placeholder="请选择">
                            <el-option label="启用" value="启用"></el-option>
                            <el-option label="禁用" value="禁用"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="过期时间">
                        <el-date-picker
                                v-model="formModel.timeInOut"
                                type="daterange"
                                 :picker-options="$store.state.about.pickerOptions" 
                                 unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <!--<el-col :span="6">-->
                <!--    <el-form-item>-->
                <!--        <el-checkbox v-model="formModel.hasCarNumber">空车牌</el-checkbox>-->
                <!--    </el-form-item>-->
                <!--</el-col>-->
            </el-row>
        </el-form>
        <div>
            <el-button type="primary" size="medium" @click="handleSearch">查询</el-button>
            <el-button type="primary" size="medium" @click="getTableData">刷新</el-button>
        </div>
          <p style="font-size: 14px;color:red;margin-top: 10px;">查询统计（总车主数：{{total}}）</p>
        <el-table
                border
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin: 15px 0;"
                :header-cell-style="{textAlign:'center'}"
                :cell-style="{textAlign:'center'}"
                @selection-change="handleSelectionChange">
            <!--<el-table-column-->
            <!--        type="selection"-->
            <!--        fixed-->
            <!--        width="40">-->
            <!--</el-table-column>-->
            <el-table-column
                    label="序号"
                    fixed
                    type="index"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号"
                    show-overflow-tooltip>
                     <template #default="scope">
                        <div class="pos_rel">
                            <template v-if="!scope.row.phone">
                                暂无
                            </template>
                            <div v-else>{{scope.row.phone}}</div>
                        </div>
                    </template>
            </el-table-column>
            <el-table-column
                    prop="leaseto"
                    label="有效期"
                    show-overflow-tooltip>
            </el-table-column>
             <el-table-column
                    prop="kind"
                    label="卡种类"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="balance"
                    label="余额"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="counts"
                    label="剩余次数"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="plate"
                    label="车牌号"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-button-group>
               <el-pagination
                background
           
                :page-count="countPage"
                @prev-click="handlePre"
                @next-click="handleNext"
                @current-change	="pagClk"
                layout="prev, pager, next"
              />
            <!-- <el-button type="primary" icon="el-icon-arrow-left" @click="handlePre">上一页</el-button>
            <el-button type="primary" @click="handleNext">下一页<i class="el-icon-arrow-right el-icon--right"></i>
            </el-button> -->
        </el-button-group>
    </el-dialog>
</template>

<script lang="ts">
  import {defineComponent, reactive, toRefs, ref} from 'vue';
  import {membersFn} from '../api/main';
  import {getStorage} from '../storage';
  import {formatDatePicker} from './common/global'

  export default defineComponent({
    name: 'CarOwner',
    setup() {
      const data = reactive({
        Disable:false,
        dialogVisible: false,
        pageSize: 7,
        currentPage: 0,
        countPage:0
      });

      //查询表单
      const formModel = reactive({
        name: '',
        plate: '',
        phone: '',
        kahao: '',
        status: '',
        timeInOut: '',
      });

      //表格数据
      const tableData = ref([]);
      const total = ref(0);
      //获取表格数据
      function getTableData() {
        membersFn({
          action: 'get_members',
          parking_id: getStorage('parkings').org_id,
          plate: formModel.plate,
          name: formModel.name,
          phone: formModel.phone,
          kahao: formModel.kahao,
          status: formModel.status,
          lease_before: formModel.timeInOut ? formatDatePicker(formModel.timeInOut[1])+' 23:59:59' : '',
          lease_after: formModel.timeInOut ? formatDatePicker(formModel.timeInOut[0])+' 00:00:00' : '',
          limit: data.pageSize,
          offset: data.currentPage,
        }).then((res: any) => {
          tableData.value = [];
          tableData.value = res.data.list;
          total.value = res.data.total;
          console.log(res.data.list)
          data.countPage = Math.ceil( res.data.total/data.pageSize) //总页数
        });
      }
      function pagClk(pag:any){
          data.currentPage =data.pageSize*(pag-1)
          getTableData();
      }
      //上一页
      function handlePre() {
       
        if (data.currentPage <= 0) return;
            data.currentPage-=data.pageSize;
              data.Disable=false
             getTableData();
      }

      //下一页
      function handleNext() {
        if(data.currentPage/data.pageSize<data.countPage){
                data.currentPage+=data.pageSize;
                data.Disable=false
        }else{
             data.Disable=true
        }
      }

      //查询
      function handleSearch() {
         data.currentPage = 0;
        getTableData();
      }

      //表格选择
      let multipleSelection = reactive({});

      function handleSelectionChange(val: any) {
        multipleSelection = val;
      }

      return {
        ...toRefs(data),
        pagClk,
        formModel,
        tableData,
        total,
        handleSelectionChange,
        handlePre,
        handleNext,
        getTableData,
        handleSearch,
      };
    },
  });
</script>

<style lang="scss">
    .parking_dialog {
        .el-form--inline .el-form-item {
            display: flex;
        }

        .el-form-item__content {
            flex: 1;
        }
    }
</style>
