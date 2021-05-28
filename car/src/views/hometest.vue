<template>
    <div class="home bg_white height">
        <el-container class="height overflow">
            <el-main>
                <div class="flex flex_column height">
                    <div class="flex flex1">
                        <div class="flex1 overflow" v-if="showInPark">
                            <el-tabs  class="height flex flex_column" type="border-card" v-model="activeTd"
                                  @tab-click="(tab)=>{handleTab(tab,'in')}" 
                                     :stretch="true" >
                                <template v-for="item in channels" :key="item">
                                    <el-tab-pane v-if="item?.channel_attr === 1"
                                                 :name="item.channel_id">
                                        <template #label>
                                            <span v-if="item.isDcl" style="color: red;">{{'（待处理）'+item.channel_name}}</span>
                                            <span v-else >{{item.channel_name}}</span>
                                        </template>
                                    </el-tab-pane>
                                </template>
                                 <!-- inChannel -->
                                <div class="content height flex flex_column">
                                    <div class="image_box overflow pos_rel flex1">
                                        <img :src="jk.PlateInfo.ImageUrl"
                                             class="pos_center width"
                                             style="max-width: 100%;max-height: 100%;width: auto;" alt="">
                                    </div>
                                    <el-space wrap direction="vertical" alignment="flex-start" :size="20">
                                        <div class="flex align_center">
                                            入场车牌：
                                            <el-input class="flex1" v-model="jk.PlateInfo.Plate"></el-input>
                                            <div style="width: 10px;"></div>
                                            <el-select style="width: 80px;" v-model="jk.PlateInfo.PlateColor"
                                                       placeholder="牌色">
                                                <el-option
                                                        v-for="(item, index) in colorList"
                                                        :key="'carColor-'+index"
                                                        :label="item"
                                                        :value="item">
                                                </el-option>
                                            </el-select>
                                            <div style="width: 10px;"></div>
                                            <el-button type="primary"
                                                       @click="prtScImg('in', jk)">确认入场
                                            </el-button>
                                        </div>
                                        <div>
                                            <!-- <el-button type="primary"  >手动触发</el-button> -->
                                            <el-button type="primary" @click="closeChannel(jk)">关闸</el-button>
                                        </div>
                                    </el-space>
                                </div>
                            </el-tabs>
                        </div>
                        <div style="width: 20px;" v-if="showInPark && showOutPark"></div>
                        <div class="flex1 overflow" v-if="showOutPark">
               
                            <el-tabs class="height flex flex_column" type="border-card" v-model="ckctiveTd"
                                @tab-click="(tab)=>{handleTab(tab,'out')}"
                       
                                    
                                     :stretch="true">
                                <template v-for="item in channels">
                                    <el-tab-pane v-if="item?.channel_attr === 2" :key ="item"
                                                 :name="item.channel_id">
                                        <template #label>
                                            <span  v-if="item.isDcl" style="color: red;">{{'（待处理）'+item.channel_name}}</span>
                                            <span v-else  >{{item.channel_name}}</span>
                                        </template>
                                    </el-tab-pane>
                                </template>
                              
                                <div class="content height flex flex_column">
                                   <div class="image_box overflow pos_rel flex1">
                                        <img :src="ck.PlateInfo.ImageUrl"
                                             class="pos_center width"
                                             style="max-width: 100%;max-height: 100%;width: auto;" alt="">
                                    </div>
                                    <el-space wrap direction="vertical" alignment="flex-start" :size="20">
                                        <div class="flex align_center">
                                            出场车牌：
                                            <el-input class="flex1" v-model="ck.PlateInfo.Plate"></el-input>
                                            <div style="width: 10px;"></div>
                                            <el-select style="width: 80px;" v-model="ck.PlateInfo.PlateColor"
                                                       placeholder="牌色">
                                                <el-option
                                                        v-for="(item, index) in colorList"
                                                        :key="'carColor-'+index"
                                                        :label="item"
                                                        :value="item">
                                                </el-option>
                                            </el-select>
                                            <div style="width: 10px;"></div>
                                            <el-button type="primary"
                                                       @click="prtScImg('out', ck)">确认出场
                                            </el-button>
                                        </div>
                                        <div>
                                            <!-- <el-button type="primary"  >手动触发</el-button> -->
                                            <el-button type="primary" @click="closeChannel(ck)">关闸</el-button>
                                        </div>
                                    </el-space>
                                </div>
                            </el-tabs>
                        </div>
                    </div>
                    <div class="swiper">
                        <swiper
                                :navigation="true"
                                :slides-per-view="slideItem"
                                :space-between="50"
                                
                        >
                            <swiper-slide class="flex align_center justify_center" v-for="(item,index) in logList"
                                          :key="'swiperitem-'+index">
                                <div class="width height flex align_center justify_center"
                                     style="border:1px solid #eaeaea;">
                                    <div class="width center">
                                        <!--v-if="!!item?.socket.PlateInfo.ImageUrl"-->
                                        <div>
                                            <img class="img_dom" v-if="item.PlateInfo?.ImageUrl" :src="item.PlateInfo?.ImageUrl"
                                                 @click="handleSwiper(item)"
                                                 alt="">
                                            <div v-else class="fail_info"  @click="handleSwiper(item)">
                                                  <img src="../assets/icon-car.png" style="width: 60px;" alt="">
                                                  <p class="col999">暂无车辆图片</p>
                                            </div>
                                            <div class="flex" style="padding: 10px;margin-top: 20px;">
                                                <el-input class="flex1" v-model="item.PlateInfo.Plate "
                                                          size="mini"></el-input>
                                                <div style="width: 10px;"></div>
                                                <el-button type="primary" size="mini"
                                                           :disabled="item.PlateInfo.Plate===item.PlateInfo.PlateDisplayName"
                                                           @click="updateRecode(item)">修改
                                                </el-button>
                                            </div>
                                        </div>
                                      
                                    </div>
                                </div>
                            </swiper-slide>
                           
                        </swiper>
                             <div class="Notyet" v-if="!logList.length">
                                <img src="../assets/icon-car.png" style="width: 60px;"
                                      alt="">
                                <p class="col999">暂无车辆信息</p>
                            </div>
                    </div>
                    <div class="total_box f16 center">
                        <el-space :size="40" alignment="center">
                            <div class="">
                                <span class="f14">地面车位占用：</span>{{carSlots.ground_used}}，<span class="f14">剩余：</span>{{carSlots.ground_free}};
                            </div>
                            <div class="">
                                <span class="f14">车库车位占用：</span>{{carSlots.garage_used}}，<span class="f14">剩余：</span>{{carSlots.garage_free}};
                            </div>
                            <div class="">
                                <span class="f14">总车位占用：</span>{{carSlots.used}}，<span class="f14">剩余：</span>{{carSlots.free}};
                            </div>
                            <div class="">
                                <span class="f14">当班金额：</span>{{$store.state.about.money}}
                            </div>
                        </el-space>
                    </div>
                </div>
            </el-main>
            <el-aside class="aside" :class="{'hidden_aside': hiddenAside}">
                <ElScrollbar class="scroll_box">
                    <div class="control_btn flex align_center justify_center pointer" @click="hiddenAside=!hiddenAside">
                        <i class="el-icon-arrow-left f20 col666"
                           :style="{'transform':hiddenAside?'':'rotate(180deg)'}"></i>
                    </div>
                    <el-form class="form_box" label-position="right" label-width="90px" :model="formModel">
                        <el-form-item label="通道:">
                            <el-input size="small" readonly v-model="formModel.channelName"></el-input>
                        </el-form-item>
                        <el-form-item label="卡种:">
                            <el-input size="small" readonly v-model="formModel.Kind"></el-input>
                        </el-form-item>
                        <el-form-item label="卡号:">
                            <el-input size="small" readonly v-model="formModel.KH"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名:">
                            <el-input size="small" readonly v-model="formModel.Name"></el-input>
                        </el-form-item>
                        <el-form-item label="租期:">
                            <el-input size="small" readonly v-model="formModel.LeaseTerm"></el-input>
                        </el-form-item>
                        <el-form-item label="余额:">
                            <el-input size="small" readonly v-model="formModel.Balance"></el-input>
                        </el-form-item>
                        <el-form-item label="余次:">
                            <el-input size="small" readonly v-model="formModel.SurplusTimes"></el-input>
                        </el-form-item>
                        <el-form-item label="车牌:">
                            <el-input size="small" readonly v-model="formModel.Plate"></el-input>
                        </el-form-item>
                        <el-form-item label="时长:">
                            <el-input size="small" readonly v-model="formModel.Long"></el-input>
                        </el-form-item>
                        <el-form-item label="入场:">
                            <el-input size="small" readonly v-model="formModel.EnterDateTime"></el-input>
                        </el-form-item>
                        <el-form-item label="出场:">
                            <el-input size="small" readonly v-model="formModel.LeaveDateTime"></el-input>
                        </el-form-item>
                        <el-form-item label="预缴:">
                            <el-input size="small" readonly v-model="formModel.YiJiao"></el-input>
                        </el-form-item>
                        <el-form-item label="金额:">
                            <el-input size="small" readonly v-model="formModel.YinShou"></el-input>
                        </el-form-item>
                        <el-form-item label="优惠:">
                            <div class="flex">
                                <el-input size="small" class="flex1" v-model="formModel.YHMoney"></el-input>
                                <!--<div style="width: 10px;"></div>-->
                                <!--<div class="flex el-button el-button&#45;&#45;primary el-button&#45;&#45;mini align_center justify_center"-->
                                <!--     @click="handleQuan">扫码-->
                                <!--</div>-->
                            </div>
                        </el-form-item>
                        <!-- <el-form-item label="实收金额:">
                            <div class="flex">
                                <el-input size="small" class="flex1" v-model="formModel.ShiShou"></el-input>
                             
                            </div>
                        </el-form-item> -->
                        <template v-if="!formModel.isHistory">
                            <el-button type="primary" class="open_btn" :disabled="formModel.YinShou<= 0 || formModel.is_btn"
                                       :loading="btnLoading" @click="openChannel('charge',formModel)">
                                收费开闸
                            </el-button>
                            <div class="line"></div>
                            <el-form-item label="免费原因:">
                                <el-select size="small" class="width" v-model="formModel.select" placeholder="请选择">
                                    <el-option v-for="(item, index) in freeOptions" :key="'free'+index"
                                               :label="item.FreeName" :value="item.FreeName"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-button type="primary" class="open_btn" :disabled="formModel.YinShou<= 0 || formModel.is_btn"
                                       :loading="btnLoading" @click="openChannel('free')">
                                免费开闸
                            </el-button>
                        </template>
                    </el-form>
                </ElScrollbar>
            </el-aside>
        </el-container>
        <img id="big_img" v-show="!!bigImgSrc || bigShow" :src="bigImgSrc" alt="">
    </div>
