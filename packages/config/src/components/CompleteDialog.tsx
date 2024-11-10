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
  onComplete: () => void
}

export default function CompleteDialog({
  title,
  content,
  open,
  onComplete,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onComplete}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onComplete}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}
