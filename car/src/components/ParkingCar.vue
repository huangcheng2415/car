<template>
    <el-dialog
            title="在场车辆"
            v-model="dialogVisible"
            custom-class="parking_dialog"
            width="1200px">
        <el-form class="width" ref="form" :inline="true" :model="formModel" label-width="80px" size="mini">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="车牌号">
                        <el-input v-model="formModel.plate"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="姓名">
                        <el-input v-model="formModel.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="卡号">
                        <el-input v-model="formModel.kahao"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="备注">
                        <el-input v-model="formModel.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="车库名称">
                        <el-select class="width" clearable disabled v-model="formModel.carLibrary" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="通道名称">
                        <el-select class="width" v-model="formModel.channel" clearable placeholder="请选择">
                            <template v-for="item in channels">
                                <el-option v-if="item?.channel_attr === 1" :label="item.channel_name" :value="item.channel_id"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="入场时间">
                        <el-date-picker
                                v-model="formModel.timeInOut"
                                type="daterange"
                                range-separator="至"
                                align="right"
                                :picker-options="$store.state.about.pickerOptions"
                                 unlink-panels
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <el-form-item>
                        <el-checkbox v-model="formModel.noplate">空车牌</el-checkbox>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div>
            <el-button type="primary" size="medium" @click="handleSearch">查询</el-button>
            <el-button type="primary" size="medium" @click="getTableData(true)">导出</el-button>
        </div>
         <p style="font-size: 14px;color:red;margin-top: 10px;">查询统计（总在场车辆：{{total}}）</p>
        <el-table
                border
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin: 15px 0;"
                :header-cell-style="{textAlign:'center'}"
                :cell-style="{textAlign:'center'}"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    fixed
                    width="40">
            </el-table-column>
            <el-table-column
                    label="序号"
                    fixed
                    type="index"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop="plate"
                    label="车牌号"
                    width="100"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="车辆图片"
                    width="80"
                    show-overflow-tooltip>
                <template #default="scope">
                    <div class="pos_rel">
                        <el-button
                                v-if="!!scope.row.photo"
                                size="mini"
                                type="primary"
                                @click="handlePhoto(scope.$index, scope.row)">查看
                        </el-button>
                        <template v-else>
                            暂无
                        </template>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="入场时间"
                    width="210"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="kahao"
                    label="卡号"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="kind"
                    label="卡片类型"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="entrance"
                    label="入场通道"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="long"
                    label="停车时长"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注"
                    show-overflow-tooltip>
                     <template #default="scope">
                    <div class="pos_rel">
                        <template v-if="!scope.row.remark">
                            暂无
                        </template>
                        <div v-else>{{scope.row.remark}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    show-overflow-tooltip>
                <template #default="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleUpdate(scope.$index, scope.row)">修改车牌
                    </el-button>
                </template>
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
            >
            </el-pagination>
            <!-- <el-button type="primary" icon="el-icon-arrow-left" @click="handlePre">上一页</el-button>
            <el-button type="primary" @click="handleNext" :disabled="Disable">下一页<i class="el-icon-arrow-right el-icon--right"></i>
            </el-button> -->
        </el-button-group>
    </el-dialog>

    <el-dialog
            title="车辆图片"
            v-model="imgVisible"
            width="1000px"
            center>
        <div class="width pos_rel" style="height: 600px;">
            <img :src="bigImg" class="pos_center width" style="max-width: 100%;max-height: 100%;width: auto;" alt="">
        </div>
    </el-dialog>
</template>

<script lang="ts">
  import {defineComponent, reactive, toRefs, ref} from 'vue';
  import {parkCarsFn} from '../api/main';
  import {getStorage} from '../storage';
  import {updateRecordFn} from '../api/home'
  import {ElMessage, ElMessageBox} from 'element-plus';
  import {dateFormat, formatDatePicker, isEmpty} from './common/global';

  export default defineComponent({
    name: 'ParkingCar',
    setup() {
      const data = reactive({
        defaultDate: new Date(),
        imgVisible: false,
        bigImg: '',
        dialogVisible: false,
        pageSize: 7,
        currentPage: 0,
        channels: ref([...getStorage('station', [])?.channel]),
        Disable:false,//是否禁用下一页
        countPage:0
        
      });

      //查询表单
      const formModel = reactive({
        plate: '',
        name: '',
        kahao: '',
        remark: '',
        carLibrary: '',
        channel: '',
        timeInOut: '',
        noplate: false,
      });

      //表格数据
      const tableData = ref([]);
      const total = ref(0)
      //获取表格数据
      function getTableData(isDown?: boolean) {
        parkCarsFn({
          action: 'get_parking_cars',
          parking_id: getStorage('parkings').org_id,
          plate: formModel.plate,
          name: formModel.name,
          kahao: formModel.kahao,
          remark: formModel.remark,
          channel: formModel.channel,
          noplate: formModel.noplate?1:'',
          before: formModel.timeInOut[1] ? formatDatePicker(formModel.timeInOut[1])+' 23:59:59': '',
          after: formModel.timeInOut[0] ? formatDatePicker(formModel.timeInOut[0])+' 00:00:00': '',
          limit: data.pageSize,
          offset: data.currentPage,
          download: isDown ? '2' : '',
          order: 'desc'
        }).then((res: any) => {
          if (isDown) {
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = res.data.url;
            link.setAttribute('download', '在场车辆');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); //下载完成移除元素
          } else {
            tableData.value = [];
            tableData.value = res.data.list;
            total.value = res.data.total
            data.countPage = Math.ceil( res.data.total/data.pageSize) //总页数
          }
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
      
        getTableData();
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

      //查看图片
      function handlePhoto(index: number, row: any) {
        data.imgVisible = true;
        data.bigImg = row.photo;
        // data.bigImg = 'http://47.108.199.44:8096/plate/CameraZS/2021/04/06/dba89a0e-8887f0b4/%E5%B7%9DAJC345_1617692606102050276.jpg';
      }

      function handleUpdate(index: number, row: any) {
        ElMessageBox.prompt('请输新车牌号', '提示', {
          inputValue: row.plate,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: (val) => {
            return !isEmpty(val)
          },
          inputErrorMessage: '车牌号不能为空'
        }).then((res: any) => {
          updateRecordFn({
            action: 'update_access_records',
            parking_id: getStorage('parkings').org_id,
            plate: row.plate,
            new_plate: res.value,
          }).then((res: any) => {
            if (res.data.status === 'ok') {
              ElMessage.success('操作成功');
              getTableData();
            } else {
              ElMessage.error(res.data.message);
            }
          });
        })
      }

      return {
        ...toRefs(data),
        formModel,
        tableData,
        handleSelectionChange,
        handlePre,
        handleNext,
        pagClk,
        total,
        getTableData,
        handlePhoto,
        handleUpdate,
        handleSearch
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
