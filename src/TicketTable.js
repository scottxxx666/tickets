import React from 'react';
import MaterialTable from 'material-table';
import {forwardRef} from 'react';

import ArrowDownward from '@material-ui/icons/ArrowDownwardRounded';
import Clear from '@material-ui/icons/ClearRounded';
import Search from '@material-ui/icons/SearchRounded';
import FilterList from '@material-ui/icons/FilterListRounded';
import Edit from '@material-ui/icons/Edit';
import DoneRounded from '@material-ui/icons/DoneRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

export default class TicketTable extends React.Component {
  _tableIcons = {
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
  };
  _titles = [
    {
      title: "更新時間",
      field: "updatedAt",
      defaultSort: "desc",
      render: (data) => (new Date(parseInt(data.updatedAt))).toLocaleString(),
    }, {
      title: "狀態",
      field: "status",
      lookup: { WAITING: "讓票中", END: "已結束" },
      defaultFilter: ["WAITING"],
    }, {
      title: "區域",
      field: "area",
    }, {
      title: "位子",
      field: "seat",
    }, {
      title: "張數",
      field: "number",
    }, {
      title: "票價",
      field: "price",
    }, {
      title: "交易方式",
      field: "payment",
    }, {
      title: "備註",
      field: "note",
    }, {
      title: "聯絡方式 (Ptt / Line / FB)",
      field: "contactInformation",
    },
  ];
  state = {
    open: false,
  };

  getActions = () => {
    return [
      rowData => ({
        icon: () => <DoneRounded/>,
        tooltip: '已售出',
        onClick: () => this.setState({ open: true }),
        hidden: rowData.number === 1,
      }),
      rowData => ({
        icon: () => <Edit/>,
        tooltip: '編輯',
        onClick: (event, rowData) => alert("You saved " + rowData.updatedAt),
        hidden: rowData.number === 1,
      }),
    ];
  };

  render() {
    const handleClose = () => {
      this.setState({ open: false });
    };
    return (
      <div>
        <MaterialTable
          icons={this._tableIcons}
          columns={this._titles}
          data={this.props.tickets}
          options={{
            filtering: true,
            toolbar: false,
            paging: false,
          }}
          localization={{
            header: { actions: "修改" },
            body: { emptyDataSourceMessage: "還沒有資料耶" },
          }}
          actions={this.getActions()}
        />
        <Dialog
          open={this.state.open}
          onClose={handleClose}
        >
          <DialogTitle id="alert-dialog-title">{"確認"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              確定要將售票狀態改為“已結束”嗎？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              取消
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              確定
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
