import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextInputRow from '../common/TextInputRow';
import makeStyles from '@material-ui/core/styles/makeStyles';

const getPlatformId = (contactInformation, platform) => {
  const contact = contactInformation.find(e => e.platform === platform);
  return contact ? contact.platformId : null;
};

export default function ({ handleChange, handleContactChange, submit, error, ticket, title }) {
  const useStyles = makeStyles(theme => ({
    form: {
      minWidth: 700,
      padding: theme.spacing(5),
    },
  }));
  const classes = useStyles();

  if (error) {
    alert('抱歉，網路錯誤，麻煩稍後再試。');
  }
  return (
    <Grid container justify="center">
      <Card>
        <form className={classes.form}>
          <CardContent>
            <Grid container justify="center">
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
            </Grid>
            <TextInputRow
              id="area"
              name="area"
              label="票卷區域"
              placeholder="紅2A區"
              onChange={handleChange}
              defaultValue={ticket.area}
              required
            />
            <TextInputRow
              id="seat"
              name="seat"
              label="座位序號"
              placeholder="10排12號"
              onChange={handleChange}
              defaultValue={ticket.seat}
              required
            />
            <TextInputRow
              id="number"
              name="number"
              label="張數"
              type="number"
              inputProps={{ min: 1 }}
              onChange={handleChange}
              defaultValue={ticket.number || 1}
              required
            />
            <TextInputRow
              id="price"
              name="price"
              label="預售價格"
              type="number"
              helperText="注意：售價不得比原票價高！"
              inputProps={{ min: 0 }}
              onChange={handleChange}
              defaultValue={ticket.price}
            />
            <TextInputRow
              id="payment"
              name="payment"
              label="交易方式"
              multiline
              onChange={handleChange}
              defaultValue={ticket.payment}
            />
            <TextInputRow
              id="note"
              name="note"
              label="備註"
              multiline
              onChange={handleChange}
              defaultValue={ticket.note}
            />
            <TextInputRow
              id="ptt_id"
              name="ptt_id"
              label="PTT ID"
              inputProps={{ "data-platform": "PTT" }}
              onChange={handleContactChange}
              defaultValue={getPlatformId(ticket.contactInformation, 'PTT')}
            />
            <TextInputRow
              id="line_id"
              name="line_id"
              data-platform="LINE"
              label="LINE ID"
              inputProps={{ "data-platform": "LINE" }}
              onChange={handleContactChange}
              defaultValue={getPlatformId(ticket.contactInformation, 'LINE')}
            />
            <TextInputRow
              id="fb_id"
              name="fb_id"
              label="FB 用戶名稱"
              data-platform="FB"
              helperText="非中文！可以看個人頁面的網址 facebook.com/ 之後的部分，或是參考 https://www.facebook.com/help/messenger-app/android/1047811435279151"
              inputProps={{ "data-platform": "FB" }}
              onChange={handleContactChange}
              defaultValue={getPlatformId(ticket.contactInformation, 'FB')}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={submit}>提交</Button>
          </CardActions>
        </form>
      </Card>
    </Grid>
  );
}
