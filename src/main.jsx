import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="246111769075-p4r1ulljo9399ntck8b90per0uetrvtl.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
)
