import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';

export default (props) => (
  <Grid item xs={12}>
    <TextField
      margin="normal"
      {...props}
    />
  </Grid>
);
