import React from 'react';
import MaterialTable from 'material-table';
import {forwardRef} from 'react';

import ArrowDownward from '@material-ui/icons/ArrowDownwardRounded';
import Clear from '@material-ui/icons/ClearRounded';
import Search from '@material-ui/icons/SearchRounded';
import FilterList from '@material-ui/icons/FilterListRounded';

export default class TicketTable extends React.Component {
  _data = [
    {
      updatedAt: "2019/12/12 12:12:12",
      status: "WAITING",
      contact: "FB: XDD",
      seats: "紫A 24號",
      number: 3,
      price: 4200,
      transaction: "演唱會面交",
      note: "不拆售",
    },
    {
      updatedAt: "2020/02/13 12:12:12",
      status: "END",
      contact: "FB: XDD2",
      seats: "紫A 25號",
      number: 1,
      price: 5200,
      transaction: "演唱會面交",
      note: "",
    },
  ];
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
    }, {
      title: "狀態",
      field: "status",
      lookup: { WAITING: "讓票中", END: "已結束" },
      defaultFilter: ["WAITING"],
    }, {
      title: "聯絡方式 (Ptt / Line / FB)",
      field: "contact",
    }, {
      title: "位子",
      field: "seats",
    }, {
      title: "張數",
      field: "number",
    }, {
      title: "票價",
      field: "price",
    }, {
      title: "交易方式",
      field: "transaction",
    }, {
      title: "備註",
      field: "note",
    },
  ];

  _title = "待讓票卷";

  render() {
    return (
      <MaterialTable
        icons={this._tableIcons}
        columns={this._titles}
        data={this._data}
        title={this._title}
        options={{
          filtering: true,
        }}
        localization={{ body: { emptyDataSourceMessage: "還沒有資料耶" } }}
      />
    );
  }
}