</template>

<script lang="ts">
  import {defineComponent, reactive, ref, toRefs, nextTick,onUnmounted,watch} from 'vue';
  import {ElLoading, ElMessage, ElMessageBox} from 'element-plus';
  import SwiperCore, {Navigation} from 'swiper';
  import {Swiper, SwiperSlide} from 'swiper/vue';
  import 'swiper/swiper.min.css';
  import 'swiper/components/navigation/navigation.scss';
  // import store from '../store/index'
  import {
    checkServiceFn,
    closeChannelFn,
    freeOptionsFn,
    openChannelFn,
    payFn,
    prtScFn,
    shiftInfoFn,
    updateRecordFn,
    parkingcount
  } from '../api/home';
  import {getStorage, setStorage} from '../storage';
  import {colorList, formatDatetimePicker, moneyFormat} from '../components/common/global';
  import { useStore }from 'vuex'
  SwiperCore.use([Navigation]);
  export default defineComponent({
    name: 'Home',
    components: {
      Swiper,
      SwiperSlide,
    },
    
    setup() {
      //界面操作变量
      const store = useStore()
      const data = reactive<any>({
        hiddenAside: false,
        colorList: colorList,
        jk:{EnterLeaveFlag:1,Channel: '', PlateInfo: {Plate: '', PlateColor: '蓝色', ImageUrl: ''}},
        ck:{EnterLeaveFlag:2,Channel: '', PlateInfo: {Plate: '', PlateColor: '蓝色', ImageUrl: ''}},
       
        bigShow: false,
        bigImgSrc: '',
        activeTd:'', //进口选中通道
        ckctiveTd:''//出口选中通道
     
      });
       
      //开关闸btn防抖
      const btnLoading = ref(false);
      //表单数据
      const formModel = reactive({
        isHistory: false, //$是否为历史数据
        channelName: '',    //通道名称
        Kind: '',           //卡名称
        KH: '',             //卡号
        Name: '',           //姓名 eg:'临时识别'
        LeaseTerm: 0,		//租期到期日
        Balance: '0.00',	//余额
        SurplusTimes: 0,	//余次
        Plate: '',	        //车牌号
        Long: '',	        //停车时长 （分钟为单位）
        EnterDateTime: '',	//进场时间
        LeaveDateTime: '',	//离场时间
        YiJiao: '0.00',		//已缴(预交费)
        YinShou: '0.00',	//应收
        YHMoney: '0.00',	//优惠金额
        ShiShou: '0.00',	//实收金额
        select: '',
        Channel:'',//通道
        SerialNo:'',//	通道设备序列号
        ID:'',
        is_btn:false//历史记录点击禁用开闸
      
      });

      //小屏宽度下swiper适配
      const slideItem = ref(5);
      window.onresize = window.onload = function(e: any) {
        if (window.innerWidth <= 1500) {
          slideItem.value = 4;
        } else {
          slideItem.value = 5;
        }
      };
      //通道数据记录
      let logList = ref<any>([...getStorage('logCar', [])]);
      //通道信息相关变量
      const channels = ref([...getStorage('station', [])?.channel]),
            tempChannels =ref<any>([...getStorage('tempChannels', [])]),//多通道队列
            //控制出入口显示
            showInPark = ref(false),
            showOutPark = ref(false),
            
          //抓拍提交专用url
            ImageRefUrl = ref('');
      let currChannel = <any>{}; //当前要处理的车辆信息
      const channelIds = channels.value.map((i: any) => {   //当前所有通道 id
              if (i.channel_attr === 1) {
                  data.jk = {...data.jk, ...i};
                  data.jk.Channel =i.channel_id
                  showInPark.value = true;
                  data.activeTd = i.channel_id
              }
              if (i.channel_attr === 2) {
                  data.ck = {...data.ck, ...i};
                  data.ck.Channel =i.channel_id
                  showOutPark.value = true;
                  data.ckctiveTd = i.channel_id
              }
              return i.channel_id;
          });
      let overObj =ref<any>({...getStorage('overObj',{j:{},c:{}})})//进出通道最后通行车辆信息
          
       
        function traveln (){  // 车辆放行
    
              tempChannels.value=getStorage('tempChannels')
              if( !tempChannels.value?.length){ 
                return
              }
              currChannel= tempChannels.value[0]
              
              if(currChannel.EnterLeaveFlag==data.jk.EnterLeaveFlag){
                data.jk.PlateInfo.ImageUrl =currChannel.PlateInfo.ImageUrl
              }else{
                data.ck.PlateInfo.ImageUrl= currChannel.PlateInfo.ImageUrl
              }
              if( tempChannels.value.length==1){ 
               if(currChannel.PlateInfo.YinShou>0 || currChannel.PlateInfo.KindFlag!=1){
                 console.log(currChannel,1312)
                   setFormModel(currChannel)
               }
                if( currChannel.PlateInfo.YinShou==0 || currChannel.ispay){
                  deltTraveln(currChannel).then(()=>{
                    if(currChannel.ispay){
                      //  ElMessage.success('开闸成功');
                    }
                  })
                }
              }else{
              
                if(currChannel.PlateInfo.YinShou>0 || currChannel.PlateInfo.KindFlag!=1){
                  setFormModel(currChannel)
                  //  data.activeTd = currChannel.Channel
                  if(currChannel.ispay){
                    deltTraveln(currChannel).then((i:any)=>{
                      // ElMessage.success('开闸成功');
                   })
                  }
                  for(let i =0;i< tempChannels.value.length;i++){
                   if(tempChannels.value[i].Channel!=currChannel.Channel ){
                    
                      if(tempChannels.value[i].PlateInfo.YinShou==0 || tempChannels.value[i].ispay){  //金额为0或者已支付状态自动开闸
                           console.log(tempChannels.value[i])
                         deltTraveln(tempChannels.value[i])
                      }else{
                          
                      }
                    }
                  }
                  
                } else{
                  deltTraveln(currChannel)
                }
              }
              Unprocessed()
        }
        function Unprocessed(){//进出通通道的未处理状态和 没个通道第一给待处理的数据
            tempChannels.value=getStorage('tempChannels')
            if(!tempChannels.value) {tempChannels.value=[]}
            const none = tempChannels.value.find((i:any)=> i.PlateInfo.YinShou>0)
            if(none){
              none.EnterLeaveFlag==1?data.activeTd = none.Channel:data.ckctiveTd = none.Channel
            }
             channels.value.map((i:any)=>{i.isDcl=false}) //默认为没有待处理
             tempChannels.value.map((obj:any,index:number)=>{ 
               channels.value.map((item:any,i:number)=>{
                 if(obj.Channel==item.channel_id && obj.PlateInfo.YinShou>0){
                    item.isDcl =true
                 }
               })
             })
        }
        Unprocessed()
        traveln()
        function deltTraveln(val:any){ //更新storage车辆信息数据 并更新记录
           tempChannels.value= getStorage('tempChannels')
          return new Promise((relove)=>{
            tempChannels.value.map((item:any,index:any)=>{
              if(val.PlateInfo.ID==item.PlateInfo.ID && val.Channel==item.Channel){
                    item.PlateInfo.YinShou=0.00
                    const delt = tempChannels.value.splice(index,1)[0]
                    delt.PlateInfo.YinShou=0.00
                    updateLog(val)
                   
                    if(val.PlateInfo.YinShou>0 || val.ispay){ //处理金额大与哦 或者线上支付掉用金额接口
                        val.PlateInfo.YinShou=0.00 //缴费开找成功金额为0 
                        relove(val)
                         store.dispatch('SHIFTINFOFN')
                    }
                    store.commit('MUTATIONS', val.Slots) //更新仓库剩余车位
                    saveParkInfo(val.Slots)
                    setStorage('overObj',overObj.value)
                    setStorage('tempChannels',tempChannels.value)
                    Unprocessed()
                    relove(delt,)
                    
                  if(tempChannels.value.length){
                    
                      traveln()
                  }
            
                }
             })      
          })
        }
        function handleTab(tab:any,type:string){ //进出口切换
            if(!tempChannels.value) {tempChannels.value=[]}
            const t = tempChannels.value.find((i: any) => i.Channel === tab.props.name && i.PlateInfo.YinShou>0); //切换通道显示正要处理的数据
            const dev =channels.value.find((i:any)=> tab.props.name==i.channel_id)
            if(type=='in'){
                data.jk.Channel= tab.props.name
                data.jk.device=dev.device
            }else{
              data.ck.Channel= tab.props.name
              data.ck.device=dev.device
            }
           if(t){
              setFormModel(t)
            }else{
              setFormModel({},true)
            }

        }
       
      let createWS: any, ws: any, tempTime: boolean = false,
    
        carSlots = reactive({
          used: 0,                     //总使用车位
          ground_used: 0,      //地面已用车位
          garage_used: 0,          //车库已用车位
          free: 0,                    //总剩余车位
          ground_free: 0,      //地面剩余车位
          garage_free: 0,           //车库剩余车位
        }),
        in_progress=false,out_progress=false,jcloading={};
         //车位信息
      function saveParkInfo(val: any) {
        carSlots.used = val.used;
        carSlots.ground_used = val.ground_used;
        carSlots.garage_used = val.garage_used;
        carSlots.free = val.free;
        carSlots.ground_free = val.ground_free;
        carSlots.garage_free = val.garage_free;
        setStorage('carFree', carSlots.free);
      }
       let ImageBbj =ref([...getStorage('ImageBbj', [])])//通道抓拍图片
       let imgFlie= true
      !createWS ? (createWS = () => {
        ws = new WebSocket(`ws://47.108.199.44:8081`);
        ws.onopen = (evt: any) => {
          ws.send(`{ "client":"parking", "intent":["subscribe"], "org_id": "${getStorage(
            'parkings').org_id}", "channels":${JSON.stringify(channelIds)} }`);
        };
        ws.onmessage = (evt: any) => {
          let evtObj = JSON.parse(evt.data);
          console.log('ws推送',evtObj.update,evtObj)
          if (evtObj?.status === 'ok') {

          } else {
            switch (evtObj.update) {
              // 最后通行推送消息
              case 'lastpass': 
                tempChannels.value= getStorage('tempChannels')
                if(evtObj.channel_info.KindFlag!=1 && evtObj.channel_info.PlateInfo.KindFlag==2){
                    if(evtObj.channel_info.PlateInfo.Balance>=evtObj.channel_info.PlateInfo.YinShou && evtObj.channel_info.PlateInfo.YinShou>0){ //储值卡当前今金额大于应收金额自动开闸
                      evtObj.channel_info.ispay=true
                      evtObj.channel_info.PlateInfo.YinShou=0.00
                    }
                }
                if(JSON.stringify(tempChannels.value) == "{}" || !tempChannels.value) {tempChannels.value=[]}
                 
                    //  || i.PlateInfo.YinShou>0 && evtObj.channel_info.PlateInfo.YinShou>0
                    const t=  tempChannels.value.findIndex((i:any)=> i.PlateInfo.ID==evtObj.channel_info.PlateInfo.ID && i.Channel==evtObj.channel_info.Channel
                    )
                  
                  if( t==-1){ //如果前面有待支付或者重复拍照直接替换前面的数据
                      tempChannels.value.push(evtObj.channel_info)
                      setStorage('tempChannels',tempChannels.value)
                    }else{
                      tempChannels.value.splice(t,1,evtObj.channel_info)
                      setStorage('tempChannels',tempChannels.value)
                      traveln()
                    }
                    Unprocessed()
                    let flg =false
                    tempChannels.value.find((i:any)=>{
                        if(i.Channel!= tempChannels.value[0].Channel){
                          flg = true 
                        }
                    })
                    if(tempChannels.value.length ==1 || flg){
                      console.log('进了吗')
                      traveln()
                    }
                break;
              //  摄像机上下线
              case 'devstat':
                break;
              //  支付成功
              case 'paystat': //线上支付成功添加支付成功标识 
                tempChannels.value= getStorage('tempChannels')
                    tempChannels.value.find((i:any)=>{
                      i.ispay=false
                      if(i.Channel==evtObj.channel_info.Channel){
                          i.ispay= true
                          return
                      }
                    })
                    setStorage('tempChannels',tempChannels.value)
                    
                break;
              //  开闸成功
              case 'openstat':
                  let tr = tempChannels.value.find((i: any) => i.Channel ===evtObj.channel_info.Channel );
                  if(evtObj.channel_info.Slots && tr){
                    tr.Slots = evtObj.channel_info?.Slots
                     deltTraveln(tr).then((i:any)=>{
                       const isxr = tempChannels.value.find((i: any) => i.PlateInfo.YinShou>0 );
                       if(!isxr){ //如果没有待处理的车辆再渲染
                          setFormModel(i)
                       }
                        
                        ElMessage.success('操作成功');
                    })
                  }
                break;
              //  关闸成功
              case 'closestat':
                if (evtObj.channel_info.CloseStatus === 'success') {
                  // ElMessage.success('关闸成功');
                } else {
                  // ElMessage.error('关闸失败');
                }
                break;
              //  抓拍成功
              case 'snapstat':
                 const outOrin1=  channels.value.find((i:any) => evtObj.channel_info.Channel==i.channel_id).channel_attr
           
                 if(evtObj.channel_info.SnapStatus=="fail"){
                      if(outOrin1==2 && out_progress ){
                            data.ck.PlateInfo.ImageUrl = ''
                            confirmPark('out', data.ck.PlateInfo.Plate, data.ck.PlateInfo.PlateColor,data.ck.Channel)
                        }else if(outOrin1==1 && in_progress){
                            data.jk.PlateInfo.ImageUrl=''
                            confirmPark('out', data.jk.PlateInfo.Plate, data.jk.PlateInfo.PlateColor,data.jk.Channel)
                        }
                  }else{
                   let outTime = setTimeout(()=>{
                        if(imgFlie){
                          if(outOrin1==2 && out_progress ){
                            data.ck.PlateInfo.ImageUrl = ''
                            confirmPark('out', data.ck.PlateInfo.Plate, data.ck.PlateInfo.PlateColor,data.ck.Channel)
                            }else if(outOrin1==1 && in_progress){
                                data.jk.PlateInfo.ImageUrl=''
                                confirmPark('out', data.jk.PlateInfo.Plate, data.jk.PlateInfo.PlateColor,data.jk.Channel)
                            }
                        }else{
                          imgFlie=true
                          window.clearTimeout(outTime)
                        }
                    },4000)
                  }
                break;
              //  抓拍更新
                case 'snapshot':
                  imgFlie= false
                 const imgIndex =  ImageBbj.value.findIndex((i:any)=> i.Channel==evtObj.channel_info.Channel)
                 if(imgIndex==-1){
                    ImageBbj.value.push(evtObj.channel_info)
                 }else{
                    ImageBbj.value.splice(imgIndex,1,evtObj.channel_info)
                 }

                  const outOrin =channels.value.find((i:any) => evtObj.channel_info.Channel==i.channel_id).channel_attr
               console.log(outOrin,out_progress)
                    if(outOrin==1  && in_progress){
                       data.jk.PlateInfo.ImageUrl = evtObj.channel_info.ImageUrl
                        confirmPark('in', data.jk.PlateInfo.Plate, data.jk.PlateInfo.PlateColor,data.jk.Channel)
                    }else if(outOrin==2 && out_progress){
                   
                        data.ck.PlateInfo.ImageUrl = evtObj.channel_info.ImageUrl
                         
                        confirmPark('out', data.ck.PlateInfo.Plate, data.ck.PlateInfo.PlateColor,data.ck.Channel)
                    }
                break;
            }
          }
        };
    
        ws.onclose = (ev: any) => {
          console.log('WebSocket close: 服务器已经断开');
           ws.close(); //关闭TCP连接
          createWS();
        };
        //  ws.onerror = function(ev: any) {
        //    console.log('WebSocket error: 服务器链接失败');
        //   ws.close(); //关闭TCP连接
        //   createWS();
          
        // };

      })() : '';

      function setFormModel(val: any, is=false) {
        console.log(is)
        formModel.channelName = val?.Name || '';   //当前通道名称
        formModel.Kind = val?.PlateInfo?.Kind || '';    //卡名称
        formModel.KH = val?.PlateInfo?.KH || '';    //卡号
        formModel.Name = val?.PlateInfo?.Name || '';    //姓名 eg:'临时识别'
        formModel.LeaseTerm = val?.PlateInfo?.LeaseTerm || 0;  //租期到期日
        formModel.Balance = moneyFormat(val?.PlateInfo?.Balance); //余额
        formModel.SurplusTimes = val?.PlateInfo?.SurplusTimes || 0;    //余次
        formModel.Plate = val?.PlateInfo?.Plate || '';  //车牌号
        formModel.Long = val?.PlateInfo?.Long || 0;    //停车时长 （分钟为单位）
        formModel.EnterDateTime = formatDatetimePicker(val?.PlateInfo?.EnterDateTime);    //进场时间
        formModel.LeaveDateTime = formatDatetimePicker(val?.PlateInfo?.LeaveDateTime);    //离场时间
        formModel.YiJiao = moneyFormat(val?.PlateInfo?.YiJiao);   //已缴(预交费)
        formModel.YinShou = moneyFormat(val?.PlateInfo?.YinShou); //应收
        formModel.YHMoney = moneyFormat(val?.PlateInfo?.DiscountInfo?.YHMoney);    //优惠金额
        formModel.ShiShou = moneyFormat(val?.PlateInfo?.ShiShou); //实收金额
        formModel.Channel= val.Channel || '';//通道
        formModel.SerialNo = val.SerialNo || ''; //设备序列号
        formModel.ID = val?.PlateInfo?.ID || ''; //ID
        formModel.is_btn=is
        if( (JSON.stringify(val) != "{}")){
          if(val.EnterLeaveFlag==1){
              data.jk.Channel = val.Channel
          }else{
              data.ck.Channel = val.Channel
          }
        }
      }

      //确认出、入场  1.抓取图片 --> 2.提交信息
      //抓拍

      function prtScImg(type: string, channel: any) {
        console.log(channel)
       
            let plate,color
            const whether= channels.value.find((i:any)=> channel.Channel == i.channel_id && !i.isDcl)
            if(!whether){
              ElMessage.warning('当前通道有待处理信息，请先处理')
              return
            }
            if(type=='in'){
                plate = data.jk.PlateInfo.Plate;
                color = data.jk.PlateInfo.PlateColor;

            }else{
                plate=data.ck.PlateInfo.Plate;
                color=data.ck.PlateInfo.PlateColor;
            }
            if (!plate || !color) {
              const str = (type === 'in') ? '请填写入场车牌信息' : '请填写出场车牌信息';
              ElMessage.warning(str);
              return;
            }
            
           jcloading = ElLoading.service({
                lock: true,
                text: '加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.7)',
            });
            if( channel.EnterLeaveFlag==data.jk.EnterLeaveFlag ){
                in_progress= true
              }else{
                out_progress= true
                  
              }
            prtScFn({
              action: 'channel_snapshot',
              SerialNo:channel.device?channel.device[0].SerialNo: channel.SerialNo,
              ParkingID: getStorage('parkings').org_id,
              Channel: channel.Channel,
            }).then((res: any) => {
            
              
              if (res.data.status === 'fail') {
                ElMessage.error(res.data.reason);
                jcloading.close()
              } else {
              }
            });
      }
      //提交
      function confirmPark(type: string, plateNum: string, color: string,Channel:string) {
          ImageBbj.value.map((item:any,index:number)=>{
            if(item.Channel==Channel){
               ImageRefUrl.value= item.ImageRefUrl
               return
            }
          })
           console.log(ImageBbj.value,Channel,ImageRefUrl.value)
        // ImageRefUrl.value = 
        // 抓拍后ImageRefUrl不为空，提交后清空
        checkServiceFn({
          action: 'check_service',
          Source: '1',
          ParkingID: getStorage('parkings').org_id,
          Channel: Channel,
          Plate: plateNum,
          ColorType: color,
          ImageSrc: '0',
          ImageUrl: ImageRefUrl.value,
          UserName: getStorage('userInfo').username,
          UserCode: getStorage('userInfo').usercode,
          InitialOpen:'1',
        }).then((res: any) => {
          if (res.data.errno === 0) {
            let objChannel
            if(Channel==data.jk.Channel ){
                objChannel =data.jk;
                 in_progress=false
            }else{
              objChannel = data.ck;
              out_progress=false
            }
            if(objChannel.PlateInfo.YinShou>0){
              setFormModel(objChannel)
            }else{

            }
            imgFlie=true
             ImageRefUrl.value=''
            jcloading.close()
            
          } else {
            ImageRefUrl.value=''  
            ElMessage.error(res.data.message);
           
           jcloading.close()
          }
        });
      }
 
      //点击关闸
      function closeChannel(val: any) {
        console.log(val)
        const loading = ElLoading.service({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)',
        });
        closeChannelFn({
          action: 'channel_close',
          SerialNo:val.device?val.device[0].SerialNo: val.SerialNo,
          ParkingID: getStorage('parkings').org_id,
          Channel: val.Channel,
        }).then((res: any) => {
          if (res.data.status === 'ok') {
            ElMessage.success('关闸成功');
          } else {
            ElMessage.error(res.data.reason);
          }
        }).finally(() => {
          loading.close();
        });
        ;
      }

      //收费开闸、免费开闸
      function openChannel(type: string, val: any) {
        btnLoading.value = true;
        const loading = ElLoading.service({ lock: true,text: '加载中...',spinner: 'el-icon-loading',background: 'rgba(255, 255, 255, 0.7)', });
          if(!tempChannels.value.length) {
            btnLoading.value = false; 
            loading.close(); ElMessage.warning('没有可通行车辆');
            return
          }
          if (type === 'charge') {
             payFn({  action: 'pay_success', ParkingID: getStorage('parkings').org_id, SerialNo:val.SerialNo,Channel: val.Channel, pay_type: '0', user_name: getStorage('userInfo').username, user_code: getStorage('userInfo').usercode, }).then((res: any) => {
            if (res.data.status === 'fail') {
              if(res.data.reason==='no fee info!'){
                  ElMessage.warning('该车辆以通行');
                   deltTraveln(currChannel)
              }else{
                  ElMessage.error(res.data.reason); 
              }
              loading.close();
            
            } else {
                  loading.close();
            }
          } ); 
          }else{
            if (!formModel.select) {
              btnLoading.value = false;
              ElMessage.warning('请选择免费原因');
              loading.close();
              return;
            }
                payFn({
                action: 'pay_success',
                ParkingID: getStorage('parkings').org_id,
                SerialNo:val.SerialNo,
                Channel: val.Channel,
                pay_type: '0',
                user_name: getStorage('userInfo').username,
                user_code: getStorage('userInfo').usercode,
                free_name: formModel.select,
              }).then((res: any) => {
                if (res.data.status === 'fail') {
                  loading.close();
                   if(res.data.reason==='no fee info!'){
                        ElMessage.warning('该车辆以通行');
                        deltTraveln(currChannel)
                    }else{
                        ElMessage.error(res.data.reason); 
                    }
                } else {
                  
                  loading.close();
                }
              });
          }
            btnLoading.value = false;
      }
      //更新车辆记录
      function updateLog(channel_info: any) { //只显示前20条记录
        return new Promise((resolve: any) => {
          let flg=true
            // logList.value.find((data:any)=>{
            //   if(channel_info.PlateInfo.ID == data.PlateInfo.ID){
            //     flg=false
            //   }
            // })
          if(flg){
              logList.value.unshift(channel_info); 
              if (logList.value.length > 20) {
                logList.value.pop();
              }
              setStorage('logCar', logList.value);
              logList.value = getStorage('logCar');
              changeHistoryImg();
               resolve();
          }
          
         
        });
      }

      //历史数据大图显示
       onUnmounted(()=>{ //页面卸载时断开webscoket链接
         ws.close()
      })

      nextTick(() => {
        let bigDom: any = document.getElementById('big_img');
        bigDom.onmouseover = function() {
          data.bigShow = true;
        };
        bigDom.onmouseout = function() {
          data.bigImgSrc = '';
          data.bigShow = false;
        };
      });
      function changeHistoryImg() {
        nextTick(() => {
          for (let i of <any>document.getElementsByClassName('img_dom')) {
            i.onmouseover = function() {
              data.bigImgSrc = i.src;
            };
            i.onmouseout = function() {
              setTimeout(() =>{
                if(!data.bigShow) {
                  data.bigImgSrc = '';
                }
              }, 100)
            };
          }
        });
      }

      changeHistoryImg();

      //点击历史数据
      function handleSwiper(item: any) {
          setFormModel(item,true);
      }
  
      function updateRecode(item: any) {//修改车牌
        if (item.PlateInfo.PlateDisplayName === item.PlateInfo.Plate) return;
        updateRecordFn({ action: 'update_access_records', parking_id: getStorage('parkings').org_id, channel_id: item.channel_id, plate: item.PlateInfo.PlateDisplayName, new_plate: item.PlateInfo.Plate, }).then((res: any) => {
          if (res.data.status === 'ok') {
            ElMessage.success('操作成功');
            logList.value.find((i: any) => {
              if (i.PlateInfo.ID === item.PlateInfo.ID) {
                i.PlateInfo.PlateDisplayName = i.PlateInfo.Plate;
                setFormModel(i)
              }
            });
              
            setStorage('logCar', logList.value);
          } else {
            ElMessage.error(res.data.message);
          }
        });
      }

      store.dispatch('SHIFTINFOFN')

      function parkingcounts(){
        parkingcount({action:'get_slots',parking_id: getStorage('userInfo').org_id,}).then((res:any)=>{
            store.commit('MUTATIONS', res.data.slots)
             saveParkInfo(res.data.slots)
        })
      }
      parkingcounts()
      const freeOptions = ref<any>([]);
      
      //获取免费选项内容
      
      freeOptionsFn({
        action: 'get_options',
        user_code: getStorage('userInfo').usercode,
        parking_id: getStorage('parkings').org_id,
        option: 'freename',
      }).then((res: any) => {
        freeOptions.value = res.data.options;
      });

      return {
        ...toRefs(data),
        tempChannels,
        store,
    
        btnLoading,
        formModel,
        slideItem,
        channels,
        showInPark,
        showOutPark,
        carSlots,
        logList,
        freeOptions,
        moneyFormat,
        handleTab,
        openChannel,
        closeChannel,
        prtScImg,
        confirmPark,
        updateRecode,
        handleSwiper,
  
     
      };
     
    },
  });
