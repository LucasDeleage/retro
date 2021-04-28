import { Grid, Switch, Typography } from "@material-ui/core";
import React from "react";

export default function Parametres() {
  const handleChange = () => {};

  return (
    <>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Switch item onChange={handleChange} name="checkedA" />
        <Typography>Dark mode</Typography>
      </Grid>
    </>
  );
}
