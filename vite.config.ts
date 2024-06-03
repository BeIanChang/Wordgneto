import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from 'path'
import { visualizer } from "rollup-plugin-visualizer";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { getLastCommit } from "git-last-commit";

// 定义路径解析函数
function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir)
}

const lifecycle = process.env.npm_lifecycle_event;

// https://vitejs.dev/config/
export default defineConfig(async () => {
  // 获取最后一次 Git 提交的哈希值
  const latestCommitHash = await new Promise<string>((resolve) => {
    return getLastCommit((err, commit) => (err ? 'unknown' : resolve(commit.shortHash)))
  })
  return {
    plugins: [
      vue({
        reactivityTransform: true // 启用 Vue 的响应性转换
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()], // 自动导入 Element Plus 组件
      }),
      Components({
        resolvers: [ElementPlusResolver()], // 自动注册 Element Plus 组件
      }),
      vueJsx(), // 支持 Vue JSX
      lifecycle === 'report' ?
        visualizer({
          gzipSize: true,
          brotliSize: true,
          emitFile: false,
          filename: "report.html", // 分析图生成的文件名
          open: true // 如果存在本地服务端口，将在打包后自动展示
        }) : null,
    ],
    define: {
      LATEST_COMMIT_HASH: JSON.stringify(latestCommitHash + (process.env.NODE_ENV === 'production' ? '' : ' (dev)')),
    },
    // 默认是'',导致只能在一级域名下使用。
    base: './',
    resolve: {
      alias: {
        "@": pathResolve("src"), // 设置路径别名
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'] // 文件扩展名
    },
    server: {
      port: 3001, // 开发服务器端口
      open: false, // 是否自动打开浏览器
      host: '0.0.0.0', // 服务器主机名
      fs: {
        strict: false,
      },
      proxy: {
        '/baidu': 'https://api.fanyi.baidu.com/api/trans/vip/translate' // 代理 API 请求
      }
    }
  }
})
