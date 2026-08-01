import { AgentTopology, MotionProject } from "./agent-topology";
import { ArchitectureWalkthrough, CommandDeck, ScrollProgress } from "./interactive-portfolio";

const architecture = [
  {
    label: "ENTRY",
    name: "InspectionAgent",
    detail: "接收检查任务，建立本次运行的输入与边界。",
    guard: "输入、文件范围与当前 Phase 先完成校验。",
    artifact: "边界明确的 inspection request",
  },
  {
    label: "DISPATCH",
    name: "OpDispatchLoop",
    detail: "把检查、修复与 Skill 场景接入同一运行入口。",
    guard: "workflow policy 与 Agent Profile 决定允许的动作集合。",
    artifact: "可调度的 operation",
  },
  {
    label: "RUNTIME",
    name: "ReActTurnLoop",
    detail: "单轮规划 1–5 个动作，批前校验后再提交状态。",
    guard: "预算、风险等级和批次语义在工具调用前判断。",
    artifact: "经过校验的 tool batch",
  },
  {
    label: "EVIDENCE",
    name: "EvidenceSearchState",
    detail: "管理 seed、frontier、evidence 与 gap，缺什么再查什么。",
    guard: "证据缺口驱动补检，避免无界扩张上下文。",
    artifact: "可追踪的 evidence set",
  },
  {
    label: "WRITEBACK",
    name: "Preview / Approve / Verify",
    detail: "先看差异，再人工批准；写回后验证，异常时显式回滚。",
    guard: "写操作必须预览与批准，失败进入 Checkpoint 恢复。",
    artifact: "diff、approval 与 verification result",
  },
];

const evidence = [
  ["87.3%", "规则可执行覆盖率", "148 类组件 / 832 条属性约束 / 73 条结构规则"],
  ["41.6%", "只读批次 P95 降幅", "有界并发对比串行基线"],
  ["82.3%", "KG 联合定位 Macro-F1", "50 个任务三方案对照"],
  ["+6.3 pp", "相较 Vector-RAG", "同一组定位任务"],
  ["−57.7%", "相较 Grep 的平均工具调用", "证据缺口驱动补检"],
  ["24 / 24", "修复闭环完成", "预览、审批、写回、校验"],
  ["36 / 36", "故障注入完成恢复", "Checkpoint 与显式回滚"],
  ["−23.5%", "输入 Token 中位数", "定位质量基本不变"],
];

const capabilityGroups = [
  ["Agent Runtime", "ReAct / LangGraph / Tool Calling / State Management / Context Governance"],
  ["Knowledge", "GraphRAG / Neo4j / RAGFlow / Chroma / vLLM"],
  ["Engineering", "Java / Spring Boot / Python / MySQL / Redis / Docker"],
  ["Product Surface", "IntelliJ Platform SDK / JCEF / React / OpenTelemetry / Phoenix"],
];

