import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import * as consts from "@wordpretty/shared/lib/consts"

export default function Header() {
  return (
    <AppBar
      color="secondary"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
          {consts.PLUGIN_NAME_JA}
        </Typography>
        <Typography
          component="div"
          variant="button"
          sx={{ textTransform: "none" }}
        >
          {`v${consts.PLUGIN_VERSION}`}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
