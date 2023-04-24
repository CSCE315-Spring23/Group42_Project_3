import React, { useEffect, useState } from 'react';
import {GetInventoryList, GetOrdersList, GetRestockReport, GetRecipesList, GetMenuTable} from './pages/databaseFunctions';
import './Table.css';

const Table = () => {
    const [activeTab, setActiveTab] = useState(0);
    const inventoryData = GetInventoryList(0,0);
    const orderData = GetOrdersList();
    const restockData = GetRestockReport();
    const recipeData = GetRecipesList();
    const menuData = GetMenuTable();


    const tabs = [
        { id: 0, name: 'Inventory', 
          headers: ["ID", "Item Name", "Cost", "Quantity"],
          tableData: inventoryData
        },
        { id: 1, name: 'MenuItems', 
          headers: ["ID", "Item Name", "Item Cost"],
          tableData: menuData
        },
        { id: 2, name: 'RecipeItems', 
          headers: ["ID", "Item Name", "Inventory ID", "Menu ID", "Amount Used"],
          tableData: recipeData
        },
        { id: 3, name: 'Orders', 
          headers: ["ID", "date_ordered", "order_cost"],
          tableData: orderData
        },
        { id: 4, name: 'X/Y Reports', 
          headers: ["ID", "Item Name", "Cost", "Quantity"],
          tableData: [
            {id: 1, item_name: "hello", cost: 6.0, quantity: 6}, 
            {id: 2, item_name: "item2", cost: 6.0, quantity: 6}, 
          ]
        },
        { id: 5, name: 'Restock Report', 
          headers: ["ID", "Item Name", "Cost", "Quantity"],
          tableData: restockData
        },
        { id: 6, name: 'Sales Report', 
          headers: ["ID", "Item Name", "Cost", "Quantity"],
          tableData: [
            {id: 1, item_name: "hello", cost: 6.0, quantity: 6}, 
            {id: 2, item_name: "item2", cost: 6.0, quantity: 6}, 
          ]
        },
        { id: 7, name: 'Excess Report', 
          headers: ["ID", "Item Name", "Cost", "Quantity"],
          tableData: [
            {id: 1, item_name: "hello", cost: 6.0, quantity: 6}, 
            {id: 2, item_name: "item2", cost: 6.0, quantity: 6}, 
          ]},
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


export default Table;
