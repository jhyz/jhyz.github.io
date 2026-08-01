# 钱金航 AI Agent 求职作品集设计

## 目标

为钱金航创建面向 2027 届秋招的公开个人网站，主要求职方向为 AI Agent / 大模型应用开发工程师。网站需要让招聘方在首屏识别候选人定位，在三分钟内理解 ThemeAgent 的工程深度，并能快速访问 GitHub、开源贡献和公开邮箱。

网站发布到公开仓库 `jhyz/jhyz.github.io`，作为 GitHub Pages 个人主页。页面采用中文主体、英文视觉点缀，隐藏手机号，只公开 GitHub 与邮箱。

## 事实来源与公开边界

- 个人信息、教育、实习、项目和技能以用户指定的 CodeCV Markdown 简历为准。
- ThemeAgent 的技术叙事以 `D:\huawei\Plugin\ThemeDevStudioForIntellij` 当前源码、README 和真实测评报告为设计依据。
- GPT Researcher 只链接已合并的公开 PR #1664。
- 网站不发布华为内部源码、仓库路径、配置、密钥、真实 DSL 业务样本或未在简历中公开的内部资料。
- ThemeAgent 展示抽象架构、通用伪代码、公开可讲的工程机制和简历允许公开的测评结果。
- GitHub 私有仓库不进入网站，也不根据私有仓库内容生成公开项目描述。

## 视觉系统

采用已确认的 A「赛博终端」方向：深黑底色、荧光绿主色、青色 GraphRAG 证据色、琥珀色审批色与红色风险色。背景使用 CSS 网格、扫描线、微弱噪点和局部辉光，不依赖装饰性插图。

主要字体为清晰的中文无衬线字体，数字、命令和状态使用等宽字体。首页可以有光标、终端启动、节点脉冲、工具调用日志和 Patch Diff 动效；正文保持稳定排版与足够留白，避免整个页面持续闪烁。

所有动画支持 `prefers-reduced-motion`，键盘焦点清晰，颜色不能作为唯一状态表达。移动端取消复杂视差，把横向流程改为纵向步骤。

## 页面结构

网站为单页滚动作品集，导航锚点包括 `HOME`、`THEME_AGENT`、`EXPERIENCE`、`PROJECTS`、`STACK` 和 `CONTACT`。

### 1. 首屏终端

- 展示钱金航、AI Agent / 大模型应用开发工程师、南京大学软件工程硕士在读。
- 英文主句强调“可执行、可观测、可回滚”的 Agent 工程能力。
- 提供“探索 ThemeAgent”“查看 GitHub”“发送邮件”三个明确入口。
- 使用短暂、可跳过的 Runtime 启动日志建立视觉记忆，不阻塞正文显示。

### 2. ThemeAgent：Agent 运行现场

ThemeAgent 占页面约 60% 的叙事比重，采用滚动驱动的交互案例，而不是普通项目卡片。

运行链路抽象为：

```text
Immutable Snapshot
→ ReAct Tool Loop
→ KG Evidence Search
→ Risk / Budget / Phase Gate
→ Patch Preview
→ Human Approval
→ Apply + Verify
→ Checkpoint / Rollback
```

该区域包含五个独立模块：

1. **Runtime Console**：模拟一条 Theme DSL 检查任务进入 Agent Runtime，逐步点亮阶段和 Tool Call。
2. **Evidence Graph**：以种子、前沿、强证据、弱证据、缺口和决策展示 GraphRAG 证据治理；不展示真实内部图数据。
3. **Tool Batch Monitor**：展示单轮 1—5 个 Tool Call、只读有界并发、整批校验与原子状态提交。
4. **Risk Gate + Patch Preview**：通过只读、需审批和禁止三类状态解释权限、阶段、预算和风险门禁；使用抽象 Unified Diff 展示 preview-first 写回。
5. **Recovery Trace**：展示持久化运行日志、Checkpoint、异常恢复、验证和显式 Rollback 的闭环。

