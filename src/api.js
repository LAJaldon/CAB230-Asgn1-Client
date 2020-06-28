import { useState, useEffect } from "react";

export function useStocks() {
    const [rowData, setRowData] = useState([]);
    const url = "http://131.181.190.87:3000/stocks/symbols";

    const columns = [
        { headerName: "Name", field: "name" },
        { headerName: "Symbol", field: "symbol" },
        { headerName: "Industry", field: "industry" }
    ];

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(stocks => setRowData(stocks))
    }, [url]);

    return {
        rowData,
        columns,
    };

}

