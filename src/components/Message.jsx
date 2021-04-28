import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { formatRelative } from "date-fns";
import ThumbDownRoundedIcon from "@material-ui/icons/ThumbDownRounded";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";

const useStyles = makeStyles((theme) => ({
  containerText: {
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
  },

  containerMessages: {
    paddingTop: 20,
  },

  divider: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    paddingLeft: "60px",
    paddingRight: "60px",
  },

  emoji: {
    width: 30,
    height: 30,
    backgroundColor: theme.palette.primary.light,
  },

  badge: {
    marginTop: 20,
    marginRight: 20,
  },

  badgeAlt: {
    marginTop: 20,
    marginLeft: 20,
  },
}));

export default function Message(props) {
  const { content, date, like, dislike, uid } = props.message.data; //contenu et date de l'objet message
  const { id } = props.message; //id de l'objet
  const { channelLike, user, db } = props;
  const classes = useStyles();
  const {
    containerText,
    divider,
    emoji,
    badge,
    containerMessages,
    badgeAlt,
  } = classes;

  let likeList = like;
  let dislikeList = dislike;

  function removeUserUid(array) {
    //si user.uid présent le supprime de la liste
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element === user.uid) {
        array.splice(i, 1);
        break;
      }
    }
    return array;
  }

  function handleEmoji(obj, list) {
    // prend en paramètre un objet {champs a modifier : nouvelle valeur} et la liste de nouvelle valeur
    // si user le supprime sinon l'ajoute
    list.includes(user.uid)
      ? (list = removeUserUid(list))
      : list.push(user.uid);

    if (db) {
      db.collection(channelLike ? "Like" : "Dislike")
        .doc(id)
        .update(obj);
    }
  }

  return (
    <Grid container xs={12} className={containerMessages}>
      <Grid
        container
        xs={12}
        wrap="nowrap"
        direction={user.uid == uid ? "row-reverse" : "row"}
      >
        <Grid>
          <Avatar>H</Avatar>
        </Grid>
        <Grid
          item
          className={containerText}
          container
          direction="column"
          alignItems={user.uid == uid ? "flex-end" : "flex-start"}
        >
          <Grid
            container
            item
            justify={user.uid == uid ? "flex-end" : "flex-start"}
            xs={12}
            sm={10}
            md={6}
          >
            <Typography align="justify">{content}</Typography>
          </Grid>
          {date?.seconds ? (
            <Typography variant="caption" color="textSecondary">
              {formatRelative(new Date(date.seconds * 1000), new Date())}
            </Typography>
          ) : null}
          <Grid container justify={user.uid == uid ? "flex-end" : "flex-start"}>
            <Badge
              badgeContent={dislike.length}
              color="primary"
              className={user.uid == uid ? badgeAlt : badge}
            >
              <Avatar
                className={emoji}
                onClick={() => {
                  handleEmoji({ dislike: dislikeList }, dislikeList);
                }}
              >
                <ThumbDownRoundedIcon fontSize="small" color="secondary" />
              </Avatar>
            </Badge>
            <Badge
              badgeContent={like.length}
              color="primary"
              className={user.uid == uid ? badgeAlt : badge}
            >
              <Avatar
                className={emoji}
                onClick={() => {
                  handleEmoji({ like: likeList }, likeList);
                }}
              >
                <ThumbUpRoundedIcon fontSize="small" color="secondary" />
              </Avatar>
            </Badge>
          </Grid>
        </Grid>
      </Grid>
      <Box className={divider}>
        <Divider />
      </Box>
    </Grid>
  );
}
