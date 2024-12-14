import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import * as consts from "@wordpretty/core/src/consts"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import useImageDirStore from "../stores/useImageDirStore"
import useWordPrettyStore from "../stores/useWordPrettyStore"
import CompleteDialog from "./CompleteDialog"
import ImageField from "./ImageField"

import type { WordPrettyItem } from "@wordpretty/core/src/types"

export default function WordPrettyEditor() {
  const { activeItem, editItem } = useWordPrettyStore()
  const { images, openImageDir, readImageDir } = useImageDirStore()

  const [saveOpen, setSaveOpen] = useState(false)

  const { control, reset, handleSubmit } = useForm<WordPrettyItem>({
    defaultValues: {
      enabled: true,
      id: "",
      name: "",
      pattern: "",
      image: "",
      size: 0,
    },
  })

  const onEditItem = (data: WordPrettyItem) => {
    editItem(data)
    setSaveOpen(true)
  }

  const clipText = `@import url('${consts.PLUGIN_CSS_URL}');`
  const [clipOpen, setClipOpen] = useState(false)
  const copyCssCode = async () => {
    await navigator.clipboard.writeText(clipText)
    setClipOpen(true)
  }

  useEffect(() => {
    readImageDir()
  }, [readImageDir])

  useEffect(() => {
    reset(activeItem)
  }, [activeItem, reset])

  return (
    <Stack component="form" onSubmit={handleSubmit(onEditItem)}>
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
        <CompleteDialog
          title="完了"
          content="設定を保存しました。"
          open={saveOpen}
          onComplete={() => setSaveOpen(false)}
        />
      </Toolbar>
      {activeItem && (
        <Stack spacing={3} padding={3}>
          <Box>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <TextField
                  required
                  fullWidth
                  label="名前"
                  {...field}
                  error={!!errors.name}
                  slotProps={{
                    htmlInput: { "data-1p-ignore": true },
                  }}
                />
              )}
            />
          </Box>
          <Box>
            <Controller
              name="pattern"
              control={control}
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <TextField
                  required
                  fullWidth
                  multiline
                  label="パターン"
                  helperText="1行につき1パターン記述できます。正規表現も使えます。"
                  minRows={3}
                  maxRows={3}
                  {...field}
                  error={!!errors.pattern}
                />
              )}
            />
          </Box>
          <Divider />
          <Stack spacing={3}>
            <Box>
              <Alert
                severity="warning"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => openImageDir()}
                  >
                    画像フォルダを開く
                  </Button>
                }
              >
                まず画像フォルダに画像を入れてください！
                プラグインフォルダ内の`images`フォルダが画像フォルダです。
              </Alert>
            </Box>
            <Box>
              <Controller
                name="image"
                control={control}
                defaultValue={activeItem.image}
                rules={{ required: true }}
                render={({ field, formState: { errors } }) => (
                  <ImageField
                    required
                    label="画像 (jpg, png, gif)"
                    helperText="ファイル名に全角文字や記号が入っていると画像が出てこないことがあります。"
                    {...field}
                    error={!!errors.image}
                    onOpen={() => readImageDir()}
                    images={images}
                  />
                )}
              />
            </Box>
          </Stack>
          <Divider />
          <Stack spacing={3}>
            <Box>
              <Controller
                name="size"
                control={control}
                rules={{ required: true, min: 10 }}
                render={({ field, formState: { errors } }) => (
                  <TextField
                    required
                    type="number"
                    label="サイズ (px)"
                    {...field}
                    error={!!errors.size}
                    slotProps={{
                      htmlInput: { min: 10 },
                    }}
                  />
                )}
              />
            </Box>
            <Box>
              <Alert
                severity="error"
                action={
                  <>
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => copyCssCode()}
                    >
                      コードをコピー
                    </Button>
                    <CompleteDialog
                      title="完了"
                      content="クリップボードにコピーしました。"
                      open={clipOpen}
                      onComplete={() => setClipOpen(false)}
                    />
                  </>
                }
              >
                (重要)わんコメv7.0から、プラグインだけではスタイルを変更することができなくなりました。
                その対応として、OBSのコメント欄のカスタムCSSの先頭に、以下の1行を追加してください。
              </Alert>
            </Box>
            <Box>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: "grey.100",
                  "& > pre": { m: 0 },
                }}
              >
                <pre>
                  <code>{clipText}</code>
                </pre>
              </Paper>
            </Box>
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}
