import {createApp} from 'vue';
import App from './App.vue';
import router from './router';

//element-ui
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import './components/common/global.css';

import store from './store/index'


const app = createApp(App);

app.use(router);
app.use(store)
app.config.globalProperties.$store= store
app.use(ElementPlus, { locale });

app.mount('#app');
