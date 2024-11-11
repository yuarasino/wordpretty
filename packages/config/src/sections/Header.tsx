import GitHubIcon from "@mui/icons-material/GitHub"
import SellIcon from "@mui/icons-material/Sell"
import XIcon from "@mui/icons-material/X"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
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
        <IconButton color="inherit" href={consts.BOOTH_URL} target="_blank">
          <SellIcon />
        </IconButton>
        <IconButton color="inherit" href={consts.GITHUB_URL} target="_blank">
          <GitHubIcon />
        </IconButton>
        <IconButton color="inherit" href={consts.TWITTER_URL} target="_blank">
          <XIcon />
        </IconButton>
        <Typography component="div" variant="subtitle1" sx={{ marginLeft: 1 }}>
          {`v${consts.PLUGIN_VERSION}`}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