</script>

<style lang="scss">
    .home {
        .el-tabs__content {
            flex: 1;
        }

        .image_box {
            border: 1px solid #eaeaea;
            margin-bottom: 20px;
        }

        .swiper {
            padding: 20px 0 0;
            height: 240px;
            position: relative;

            .swiper-container {
                height: 100%;
            }
            .Notyet{
              position: absolute;
              top: 50%;
              transform:translate(-50%,-50%);
              left: 50%;
              text-align: center;
            }
            .fail_info{
              height: 120px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              // font-size: 20px;
              color: #eeee;
            }
            .img_dom{
              height: 120px;
            }
        }

        .total_box {
            color: #656565;
            padding-top: 20px;
            height: 40px;
        }

        .aside {
            transition: 0.3s;
            width: 330px;
            height: 100%;
            background-color: #fafafa;
            box-shadow: 0 0 8px 0 rgb(232 237 250 / 60%), -2px 2px 4px 0 rgb(232 237 250 / 100%);

            .line {
                height: 1px;
                border-top: 1px solid #eaeefb;
                margin: 20px 0;
            }

            .open_btn {
                width: 100%;
            }
        }

        .hidden_aside {
            margin-right: -280px;
        }

        .control_btn {
            width: 20px;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            /*background: linear-gradient(to right, #000000, #FFFFFF);*/
        }

        .scroll_box {
            padding: 0 20px;
        }

        .form_box {
            padding: 20px 0;
        }

        #big_img {
            position: fixed;
            bottom: 0;
            right: 0;
            width: 800px;
            z-index: 100;
        }

        .el-form-item {
            margin-bottom: 5px;
        }
    }
</style>
