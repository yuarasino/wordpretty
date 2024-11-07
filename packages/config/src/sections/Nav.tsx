import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import WordPrettyList from "../components/WordPrettyList"

export type NavProps = {
  width?: number
}

export default function Nav({ width = 360 }: NavProps) {
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
