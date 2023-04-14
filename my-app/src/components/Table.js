import React, { useState } from 'react';
import './Table.css';

const Table = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, name: 'Inventory', 
          headers: ["ID", "Item Name", "Cost", "Quantity"],
          tableData: [
            { id: 1, item_name: 'item', cost: 0.5, quantity: 5 },
            { id: 2, item_name: 'item2', cost: 1.5, quantity: 20 },
        ]},
        { id: 1, name: 'MenuItems', 
          headers: ["ID", "Item Name", "Item Cost", "Quantity Sold"],
          tableData: [
            { id: 1, item_name: 'item', cost: 0.5, qtySold: 5 },
            { id: 2, item_name: 'item2', cost: 1.5, qtySold: 20 },
        ]},
        { id: 2, name: 'RecipeItems', 
          headers: ["ID", "Item Name", "Inventory ID", "Menu ID", "Amount Used"],
          tableData: [
            { id: 1, item_name: 'item', inventoryID: 9, menuID: 1, amt_used: 1 },
            { id: 2, item_name: 'item2', invenotryID: 1, menuID: 1, amt_used: 1 },
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
                                backgroundColor: activeTab === tab.id ? 'rgb(249, 187, 18)' : 'maroon',
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
                                <thread>
                                    <tr>
                                        {tab.headers.map((header) =>(
                                            <th key={header}>{header}</th>
                                        ))}
                                    </tr>
                                </thread>
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
