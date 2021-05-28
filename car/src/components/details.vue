<template>
  <el-dialog

   v-model="dialogVisible">
      当班明细
  </el-dialog>
</template>
<script lang="ts" >
  import {defineComponent, reactive ,toRefs, ref} from 'vue'
  export default defineComponent({
    name:'Details', //交班明细
    setup(){
        const data = reactive({
             dialogVisible: false,
        })
        
    }
  
  })
 
    
</script>
<style module lang="scss">
     
</style>