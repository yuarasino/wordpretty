import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

export type ConfirmDialogProps = {
  title: string
  content: string
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmDialog({
  title,
  content,
  open,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>CANCEL</Button>
        <Button onClick={onConfirm}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}