指标 HUD 使用简历和可公开测评中的数据：87.3% 规则可执行覆盖率、6 类 120 条门禁用例、P95 降低 41.6%、24/24 修复闭环、36/36 可恢复故障、输入 Token 中位数降低 23.5%。82.3% Macro-F1、相较 Vector-RAG 提升 6.3 个百分点和相较 Grep 工具调用减少 57.7% 仅按用户简历原文展示，不扩写实验口径。

### 3. 实习经历

- 华为作为主时间线节点，摘要强调 Agent Runtime、GraphRAG、风险控制、上下文治理和安全 Patch。
- 帆软作为补充节点，强调 LangGraph、多阶段 ReAct、状态恢复、上下文压缩、OpenTelemetry 与 Phoenix。
- 时间线不复刻整份简历，只保留适合网页扫读的成果句；详细信息通过展开交互查看。

### 4. 代表项目

- GPT Researcher：突出已合并 PR #1664、重试语义、流式禁重试、异常链透传及 13 处调用点影响。
- 南京大学党的理论数据库：突出 Spring Boot / MySQL / Redis、1.9 万余篇内容处理、vLLM、RAGFlow / Chroma 与父子分块。
- ThemeAgent 不重复做普通项目卡，使用“查看案例顶部”回链。

### 5. 技术栈、教育与联系

- 技术栈以能力簇呈现：Agent Runtime、LLM/RAG、Java 后端、工具与可观测性。
- 教育区展示南京大学硕士、吉林大学本科和主要荣誉。
- 页尾公开 `https://github.com/jhyz` 与 `838175899@qq.com`，不展示手机号。

## 交互与状态

- 网站不需要后端、登录、数据库、表单提交或访问者追踪。
- 所有内容由本地结构化数据渲染，保证后续更新简历时易于维护。
- 导航、折叠内容、主题案例步骤与复制邮箱均支持键盘和触摸操作。
- 外链使用清晰标签；GitHub 和 PR 链接在新标签页打开，并带安全的 `rel` 属性。
- JavaScript 不可用时，全部关键信息仍以静态内容显示；动画只是增强层。
- 远程头像或资源加载失败时不影响布局，不依赖第三方字体和运行时 API。

## 响应式与无障碍

- 桌面端首屏使用两栏终端布局；移动端改为单列并优先展示身份、岗位和联系入口。
- ThemeAgent 横向运行链在窄屏转为纵向 Timeline，Diff 和日志区域可横向滚动但页面本身不溢出。
- 保证可见焦点、语义标题、按钮标签、足够对比度与 44px 级触控区域。
- 装饰性扫描线和噪点不覆盖文本；动效不会自动播放声音。

## 技术与发布方案

- 构建一个静态单页网站，产物可由 GitHub Pages 直接托管。
- 公开仓库为 `jhyz/jhyz.github.io`，默认分支发布最终静态产物。
- 网站源文件、构建脚本、README 与部署配置进入版本控制；视觉讨论临时目录 `.superpowers/` 被忽略。
- 同时按 Sites 构建流程完成本地预览和部署验证；GitHub Pages 是用户的主要公开入口。

## 验证标准

- 生产构建成功，静态资源路径适用于 GitHub Pages 用户站点根路径。
- 桌面和移动布局无明显溢出，导航与主要交互可用。
- 使用键盘能访问所有按钮和展开区域；减少动态效果偏好生效。
- 页面中不存在手机号、私有仓库、内部源码、凭据或本地路径。
- ThemeAgent 指标与简历一致，公开 PR 链接指向已合并的 #1664。
- GitHub Pages 发布后首页、锚点、外链、刷新和 404 行为符合单页静态站预期。

## 非目标

- 不构建博客、后台管理、招聘方留言系统、多语言切换或实时 GitHub 数据看板。
- 不公开 ThemeAgent 源码，也不为闭源项目伪造 GitHub 链接。
- 不加入会延缓首屏或削弱可读性的 3D 引擎、视频背景和长时间加载动画。
