import type { DefaultTheme } from "vitepress";

const route = (...segments: string[]): string =>
  encodeURI(`/bluebook/${segments.map((segment) => segment.trim()).join("/")}/`);

const part1 = "第一篇 使用手册：先把千问办公用起来";
const part2 = "第二篇 案例篇：从一项任务到日常交付";
const part3 = "第三篇 进阶篇：把案例变成自己的工作系统";
const part4 = "第四篇 岗位与行业落地";
const appendix = "附录";

const item = (directory: string, text = directory): DefaultTheme.SidebarItem => ({
  text,
  link: route(directory),
});

const child = (
  parent: string,
  directory: string,
  text = directory,
): DefaultTheme.SidebarItem => ({
  text,
  link: route(parent, directory),
});

export const bluebookSidebar: DefaultTheme.Sidebar = {
  "/bluebook/": [
    { text: "蓝皮书总览", link: "/bluebook/" },
    {
      text: "第一篇 · 使用手册",
      collapsed: false,
      items: [
        item(part1, "本篇导读"),
        child(part1, "第 1 章 初识千问办公"),
        child(part1, "第 2 章 入口、登录与套餐：钉钉、网页端和桌面客户端"),
        child(part1, "第 3 章 认识界面：任务、工作台与扩展"),
        child(part1, "第 4 章 快速完成第一个可验收的任务"),
        child(part1, "第 5 章 模型选择与积分用量优化"),
        child(part1, "第 6 章 专家套件与技能市场"),
        child(part1, "第 7 章 钉钉深度集成：企业 IM 能力闭环"),
        child(part1, "第 8 章 连接器、浏览器自动化与电脑操作"),
        child(part1, "第 9 章 定时任务与 IM 频道"),
      ],
    },
    {
      text: "第二篇 · 实战案例",
      collapsed: false,
      items: [
        item(part2, "本篇导读"),
        child(part2, "第 10 章 办公三件套：Word、Excel、PPT"),
        child(part2, "第 11 章 数据分析：把乱表变成可视化报告"),
        child(part2, "第 12 章 信息调研：从搜索到行业报告"),
        child(part2, "第 13 章 网页交付：免部署网站与数据看板"),
        child(part2, "第 14 章 多模态创作：图文音视频一站式"),
        child(part2, "第 15 章 会议生产力：从 AI 听记到纪要与待办"),
        child(part2, "第 16 章 日常自动化：早报与资讯简报"),
        child(part2, "第 17 章 电商运营：选品、商品洞察与经营分析"),
        child(part2, "第 18 章 内容增长：自媒体闭环"),
        child(part2, "第 19 章 本地文件与电脑操作：批量处理桌面文件"),
      ],
    },
    {
      text: "第三篇 · 进阶系统",
      collapsed: false,
      items: [
        item(part3, "本篇导读"),
        child(part3, "第 20 章 打造自己的 Skill：把经验沉淀为可复用套件"),
        child(part3, "第 21 章 多任务编排：并行推进与进度管理"),
        child(part3, "第 22 章 自动化的可靠性：验收、日志与回退"),
      ],
    },
    {
      text: "第四篇 · 岗位与行业",
      collapsed: false,
      items: [
        item(part4, "本篇导读"),
        child(part4, "第 23 章 岗位路线图：不同岗位如何用深千问办公"),
        child(part4, "第 24 章 行业路线图：从通用能力到行业工作流"),
      ],
    },
    {
      text: "附录",
      collapsed: false,
      items: [
        item(appendix, "附录总览"),
        child(appendix, "附录 A 常用指令模板"),
        child(appendix, "附录 B 场景速查表"),
      ],
    },
  ],
};

export const siteSidebar: DefaultTheme.Sidebar = {
  ...bluebookSidebar,
  "/cases/": [
    { text: "案例库", link: "/cases/" },
  ],
};
