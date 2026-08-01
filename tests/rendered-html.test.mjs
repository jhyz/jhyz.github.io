import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the public AI Agent portfolio with recruiter-facing navigation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]+lang="zh-CN"/i);
  assert.match(html, /<title>钱金航[^<]*AI Agent[^<]*<\/title>/i);
  assert.match(html, /<h1[^>]+aria-label="钱金航"[^>]*>/i);
  assert.match(html, /<nav[^>]+aria-label="主导航"/i);
  assert.match(html, /href="#theme-agent"/i);
  assert.match(html, /href="#experience"/i);
  assert.match(html, /href="#projects"/i);
  assert.match(html, /href="#contact"/i);
});

test("presents ThemeAgent through its real source architecture and measured outcomes", async () => {
  const html = await (await render()).text();

  assert.match(html, /id="theme-agent"/i);
  assert.match(html, /InspectionAgent/i);
  assert.match(html, /OpDispatchLoop/i);
  assert.match(html, /ReActTurnLoop/i);
  assert.match(html, /EvidenceSearchState/i);
  assert.match(html, /87\.3%/);
  assert.match(html, /41\.6%/);
  assert.match(html, /24\s*\/\s*24/);
  assert.match(html, /36\s*\/\s*36/);
  assert.match(html, /23\.5%/);
  assert.doesNotMatch(html, /Runtime Online|LIVE ARCHITECTURE|RUN_ID|SYSTEM TRACE/i);
});

test("uses recruiter-facing actions without fabricated live telemetry", async () => {
  const html = await (await render()).text();

  assert.match(html, />查看 ThemeAgent 工程路径</i);
  assert.match(html, /href="\/qian-jinhang-resume\.pdf"[^>]*>查看公开版简历 PDF/i);
  assert.match(html, />查看合并的 PR #1664</i);
  assert.match(html, />发送邮件</i);
  assert.doesNotMatch(html, /runtime\.log|ThemeAgent 运行状态演示|\[OK\]/i);
});

test("renders an interactive architecture walkthrough with an accessible active stage", async () => {
  const html = await (await render()).text();

  assert.match(html, /aria-label="ThemeAgent 架构演示"/i);
  assert.match(html, /<button[^>]+aria-pressed="true"[^>]*>[^<]*<span[^>]*>InspectionAgent/s);
  assert.match(html, /aria-live="polite"/i);
  assert.match(html, /ARCHITECTURE WALKTHROUGH/i);
});

test("offers a keyboard command deck without replacing explicit recruiter links", async () => {
  const html = await (await render()).text();

  assert.match(html, /<button[^>]+aria-label="打开快捷导航"/i);
  assert.match(html, /<kbd>Ctrl K<\/kbd>/i);
  assert.match(html, /QIAN JINHANG \/ AI AGENT ENGINEERING \/ 2027/i);
  assert.doesNotMatch(html, /RECRUITER SHORTCUTS|REVIEW MODE|CANDIDATE FILE/i);
  assert.match(html, /href="mailto:838175899@qq\.com"/i);
});

test("ends with a direct, naturally wrapping contact statement", async () => {
  const html = await (await render()).text();

  assert.match(html, /我正在寻找.*AI Agent \/ 大模型.*应用开发方向的机会。/is);
  assert.match(html, /contact-line/i);
  assert.match(html, /也欢迎聊 ThemeAgent、GraphRAG 和插件工程。/i);
});

test("uses the selected next-portfolio base for a real ThemeAgent 3D inspection surface", async () => {
  const html = await (await render()).text();

  assert.match(html, /aria-label="ThemeAgent 三维运行拓扑"/i);
  assert.match(html, /data-portfolio-base="sanidhyy\/next-portfolio"/i);
  assert.match(html, /InspectionAgent/);
  assert.match(html, /EvidenceSearchState/);
  assert.match(html, /Preview \/ Approve \/ Verify/);
  assert.match(html, /基于 sanidhyy\/next-portfolio 的交互结构改造/i);
  assert.doesNotMatch(html, /Testimonials|Michael Johnson|Dynamic Web Magic/i);
});

test("links public work and contact details without exposing the phone number", async () => {
  const html = await (await render()).text();

  assert.match(html, /href="https:\/\/github\.com\/jhyz"/i);
  assert.match(
    html,
    /href="https:\/\/github\.com\/assafelovic\/gpt-researcher\/pull\/1664"/i,
  );
  assert.match(html, /href="mailto:838175899@qq\.com"/i);
  assert.doesNotMatch(html, /185[-\s]?5070[-\s]?8999/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("publishes social metadata with the generated image's real dimensions", async () => {
  const [html, image] = await Promise.all([
    render().then((response) => response.text()),
    readFile(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.equal(image.toString("ascii", 1, 4), "PNG");
  const width = image.readUInt32BE(16);
  const height = image.readUInt32BE(20);
  assert.match(html, new RegExp(`<meta property="og:image:width" content="${width}"`));
  assert.match(html, new RegExp(`<meta property="og:image:height" content="${height}"`));
});
