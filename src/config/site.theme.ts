import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'directory',
  hero: {
    variant: 'search-first',
    eyebrow: 'moonrocketcoin.net listing directory',
  },
  home: {
    layout: 'directory-stack',
    primaryTask: 'listing',
    featuredTaskKeys: ['listing', 'classified'],
  },
  navigation: {
    variant: 'minimal',
  },
  footer: {
    variant: 'minimal',
  },
  cards: {
    listing: 'catalog-grid',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'catalog-grid',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'studio-panel',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
