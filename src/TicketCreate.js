import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 700,
  },
  form: {
    padding: theme.spacing(5),
  },
}));

export default function () {
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Card className={classes.root}>
        <form className={classes.form} noValidate>
          <CardContent>
            <Grid container justify="center">
              <Typography variant="h5" component="h2">
                新增一筆售票資料
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField id="area" label="票卷區域" placeholder="紅2A區" margin="normal" required/>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField id="seat" label="座位序號" placeholder="10排12號" margin="normal" required/>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField id="number"
                         label="張數"
                         type="number"
                         defaultValue="1"
                         margin="normal"
                         inputProps={{ min: 1 }}
                         required/>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField id="price"
                         label="預售價格"
                         type="number"
                         helperText="注意：售價不得比原票價高！"
                         margin="normal"
                         inputProps={{ min: 0 }}
                         required/>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField id="payment" label="交易方式" margin="normal" multiline required/>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField id="note" label="備註" multiline margin="normal"/>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField id="ptt_id" label="PTT ID" margin="normal"/>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField id="line_id" label="LINE ID" margin="normal"/>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField id="fb_id"
                         label="FB 用戶名稱"
                         margin="normal"
                         helperText="非中文！可以看個人頁面的網址 facebook.com/ 之後的部分，或是參考 https://www.facebook.com/help/messenger-app/android/1047811435279151"/>
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary">提交</Button>
          </CardActions>
        </form>
      </Card>
    </Grid>
  );
}
