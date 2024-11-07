import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Delete from "@mui/icons-material/Delete"
import DragIndicator from "@mui/icons-material/DragIndicator"
import FileCopy from "@mui/icons-material/FileCopy"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Switch from "@mui/material/Switch"
import useWordPrettyStore from "../stores/useWordPrettyStore"

import type { WordPrettyItem } from "@wordpretty/shared/lib/types"

export type WordPrettyListItemProps = {
  item: WordPrettyItem
}

export default function WordPrettyListItem({ item }: WordPrettyListItemProps) {
  const { activeItem, selectItem, toggleItem, copyItem, deleteItem } =
    useWordPrettyStore()

  const {
    listeners,
    isDragging,
    transform,
    transition,
    setNodeRef,
    setActivatorNodeRef,
  } = useSortable({ id: item.id })

  return (
    <ListItem
      divider
      disablePadding
      ref={setNodeRef}
      secondaryAction={
        <>
          <IconButton onClick={() => copyItem(item)}>
            <FileCopy fontSize="small" />
          </IconButton>
          <IconButton edge="end" onClick={() => deleteItem(item)}>
            <Delete fontSize="small" />
          </IconButton>
        </>
      }
      sx={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
        "& .MuiListItemButton-root": { paddingRight: 10 },
      }}
    >
      <ListItemButton
        selected={item.id === activeItem?.id}
        onClick={() => selectItem(item)}
      >
        <IconButton
          disableRipple
          edge="start"
          {...listeners}
          ref={setActivatorNodeRef}
          sx={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          <DragIndicator fontSize="small" />
        </IconButton>
        <Switch
          size="small"
          checked={item.enabled}
          onChange={() => toggleItem(item)}
          sx={{ marginRight: 2 }}
        />
        <ListItemText
          primary={item.name}
          secondary={item.pattern.replaceAll("\n", ",")}
        />
      </ListItemButton>
    </ListItem>
  )
}
