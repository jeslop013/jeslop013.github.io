// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  // Change this to your final address once you have it (e.g. https://yourname.github.io).
  site: 'https://example.github.io',
  markdown: {
    // remark-math + KaTeX let you write LaTeX ($x^2$ and $$...$$) in posts.
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
