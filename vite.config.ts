import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';
import {resolve} from 'path';
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
    plugins: [
        vue(),
        WindiCSS(),
        // ...
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false, // css in js
                }),
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    server: {
        // 是否开启 https
        https: false,
        // 端口号
        port: 8888,
        host: "0.0.0.0",
        // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
        proxy: {
            "/api": {
                target: "http://localhost:8080/api/", // 接口的域名
                changeOrigin: true,
                secure: true, // 如果是https接口，需要配置这个参数
                // 反向代理
                rewrite: path => path.replace(/^\/api/, "")
            }
        }
    },
});
