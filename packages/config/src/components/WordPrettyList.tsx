import { DndContext } from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Stack from "@mui/material/Stack"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import WordPrettyListItem from "../components/WordPrettyListItem"
import useWordPrettyStore from "../stores/useWordPrettyStore"

import type { DragEndEvent } from "@dnd-kit/core"

export default function WordPrettyList() {
  const { items, addItem, moveItem } = useWordPrettyStore()

  const onMoveItem = ({ active, over }: DragEndEvent) => {
    if (over && over.id !== active.id) {
      const from = items.findIndex((item) => item.id === active.id)
      const to = items.findIndex((item) => item.id === over.id)
      moveItem(arrayMove(items, from, to))
    }
  }

  return (
    <Stack sx={{ flexGrow: 1, overflowY: "hidden" }}>
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
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onMoveItem}>
        <SortableContext items={items}>
          <List disablePadding sx={{ flexGrow: 1, overflowY: "auto" }}>
            {items.map((item) => (
              <WordPrettyListItem key={item.id} item={item} />
            ))}
          </List>
        </SortableContext>
      </DndContext>
    </Stack>
  )
}
