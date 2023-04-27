import React, { useState } from 'react';
import {GetOrdersList, GetRestockReport, GetSoldTogether} from './pages/databaseFunctions';
import './Reports.css';

const Reports = () => {
    const [activeTab, setActiveTab] = useState(0);
    console.log("orders");
    const orderData = GetOrdersList('2023-03-08','2023-03-08');
    const restockData = GetRestockReport();
    const soldTogether = GetSoldTogether();
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
        { id: 1, name: 'X/Y Reports',
          headers: ["ID", "Item Name", "Cost", "Quantity"],
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
          headers: ["ID", "Item Name", "Cost", "Quantity"],
          tableData: [
            {id: 1, item_name: "hello", cost: 6.0, quantity: 6},
            {id: 2, item_name: "item2", cost: 6.0, quantity: 6},
          ]
        },
        { id: 4, name: 'Excess Report',
          headers: ["ID", "Item Name", "Cost", "Quantity"],
          tableData: [
            {id: 1, item_name: "hello", cost: 6.0, quantity: 6},
            {id: 2, item_name: "item2", cost: 6.0, quantity: 6},
          ]},
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
