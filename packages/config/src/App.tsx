import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import * as consts from "@wordpretty/core/src/consts"
import { useEffect } from "react"
import Layout from "./sections/Layout"
import usePluginConfigStore from "./stores/usePluginConfigStore"
import theme from "./styles/theme"

export default function App() {
  const { loadPluginConfig } = usePluginConfigStore()

  useEffect(() => {
    loadPluginConfig()
  }, [loadPluginConfig])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <title>{consts.PLUGIN_NAME_JA}</title>
      <Layout />
    </ThemeProvider>
  )
}
