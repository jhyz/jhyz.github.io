"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { lazy, Suspense, useState } from "react";

const TopologyCanvas = lazy(() => import("./topology-canvas"));

type SceneStage = {
  label: string;
  name: string;
  short: string;
};

const sceneStages: SceneStage[] = [
  { label: "ENTRY", name: "InspectionAgent", short: "冻结输入边界" },
  { label: "DISPATCH", name: "OpDispatchLoop", short: "按 Profile 收敛动作" },
  { label: "RUNTIME", name: "ReActTurnLoop", short: "批前校验工具调用" },
  { label: "EVIDENCE", name: "EvidenceSearchState", short: "缺口驱动补检" },
  { label: "WRITEBACK", name: "Preview / Approve / Verify", short: "审批后写回与恢复" },
];

export function AgentTopology() {
  const [activeIndex, setActiveIndex] = useState(2);
  const reducedMotion = useReducedMotion() ?? false;
  const active = sceneStages[activeIndex];

  return (
    <section className="agent-topology" aria-label="ThemeAgent 三维运行拓扑">
      <div className="topology-status">
        <span>THEMEDEVSTUDIO / INSPECTION PIPELINE</span>
        <b><i aria-hidden="true" /> INTERACTIVE MODEL</b>
      </div>

      <div className="topology-canvas" aria-hidden="true">
        <Suspense fallback={<div className="topology-canvas-loading">LOADING RUNTIME GRAPH</div>}>
          <TopologyCanvas activeIndex={activeIndex} onSelect={setActiveIndex} reducedMotion={reducedMotion} />
        </Suspense>
      </div>

      <div className="topology-readout" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>{String(activeIndex + 1).padStart(2, "0")} / {active.label}</span>
            <strong>{active.name}</strong>
            <p>{active.short}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <ol className="topology-controls" aria-label="选择运行阶段">
        {sceneStages.map((stage, index) => (
          <li key={stage.name}>
            <button type="button" aria-pressed={index === activeIndex} onClick={() => setActiveIndex(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{stage.name}</b>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function MotionProject({ children, featured = false }: { children: React.ReactNode; featured?: boolean }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={featured ? "project-motion project-motion-featured" : "project-motion"}
      initial={reducedMotion ? false : { opacity: 0, y: 34, rotateX: 4 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={reducedMotion ? undefined : { y: -8, rotateX: 1.5, rotateY: featured ? -1 : 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
