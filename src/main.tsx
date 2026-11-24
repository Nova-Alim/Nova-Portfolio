import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Browsers drawing without a GPU (hardware acceleration off) can't afford live blur;
// give them the lighter look up front. Capable machines keep every effect.
try {
  const gl = document.createElement('canvas').getContext('webgl')
  const info = gl?.getExtension('WEBGL_debug_renderer_info')
  const renderer = info ? String(gl!.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
  if (!gl || /swiftshader|llvmpipe|software|basic render/i.test(renderer)) {
    document.documentElement.dataset.lite = ''
  }
} catch {
  /* keep full effects */
}

// Start the intro only once fonts are in, so the big name never re-lays out mid-animation
const ready = () => { document.documentElement.dataset.ready = '' }
// ...and once the page has finished its startup work, so the first frames of the intro aren't competing with it
const whenIdle = (cb: () => void) =>
  'requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 600 }) : setTimeout(cb, 300)
Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(() =>
  whenIdle(() => requestAnimationFrame(() => requestAnimationFrame(ready))),
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
