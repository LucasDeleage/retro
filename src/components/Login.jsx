import {
  Container,
  Grid,
  FormControl,
  TextField,
  makeStyles,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { FormatListBulletedOutlined } from "@material-ui/icons";
import EventAvailableTwoToneIcon from "@material-ui/icons/EventAvailableTwoTone";
import React, { useEffect, useState } from "react";
import Logo from "../images/Chat_SVG.svg";

const useStyles = makeStyles({
  container: {
    height: "100vh",
  },

  formContainer: {
    flexGrow: 1,
  },

  formControl: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  header: {
    height: "70px",
  },
});

export default function Login(props) {
  const classes = useStyles();
  const { formContainer, formControl, header, container } = classes;
  const {
    signInWithGoogle,
    setEmail,
    setMdp,
    createAccount,
    error,
    loginUser,
  } = props;
  const [errorMail, setErrorMail] = useState(false);
  const [errorMailMessage, setErrorMailMessage] = useState("");
  const [errorMdp, setErrorMdp] = useState(false);
  const [errorMdpMessage, setErrorMdpMessage] = useState("");

  const handleEmail = (e) => setEmail(e.target.value);

  const handleMdp = (e) => setMdp(e.target.value);

  const handleError = () => {
    const errorSplit = error.split(" ");

    for (let i = 0; i < errorSplit.length; i++) {
      const word = errorSplit[i];
      console.log(word);
      if (word === "email" || word === "identifier.") {
        setErrorMail(true);
        setErrorMailMessage(error);
        break;
      } else {
        setErrorMail(false);
        setErrorMailMessage("");
      }

      if (word === "Password" || word === "password") {
        setErrorMdp(true);
        setErrorMdpMessage(error);
        break;
      } else {
        setErrorMdp(false);
        setErrorMdpMessage("");
      }
    }
  };

  useEffect(() => {
    handleError();
  }, [error]);

  return (
    <Grid container direction="column" className={container}>
      <Box
        component={Grid}
        container
        justify="center"
        alignItems="center"
        className={header}
        item
        bgcolor="primary.light"
        boxShadow={4}
        color="primary.contrastText"
      >
        <Typography
          className={formControl}
          variant="button"
          style={{ fontSize: 35 }}
        >
          Retro
        </Typography>
        <EventAvailableTwoToneIcon color="secondary" style={{ fontSize: 30 }} />
      </Box>
      <Grid container justify="center" item className={formContainer}>
        <Grid
          container
          justify="center"
          alignItems="center"
          item
          xs={10}
          md={3}
        >
          <FormControl>
            <TextField
              id="filled-password-input"
              label="Email"
              type="email"
              autoComplete="current-password"
              variant="filled"
              className={formControl}
              required
              onChange={handleEmail}
              error={errorMail}
              helperText={errorMailMessage}
            />
            <TextField
              id="filled-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
              className={formControl}
              required
              onChange={handleMdp}
              error={errorMdp}
              helperText={errorMdpMessage}
            />
            <Button variant="contained" color="primary" onClick={loginUser}>
              Se connecter
            </Button>
            <Button variant="text" color="primary" onClick={createAccount}>
              S'inscrire
            </Button>
            <Typography className={formControl} align="center">
              ou
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={signInWithGoogle}
            >
              Se connecter avec Google
            </Button>
          </FormControl>
        </Grid>
        <Grid container xs={6} md={4} item justify="center">
          <img src={Logo} alt="Logo" width="400em" />
        </Grid>
      </Grid>
    </Grid>
  );
}
