import type { AstroIntegration } from '@swup/astro'

declare global {
  interface Window {
    // type from '@swup/astro' is incorrect
    swup: AstroIntegration
    pagefind: {
      options: (opts: Record<string, unknown>) => Promise<void>
      init: () => Promise<void>
      search: (query: string) => Promise<{
        results: Array<{ data: () => Promise<SearchResult> }>
      }>
    }
  }
}

interface SearchResult {
  url: string
  meta: {
    title: string
  }
  excerpt: string
}
