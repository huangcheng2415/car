<template>
  <div class="home bg_white height">
     <el-container class="el-container height overflow">
        <el-main>
            <Access></Access>
            
        </el-main>
        <div class="aside"></div>
     </el-container>
  </div>
</template>
<script  lang='ts'>
import { reactive, toRefs ,ref} from 'vue'
import {getStorage,setStorage} from '../storage'
import Access from '../components/homeComponen/Access.vue'
export default {
  name:'home',
  components:{
     Access
  },
  setup(props) {
      const data= reactive<any>({

      })
      const channels = ref([...getStorage('station', [])?.channel])
      const channelIds = channels.value.map((i:any)=>{
          return i.channel_id
      })
      return{
          ...toRefs(data),
          channels
      }
  }
}
 

  const state = reactive({});
  
</script>
<style  lang="scss">
     .index-home{
       display: flex;
       .aside{
          width: 300px;
          height: 100%;
        }
     }
     
    
</style>