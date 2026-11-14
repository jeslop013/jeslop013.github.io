// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  // The public address of the site. Change it if you later buy a custom domain.
  site: 'https://jeslop013.github.io',
  markdown: {
    // remark-math + KaTeX let you write LaTeX ($x^2$ and $$...$$) in posts.
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
