import {
  CircularProgress,
  Box,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import firebase from "../firebase.config";
import Message from "./Message";
import NewMessage from "./NewMessage";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import SwitchChannel from "./SwitchChannel";
import { Fragment } from "react";
var currentWeekNumber = require("current-week-number");

const useStyles = makeStyles((theme) => ({
  containerActions: {
    padding: theme.spacing(2),
    boxShadow: "0 4px 2px -2px rgba(0,0,0,0.05)",
  },
  icon: {
    cursor: "pointer",
  },
}));

export default function ChatRoom(props) {
  const classes = useStyles();
  const [messages, setMessage] = useState([]);
  const [wait, setWait] = useState(true);
  const [numWeek, setNumWeek] = useState(currentWeekNumber());

  const [channelLike, setChannelLike] = useState(true); //select channel switch

  const { db, user } = props;

  const fetchMessage = () => {
    const ref = firebase
      .firestore()
      .collection(channelLike ? "Like" : "Dislike")
      .where("weekNumber", "==", numWeek)
      .orderBy("date");
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ data: doc.data(), id: doc.id });
      });
      setMessage(items);
      setWait(false);
    });
  };

  useEffect(() => {
    fetchMessage();
  }, [channelLike, numWeek]);

  return (
    <>
      <Grid
        component={Box}
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.containerActions}
      >
        <Box
          component={Grid}
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <ArrowLeftIcon
            fontSize="large"
            color="secondary"
            onClick={() => {
              setNumWeek(numWeek - 1);
            }}
            className={classes.icon}
          />

          <Typography variant="button">Semaine n°{numWeek}</Typography>
          <ArrowRightIcon
            fontSize="large"
            color="secondary"
            onClick={() => {
              setNumWeek(numWeek + 1);
            }}
            className={classes.icon}
          />
        </Box>
        <SwitchChannel
          item
          setChannelLike={setChannelLike}
          channelLike={channelLike}
        />
      </Grid>
      <Grid style={{ overflowY: "scroll", flexGrow: 1 }}>
        {wait ? (
          <CircularProgress />
        ) : (
          messages.map((message) => (
            <Fragment key={message.data.date}>
              <Message
                message={message}
                channelLike={channelLike}
                user={user}
                db={db}
              />
            </Fragment>
          ))
        )}
      </Grid>

      <NewMessage
        channelLike={channelLike}
        db={db}
        user={user}
        setNumWeek={setNumWeek}
      />
    </>
  );
}
