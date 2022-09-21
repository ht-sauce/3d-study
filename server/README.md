Nuxt 会自动扫描 、 和 目录中的文件~/server/api，~/server/routes以~/server/middleware注册具有 HMR 支持的 API 和服务器处理程序。

每个文件都应该导出一个用defineEventHandler().