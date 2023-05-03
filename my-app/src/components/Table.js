import React, { useEffect, useState } from 'react';
import { GetInventoryTable, GetRecipesTable, GetMenuTable, GetEmployeeTable, UpdateInventoryTable, UpdateMenuTable, UpdateRecipesTable, UpdateEmployeeTable,
          AddInventoryItem, AddMenuItem, AddRecipesItem, AddEmployeeItem, DeleteInventoryItem, DeleteMenuItem, DeleteRecipesItem, DeleteEmployeeItem } from './pages/databaseFunctions';
import './Table.css';
import { Button } from './Button';

/**
 * @typedef {Object} TableInfoProps
 * @property {string[]} headers - an array of strings representing the table headers
 * @property {Object[]} tableData - an array of objects representing the data in the table
 * @property {number} id - an integer representing the id of the table
 */

/**
 * TableInfo component that displays a table with editable cells and buttons for adding and deleting data.
 * @param {TableInfoProps} props - props passed to the component
 * @returns {JSX.Element} JSX element representing the TableInfo component
 */
function TableInfo(props) {
  const [tableData, setTableData] = useState([props.tableData]);
  const [newAttribute, setNewAttribute] = useState('');
  const tab_id = props.id;

  useEffect(() => {
    setTableData(props.tableData);
  }, [props.tableData]);

  /**
   * Function that handles the input change in the table cells
   * @param {React.ChangeEvent<HTMLInputElement>} event - event that triggered the function
   */
  const handleInputChange = (event) => {
    // update the state based on user input
    const newData = [...tableData];
    newData[event.target.dataset.row][event.target.dataset.field] = event.target.value;
    setTableData(newData);
    //console.log("change");
  };

  /**
   * Function that handles the change in the new attribute input fields
   * @param {React.ChangeEvent<HTMLInputElement>} event - event that triggered the function
   */
  const handleNewAttributeChange = (event) => {
    // update the new attribute state
    const { name, value } = event.target;
    setNewAttribute(prevState => ({ ...prevState, [name]: value }));
    console.log(newAttribute);
  };

  /**
   * Function that handles the add attribute button click
   * @param {React.MouseEvent<HTMLButtonElement>} event - event that triggered the function
   */
  const handleAddAttribute = (event) => {
    // update the state based on user input
    console.log(newAttribute);
    if (tab_id === 0) {
      const name = newAttribute['Item Name'];
      const cost = parseFloat(newAttribute['Cost']);
      const quantity = parseInt(newAttribute['Quantity']);
      //console.log(name, cost, quantity);
      AddInventoryItem(name, cost, quantity);
    } else if (tab_id === 1) {
      const name = newAttribute['Item Name'];
      const cost = parseFloat(newAttribute['Cost']);
      //console.log(name, cost);
      AddMenuItem(name, cost);
    } else if (tab_id === 2) {
      const name = newAttribute['Item Name'];
      const invID = parseInt(newAttribute['Inventory ID']);
      const menuID = parseInt(newAttribute['Menu ID']);
      const quantity = parseInt(newAttribute['Amount Used']);
      AddRecipesItem(name, invID, menuID, quantity);
    } else if (tab_id === 3) {
      const name = newAttribute['Employee Name'];
      const email = newAttribute['Email'];
      const pwd = newAttribute['Password'];
      const ismang = Boolean(newAttribute['Is Manager?']);
      AddEmployeeItem(name, email, pwd, ismang);
    }
    setNewAttribute({});
  };

  /**
   * Function that handles the delete attribute button click
   * @param {React.MouseEvent<HTMLButtonElement>} event - event that triggered the function
   */
  const handleDeleteAttribute = (event) => {
    // update the state based on user input
    if(tab_id === 0){
      const ID = newAttribute['Inventory ID'];
      console.log(ID);
      DeleteInventoryItem(ID);
    } else if (tab_id === 1){
      const ID = newAttribute['Menu ID'];
      console.log(ID);
      DeleteMenuItem(ID);
    } else if(tab_id === 2){
      const ID = newAttribute['Recipe ID'];
      console.log(ID);
      DeleteRecipesItem(ID);
    } else if(tab_id === 3){
      const ID = newAttribute['Employee ID'];
      console.log(ID);
      DeleteEmployeeItem(ID);
    }
    setNewAttribute({});
  };

  /**
   * Handles the key press event and triggers the desired action if the Enter key is pressed.
   *
   * @param {Event} event - The event object for the key press event.
   * @param {Object} data - An object containing the data necessary to perform the desired action.
   * @param {number} data.inventory_id - The ID of the inventory item to update (if applicable).
   * @param {string} data.inventory_item_name - The name of the inventory item to update (if applicable).
   * @param {number} data.inventory_item_cost - The cost of the inventory item to update (if applicable).
   * @param {number} data.inventory_item_quantity - The quantity of the inventory item to update (if applicable).
   * @param {number} data.menu_item_id - The ID of the menu item to update (if applicable).
   * @param {string} data.menu_item_name - The name of the menu item to update (if applicable).
   * @param {number} data.menu_item_cost - The cost of the menu item to update (if applicable).
   * @param {number} data.recipe_id - The ID of the recipe to update (if applicable).
   * @param {string} data.recipe_item_name - The name of the recipe item to update (if applicable).
   * @param {number} data.inventory_id - The ID of the inventory item used in the recipe (if applicable).
   * @param {number} data.menu_id - The ID of the menu item associated with the recipe (if applicable).
   * @param {number} data.amt_used - The amount of the inventory item used in the recipe (if applicable).
   */
  const handleKeyPress = (event, data) => {
    if (event.key === "Enter") {
      // trigger the desired action
      console.log("pressed Enter", data, tab_id);
      if(tab_id === 0){
        UpdateInventoryTable(data['inventory_id'], data['inventory_item_name'], data['inventory_item_cost'], data['inventory_item_quantity']);
      }else if(tab_id === 1){
        UpdateMenuTable(data['menu_item_id'], data['menu_item_name'], data['menu_item_cost']);
      }else if(tab_id === 2){
        UpdateRecipesTable(data['recipe_id'], data['recipe_item_name'], data['inventory_id'], data['menu_id'], data['amt_used']);
      }else if(tab_id === 3){
        UpdateEmployeeTable(data['employee_id'], data['employee_name'], data['email'], data['password'], data['is_manager']);
      }
    }
  };

  return (
    <div>
      {props.headers.map((header) =>(
        <div key={header} style={{ display: 'inline-block', margin: '10px' }}>
          <input
          className="footer-input yt"
            type="text"
            value={newAttribute[header]} // set default value to header name
            placeholder={header}
            name={header}
            onChange={handleNewAttributeChange}
          />
        </div>
      ))}
      <div style={{ display: 'inline-block', margin: '10px', border: '5px' }}>
          <Button buttonStyle = 'btn--third' onClick={handleAddAttribute}>Add Attribute</Button>
          <Button buttonStyle = 'btn--third' onClick={handleDeleteAttribute}>Delete</Button>
      </div>
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
  const employeeData = GetEmployeeTable();

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
    { id: 3, name: 'Employees',
      headers: ["Employee ID", "Employee Name", "Email", "Password", "Is Manager?"],
      tableData: employeeData
    },
  ];

  const handleClick = (tabIndex) => {
    setActiveTab(tabIndex);
  }

  return (        //The container that would show all the tables
    <React.Fragment>
    <div className='container'>
      <div className='table-tabb'>
        <div className='one-tab' style={{ display: 'flex' }}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => handleClick(tab.id)}
              style={{
                  backgroundColor: activeTab === tab.id ? 'rgb(249, 187, 18)' : 'rgba(92,0,32,255)',
                  color: 'white',
                  padding: '10px',
                  cursor: 'pointer',
                  border: '1px solid whitesmoke',
              }}
            >
              {tab.name}
            </div>
          ))}
        </div>
        <div>
          {tabs.map((tab) => (
            <div key={tab.id} style={{ display: activeTab === tab.id ? 'block' : 'none'}}>
            <TableInfo tableData={tab.tableData} headers={tab.headers} id={tab.id}/>
            </div>
          ))}
        </div>
      </div>
    </div>
    </React.Fragment>
  )
}


export default Table;
