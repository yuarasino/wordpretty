import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import * as consts from "@wordpretty/shared/consts"

export default function Header() {
  return (
    <AppBar color="secondary" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {consts.PLUGIN_NAME_JP}
        </Typography>
        <Typography
          variant="button"
          component="div"
          sx={{ textTransform: "none" }}
        >
          {`v${consts.PLUGIN_VERSION}`}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
