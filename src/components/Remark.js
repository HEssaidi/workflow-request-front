import React from 'react';
import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { OfflineBolt } from "@material-ui/icons";
import Request from '../actions/services/Request';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    color: "#f50057",
    width: "200px",
  },
}))(MenuItem);



function Remark({ dataParentToChild }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [remarks, setRemarks] = useState([]);
  const [ids, setIds] = useState([]);
  useEffect(() => {
    console.log({ dataParentToChild }.dataParentToChild)
    Request.getTasksRemarks({ dataParentToChild }.dataParentToChild)
      .then(res => {
        // console.log(Object.keys(res.data))
        console.log(Object.values(res.data))
        setRemarks(Object.values(res.data))
        setIds(Object.keys(res.data))
      });

    console.log(ids);
    console.log(remarks);
  }, []);

  return (
    <>
      <OfflineBolt
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        style={{ float: "right", color: "#f50057" }}
      >
        Open Menu
      </OfflineBolt>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {remarks.map((value, index) => (
          value.map(data => (
            <StyledMenuItem>
              <ListItemText primary={data} />
            </StyledMenuItem>
          ))
        ))}
      </StyledMenu>
    </>
  );
}
export default Remark