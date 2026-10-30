import { useEffect } from 'react'
import { SITE } from '../data/seo'

// Keeps the head in step with the page in the browser. The first load of a page already has the right
// tags in its HTML (scripts/build-seo.mjs); this matters for client-side navigation and for routes that
// are not pre-rendered (they are served spa.html, which has no canonical).
const upsert = (selector, create, value) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  if (el.tagName === 'LINK') el.href = value
  else el.content = value
}

const meta = (attr, key) => () => {
  const el = document.createElement('meta')
  el.setAttribute(attr, key)
  return el
}

export const usePageMeta = (title, description) => {
  useEffect(() => {
    document.title = title

    const path = window.location.pathname.replace(/\/+$/, '') || '/'
    const url = `${SITE.origin}${path === '/' ? '/' : path}`

    upsert('meta[name="description"]', meta('name', 'description'), description)
    upsert('meta[property="og:title"]', meta('property', 'og:title'), title)
    upsert('meta[property="og:description"]', meta('property', 'og:description'), description)
    upsert('meta[name="twitter:title"]', meta('name', 'twitter:title'), title)
    upsert('meta[name="twitter:description"]', meta('name', 'twitter:description'), description)
    upsert('meta[property="og:url"]', meta('property', 'og:url'), url)
    upsert(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement('link')
        el.rel = 'canonical'
        return el
      },
      url
    )
  }, [title, description])
}
