import React, { useState } from "react";
import { makeStyles, Fab } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import firebase from "../firebase.config";
var currentWeekNumber = require("current-week-number");

const useStyles = makeStyles({
  bottomNav: {
    display: "flex",
    width: "100%",
    height: "50px",
  },

  fab: {
    position: "absolute",
    bottom: "50px",
    right: "45px",
  },
});

export default function NewMessage(props) {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const handleMessage = (e) => setMessage(e.target.value);
  const { db, channelLike, user, setNumWeek } = props;

  const HandleOnSubmit = (e) => {
    //ajoute le nouveau message a la base de données a la soumission du form
    e.preventDefault();
    const input = document.querySelector("#filled-secondary");
    input.value = "";
    console.log(e.target.value);

    if (!message) {
    }
    if (db && message) {
      db.collection(channelLike ? "Like" : "Dislike").add({
        content: message,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        uid: user.uid,
        weekNumber: currentWeekNumber(),
        like: [],
        dislike: [],
      });
    }

    setNumWeek(currentWeekNumber()); //si un utilisateur publie dans une mauvaise semaine le
  }; // ramène dans la semaine actuelle

  const { fab, bottomNav } = classes;

  return (
    <>
      <form className={classes.bottomNav} noValidate autoComplete="off">
        <TextField
          id="filled-secondary"
          label="Votre message"
          variant="filled"
          color="secondary"
          className={bottomNav}
          onChange={handleMessage}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              HandleOnSubmit(e);
            }
          }}
        />
      </form>
      <Fab
        color="secondary"
        aria-label="edit"
        className={fab}
        onClick={HandleOnSubmit}
      >
        <EditIcon />
      </Fab>
    </>
  );
}
