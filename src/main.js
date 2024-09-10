import { createApp } from "vue";
//引入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";

const app = createApp(App);
app.use(ElementPlus);
//加载elementUi(element=icon)组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.mount("#app"); //app实例挂载至id为app的div上
