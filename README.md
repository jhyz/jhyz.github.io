# 钱金航 · AI Agent Engineering Portfolio

[在线访问](https://jhyz.github.io/) · [公开版简历](https://jhyz.github.io/qian-jinhang-resume.pdf) · [联系邮箱](mailto:838175899@qq.com)

这是我的 2027 秋招个人主页，重点展示 AI Agent、大模型应用与工程化实践。页面内容以 ThemeAgent 的真实源码主链为核心，呈现 Agent Runtime、GraphRAG、证据治理、风险门禁和可恢复写回等工作。

## 页面内容

- ThemeAgent 三维运行拓扑与五阶段架构工作台
- 华为、帆软实习经历与工程职责
- GPT Researcher 已合并开源贡献
- 南京大学党的理论数据库项目
- 可公开下载、已脱敏的单页简历
- 桌面端快捷导航与移动端响应式布局

## 技术栈

- Next.js 16 / React 19 / TypeScript
- React Three Fiber / Three.js
- Framer Motion
- GitHub Actions / GitHub Pages

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm ci
npm run dev
```

生产验证：

```bash
npm test
npm run lint
npm run export
```

## 部署

推送到 `main` 后，[GitHub Actions](./.github/workflows/deploy-pages.yml) 会生成静态站点并部署到 GitHub Pages。

交互结构基于 [sanidhyy/next-portfolio](https://github.com/sanidhyy/next-portfolio) 改造。
