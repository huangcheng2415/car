<template>
    <el-dialog
            title="出入日志"
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
                    <el-form-item label="通道名称">
                        <el-select class="width" clearable v-model="formModel.channel_id" placeholder="请选择">
                            <template v-for="item in channels">
                                <el-option :label="item.channel_name" :value="item.channel_id"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="开始时间">
                        <el-date-picker
                                v-model="formModel.timeInOut"
                                align="right"
                                :picker-options="$store.state.about.pickerOptions"
                                 unlink-panels
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div>
            <el-button type="primary" size="medium" @click="handleSearch">查询</el-button>
            <el-button type="primary" size="medium" @click="getTableData(true)">导出</el-button>
        </div>
        <p style="font-size: 14px;color:red;margin-top: 10px;">查询统计（出入车辆总数：{{total}}）</p>
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
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="车辆图片"
                    width="80"
                    show-overflow-tooltip>
                <template #default="scope">
                    <div class="pos_rel">
                        <el-button
                                v-if="!!scope.row.img_enter || !!scope.row.img_leave "
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
                    label="通行时间"
                    show-overflow-tooltip>
                <template #default="scope">
                    {{scope.row.time_enter}} - {{scope.row.time_leave?scope.row.time_leave:'至今'}}
                </template>
            </el-table-column>
            <el-table-column
                    label="通道名称"
                    show-overflow-tooltip>
                <template #default="scope">
                    {{scope.row.channel_enter}} - {{scope.row.channel_leave?scope.row.channel_leave:'无'}}
                </template>
            </el-table-column>
            <!--<el-table-column-->
            <!--        prop="name"-->
            <!--        label="通道类型"-->
            <!--        show-overflow-tooltip>-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="name"
                    label="姓名"
                    show-overflow-tooltip>
            </el-table-column>
            <!--<el-table-column-->
            <!--        prop="address"-->
            <!--        label="缴费类型"-->
            <!--        show-overflow-tooltip>-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="kind"
                    label="车辆类型"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="kahao"
                    label="卡号"
                    show-overflow-tooltip>
            </el-table-column>
            <!--<el-table-column-->
            <!--        prop="kind"-->
            <!--        label="卡片类型"-->
            <!--        show-overflow-tooltip>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--        prop="address"-->
            <!--        label="车辆颜色"-->
            <!--        show-overflow-tooltip>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--        prop="address"-->
            <!--        label="车辆标志"-->
            <!--        show-overflow-tooltip>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--        prop="address"-->
            <!--        label="是否通过"-->
            <!--        show-overflow-tooltip>-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="remark"
                    label="备注"
                    show-overflow-tooltip>
                     <template #default="scope">
                            <div class="pos_rel">
                                <template  v-if="!scope.row.remark">
                                     暂无
                                </template>
                                <template  v-else>
                                     {{scope.row.remark}}
                                </template>
                       
                            </div>
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
            <el-button type="primary" @click="handleNext" :disabled="Disable">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button> -->
        </el-button-group>
    </el-dialog>

    <el-dialog
            title="车辆图片"
            v-model="imgVisible"
            width="1000px"
            center>
        <div class="width pos_rel see_image" style="height: 400px;">
            <div class="enter_box box">
                <div class="title">入场图片</div>
                <div class="image">
                    <img v-if="img_enter" :src="img_enter"   alt="">
                     <div v-else class="car_no">
                        <img src="../assets/icon-car.png" style="width: 100px;"/>
                        <span >暂无图片</span>
                    </div>
                </div>
            </div>
            <div class="leave_box box">
                <div class="title">出场图片</div>
                <div class="image">
                    <img  v-if="img_leave" :src="img_leave"   alt="">
                     <div v-else class="car_no">
                        <img src="../assets/icon-car.png" style="width: 100px;"/>
                        <span >暂无图片</span>
                    </div>
                </div> 
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
  import {defineComponent, reactive, toRefs, ref} from 'vue';
  import {AccessRecordsFn} from '../api/main'
  import {getStorage} from '../storage'
  import {formatDatePicker} from './common/global'
  import pl from 'element-plus/packages/locale/lang/pl'

  export default defineComponent({
    name: 'ParkingLog',
    setup() {
      const data = reactive({
        dialogVisible: false,
        imgVisible: false,
        img_enter: '',
        img_leave:'',
        pageSize: 7,
        currentPage: 0,
        channels: ref([...getStorage('station', [])?.channel]),
        Disable:false,//是否禁用下一页
        countPage:0//总页数
      });

      //查询表单
      const formModel = reactive({
        plate: '',
        name: '',
        kahao: '',
        remark: '',
        channel_id: '',
        timeInOut: [new Date(), new Date()],
      });

      //表格数据
      const tableData = ref([]);
      const total = ref(0);

      //获取表格数据
      function getTableData(isDown?: boolean) {
        AccessRecordsFn({
          action: 'get_access_records',
          sys_org_id: getStorage('parkings').org_id,
          plate: formModel.plate,
          name: formModel.name,
          kahao: formModel.kahao,
          channel_id: formModel.channel_id,
          remark: formModel.remark,
          before: formModel.timeInOut ? formatDatePicker(formModel.timeInOut[1])+' 23:59:59' : '',
          after:  formModel.timeInOut ? formatDatePicker(formModel.timeInOut[0])+' 00:00:00': '',
          limit: data.pageSize,
          offset: data.currentPage,
          download: isDown ? '2' : '',
          order: 'desc'
        }).then((res: any) => {
          if (isDown) {
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = res.data.url;
            link.setAttribute('download', '出入日志');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); //下载完成移除元素
          } else {
            console.log(res.data.list,'出入日志')
            tableData.value = [];
            tableData.value = res.data.list;
            total.value = res.data.total;
            data.countPage = Math.ceil( res.data.total/data.pageSize) //总页数
           
            //  if(res.data.count>1){
            //     data.Disable=false
            // }else{
            //   data.Disable=true
            // }
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
        console.log('ssss')
        getTableData();
      }

      //查看图片
      function handlePhoto(index: number, row: any) {
        data.imgVisible = true;
        data.img_enter = row.img_enter;
        data.img_leave = row.img_leave
        // data.bigImg = 'http://47.108.199.44:8096/plate/CameraZS/2021/04/06/dba89a0e-8887f0b4/%E5%B7%9DAJC345_1617692606102050276.jpg';
      }

      //表格选择
      let multipleSelection = reactive({});
      function handleSelectionChange(val:any) {
        multipleSelection = val;
      }

      return {
        ...toRefs(data),
        formModel,
        tableData,
        total,
        pagClk,
        handleSelectionChange,
        handlePre,
        handleNext,
        getTableData,
        handleSearch,
        handlePhoto
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
    .see_image{
        display: flex;
        justify-content: center;
        >.box{
            width: 50%;
            // border:1px solid red;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            .title{
                font-size: 20px;
            }
            .image{
                height: 100%;
                 width: 450px;
                 display: flex;
                 align-items: center;
                 justify-content: center;
                 span{
                     font-size: 25px;
                     font-weight: bold;
                     color:#d0d0d0ee;
                 }
                 img{
                     width: 100%;
                }
                .car_no{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            }
            
        }
        .enter_box {
            border-right: 1px solid #e8ddddee;
        }
    }
</style>
