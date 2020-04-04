import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import React, {useContext, useState} from 'react';
import AuthContext from './AuthContext';

const AccountMenu = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const anchorRef = React.useRef(null);
  const handleClose = () => {
    setOpen(false);
  };
  const logout = () => {
    auth.logout();
  };
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      <Button
        edge="end"
        variant="contained"
        color="default"
        endIcon={<AccountCircleIcon/>}
        onClick={toggleMenu}
        ref={anchorRef}
      >{auth.getUser()}</Button>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <MenuItem onClick={logout}>登出</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default AccountMenu;
