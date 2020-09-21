import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import './header.styles.scss';

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
}));

export default function Header() {
  const classes = useStyles();

  let history = useHistory();

  const goToHomePage = () => {
    history.push("/");
  };

  return (
    <div className={`classes.root logo`}>
      <AppBar position="static">
        <Toolbar>
          {/* TODO: Title element extends until the end of the header. Change the element width to only be
            the size of the logo/title. */}
          <Typography
            variant="h6"
            className={classes.title}
            onClick={goToHomePage}
          >
            CSOFTMTY
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
