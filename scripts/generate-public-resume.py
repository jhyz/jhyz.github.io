from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "qian-jinhang-resume.pdf"
FONT_DIR = Path("C:/Windows/Fonts")

pdfmetrics.registerFont(TTFont("YaHei", str(FONT_DIR / "msyh.ttc"), subfontIndex=0))
pdfmetrics.registerFont(TTFont("YaHeiBold", str(FONT_DIR / "msyhbd.ttc"), subfontIndex=0))

PAGE_W, PAGE_H = A4
INK = colors.HexColor("#17242c")
MUTED = colors.HexColor("#50616b")
BLUE = colors.HexColor("#174f73")
RED = colors.HexColor("#bd4334")
LINE = colors.HexColor("#aebbc2")
PAPER = colors.HexColor("#f8fafb")


def paragraph(text, style):
    return Paragraph(text, style)


def draw_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setStrokeColor(RED)
    canvas.setLineWidth(2)
    canvas.line(14 * mm, PAGE_H - 10 * mm, PAGE_W - 14 * mm, PAGE_H - 10 * mm)
    canvas.setFont("YaHei", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(14 * mm, 9 * mm, "钱金航 / AI Agent 工程公开版简历")
    canvas.drawRightString(PAGE_W - 14 * mm, 9 * mm, f"{doc.page:02d}")
    canvas.restoreState()


styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name", fontName="YaHeiBold", fontSize=24, leading=27, textColor=INK, spaceAfter=3 * mm
)
role_style = ParagraphStyle(
    "Role", fontName="YaHeiBold", fontSize=10.5, leading=14, textColor=RED
)
meta_style = ParagraphStyle(
    "Meta", fontName="YaHei", fontSize=8, leading=12, textColor=MUTED, alignment=TA_RIGHT
)
section_style = ParagraphStyle(
    "Section", fontName="YaHeiBold", fontSize=11, leading=14, textColor=BLUE, spaceBefore=4 * mm, spaceAfter=2 * mm
)
body_style = ParagraphStyle(
    "Body", fontName="YaHei", fontSize=8.2, leading=13, textColor=INK, wordWrap="CJK"
)
small_style = ParagraphStyle(
    "Small", fontName="YaHei", fontSize=7.5, leading=11.5, textColor=MUTED, wordWrap="CJK"
)
job_style = ParagraphStyle(
    "Job", fontName="YaHeiBold", fontSize=9.4, leading=13, textColor=INK, wordWrap="CJK"
)
date_style = ParagraphStyle(
    "Date", fontName="YaHei", fontSize=7.5, leading=11, textColor=BLUE, alignment=TA_RIGHT
)
bullet_style = ParagraphStyle(
    "Bullet", parent=body_style, leftIndent=4 * mm, firstLineIndent=-3 * mm, bulletIndent=0, spaceAfter=1.3 * mm
)


story = []
header = Table(
    [
        [paragraph("钱金航", name_style), paragraph("南京大学 软件工程硕士在读", meta_style)],
        [paragraph("AI Agent / 大模型应用开发工程师", role_style), paragraph("838175899@qq.com<br/>github.com/jhyz", meta_style)],
    ],
    colWidths=[105 * mm, 62 * mm],
)
header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
    ("LINEBELOW", (0, -1), (-1, -1), 0.7, INK),
    ("BOTTOMPADDING", (0, -1), (-1, -1), 3 * mm),
]))
story.append(header)

story += [
    paragraph("个人简介", section_style),
    paragraph(
        "具备 AI Agent 与 Java 工程背景，拥有华为、帆软两段 AI 应用研发实习经历。聚焦 ReAct 工具循环、RAG/GraphRAG、上下文治理，以及大模型应用的安全写回与恢复。",
        body_style,
    ),
    paragraph("教育背景", section_style),
]

education = Table(
    [
        [paragraph("南京大学 · 软件工程硕士", job_style), paragraph("2025.09-2027.07", date_style)],
        [paragraph("挑战杯中国大学生创业计划竞赛校级银奖", small_style), ""],
        [paragraph("吉林大学 · 软件工程本科", job_style), paragraph("2021.09-2025.07", date_style)],
        [paragraph("一等奖学金 / 全国大学生数学建模竞赛省二等奖 / 院优秀学生干部", small_style), ""],
    ],
    colWidths=[132 * mm, 35 * mm],
)
education.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LINEBELOW", (0, 1), (-1, 1), 0.35, LINE),
    ("BOTTOMPADDING", (0, 1), (-1, 1), 2 * mm),
    ("TOPPADDING", (0, 2), (-1, 2), 2 * mm),
]))
story.append(education)

