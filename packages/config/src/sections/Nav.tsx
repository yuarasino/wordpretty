import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import WordPrettyList from "../components/WordPrettyList"

export default function Nav() {
  const width = 360

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        "& .MuiDrawer-paper": { width: width },
      }}
    >
      <Toolbar />
      <WordPrettyList />
    </Drawer>
  )
}
