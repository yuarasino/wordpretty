import * as consts from "@wordpretty/shared/consts"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"

function renderApp() {
  const elem = document.getElementById("root")
  if (!elem) throw Error()

  const root = createRoot(elem)
  root.render(
    <StrictMode>
      <title>{consts.PLUGIN_NAME_JA}</title>
      <App />
    </StrictMode>,
  )
}

renderApp()
