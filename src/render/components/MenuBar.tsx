import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import * as React from 'react';
import { useNavigate } from 'react-router';
import * as ServerApi from '../api/ServerApi'
import styled from 'styled-components';

const Title = styled(Typography)`
  flex-grow: 1;
`
const Offset = styled('div')`
  min-height: ${props => props.theme.mixins.toolbar.height + "px"};
`

export const MenuBar = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = React.useCallback(() => {
    setAnchorEl(null);

    ServerApi.logout()
    navigate("/login")
  }, [])

  return (
    <React.Fragment>
      <AppBar position="fixed" >
        <Toolbar>
          <Title variant="h6">
            Miho solen twitter like
          </Title>
          <div>
            <IconButton
              size="large"
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
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Offset />
    </React.Fragment>
  );
}