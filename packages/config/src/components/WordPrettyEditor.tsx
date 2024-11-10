import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import useImageDirStore from "../stores/useImageDirStore"
import useWordPrettyStore from "../stores/useWordPrettyStore"
import CompleteDialog from "./CompleteDialog"
import ImageField from "./ImageField"

import type { WordPrettyItem } from "@wordpretty/shared/lib/types"

export default function WordPrettyEditor() {
  const { activeItem, editItem } = useWordPrettyStore()
  const { images, openImageDir, readImageDir } = useImageDirStore()

  const [open, setOpen] = useState(false)

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
    setOpen(true)
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
          open={open}
          onComplete={() => setOpen(false)}
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
                プラグインのフォルダ内の`images`フォルダが画像フォルダです。
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
                    helperText="ファイル名に全角文字や記号が入っていると画像が出てこないときがあります。"
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
        </Stack>
      )}
    </Stack>
  )
}
