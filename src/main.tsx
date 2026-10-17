import { StrictMode } from 'react'
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
          </Routes>
        </HashRouter>
      </MantineProvider>
    </ErrorBoundary>
  </StrictMode>
)
