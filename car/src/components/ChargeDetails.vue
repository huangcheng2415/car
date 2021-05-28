<template>
    <el-dialog
            title="收费明细"
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
                <!--<el-col :span="6">-->
                <!--    <el-form-item label="姓名">-->
                <!--        <el-input v-model="formModel.name"></el-input>-->
                <!--    </el-form-item>-->
                <!--</el-col>-->
                <el-col :span="6">
                    <el-form-item label="卡号">
                        <el-input v-model="formModel.kahao"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="缴费类型">
                        <el-select class="width" clearable v-model="formModel.pay_type" placeholder="请选择">
                            <el-option label="现金" value="现金"></el-option>
                            <el-option label="微信" value="微信"></el-option>
                            <el-option label="支付宝" value="支付宝"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="工作站">
                        <el-select class="width" clearable v-model="formModel.station_id" placeholder="请选择">
                            <el-option v-for="(item, index) in stationList" :key="'station'+index"
                                       :label="item.station_name" :value="item.station_id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="入场时间">
                        <el-date-picker
                                v-model="formModel.timeInOut"
                                
                                type="daterange"
                                 align="right"
                                 :picker-options="$store.state.about.pickerOptions" 
                                 unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="备注">
                        <el-input v-model="formModel.remark"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label=" ">
                        <el-checkbox v-model="formModel.noplate">空车牌</el-checkbox>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item label=" ">
                        <el-checkbox v-model="formModel.usercode">当班记录</el-checkbox>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col >
                    <el-form-item label="缴费时间">
                        <el-date-picker
                                unlink-panels
                                v-model="formModel.payTime"
                                v-bind:picker-options="pickerOptions"
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
         <p style="font-size: 14px;color:red;margin-top: 10px;">查询统计（总收费记录：{{total}}）</p>
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
                    prop="name"
                    label="姓名"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="车辆图片"
                    show-overflow-tooltip>
                <template #default="scope">
                    <div class="pos_rel">
                        <el-button
                                v-if="!!scope.row.img_leave || !!scope.row.img_enter"
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
                    prop="enter_time"
                    label="入场时间"
                    width="170"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="leave_time"
                    label="离场时间"
                     width="170"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="缴费时间"
                      width="100"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="long"
                      width="150"
                    label="收费时长"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    
                    label="类型"
                    show-overflow-tooltip>
                 <template #default="scope">
                    <div class="pos_rel">
                        <template v-if="scope.row.kind=='临时车' || scope.row.kind==''">
                            {{scope.row.pay_type}}
                        </template>
                        <template v-else>
                            扣费
                        </template>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="fee"
                    label="缴费金额"
                    show-overflow-tooltip>
            </el-table-column>
            <!-- <el-table-column
                    prop="pay_type"
                    label="缴费类型"
                    show-overflow-tooltip>
            </el-table-column> -->
            <el-table-column
                    prop="freename"
                    label="免费原因"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="station"
                    label="工作站"
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
  import {defineComponent, reactive, toRefs,computed, ref} from 'vue';
  import {paymentRecordsFn} from '../api/main';
  import {getStorage} from '../storage';
  import {formatDatePicker} from './common/global';
  import {parkingFn} from '../api/login';

  export default defineComponent({
    name: 'ParkingCar',
    
    setup() {
      const data = reactive({
        imgVisible: false,
        img_enter: '',//进场图片
        img_leave:'',//离场图片
        dialogVisible: false,
        pageSize: 7,
        Disable:false,
        currentPage: 0,
        countPage:0,
     
        
      });
      
        const pickerOptions= reactive({

                 shortcuts: [{
                            text: '昨天',
                            onClick(picker:any) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                end.setTime(end.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', [start, end]);
                            }
                        }]
        })
        
         const nextAge = computed({
                get() {
                    return pickerOptions
                },
                set(value) {
                    console.log(value)  //  输出新修改的值
                    return 
                }
                })
    

        
      //查询表单
      const formModel = reactive({
        plate: '',
        kahao: '',
        pay_type: '',
        station_id: '',
        remark: '',
        timeInOut:'',
        payTime: '',
        noplate: false,
        usercode:true,
      });

      //获取工作站信息
      const stationList = ref([]);
      parkingFn({
        action: 'get_station_list',
        sys_org_id: getStorage('parkings').org_id,
      }).then((res: any) => {
        stationList.value = res.data.list;
      });

      //查看图片
      function handlePhoto(index: number, row: any) {
        data.imgVisible = true;
        data.img_enter = row.img_enter;
        data.img_leave = row.img_leave

      }

      //表格数据
      const tableData = ref([]);
      const total = ref(0)
      //获取表格数据
      function getTableData(isDown?: boolean) {
        paymentRecordsFn({
          action: 'get_payment_records',
          sys_org_id: getStorage('parkings').org_id,
          plate: formModel.plate,
          kahao: formModel.kahao,
          pay_type: formModel.pay_type,
          station_id: formModel.station_id,
          remark: formModel.remark,
          noplate: formModel.noplate ? 1 : '',
          enter_before: formModel.timeInOut ? formatDatePicker(formModel.timeInOut[1])+' 23:59:59': '',
          enter_after: formModel.timeInOut ? formatDatePicker(formModel.timeInOut[0])+' 00:00:00': '',
          before: formModel.payTime ? formatDatePicker(formModel.payTime[1])+' 23:59:59' : '',
          after: formModel.payTime ? formatDatePicker(formModel.payTime[0])+' 00:00:00' : '',
          limit: data.pageSize,
          offset: data.currentPage,
          download: isDown ? '2' : '',
          order: 'desc',
          usercode:formModel.usercode?getStorage('userInfo').usercode:'',
          usershift:formModel.usercode?1:''
        }).then((res: any) => {
          if (isDown) {
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = res.data.url;
            link.setAttribute('download', '收费明细');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); //下载完成移除元素
          } else {
            tableData.value = [];
            tableData.value = res.data.list;
            total.value = res.data.total
            console.log(res.data.list)
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
        stationList,
        nextAge,
        formModel,
        tableData,
        pagClk,
        total,
        pickerOptions,
        handlePhoto,
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