export default function Home() {
  return (
    <main data-portfolio-base="sanidhyy/next-portfolio">
      <ScrollProgress />
      <a className="skip-link" href="#main-content">跳到主要内容</a>

      <header className="site-header" id="home">
        <a className="wordmark" href="#home" aria-label="返回首页">
          <span>钱金航</span>
          <small>QIAN JINHANG</small>
        </a>
        <nav aria-label="主导航">
          <a href="#theme-agent">ThemeAgent</a>
          <a href="#experience">实习</a>
          <a href="#projects">项目</a>
          <a href="#capabilities">能力</a>
          <a href="#contact">联系</a>
        </nav>
        <div className="header-actions">
          <span className="availability">2027 秋招 / 可联系</span>
          <CommandDeck />
        </div>
      </header>

      <section className="intro page-shell" id="main-content">
        <div className="intro-main">
          <p className="document-label">QIAN JINHANG / AI AGENT ENGINEERING / 2027</p>
          <h1 data-text="钱金航" aria-label="钱金航">钱金航</h1>
          <p className="role">AI Agent / 大模型应用开发工程师</p>
          <h2>让 Agent 在改一行代码前，<br />先证明它为什么是对的。</h2>
          <p className="intro-copy">
            南京大学软件工程硕士在读。我的工作集中在 Agent Runtime、GraphRAG、
            上下文治理和安全写回：模型负责提出动作，系统负责证据、权限、预算、审批与恢复。
          </p>
          <div className="primary-actions">
            <a className="action action-primary" href="#theme-agent">查看 ThemeAgent 工程路径</a>
            <a className="action" href="/qian-jinhang-resume.pdf" target="_blank" rel="noreferrer">查看公开版简历 PDF</a>
            <a className="action" href="https://github.com/jhyz" target="_blank" rel="noreferrer">查看 GitHub ↗</a>
            <a className="action" href="mailto:838175899@qq.com">发送邮件</a>
          </div>
        </div>

        <AgentTopology />
      </section>

      <section className="case-section" id="theme-agent">
        <div className="page-shell">
          <header className="case-heading">
            <div>
              <p className="document-label light">PRIMARY EVIDENCE / THEMEAGENT</p>
              <h2>一条修复建议，<br />为什么值得被写回 IDE？</h2>
            </div>
            <p>
              ThemeAgent 是面向 HarmonyOS 主题 DSL 的 IntelliJ 插件。当前源码主链从
              <code> InspectionAgent</code> 进入，经统一调度与 ReAct 运行循环，最终在证据与审批边界内完成检查或修复。
            </p>
          </header>

          <ArchitectureWalkthrough stages={architecture} />

          <div className="engineering-review">
            <article className="review-principle">
              <p className="document-label">ENGINEERING DECISION</p>
              <h3>模型提议，系统裁决。</h3>
              <p>
                Planner 看见的是当前运行状态，不是无限上下文。每个动作先经过 workflow policy、
                profile scope、phase、预算与审批检查；越界动作不会进入工具执行。
              </p>
              <blockquote>
                <span>不是把更多文本塞给模型</span>
                <strong>而是让状态决定下一步该补哪条证据。</strong>
              </blockquote>
            </article>

            <div className="gate-ledger" aria-label="工具风险门禁">
              <div className="ledger-head"><span>操作</span><span>系统处理</span><span>原因</span></div>
              <div><code>READ</code><b className="state-allow">直接执行</b><span>只读且在 scope 内</span></div>
              <div><code>QUERY KG</code><b className="state-allow">有界并发</b><span>批前校验，局部快照归并</span></div>
              <div><code>PATCH PREVIEW</code><b className="state-review">等待审查</b><span>只生成可读差异</span></div>
              <div><code>APPLY</code><b className="state-approve">人工批准</b><span>显式写回边界</span></div>
              <div><code>OUT OF SCOPE</code><b className="state-deny">拒绝</b><span>权限或阶段不匹配</span></div>
            </div>
          </div>

          <section className="evidence-section" aria-labelledby="evidence-title">
            <div className="evidence-title">
              <p className="document-label light">MEASURED OUTCOMES</p>
              <h3 id="evidence-title">ThemeAgent 验证结果</h3>
              <p>数据与公开版求职简历使用同一评测口径。</p>
            </div>
            <div className="evidence-ledger">
              {evidence.map(([value, label, note]) => (
                <article key={value + label}>
                  <strong>{value}</strong>
                  <div><b>{label}</b><span>{note}</span></div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="experience-section page-shell" id="experience">
        <header className="section-intro">
          <p className="document-label">EXPERIENCE / WHAT I OWNED</p>
          <h2>不是旁观 AI 功能，<br />而是负责它的工程边界。</h2>
        </header>

        <div className="experience-list">
          <article>
            <div className="job-meta"><span>2026.06 至今</span><b>华为</b><small>终端 BG / 鸿蒙 OS / 主题开发</small></div>
            <div className="job-title"><p>AI 应用开发实习生</p><h3>ThemeAgent 核心开发</h3></div>
            <ul>
              <li>用 Java 17、IntelliJ Platform SDK 与 JCEF / React 串起 DSL 解析、证据检索、诊断与安全写回。</li>
              <li>把线性流程重构为配置驱动 Agent Runtime，通过 Agent Profile 与 Skill Host 收敛场景差异。</li>
              <li>实现多工具批执行、风险门禁、Checkpoint 恢复与长任务上下文治理。</li>
            </ul>
          </article>
          <article>
            <div className="job-meta"><span>2026.01 至 2026.03</span><b>帆软</b><small>简道云后端研发组</small></div>
            <div className="job-title"><p>AI Agent / 后端研发实习生</p><h3>ReAct 编排与可观测性</h3></div>
            <ul>
              <li>基于 LangGraph 设计多阶段 ReAct 对话编排，实现状态恢复与分层上下文压缩。</li>
              <li>封装业务 Skill / Tool，并接入 OpenTelemetry 与 Phoenix 定位 Agent 调用问题。</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="page-shell">
          <header className="section-intro project-intro">
            <p className="document-label light">PUBLIC WORK / SELECTED PROJECTS</p>
            <h2>可以顺着链接核验的工作。</h2>
          </header>
          <div className="project-list">
            <MotionProject featured>
            <article className="project project-primary">
              <div className="project-side"><span>OPEN SOURCE</span><b>PR #1664</b><small>已合并</small></div>
              <div className="project-body">
                <h3>GPT Researcher</h3>
                <p>
                  修复 LLM 调用层重试语义：条件化指数退避、流式场景禁重试、空响应重试和异常链透传，
                  影响 13 处 LLM 调用点，已合入 v3.4.3 起的 5 个正式版本。
                </p>
                <a href="https://github.com/assafelovic/gpt-researcher/pull/1664" target="_blank" rel="noreferrer">查看合并的 PR #1664<span aria-hidden="true"> ↗</span></a>
              </div>
            </article>
            </MotionProject>
            <MotionProject>
            <article className="project">
              <div className="project-side"><span>NJU</span><b>19,000+</b><small>文章处理</small></div>
              <div className="project-body">
                <h3>南京大学党的理论数据库</h3>
                <p>
                  使用 Spring Boot、MySQL 与 Redis 构建文章管理和多条件检索；在 H100 上以 vLLM 部署
                  Qwen3-30B FP8，并结合 RAGFlow / Chroma、上下文富化和父子分块构建问答。
                </p>
                <div className="project-tech">JAVA / VLLM / RAGFLOW / CHROMA</div>
              </div>
            </article>
            </MotionProject>
          </div>
        </div>
      </section>

      <section className="capabilities-section page-shell" id="capabilities">
        <header className="section-intro compact">
          <p className="document-label">CAPABILITY MAP</p>
          <h2>我如何组合工具，而不是罗列标签。</h2>
        </header>
        <div className="capability-list">
          {capabilityGroups.map(([name, items]) => (
            <article key={name}><h3>{name}</h3><p>{items}</p></article>
          ))}
        </div>
      </section>

      <section className="education-section">
        <div className="page-shell education-inner">
          <p className="document-label light">EDUCATION</p>
          <article><span>2025.09 至 2027.07</span><h3>南京大学</h3><p>软件工程 / 硕士</p><small>“挑战杯”中国大学生创业计划竞赛校级银奖</small></article>
          <article><span>2021.09 至 2025.07</span><h3>吉林大学</h3><p>软件工程 / 本科</p><small>一等奖学金 / 数学建模省二等奖 / 院优秀学生干部</small></article>
        </div>
      </section>

      <section className="contact-section page-shell" id="contact">
        <div>
          <p className="document-label">CONTACT / OPEN TO 2027 OPPORTUNITIES</p>
          <h2>
            <span className="contact-line">我正在寻找</span>{" "}
            <span className="contact-line">AI Agent / 大模型</span>{" "}
            <span className="contact-line">应用开发方向的机会。</span>
          </h2>
          <p className="contact-note">也欢迎聊 ThemeAgent、GraphRAG 和插件工程。</p>
        </div>
        <div className="contact-list">
          <a href="mailto:838175899@qq.com"><span>邮箱</span><b>838175899@qq.com</b><i aria-hidden="true">↗</i></a>
          <a href="https://github.com/jhyz" target="_blank" rel="noreferrer"><span>GitHub</span><b>github.com/jhyz</b><i aria-hidden="true">↗</i></a>
        </div>
      </section>

      <footer className="site-footer page-shell">
        <span>© 2026 钱金航</span>
        <a href="https://github.com/sanidhyy/next-portfolio" target="_blank" rel="noreferrer">基于 sanidhyy/next-portfolio 的交互结构改造</a>
        <a href="#home">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