story += [
    paragraph("实习经历", section_style),
    Table(
        [[paragraph("华为 · 终端 BG / 鸿蒙 OS / 主题开发 · AI 应用开发实习生", job_style), paragraph("2026.06-至今", date_style)]],
        colWidths=[132 * mm, 35 * mm],
    ),
    paragraph("<b>ThemeAgent：</b>面向 HarmonyOS 主题 DSL 的智能检查与修复插件。", small_style),
]

huawei_bullets = [
    "负责 Agent 核心开发，以 Java 17、IntelliJ Platform SDK 和 JCEF/React 串联 DSL 解析、证据检索、错误诊断、修复预览、人工审批写回与回滚。",
    "将线性执行流程重构为配置驱动的 Agent Runtime，以统一 ReAct Tool Loop 管理工具调度与状态提交，并通过 Agent Profile、Skill Host 收敛场景差异。",
    "支持单轮 1-5 次 Tool Call 与只读任务有界并发；按阶段、权限、预算和风险实施门禁。120 条合法/越权配对用例无漏拦或误拦，只读批次 P95 较串行基线降低 41.6%。",
    "以 Neo4j 管理证据缺口、来源和终止条件。50 个任务对照中，KG 联合定位 Macro-F1 为 82.3%，较 Vector-RAG 提升 6.3 个百分点；相较 Grep，工具调用减少 57.7%。",
    "完成预览、审批、写回校验、显式回滚与 Checkpoint 恢复闭环。24 条修复基准与 36 次故障注入均完成验证或恢复，输入 Token 中位数降低 23.5%。",
]
for item in huawei_bullets:
    story.append(Paragraph("• " + item, bullet_style))

story += [
    Spacer(1, 1.5 * mm),
    Table(
        [[paragraph("帆软 · 简道云后端研发组 · AI Agent / 后端研发实习生", job_style), paragraph("2026.01-2026.03", date_style)]],
        colWidths=[132 * mm, 35 * mm],
    ),
    Paragraph("• 基于 LangGraph 设计多阶段 ReAct 对话编排，实现状态恢复与分层上下文压缩。", bullet_style),
    Paragraph("• 封装业务 Skill/Tool，并接入 OpenTelemetry 与 Phoenix 完成 Agent 调用链路观测和问题定位。", bullet_style),
    paragraph("项目经历", section_style),
    Table(
        [[paragraph("GPT Researcher · 开源贡献者 · PR #1664", job_style), paragraph("2026.03", date_style)]],
        colWidths=[132 * mm, 35 * mm],
    ),
    Paragraph("• 修复 LLM 调用层重试语义：条件化指数退避、流式场景禁重试、空响应重试和异常链透传，影响 13 处 LLM 调用点，已合入 v3.4.3 起的 5 个正式版本。", bullet_style),
    Table(
        [[paragraph("南京大学党的理论数据库", job_style), paragraph("2025.08-至今", date_style)]],
        colWidths=[132 * mm, 35 * mm],
    ),
    Paragraph("• 使用 Spring Boot、MySQL 与 Redis 构建文章管理和检索；在 H100 上以 vLLM 部署 Qwen3-30B FP8，处理 1.9 万余篇文章，并结合 RAGFlow/Chroma 构建问答。", bullet_style),
    paragraph("技能", section_style),
    paragraph("<b>AI Agent：</b>ReAct / LangGraph / Tool Calling / 状态管理 / 上下文治理 / Skill 与 Tool 架构", body_style),
    paragraph("<b>LLM / RAG：</b>GraphRAG / Neo4j / RAGFlow / Chroma / vLLM", body_style),
    paragraph("<b>工程：</b>Java / Spring Boot / Python / MySQL / Redis / IntelliJ Platform SDK / JCEF / React / Docker / OpenTelemetry / Phoenix", body_style),
]

doc = BaseDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    leftMargin=14 * mm,
    rightMargin=14 * mm,
    topMargin=15 * mm,
    bottomMargin=15 * mm,
    title="钱金航 - AI Agent 工程公开版简历",
    author="钱金航",
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="resume")
doc.addPageTemplates([PageTemplate(id="public-resume", frames=[frame], onPage=draw_page)])
doc.build(story)
print(OUTPUT)
