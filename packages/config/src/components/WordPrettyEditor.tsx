import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import useWordPrettyStore from "../stores/useWordPrettyStore"
import ImageField from "./ImageField"

export default function WordPrettyEditor() {
  const { activeItem } = useWordPrettyStore()

  const images = ["fugu.png", "samples/fugu2.png"]

  return (
    <Stack component="form">
      <Toolbar
        variant="dense"
        sx={{ backgroundColor: "white", boxShadow: 1, zIndex: 1 }}
      >
        <Typography component="div" variant="caption" sx={{ flexGrow: 1 }}>
          {`ID: ${activeItem?.id ?? ""}`}
        </Typography>
        <Button
          variant="contained"
          type="submit"
          size="small"
          disabled={!activeItem}
        >
          保存
        </Button>
      </Toolbar>
      {activeItem && (
        <Stack spacing={3} padding={3}>
          <Box>
            <TextField
              required
              fullWidth
              label="名前"
              defaultValue={activeItem.name}
              slotProps={{
                htmlInput: { "data-1p-ignore": true },
              }}
            />
          </Box>
          <Box>
            <TextField
              required
              fullWidth
              multiline
              label="パターン"
              helperText="1行につき1パターン記述できます。正規表現も使えます。"
              minRows={3}
              maxRows={3}
              defaultValue={activeItem.pattern}
            />
          </Box>
          <Divider />
          <Stack spacing={3}>
            <Box>
              <Alert
                severity="warning"
                action={
                  <Button color="inherit" size="small">
                    画像フォルダを開く
                  </Button>
                }
              >
                まず画像フォルダに画像を入れてください！
                プラグインのフォルダ内の`images`フォルダが画像フォルダです。
              </Alert>
            </Box>
            <Box>
              <ImageField
                required
                label="画像 (jpg, png, gif)"
                helperText="ファイル名に全角文字や記号が入っていると画像が出てこないときがあります。"
                defaultValue={activeItem.image}
                images={images}
              />
            </Box>
          </Stack>
          <Divider />
          <Box>
            <TextField
              required
              type="number"
              label="サイズ (px)"
              defaultValue={activeItem.size}
            />
          </Box>
        </Stack>
      )}
    </Stack>
  )
}
