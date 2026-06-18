import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import './index.css'
import App from './App.jsx'

posthog.init('phc_ptkzpJHE4XTfVYkQaMNH2unB8PbsHkHDqQntmfM2xHZs', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </PostHogProvider>
  </StrictMode>,
)
