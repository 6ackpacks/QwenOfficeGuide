import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { nextTick } from "vue";

import HomePage from "./components/HomePage.vue";
import NotFound from "./components/NotFound.vue";

import "./style.css";
import { h } from "vue";

let mermaidLoader: Promise<void> | null = null;

async function renderMermaid(root: ParentNode): Promise<void> {
  const blocks = Array.from(
    root.querySelectorAll<HTMLElement>("div.mermaid:not([data-rendered])"),
  );
  if (blocks.length === 0) return;

  if (!mermaidLoader) {
    mermaidLoader = import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: "neutral" });
      (globalThis as Record<string, unknown>).__mermaid = mermaid;
    });
  }
  await mermaidLoader;
  const mermaid = (globalThis as Record<string, unknown>).__mermaid as {
    render: (id: string, text: string) => Promise<{ svg: string }>;
  };

  for (const block of blocks) {
    const source = block.textContent?.trim() ?? "";
    block.setAttribute("data-rendered", "true");
    block.classList.add("mermaid-container");
    if (!source) continue;
    try {
      const { svg } = await mermaid.render(
        `mermaid-${Math.random().toString(36).slice(2, 10)}`,
        source,
      );
      block.innerHTML = svg;
    } catch {
      block.classList.add("mermaid-error");
    }
  }
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "not-found": () => h(NotFound),
    });
  },
  enhanceApp({ app, router }) {
    app.component("HomePage", HomePage);

    if (typeof window !== "undefined") {
      const renderCurrent = () => nextTick(() => renderMermaid(document));
      router.onAfterRouteChange = renderCurrent;
      if (document.readyState !== "loading") {
        renderCurrent();
      } else {
        window.addEventListener("DOMContentLoaded", renderCurrent);
      }
    }
  },
} satisfies Theme;
