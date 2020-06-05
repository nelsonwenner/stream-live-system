import React from 'react';
import './table-header.css';

const TableHeader = () => {
  return (
    <div className="header-bar">
      <div className="text uuid">UUID</div>
      <div className="text title-bar">TITLE</div>
      <div className="text date">DATE</div>
      <div className="text create-live">CREATE LIVE</div>
      <div className="text invite">INVITE</div>
      <div className="text status">STATUS</div>
    </div>
  )
}

export default TableHeader;