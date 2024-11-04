import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"

export type NavProps = {
  width?: number
}

export default function Nav({ width = 360 }: NavProps) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: width },
      }}
    >
      <Toolbar />
    </Drawer>
  )
}
