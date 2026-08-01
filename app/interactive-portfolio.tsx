"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

export type ArchitectureStage = {
  label: string;
  name: string;
  detail: string;
  guard: string;
  artifact: string;
};

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0);
    };
    const requestMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);
    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>;
}

export function CommandDeck() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      <button ref={triggerRef} className="command-trigger" type="button" aria-label="打开快捷导航" onClick={() => setOpen(true)}>
        <span>快捷导航</span><kbd>Ctrl K</kbd>
      </button>
      {open && (
        <div className="command-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <section className="command-panel" role="dialog" aria-modal="true" aria-labelledby="command-title">
            <header>
              <div><small>QUICK INDEX</small><h2 id="command-title">快速查看经历与项目</h2></div>
              <button ref={closeRef} type="button" onClick={close} aria-label="关闭快捷导航">ESC</button>
            </header>
            <nav aria-label="快捷导航">
              <a href="#theme-agent" onClick={close}><b>01</b><span>ThemeAgent 源码主链</span><i>架构与风险门禁</i></a>
              <a href="#experience" onClick={close}><b>02</b><span>华为 / 帆软实习</span><i>负责过什么</i></a>
              <a href="#projects" onClick={close}><b>03</b><span>公开工作</span><i>PR #1664 与项目</i></a>
              <a href="/qian-jinhang-resume.pdf" target="_blank" rel="noreferrer" onClick={close}><b>04</b><span>公开版简历</span><i>打开 PDF ↗</i></a>
              <a href="https://github.com/jhyz" target="_blank" rel="noreferrer" onClick={close}><b>05</b><span>GitHub</span><i>打开个人主页 ↗</i></a>
              <a href="mailto:838175899@qq.com" onClick={close}><b>06</b><span>联系钱金航</span><i>发送邮件 ↗</i></a>
            </nav>
          </section>
        </div>
      )}
    </>
  );
}

export function ReviewDossier() {
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
  };
  const reset = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div className="review-stack" onPointerMove={move} onPointerLeave={reset} style={{ "--tilt-x": "0deg", "--tilt-y": "0deg" } as CSSProperties}>
      <aside className="review-card" aria-label="候选人摘要">
        <div className="review-coordinate" aria-hidden="true">A-01 / NJU / 2027</div>
        <div className="review-card-head"><span>REVIEW REQUEST</span><b>OPEN</b></div>
        <dl>
          <div><dt>目标岗位</dt><dd>AI Agent / 大模型应用开发</dd></div>
          <div><dt>当前身份</dt><dd>南京大学 / 软件工程硕士</dd></div>
          <div><dt>核心案例</dt><dd>ThemeAgent / HarmonyOS 主题 DSL</dd></div>
          <div><dt>工程关键词</dt><dd>ReAct · GraphRAG · Safe writeback</dd></div>
          <div><dt>实习经历</dt><dd>华为 / 帆软</dd></div>
        </dl>
        <p className="review-note">首要审查问题</p>
        <strong>候选人能否把模型能力约束成可审计的工程行为？</strong>
        <a href="#theme-agent">从源码主链开始看 <span aria-hidden="true">↓</span></a>
        <div className="dossier-seal" aria-hidden="true">OPEN TO<br />REVIEW</div>
      </aside>
    </div>
  );
}

export function ArchitectureWalkthrough({ stages }: { stages: ArchitectureStage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stages[activeIndex];
  const traceStyle = { "--trace-progress": `${(activeIndex / Math.max(1, stages.length - 1)) * 100}%` } as CSSProperties;

  return (
    <section className="architecture-workbench" aria-label="ThemeAgent 架构演示" style={traceStyle}>
      <header className="architecture-toolbar">
        <div><small>ARCHITECTURE WALKTHROUGH</small><b>点击节点，检查一次动作如何走到可恢复写回</b></div>
        <span>STAGE {String(activeIndex + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}</span>
      </header>
      <div className="architecture-switches" role="group" aria-label="选择架构阶段">
        {stages.map((stage, index) => (
          <button key={stage.name} type="button" aria-pressed={index === activeIndex} onClick={() => setActiveIndex(index)}>
            <span>{stage.name}</span><small>{String(index + 1).padStart(2, "0")} / {stage.label}</small>
          </button>
        ))}
      </div>
      <div className="architecture-track" aria-hidden="true">
        {stages.map((stage, index) => <span key={stage.name} className={index <= activeIndex ? "passed" : ""} />)}
      </div>
      <div className="architecture-stage">
        <article key={active.name} aria-live="polite">
          <p>{active.label}</p>
          <h3>{active.name}</h3>
          <strong>{active.detail}</strong>
        </article>
        <dl>
          <div><dt>系统门禁</dt><dd>{active.guard}</dd></div>
          <div><dt>留下的工程对象</dt><dd>{active.artifact}</dd></div>
        </dl>
        <button type="button" onClick={() => setActiveIndex((current) => Math.min(stages.length - 1, current + 1))} disabled={activeIndex === stages.length - 1}>
          {activeIndex === stages.length - 1 ? "已到达写回边界" : "沿主链推进 →"}
        </button>
      </div>
    </section>
  );
}
