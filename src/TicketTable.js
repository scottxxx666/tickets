import React, {forwardRef} from 'react';
import MaterialTable from 'material-table';

import ArrowDownward from '@material-ui/icons/ArrowDownwardRounded';
import Clear from '@material-ui/icons/ClearRounded';
import Search from '@material-ui/icons/SearchRounded';
import FilterList from '@material-ui/icons/FilterListRounded';
import Edit from '@material-ui/icons/Edit';
import DoneRounded from '@material-ui/icons/DoneRounded';
import MultiLine from './common/MultiLine';
import AuthContext from './AuthContext';
import ConfirmAlert from './common/ConfirmAlert';
import {removePrivateFields} from './utils/object';

export default class TicketTable extends React.Component {
  static contextType = AuthContext;
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
      lookup: { WAITING: "讓票中", DONE: "已結束" },
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
      render: ({ payment }) => (<MultiLine data={payment}/>),
    }, {
      title: "備註",
      field: "note",
      render: ({ note }) => (<MultiLine data={note}/>),
    }, {
      title: "聯絡方式",
      field: "contactInformation",
      render: ({ contactInformation }) => (
        contactInformation.map(e => <div key={e.platform}>{e.platform} 帳號：{e.platformId}</div>)
      ),
    },
  ];
  state = {
    open: false,
    ticket: null,
  };

  getActions = (auth) => {
    return !auth.isLogin() ? [] : [
      rowData => ({
        icon: () => <DoneRounded/>,
        tooltip: '已結束',
        onClick: () => {
          this.setState({ open: true, ticket: rowData });
        },
        hidden: !this.canDoRowAction(auth, rowData) || rowData.status === 'DONE',
      }),
      rowData => ({
        icon: () => <Edit/>,
        tooltip: '編輯',
        onClick: (event, rowData) => alert("You saved " + rowData.updatedAt),
        hidden: !this.canDoRowAction(auth, rowData),
      }),
    ];
  };

  canDoRowAction(auth, rowData) {
    return auth.getUser().id === rowData.postedBy.id;
  }

  endTicket = () => {
    this.props.updateTicket({
      variables: {
        ...this.state.ticket,
        eventId: this.state.ticket.event.id,
        status: 'DONE',
        contactInformation: this.state.ticket.contactInformation.map(removePrivateFields),
      },
    });
    this.closeConfirm();
  };

  closeConfirm = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <React.Fragment>
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
          actions={this.getActions(this.context)}
        />
        <ConfirmAlert
          open={this.state.open}
          handleClose={this.closeConfirm}
          desc={"確定要將售票狀態改為“已結束”嗎？"}
          handleConfirm={this.endTicket}
        />
      </React.Fragment>
    );
  }
}
