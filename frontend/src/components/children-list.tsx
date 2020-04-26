import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import ImageIcon from '@material-ui/icons/Image'
import React from 'react'
import { StateConsumer } from '@/context/state-context'
import { Child, ChildInfo } from './child-info'

interface ChildrenListProps {
  items: Child[]
}

export const ChildrenList: React.FC<ChildrenListProps> = ({ items = [] }) => {
  const [open, setOpen] = React.useState(false)

  if (!items.length) {
    return <Typography component="p">No children in your list, start by adding information</Typography>
  }

  return (
    <StateConsumer>
      {({ dispatch }) => (
        <>
          <List>
            {items.map(({ name, age, interests }) => (
              <>
                <ListItem key={name}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${name}, ${age}`} secondary={`Likes: ${interests.join(', ')}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
              Add child
            </Button>
          </Box>
          <Dialog open={open}>
            <DialogTitle>Add Child Information</DialogTitle>
            <DialogContent>
              <ChildInfo
                onChange={(payload) => {
                  dispatch({ type: 'addChild', payload })
                  setOpen(false)
                }}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </StateConsumer>
  )
}
