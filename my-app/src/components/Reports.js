import React, { useEffect, useState } from 'react';
import {GetOrdersTable, GetExcessReport, GetSalesReport, GetRestockReport, GetSoldTogether} from './pages/databaseFunctions';
import './Reports.css';

const Reports = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [startDate, setStartDate] = useState('2020-01-01');
    const [endDate, setEndDate] = useState('2023-04-01');

    //const orderData = ;
    const restockData = GetRestockReport();
    const soldTogether = GetSoldTogether();
    const orderData = GetOrdersTable(startDate,endDate);
    const salesData = GetSalesReport('2023-01-01', '2023-04-01');
    const excessData = GetExcessReport('2020-04-01', '2022-05-01');

    const formattedOrderData = orderData.map((row) => {
        return {
          order_id: row.order_id,
          date_ordered: new Date(row.date_ordered).toLocaleDateString(), // use the desired date format here
          order_cost: row.order_cost
        };
    });

    const tabs = [
        { id: 0, name: 'Orders',
          headers: ["ID", "Date", "Cost"],
          tableData: formattedOrderData
        },
        { id: 1, name: 'X/Z Reports',
          headers: ["Report ID", "Last Order ID", "ZReport Date", "Total Cost", "Menu Item", "Quantity"],
          tableData: [
            {id: 1, item_name: "hello", cost: 6.0, quantity: 6},
            {id: 2, item_name: "item2", cost: 6.0, quantity: 6},
          ]
        },
        { id: 2, name: 'Restock Report',
          headers: ["ID", "Item Name", "Cost", "Quantity"],
          tableData: restockData
        },
        { id: 3, name: 'Sales Report',
          headers: ["ID", "Item Name", "Quantity"],
          tableData: salesData
        },
        { id: 4, name: 'Excess Report',
          headers: ["Total Amount Used", "Inventory ID", "Item Name"],
          tableData: excessData
        },
        { id: 5, name: 'Sold Together',
          headers: ["ID", "Item 1", "Item 2", "# of Times Sold Together"],
          tableData: soldTogether
        },
    ];


    const handleClick = (tabIndex) => {
        setActiveTab(tabIndex);
    }

    return (        //The container that would show all the tables
        <React.Fragment>
        <div className='container'>
            <div className='table-tab'>
                <div style={{ display: 'flex' }}>
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            onClick={() => handleClick(tab.id)}
                            style={{
                                backgroundColor: activeTab === tab.id ? 'rgb(249, 187, 18)' : 'rgba(92,0,32,255)',
                                color: 'white',
                                padding: '10px',
                                cursor: 'pointer',
                            }}
                        >
                            {tab.name}
                        </div>
                    ))}
                </div>
                <div>
                    {tabs.map((tab) => (
                        <div key={tab.id} style={{ display: activeTab === tab.id ? 'block' : 'none'}}>
                            <div style={{ display: activeTab === 0 ? 'block' : 'none'}}>
                                <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                <br />
                                <label htmlFor="end-date">End Date: </label>
                                <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        {tab.headers.map((header) =>(
                                            <th key={header}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tab.tableData.map((data) => (
                                        <tr key={data.id}>
                                            {Object.keys(data).map((key) => (
                                                <td key={key}>{data[key]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}


export default Reports;
