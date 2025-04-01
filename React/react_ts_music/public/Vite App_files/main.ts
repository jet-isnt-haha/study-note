import { createApp } from "/node_modules/.vite/deps/vue.js?v=40557654";
import TDesign from "/node_modules/.vite/deps/tdesign-mobile-vue.js?v=03165518";
import { createPinia } from "/node_modules/.vite/deps/pinia.js?v=1f98fbd1";
import App from "/src/App.vue";
import router from "/src/router/index.ts?t=1742785101666";
import "/node_modules/.pnpm/tdesign-mobile-vue@1.8.3_vue@3.5.13_typescript@5.8.2_/node_modules/tdesign-mobile-vue/es/style/index.css";
import "/src/assets/global.less?t=1742784128044";
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(TDesign);
app.mount("#app");

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCB7IGNyZWF0ZUFwcCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBURGVzaWduIGZyb20gJ3RkZXNpZ24tbW9iaWxlLXZ1ZSc7XG5pbXBvcnQgeyBjcmVhdGVQaW5pYSB9IGZyb20gJ3BpbmlhJ1xuXG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwLnZ1ZSdcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9yb3V0ZXInXG5pbXBvcnQgJ3RkZXNpZ24tbW9iaWxlLXZ1ZS9lcy9zdHlsZS9pbmRleC5jc3MnO1xuaW1wb3J0ICdAL2Fzc2V0cy9nbG9iYWwubGVzcydcbmNvbnN0IGFwcCA9IGNyZWF0ZUFwcChBcHApXG5cbmFwcC51c2UoY3JlYXRlUGluaWEoKSlcbmFwcC51c2Uocm91dGVyKVxuYXBwLnVzZShURGVzaWduKTtcbmFwcC5tb3VudCgnI2FwcCcpXG4iXSwibWFwcGluZ3MiOiJBQUVBLFNBQVMsaUJBQWlCO0FBQzFCLE9BQU8sYUFBYTtBQUNwQixTQUFTLG1CQUFtQjtBQUU1QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU87QUFDUCxPQUFPO0FBQ1AsTUFBTSxNQUFNLFVBQVUsR0FBRztBQUV6QixJQUFJLElBQUksWUFBWSxDQUFDO0FBQ3JCLElBQUksSUFBSSxNQUFNO0FBQ2QsSUFBSSxJQUFJLE9BQU87QUFDZixJQUFJLE1BQU0sTUFBTTsiLCJuYW1lcyI6W119