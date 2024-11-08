import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import WordPrettyEditor from "../components/WordPrettyEditor"

export default function Main() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar />
      <WordPrettyEditor />
    </Box>
  )
}
