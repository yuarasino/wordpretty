import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Stack from "@mui/material/Stack"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import useWordPrettyStore from "../stores/useWordPrettyStore"

export default function WordPrettyList() {
  const { items, addItem } = useWordPrettyStore()

  return (
    <Stack sx={{ overflowY: "hidden" }}>
      <Toolbar
        variant="dense"
        sx={{
          backgroundColor: "grey.100",
          boxShadow: 1,
          zIndex: 1,
        }}
      >
        <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
          WordPretty設定
        </Typography>
        <Button variant="outlined" size="small" onClick={() => addItem()}>
          追加
        </Button>
      </Toolbar>
      <List disablePadding sx={{ overflowY: "auto" }}>
        {items.map((item) => (
          <ListItem divider key={item.id}>
            {item.name}
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
