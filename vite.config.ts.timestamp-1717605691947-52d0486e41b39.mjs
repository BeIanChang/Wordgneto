// vite.config.ts
import { defineConfig } from "file:///F:/Courses/sem_6/Software%20Engineering/Wordgneto/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/Courses/sem_6/Software%20Engineering/Wordgneto/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///F:/Courses/sem_6/Software%20Engineering/Wordgneto/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { resolve } from "path";
import { ElementPlusResolver } from "file:///F:/Courses/sem_6/Software%20Engineering/Wordgneto/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import AutoImport from "file:///F:/Courses/sem_6/Software%20Engineering/Wordgneto/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///F:/Courses/sem_6/Software%20Engineering/Wordgneto/node_modules/unplugin-vue-components/dist/vite.mjs";
var __vite_injected_original_dirname = "F:\\Courses\\sem_6\\Software Engineering\\Wordgneto";
function pathResolve(dir) {
  return resolve(__vite_injected_original_dirname, ".", dir);
}
var vite_config_default = defineConfig(async () => {
  return {
    plugins: [
      vue({
        reactivityTransform: true
        // 启用 Vue 的响应性转换
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
        // 自动导入 Element Plus 组件
      }),
      Components({
        resolvers: [ElementPlusResolver()]
        // 自动注册 Element Plus 组件
      }),
      vueJsx()
      // 支持 Vue JSX
    ],
    // 默认是'',导致只能在一级域名下使用。
    base: "./",
    resolve: {
      alias: {
        "@": pathResolve("src")
        // 设置路径别名
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
      // 文件扩展名
    },
    server: {
      port: 3001,
      // 开发服务器端口
      open: false,
      // 是否自动打开浏览器
      host: "0.0.0.0",
      // 服务器主机名
      fs: {
        strict: false
      },
      proxy: {
        "/baidu": "https://api.fanyi.baidu.com/api/trans/vip/translate"
        // 代理 API 请求
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxDb3Vyc2VzXFxcXHNlbV82XFxcXFNvZnR3YXJlIEVuZ2luZWVyaW5nXFxcXFdvcmRnbmV0b1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcQ291cnNlc1xcXFxzZW1fNlxcXFxTb2Z0d2FyZSBFbmdpbmVlcmluZ1xcXFxXb3JkZ25ldG9cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L0NvdXJzZXMvc2VtXzYvU29mdHdhcmUlMjBFbmdpbmVlcmluZy9Xb3JkZ25ldG8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgZ2V0TGFzdENvbW1pdCB9IGZyb20gXCJnaXQtbGFzdC1jb21taXRcIjtcclxuXHJcbi8vIFx1NUI5QVx1NEU0OVx1OERFRlx1NUY4NFx1ODlFM1x1Njc5MFx1NTFGRFx1NjU3MFxyXG5mdW5jdGlvbiBwYXRoUmVzb2x2ZShkaXI6IHN0cmluZykge1xyXG4gIHJldHVybiByZXNvbHZlKF9fZGlybmFtZSwgXCIuXCIsIGRpcilcclxufVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGFzeW5jICgpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoe1xyXG4gICAgICAgIHJlYWN0aXZpdHlUcmFuc2Zvcm06IHRydWUgLy8gXHU1NDJGXHU3NTI4IFZ1ZSBcdTc2ODRcdTU0Q0RcdTVFOTRcdTYwMjdcdThGNkNcdTYzNjJcclxuICAgICAgfSksXHJcbiAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3RUM0XHU0RUY2XHJcbiAgICAgIH0pLFxyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLCAvLyBcdTgxRUFcdTUyQThcdTZDRThcdTUxOEMgRWxlbWVudCBQbHVzIFx1N0VDNFx1NEVGNlxyXG4gICAgICB9KSxcclxuICAgICAgdnVlSnN4KCksIC8vIFx1NjUyRlx1NjMwMSBWdWUgSlNYXHJcbiAgICBdLFxyXG4gICAgLy8gXHU5RUQ4XHU4QkE0XHU2NjJGJycsXHU1QkZDXHU4MUY0XHU1M0VBXHU4MEZEXHU1NzI4XHU0RTAwXHU3RUE3XHU1N0RGXHU1NDBEXHU0RTBCXHU0RjdGXHU3NTI4XHUzMDAyXHJcbiAgICBiYXNlOiAnLi8nLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiBwYXRoUmVzb2x2ZShcInNyY1wiKSwgLy8gXHU4QkJFXHU3RjZFXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4dGVuc2lvbnM6IFsnLm1qcycsICcuanMnLCAnLnRzJywgJy5qc3gnLCAnLnRzeCcsICcuanNvbicsICcudnVlJ10gLy8gXHU2NTg3XHU0RUY2XHU2MjY5XHU1QzU1XHU1NDBEXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHBvcnQ6IDMwMDEsIC8vIFx1NUYwMFx1NTNEMVx1NjcwRFx1NTJBMVx1NTY2OFx1N0FFRlx1NTNFM1xyXG4gICAgICBvcGVuOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4XHJcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJywgLy8gXHU2NzBEXHU1MkExXHU1NjY4XHU0RTNCXHU2NzNBXHU1NDBEXHJcbiAgICAgIGZzOiB7XHJcbiAgICAgICAgc3RyaWN0OiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAnL2JhaWR1JzogJ2h0dHBzOi8vYXBpLmZhbnlpLmJhaWR1LmNvbS9hcGkvdHJhbnMvdmlwL3RyYW5zbGF0ZScgLy8gXHU0RUUzXHU3NDA2IEFQSSBcdThCRjdcdTZDNDJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVSxTQUFTLG9CQUFvQjtBQUN4VyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsZUFBZTtBQUV4QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQVB2QixJQUFNLG1DQUFtQztBQVd6QyxTQUFTLFlBQVksS0FBYTtBQUNoQyxTQUFPLFFBQVEsa0NBQVcsS0FBSyxHQUFHO0FBQ3BDO0FBR0EsSUFBTyxzQkFBUSxhQUFhLFlBQVk7QUFDdEMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLFFBQ0YscUJBQXFCO0FBQUE7QUFBQSxNQUN2QixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQTtBQUFBLE1BQ25DLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBO0FBQUEsTUFDbkMsQ0FBQztBQUFBLE1BQ0QsT0FBTztBQUFBO0FBQUEsSUFDVDtBQUFBO0FBQUEsSUFFQSxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLFlBQVksS0FBSztBQUFBO0FBQUEsTUFDeEI7QUFBQSxNQUNBLFlBQVksQ0FBQyxRQUFRLE9BQU8sT0FBTyxRQUFRLFFBQVEsU0FBUyxNQUFNO0FBQUE7QUFBQSxJQUNwRTtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBO0FBQUEsTUFDTixNQUFNO0FBQUE7QUFBQSxNQUNOLE1BQU07QUFBQTtBQUFBLE1BQ04sSUFBSTtBQUFBLFFBQ0YsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLE9BQU87QUFBQSxRQUNMLFVBQVU7QUFBQTtBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
