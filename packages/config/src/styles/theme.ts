import { orange } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

export default createTheme({
  cssVariables: true,
  palette: {
    secondary: {
      main: orange[800],
    },
  },
  typography: {
    fontFamily: "'Noto Sans JP', sans-serif",
  },
})
