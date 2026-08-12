import type MarkdownIt from "markdown-it";

/**
 * 将 ```mermaid 代码块渲染为 <div class="mermaid">，
 * 由主题中的 MermaidDiagram 组件在客户端渲染。
 */
export function configureMermaidMarkdown(md: MarkdownIt): void {
  const fence = md.renderer.rules.fence!;

  md.renderer.rules.fence = (tokens, index, options, env, self) => {
    const token = tokens[index];
    if (token.info.trim() === "mermaid") {
      const code = token.content.trim();
      return `<div class="mermaid">\n${code}\n</div>\n`;
    }
    return fence(tokens, index, options, env, self);
  };
}
