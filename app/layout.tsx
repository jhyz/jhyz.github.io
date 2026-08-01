import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jhyz.github.io"),
  title: "钱金航 | AI Agent / 大模型应用开发工程师",
  description: "钱金航的 AI Agent 工程作品集：ThemeAgent 源码主链、GraphRAG 证据治理、风险门禁与可恢复写回。",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "钱金航 | AI Agent Engineer",
    description: "让 Agent 在改一行代码前，先证明它为什么是对的。",
    siteName: "Qian Jinhang · AI Agent Portfolio",
    locale: "zh_CN",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Qian Jinhang AI Agent Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "钱金航 | AI Agent Engineer",
    description: "ThemeAgent 源码主链、GraphRAG 证据治理与安全写回。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
