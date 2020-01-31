import React from 'react';

export default class TicketList extends React.Component {
  _titles = ['時間', '狀態', '聯絡方式(Ptt / Line / FB)', '位子', '張數', '票價', '交易方式', '備註', '拆售'];

  render() {
    const heads = this._titles.map(head => (
      <th key={head}>{head}</th>
    ));
    return (
      <table>
        <thead>
        <tr>{heads}</tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    );
  }
}
