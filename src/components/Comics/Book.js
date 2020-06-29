import React, { useState } from "react";
import clsx from "clsx";
import { Card, CardContent, Collapse, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function Book(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardContent>
        <h3>{props.title}</h3>
        <span>{props.price}</span>
      </CardContent>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpand}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>{" "}
      <Collapse in={expanded} timeout="auto" >
        <CardContent>
          <p>{props.description}</p>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Book;
