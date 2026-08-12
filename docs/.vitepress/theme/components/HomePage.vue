<script setup lang="ts">
import { withBase } from "vitepress";

const href = (path: string) => withBase(path);
const parts = [
  {
    title: "第一篇 · 使用手册",
    desc: "入口与登录、界面、第一个任务、模型与积分、专家套件、钉钉集成、连接器与自动化。",
    link: "/bluebook/第一篇 使用手册：先把千问办公用起来/",
  },
  {
    title: "第二篇 · 实战案例",
    desc: "办公三件套、数据分析、调研、网页交付、多模态、会议、电商与内容增长。",
    link: "/bluebook/第二篇 案例篇：从一项任务到日常交付/",
  },
  {
    title: "第三篇 · 进阶篇",
    desc: "打造自己的 Skill、多任务编排、自动化可靠性：把案例变成自己的工作系统。",
    link: "/bluebook/第三篇 进阶篇：把案例变成自己的工作系统/",
  },
  {
    title: "第四篇 · 岗位与行业",
    desc: "HR、法务、财务、博主、商家、分析师等岗位路线，以及十二类行业工作流。",
    link: "/bluebook/第四篇 岗位与行业落地/",
  },
];

const features = [
  { icon: "🧭", title: "从任务出发", desc: "不讲抽象功能，每个章节都围绕一项真实任务展开。" },
  { icon: "📦", title: "交付可编辑产物", desc: "Word、Excel、PPT、网页、报告，生成后仍可继续修改。" },
  { icon: "🔗", title: "钉钉深度集成", desc: "消息、日程、审批、文档、听记，在企业协作链路里闭环。" },
  { icon: "🧰", title: "技能与专家套件", desc: "技能市场即装即用，也可把自己的经验沉淀成套件。" },
  { icon: "⏰", title: "定时与自动化", desc: "云端与本地定时任务，把重复工作交给日程。" },
  { icon: "🛡️", title: "边界与验收", desc: "每章都写清授权范围、人工关口和验收标准。" },
];

const steps = [
  { k: "01", title: "新手", desc: "从第 1 章开始，按顺序读完第一篇，完成第一个可验收任务。" },
  { k: "02", title: "有具体任务", desc: "直接跳进第二篇对应案例，跑通后再回第三篇沉淀方法。" },
  { k: "03", title: "团队落地", desc: "重点读第三、四篇，记录权限边界、验收标准和失败回退。" },
];
</script>

<template>
  <div class="qwg-home">
    <section class="qwg-hero">
      <span class="badge">实战蓝皮书 · 24 章 · 持续更新</span>
      <h1>千问办公实战蓝皮书</h1>
      <p class="subtitle">
        从第一个任务，到一套 AI 办公习惯。先完成安装和第一项交付，再进入钉钉协作、
        数据分析、网页交付与自动化，最后把一次成功变成团队可复用的工作系统。
      </p>
      <div class="actions">
        <a class="primary" :href="href('/bluebook/')">开始阅读</a>
        <a class="secondary" :href="href('/bluebook/第一篇 使用手册：先把千问办公用起来/第 1 章 初识千问办公/')">第 1 章 初识千问办公</a>
        <a class="secondary" :href="href('/reading-guide')">阅读指南</a>
      </div>
    </section>

    <section class="qwg-section">
      <h2>这本书怎么读</h2>
      <div class="qwg-grid">
        <div v-for="part in parts" :key="part.title" class="qwg-card">
          <h3>{{ part.title }}</h3>
          <p>{{ part.desc }}</p>
          <a class="card-link" :href="href(part.link)">进入本篇 →</a>
        </div>
      </div>
    </section>

    <section class="qwg-section">
      <h2>为什么按这本手册学</h2>
      <div class="qwg-grid">
        <div v-for="feature in features" :key="feature.title" class="qwg-card">
          <h3>{{ feature.icon }} {{ feature.title }}</h3>
          <p>{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <section class="qwg-section">
      <h2>三条阅读路线</h2>
      <div class="qwg-grid">
        <div v-for="step in steps" :key="step.k" class="qwg-card">
          <h3>{{ step.k }} {{ step.title }}</h3>
          <p>{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <div class="qwg-note">
      本站是独立编写的实践手册，不是千问办公官方网站；产品入口、套餐、权限与实际开放能力，
      请以千问办公官网 qwenwork.cn 和当前账号界面为准。涉及财务、法律、医疗等决策，必须由具备资质的人复核。
    </div>
  </div>
</template>
