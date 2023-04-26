import React, { useState } from 'react';
import {GetInventoryList, GetRecipesList, GetMenuTable} from './pages/databaseFunctions';
import './Table.css';

function TableInfo(props) {
    const [tableData, setTableData] = useState(props.tableData);

    const handleInputChange = (event) => {
        // update the state based on user input
        const newData = [...tableData];
        newData[event.target.dataset.row][event.target.dataset.field] = event.target.value;
        setTableData(newData);
    }

    return (
        <div>
          <table>
            <thead>
              <tr>
                {props.headers.map((header) =>(
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.tableData.map((data, rowIndex) => (
                <tr key={data.id}>
                  {Object.keys(data).map((key, colIndex) => (
                    <td key={key}>
                      <input
                        type="text"
                        value={data[key]}
                        onChange={handleInputChange}
                        data-row={rowIndex}
                        data-field={key}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}

const Table = () => {
    const [activeTab, setActiveTab] = useState(0);
    const inventoryData = GetInventoryList(0,0);
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
                        <TableInfo headers={tab.headers} tableData={tab.tableData} />
                            {/* <table>
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
                                
                            </table> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>    
        </React.Fragment>    
    )
}


export default Table;
