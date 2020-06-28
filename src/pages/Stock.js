import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default function Stock() {
  const { symbol } = useParams();
  const history = useHistory();

  const [newRowData, setNewRowData] = useState([]);

  const newColumn = [
    { headerName: "Timestamp", field: "timestamp" },
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Industry", field: "industry" },
    { headerName: "Open", field: "open" },
    { headerName: "High", field: "high" },
    { headerName: "Low", field: "low" },
    { headerName: "Close", field: "close" },
    { headerName: "Volumes", field: "volumes" }
  ];

  const url = "http://131.181.190.87:3000/stocks/" + symbol;

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setNewRowData([data]))

  }, [url]);


  return (
    <div className="container">
      <button onClick={() => history.push("/")}>Home</button>
      <h1>Stock Market</h1>
      <div className="ag-theme-balham"
        style={{
          height: "500px",
          width: "800px",
          margin: "auto"
        }}>
        <AgGridReact
          columnDefs={newColumn}
          rowData={newRowData}
          pagination={true}
          paginationPageSize={15} />
      </div>
    </div>
  );
}
