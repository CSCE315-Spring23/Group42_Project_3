import React, { useEffect, useState } from 'react';
import {GetInventoryList} from './pages/databaseFunctions';
import './Table.css';

const Table = () => {
    const [activeTab, setActiveTab] = useState(0);
    const userdata = GetInventoryList(0,0);
    console.log(userdata);

    const tabs = [
        { id: 0, name: 'Inventory', 
          headers: ["ID", "Item Name", "Cost", "Quantity"],
          tableData: userdata
        },
        { id: 1, name: 'MenuItems', 
          headers: ["ID", "Item Name", "Item Cost", "Quantity Sold"],
          tableData: [
            { invenotry_id: 1, item_name: 'item', cost: 0.5, qtySold: 5 },
            { invenotry_id: 2, item_name: 'item2', cost: 1.5, qtySold: 20 },
        ]},
        { id: 2, name: 'RecipeItems', 
          headers: ["ID", "Item Name", "Inventory ID", "Menu ID", "Amount Used"],
          tableData: [
            { inventory_id: 1, item_name: 'item', inventoryID: 9, menuID: 1, amt_used: 1 },
            { invenotry_id: 2, item_name: 'item2', invenotryID: 1, menuID: 1, amt_used: 1 },
        ]},
        { id: 3, name: 'Orders', 
          headers: ["ID", "Item Name", "Menu ID", "Amount Used"],
          tableData: [
            { inventory_id: 1, item_name: 'person1', menuID: 1, amt_used: 1 },
            { invenotry_id: 2, item_name: 'person2', menuID: 1, amt_used: 1 },
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
