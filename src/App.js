import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Badge } from "reactstrap";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { useStocks } from './api'


function login() {
  const url = 'http://131.181.190.87:3000/user/login'
  const token = localStorage.getItem("token")
  const headers = {
    accept: "application/json",
    "Content-type": "application/json",
    Authorization: "Bearer" + token
  }

  return fetch(url, {
    method: "POST",
    headers: { accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email: "example@api.com", password: "asdlkfj1" })
  })
    .then((res) => res.json())
    .then((res) => {
      //localStorage.setItem("token".res.token)
      console.log(jwt.decode(res.token))
    })

}


function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState('');

  return (
    <div>
      <input aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={innerSearch}
        onChange={(e) => setInnerSearch(e.target.value)}>
      </input>
      <button id="search-button"
        type="button"
        onClick={() => props.onSubmit(innerSearch)}
      >Search</button>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const { rowData, columns } = useStocks();
  const history = useHistory();

  const onSubmit = innerSearch => {
    setSearch(innerSearch);
  }

  return (
    <div className="container">

      <h1>Stock Market</h1>
      <p>
        <Badge color="success">{rowData.length}</Badge>
        Companies with stocks
      </p>
      <SearchBar onSubmit={onSubmit} />
      <button onClick={() => setSearch("")}> reset </button>
      <div className="ag-theme-balham"
        style={{
          height: "500px",
          width: "800px",
          margin: "auto"
        }}>
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          onRowClicked={row => history.push('/Stock/' + row.data.symbol)}
          pagination={true}
          paginationPageSize={15} />
      </div>
      <Button
        color="info"
        size="sm"
        className="mt-3"
        href="http://131.181.190.87:3000/"
        target="_blank">
        Go to Stocks API
      </Button>
    </div>
  );
}

export default App;
