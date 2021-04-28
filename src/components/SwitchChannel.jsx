import React from "react";

import Switch from "@material-ui/core/Switch";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import ThumbDownRoundedIcon from "@material-ui/icons/ThumbDownRounded";
import { Grid } from "@material-ui/core";

export default function SwitchChannel({ channelLike, setChannelLike }) {
  const handleChange = () => {
    channelLike ? setChannelLike(false) : setChannelLike(true);
  };

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
        <Grid item>
          <ThumbUpAltRoundedIcon color="primary" />
        </Grid>
        <Switch item onChange={handleChange} name="checkedA" />
        <Grid item>
          <ThumbDownRoundedIcon color="primary" />
        </Grid>
      </Grid>
    </>
  );
}
