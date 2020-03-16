import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {useState} from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 700,
  },
  form: {
    padding: theme.spacing(5),
  },
}));

export default function () {
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setTicket(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleContactChange(event) {
    const platform = event.target.dataset.platform;
    const platformId = event.target.value;
    setContact(prev => [...prev.filter(e => e.platform !== platform), { platform, platformId }]);
  }

  const [ticket, setTicket] = useState({});
  const [contact, setContact] = useState([]);
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
              <TextField
                id="area"
                name="area"
                label="票卷區域"
                placeholder="紅2A區"
                margin="normal"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField
                id="seat"
                name="seat"
                label="座位序號"
                placeholder="10排12號"
                margin="normal"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField
                id="number"
                name="number"
                label="張數"
                type="number"
                defaultValue="1"
                margin="normal"
                inputProps={{ min: 1 }}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField
                id="price"
                name="price"
                label="預售價格"
                type="number"
                helperText="注意：售價不得比原票價高！"
                margin="normal"
                inputProps={{ min: 0 }}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField
                id="payment"
                name="payment"
                label="交易方式"
                margin="normal"
                multiline
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField
                id="note"
                name="note"
                label="備註"
                multiline
                margin="normal"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField
                id="ptt_id"
                name="ptt_id"
                label="PTT ID"
                margin="normal"
                inputProps={{ "data-platform": "PTT" }}
                onChange={handleContactChange}
              />
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField
                id="line_id"
                name="line_id"
                data-platform="LINE"
                label="LINE ID"
                margin="normal"
                inputProps={{ "data-platform": "LINE" }}
                onChange={handleContactChange}
              />
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField
                error={false}
                id="fb_id"
                name="fb_id"
                label="FB 用戶名稱"
                data-platform="FB"
                margin="normal"
                helperText="非中文！可以看個人頁面的網址 facebook.com/ 之後的部分，或是參考 https://www.facebook.com/help/messenger-app/android/1047811435279151"
                inputProps={{ "data-platform": "FB" }}
                onChange={handleContactChange}
              />
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
