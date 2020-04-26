import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FaceIcon from '@material-ui/icons/Face'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import React, { useContext } from 'react'
import { StateContext } from '@/context/state-context'
import { LogoutAction } from '@/state/reducers/login-reducer'
import theme from '@/theme'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}))

interface NavigationProps {
  loggedIn: boolean
  userName: string
}

export const Navigation: React.FC<NavigationProps> = ({ loggedIn, userName }) => {
  const classes = useStyles()
  const { dispatch } = useContext(StateContext)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch({ type: LogoutAction })
  }

  if (!loggedIn) {
    return null
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Emily.io
          </Typography>

          <div>
            {`Hello, ${userName}`}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        // className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        // classes={{
        //   paper: classes.drawerPaper,
        // }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link href="/hello">
            <ListItem button>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary="My Day" />
            </ListItem>
          </Link>
          <Link href="/children">
            <ListItem button>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary="Children" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
