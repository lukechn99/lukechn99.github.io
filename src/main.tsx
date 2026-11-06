import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'
import './i18n/index.ts'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import Works from './Works.tsx'
import Contact from './Contact.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import SiteHeader from './components/SiteHeader.tsx'

/**
 * After a deploy, a browser holding a cached copy of the old index.html may ask
 * for a page chunk that no longer exists. Reload once to pick up the new build
 * (guarded so a real outage can't cause a reload loop).
 */
function reloadForNewBuild() {
  try {
    const key = 'site-reloaded-for-build'
    const last = Number(sessionStorage.getItem(key) || 0)
    if (Date.now() - last < 15000) return false
    sessionStorage.setItem(key, String(Date.now()))
  } catch {
    /* storage unavailable; reload anyway */
  }
  window.location.reload()
  return true
}
window.addEventListener('vite:preloadError', (event) => {
  if (reloadForNewBuild()) event.preventDefault()
})

const WebRTCPage = lazy(() =>
  import('./webrtc/WebRTCPage.tsx').catch((err: unknown) => {
    if (reloadForNewBuild()) return new Promise<never>(() => {}) // wait for the reload
    throw err
  }),
)

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <MantineProvider defaultColorScheme="light">
        <HashRouter>
          <SiteHeader />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/works" element={<Works />} />
            <Route path="/works/:tab" element={<Works />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/works/games/how-it-works" element={<Suspense fallback={null}><WebRTCPage /></Suspense>} />
          </Routes>
        </HashRouter>
      </MantineProvider>
    </ErrorBoundary>
  </StrictMode>
)
