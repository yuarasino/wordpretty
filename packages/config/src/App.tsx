import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import * as consts from "@wordpretty/shared/lib/consts"
import { useEffect } from "react"
import Layout from "./sections/Layout"
import useConfigStore from "./stores/useConfigStore"
import theme from "./styles/theme"

export default function App() {
  const { loadConfig } = useConfigStore()

  useEffect(() => {
    loadConfig()
  }, [loadConfig])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <title>{consts.PLUGIN_NAME_JA}</title>
      <Layout />
    </ThemeProvider>
  )
}
