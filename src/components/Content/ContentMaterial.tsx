import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import clsx from "clsx";

import EditorDemo from "../RIchTextEditor/RichTextEditor";
import office from "common/assets/jpeg/office.jpg";
import office2 from "common/assets/jpeg/office2.jpg";
import forest from "common/assets/jpeg/forest.jpg";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      //   padding: 14,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },

    cellContainer: {
      height: "24rem",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      margin: "1rem 0",
    },
    cellTop: {
      height: "60%",
      display: "grid",
      overflow: "hidden",
    },
    cellImage: {
      width: "100%",
      objectFit: "scale-down",
    },

    cellBottom: {
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
      justifyContent: "space-around",
      flex: 1,
      backgroundColor: "#262626",
      color: "#ffffff",
    },
    paragraph: {
      fontSize: 10,
    },
    largePaper: {
        height: 300,
    }
  })
);

const getModNumber = (num: number) => {
  if (num % 3 === 1) {
    return office;
  } else if (num % 3 === 2) {
    return office2;
  }

  return forest;
};

const getModTitle = (num: number) => {
  if (num % 3 === 1) {
    return "办公室生活-1";
  } else if (num % 3 === 2) {
    return "办公室生活-2";
  }

  return "雪中森林的晨曦";
};

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper square elevation={0} className={clsx(classes.paper, classes.largePaper)} />
        </Grid>

        <Grid item xs={6}>
          <Paper square elevation={0} className={classes.paper}>
            xs=6
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper square elevation={0} className={classes.paper}>
            xs=6
          </Paper>
        </Grid>

        {_.range(0, 12).map((opt) => {
          return (
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <Paper square elevation={0} className={classes.paper}>
                <div className={classes.cellTop}>
                  <img className="cell-image" src={getModNumber(opt)} />
                  <h2>Block {opt}</h2>
                </div>
                <div className={classes.cellBottom}>
                  <h5>{getModTitle(opt)}</h5>
                  <div>
                    <p className={classes.paragraph}>Carlos Wiles</p>
                    <p>2021 3 3</p>
                  </div>
                </div>
              </Paper>
            </Grid>
          );
        })}

        <Grid item xs={12}>
          <Paper square elevation={0} className={classes.paper}>
            <EditorDemo />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
