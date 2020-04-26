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
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import ImageIcon from '@material-ui/icons/Image'
import * as faker from 'faker'
import React from 'react'
import { StateConsumer } from '@/context/state-context'
import { Child } from './child-info'

interface ChildrenActivityProps {
  items: Child[]
}
interface ActivityItem {
  label: string
  content: string
  id: string
  time: string
}

interface ChildActivityProps {
  items: ActivityItem[]
}

const makeRecords = (): ActivityItem[] => {
  const count = faker.random.number(4) + 2
  const result: ActivityItem[] = []

  for (let i = 0; i < count; i++) {
    result.push({
      label: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      id: faker.random.uuid(),
      time: `${faker.random.number(12) + 8}:${faker.random.number(4) * 15}`,
    })
  }

  return result
}

// const ChildActivity: React.FC<ChildActivityProps> = ({ items }) => {
//   return items.map((item) => (
//     <Step key={item.label}>
//       <StepLabel>{item.label}</StepLabel>
//       <StepContent>
//         <Typography>{item.content}</Typography>
//       </StepContent>
//     </Step>
//   ))
// }

export const ChildrenActivity: React.FC<ChildrenActivityProps> = ({ items = [] }) => {
  if (!items.length) {
    return <Typography component="p">No children in your list, start by adding information</Typography>
  }

  return (
    <StateConsumer>
      {({ state }) => (
        <>
          <Typography variant="h5" align="center">
            Your activities today:
          </Typography>
          <List>
            {state.children.map(({ name, age }) => (
              <>
                <ListItem key={name}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${name}, ${age}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <div key={`${name}-content`}>
                  <Stepper activeStep={0} nonLinear orientation="vertical">
                    {makeRecords().map((item) => (
                      <Step key={item.label} expanded>
                        <StepLabel>{`${item.time}: ${item.label}`}</StepLabel>
                        <StepContent>
                          <Box display="flex" flexDirection="row">
                            {/* <img src={`https://picsum.photos/200/150?v=${Math.random}`} style={{ height: 'auto' }} /> */}
                            <Typography>{item.content}</Typography>
                          </Box>
                        </StepContent>
                      </Step>
                    ))}

                    {/* <ChildActivity items={makeRecords()} /> */}
                  </Stepper>
                </div>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        </>
      )}
    </StateConsumer>
  )
}
