# Cloudflare Pages 部署

本站采用 VitePress 静态构建，可部署到 Cloudflare Pages（与本蓝皮书参考的 WorkBuddyGuide 相同的部署方式）。

## 方式一：Git 集成持续部署（推荐）

1. 将本仓库推送到 GitHub。
2. 在 Cloudflare 控制台选择 **Workers & Pages → Create application → Pages → Import an existing Git repository**，授权并选择本仓库。
3. 使用以下配置：

| 配置项 | 值 |
| --- | --- |
| Project name | `qwen-office-guide` |
| Production branch | `main` |
| Framework preset | `VitePress`（也可选择 None） |
| Build command | `npm run docs:build` |
| Build output directory | `docs/.vitepress/dist` |
| Root directory | `/` |
| Node.js version | `22` |

4. 绑定自定义域名后，在环境变量中设置：

```text
VITEPRESS_SITE_URL=https://你的域名
```

推送 `main` 分支即发布生产版本；PR 与其他分支会生成预览部署。

## 方式二：Wrangler 命令行直接部署

```bash
npm ci
npm run docs:build
npx wrangler login
npm run pages:deploy
```

首次部署会自动创建名为 `qwen-office-guide` 的 Pages 项目；之后在 Cloudflare 控制台为该项目绑定自定义域名即可。

## 自定义域名注意事项

更换域名时，需要同步更新：

- 环境变量 `VITEPRESS_SITE_URL`（影响 sitemap 与 canonical）。
- `docs/public/robots.txt`。
- README 中的在线阅读链接。

## 本地预览生产构建

```bash
npm run docs:build
npm run docs:preview
```
