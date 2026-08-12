import { defineConfig } from "vitepress";

import { siteSidebar } from "./sidebar";
import { configureMermaidMarkdown } from "./mermaid-markdown";

const siteUrl = process.env.VITEPRESS_SITE_URL || "https://6ackpacks.github.io/QwenOfficeGuide";
const basePath = process.env.VITEPRESS_BASE || "/";

export default defineConfig({
  lang: "zh-CN",
  title: "千问办公实战蓝皮书",
  titleTemplate: ":title · 千问办公实战蓝皮书",
  description:
    "从第一个任务到一套 AI 办公习惯：24 章千问办公（QwenWork）实战指南与岗位行业落地方法。",
  base: basePath,
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`,
  },
  markdown: {
    config: configureMermaidMarkdown,
    image: {
      lazyLoading: true,
    },
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
  },
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: `${basePath}favicon.svg` }],
    ["meta", { name: "theme-color", content: "#1d4ed8" }],
    ["meta", { name: "author", content: "千问办公蓝皮书共创组" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "千问办公,QwenWork,千问办公教程,AI 办公,AI Agent,钉钉集成,专家套件,技能市场,自动化办公",
      },
    ],
  ],
  themeConfig: {
    siteTitle: "千问办公蓝皮书",
    nav: [
      { text: "首页", link: "/" },
      { text: "开始阅读", link: "/bluebook/" },
      { text: "案例库", link: "/cases/" },
      { text: "阅读指南", link: "/reading-guide" },
    ],
    sidebar: siteSidebar,
    search: {
      provider: "local",
    },
    outline: {
      level: [2, 3],
      label: "本页目录",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    lastUpdated: {
      text: "最后更新",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
      },
    },
    footer: {
      message:
        '以真实任务为主线的千问办公实战读本 · 本站为独立编写的实践手册，非千问办公官方网站',
      copyright: "Copyright © 2026 千问办公蓝皮书共创组",
    },
  },
});
