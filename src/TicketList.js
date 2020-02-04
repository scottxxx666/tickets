import TicketTable from './TicketTable';
import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(4),
  },
}));

export default function () {
  const classes = useStyles();
  return (
    <Container>
      <Grid
        className={classes.header}
        container
        direction="row"
        justify="flex-end"
      ><Grid item xs={1}>
        <Button variant="contained" color="primary">新增</Button>
      </Grid>
      </Grid>
      <TicketTable/>
    </Container>
  );
}
