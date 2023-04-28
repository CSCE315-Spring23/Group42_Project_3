import React, { useEffect, useState } from 'react';
import {GetInventoryTable, GetRecipesTable, GetMenuTable, UpdateInventoryTable} from './pages/databaseFunctions';
import './Table.css';

function TableInfo(props) {
  const [tableData, setTableData] = useState([props.tableData]);

  useEffect(() => {
    setTableData(props.tableData);
  }, [props.tableData]);

  function UpdateTable(data) {
    if(data.length){

    }
  }
  
  const handleInputChange = (event) => {
    // update the state based on user input
    const newData = [...tableData];
    newData[event.target.dataset.row][event.target.dataset.field] = event.target.value;
    setTableData(newData);
    console.log("change");
  }

  const handleKeyPress = (event, data) => {
    if (event.key === "Enter") {
      // trigger the desired action
      console.log("pressed Enter", data);
      UpdateInventoryTable(data['inventory_id'], data['inventory_item_name'], data['inventory_item_cost'], data['inventory_item_quantity']);
    }
  };

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
          {tableData.map((data, rowIndex) => (
            <tr key={data.id}>
              {Object.keys(data).map((key, colIndex) => (
                // Make the first column not an input
                <td key={key}>
                  {colIndex === 0 ? data[key] : (
                    <input
                    type="text"
                    value={data[key]}
                    onChange={handleInputChange}
                    onKeyDown={(event) => handleKeyPress(event, data)}
                    data-row={rowIndex}
                    data-field={key}
                    />
                  )}
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
  const inventoryData = GetInventoryTable(0,0);
  const recipeData = GetRecipesTable();
  const menuData = GetMenuTable();

  const tabs = [
    { id: 0, name: 'Inventory', 
      headers: ["Inventory ID", "Item Name", "Cost", "Quantity"],
      tableData: inventoryData
    },
    { id: 1, name: 'MenuItems', 
      headers: ["Menu ID", "Item Name", "Cost"],
      tableData: menuData
    },
    { id: 2, name: 'RecipeItems', 
      headers: ["Recipe ID", "Item Name", "Inventory ID", "Menu ID", "Amount Used"],
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
            <TableInfo tableData={tab.tableData} headers={tab.headers}/>
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
