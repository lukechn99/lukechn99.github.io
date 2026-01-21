import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Work from './Work.tsx'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MantineProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/works" element={<Work />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </HashRouter>
    </MantineProvider>
  </StrictMode>
)
