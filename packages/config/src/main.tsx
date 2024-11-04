import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"

function renderApp() {
  const elem = document.getElementById("root")
  if (!elem) throw Error()

  const root = createRoot(elem)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

renderApp()
