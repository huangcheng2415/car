<template>
    <div class="Access">
        <div class="flex flex_column height">
            <div class="flex flex1">
                      <!-- 进口 -->
            <div class="flex1 overflow">
                
                <el-tabs class="height flex flex_column"  v-model="activeTd" :stretch="true">
                    <template v-for="item in channels" :key="item">
                        <el-tab-pane v-if="item?.channel_attr === 1"
                                        :name="item.channel_id">
                            <template #label>
                                <span v-if="item.isDcl" style="color: red;">{{'（待处理）'+item.channel_name}}</span>
                                <span v-else >{{item.channel_name}}</span>
                            </template>
                        </el-tab-pane>
                    </template>
                    <div class="content height flex flex_column">
                        <div class="image_box overflow pos_rel flex1">
                            <img :src="jk.PlateInfo.ImageUrl"  class="pos_center width" style="max-width: 100%;max-height: 100%;width: auto;" alt="">
                        </div>
                        <el-space wrap direction="vertical" alignment="flex-start" :size="20">
                            <div class="flex align_center">入场车牌:
                                <el-input v-model="jk.PlateInfo.Plate"></el-input>
                                <div style="width: 10px;"></div>
                                <el-select style="width: 80px;" v-model="jk.PlateInfo.PlateColor" placeholder="牌色">
                                        <el-option
                                                v-for="(item, index) in colorList"
                                                :key="'carColor-'+index"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                </el-select>
                            </div>
                        </el-space>
                        <div style="width: 10px;"></div>
                        <el-button type="primary">确认入场</el-button>
                    </div>
                </el-tabs>
            </div>
                <!-- 出口 -->
            <div class="flex1 overflow">
                <el-tabs class="height flex flex_column"  v-model="ckctiveTd" :stretch="true">
                    <template v-for="item in channels" :key="item">
                        <el-tab-pane v-if="item?.channel_attr === 2"
                                        :name="item.channel_id">
                            <template #label>
                                <span v-if="item.isDcl" style="color: red;">{{'（待处理）'+item.channel_name}}</span>
                                <span v-else >{{item.channel_name}}</span>
                            </template>
                        </el-tab-pane>
                    </template>
                    <div class="content height flex flex_column">
                        <div class="image_box overflow pos_rel flex1">
                            <img :src="jk.PlateInfo.ImageUrl"  class="pos_center width" style="max-width: 100%;max-height: 100%;width: auto;" alt="">
                        </div>
                        <el-space wrap direction="vertical" alignment="flex-start" :size="20">
                            <div class="flex align_center">出场车牌:
                                <el-input v-model="jk.PlateInfo.Plate"></el-input>
                                <div style="width: 10px;"></div>
                                <el-select style="width: 80px;" v-model="jk.PlateInfo.PlateColor" placeholder="牌色">
                                        <el-option
                                                v-for="(item, index) in colorList"
                                                :key="'carColor-'+index"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                </el-select>
                            </div>
                        </el-space>
                        <div style="width: 10px;"></div>
                        <el-button type="primary">确认出场</el-button>
                    </div>
                </el-tabs>
            </div>
            </div>
          
        </div>
    </div>

</template>
<script lang="ts">
    import { reactive, toRef, toRefs,ref } from 'vue'
    import {getStorage,setStorage} from '../../storage'
    import {colorList} from '../../components/common/global';
    export default {
        name:'Access',
        props: {
       
        },
        setup() {
            const data= reactive<any>({
                jk:{EnterLeaveFlag:1,Channel: '', PlateInfo: {Plate: '', PlateColor: '蓝色', ImageUrl: ''}},
                ck:{EnterLeaveFlag:2,Channel: '', PlateInfo: {Plate: '', PlateColor: '蓝色', ImageUrl: ''}},
                showInPark:ref(false),
                showOutPark :ref(false),
                ckctiveTd:'',
                activeTd:'',
                colorList:colorList
            })
            const channels = ref([...getStorage('station', [])?.channel])
            console.log(channels)
            const channelIds =channels.value.map((i:any)=>{
                    if (i.channel_attr === 1) {
                        data.jk = {...data.jk, ...i};
                        data.jk.Channel =i.channel_id
                        data.showInPark = true;
                        data.activeTd = i.channel_id
                    }
                    if (i.channel_attr === 2) {
                        data.ck = {...data.ck, ...i};
                        data.ck.Channel =i.channel_id
                        data.showOutPark = true;
                        data.ckctiveTd = i.channel_id
                    }
             })
            return{
                ...toRefs(data),
                channels

            }
        }
    }
 
 
</script>
<style  lang="scss">
     .Access {
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