import React, { useEffect, useState } from 'react';
import {
    GetOrdersTable, GetExcessReport, GetSalesReport, GetRestockReport, GetSoldTogether,
    GetXReport, GetZReport, GetSoldItem
, CreateZReport} from './pages/databaseFunctions';
import './Reports.css';
import { Button } from './Button';


/**
    * Reports component to display various reports
    * @return {JSX.Element} JSX element
*/
const Reports = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [newAttribute, setNewAttribute] = useState('');
    const [startDate, setStartDate] = useState('2020-01-01');
    const [endDate, setEndDate] = useState('2025-01-01');
    const [reportID, setReportID] = useState(1);
    const [orderID, setOrderID] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const restockData = GetRestockReport();

    const handleNewAttributeChange = (event) => {
        // update the new attribute state
        const { name, value } = event.target;
        setNewAttribute(prevState => ({ ...prevState, [name]: value }));
        console.log(newAttribute);
    };

    const handleKeyPress = (event) => {
        const { name, value } = event.target;
        if (event.key === "Enter") {
            if (name === 'startDate'){
                setStartDate(value);
            }else if(name === 'endDate'){
                setEndDate(value);
            }else if(name === 'reportID'){
                setReportID(parseInt(value));
            }else if(name === 'orderID'){
                setOrderID(parseInt(value));
            }
        }
    };

    const handlePopulateTable = (event) => {
        // update the new attribute state
        console.log(newAttribute);
        if(newAttribute['startDate']){setStartDate(newAttribute['startDate']);}
        if (newAttribute['endDate']){setEndDate(newAttribute['endDate']);}
        if (newAttribute['reportID']){setReportID(parseInt(newAttribute['reportID']));}
        if (newAttribute['orderID']){setOrderID(parseInt(newAttribute['orderID']));}
        setIsSubmitted(true);
    };

    const handleCreateReport = (event) => {
        // update the new attribute state
        console.log("Create Z Report");
        CreateZReport();
    };

    /**
     * Formats the order data into the desired format for display in the table
     * @param {Object[]} row - Order data object
     * @param {number} row[].order_id - Order ID
     * @param {Date} row[].date_ordered - Date of order
     * @param {number} row[].order_cost - Cost of order
     * @return {Object[]} Formatted order data object
     */
    const formattedOrderData = (GetOrdersTable(startDate, endDate)).map((row) => {
        return {
            order_id: row.order_id,
            date_ordered: new Date(row.date_ordered).toLocaleDateString(), // use the desired date format here
            order_cost: row.order_cost
        };
    });

    const formattedXReportData = (GetXReport()).map((row) => {
        return {
            report_id: row.report_id,
            last_order_id: row.last_order_id,
            zreport_date: new Date(row.zreport_date).toLocaleDateString(),
            report_total_cost: row.report_total_cost,
        };
    });

    const tabs = [
        {
            id: 0, name: 'Orders',
            headers: ["ID", "Date", "Cost"],
            tableData: formattedOrderData
        },
        {
            id: 1, name: 'Order Items',
            headers: ["ID", "Menu ID", "Order ID", "Inventory ID", "Quantity"],
            tableData: GetSoldItem(orderID)
        },
        {
            id: 2, name: 'Sales Report',
            headers: ["ID", "Item Name", "Quantity"],
            tableData: GetSalesReport(startDate, endDate)
        },
        {
            id: 3, name: 'Excess Report',
            headers: ["Inventory ID", "Item Name", "Amount Used", "Total Amount Used"],
            tableData: GetExcessReport(startDate, endDate)
        },
        {
            id: 4, name: 'Sold Together',
            headers: ["ID", "Item 1", "Item 2", "# of Times Sold Together"],
            tableData: GetSoldTogether(startDate, endDate)
        },
        {
            id: 5, name: 'Restock Report',
            headers: ["ID", "Item Name", "Cost", "Quantity"],
            tableData: restockData
        },
        { id: 6, name: 'Reports',
          headers: ["Report ID", "Last Order ID", "ZReport Date", "Total Cost"],
          tableData: formattedXReportData
        },
        { id: 7, name: 'X/Z Reports',
          headers: ["Report ID", "XReport ID", "Menu Item", "Quantity"],
          tableData: GetZReport(reportID)
        },
    ];

    /**
     * Handles the click on a tab
     * @param {number} tabIndex - Index of the clicked tab
     * @return {void}
     */
    const handleClick = (tabIndex) => {
        setActiveTab(tabIndex);
        setIsSubmitted(false);
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
                            <div key={tab.id} style={{ display: activeTab === tab.id ? 'block' : 'none' }}>\
                                <div>
                                    {/* Ask for date only for orders, sales, excess, and sold together tables */}
                                    <div style={{ display: activeTab === 0 || activeTab === 2 || activeTab === 3 || activeTab === 4 ? 'inline-block' : 'none', margin: '10px' }}>
                                        <input
                                            className="footer-input yt"
                                            type="text"
                                            placeholder='Start Date YYYY-MM-DD'
                                            value={newAttribute['startDate']} // set default value to header name
                                            name={'startDate'}
                                            onChange={handleNewAttributeChange}
                                            onKeyDown={(event) => handleKeyPress(event)}
                                        />
                                        <input
                                            type="text"
                                            className="footer-input yt"
                                            placeholder='End Date YYYY-MM-DD'
                                            value={newAttribute['endDate']} // set default value to header name
                                            name={'endDate'}
                                            onChange={handleNewAttributeChange}
                                            onKeyDown={(event) => handleKeyPress(event)}
                                        />
                                    </div>
                                    {/* Ask for report ID for the Zreports */}
                                    <div style={{ display: activeTab === 7 ? 'inline-block' : 'none', margin: '10px' }}>
                                        <input
                                            className="footer-input yt"
                                            placeholder='Report ID'
                                            type="text"
                                            value={newAttribute['reportID']} // set default value to header name
                                            name={'reportID'}
                                            onChange={handleNewAttributeChange}
                                            onKeyDown={(event) => handleKeyPress(event)}
                                        />
                                    </div>
                                    {/* Ask for order ID for the Item_Sold */}
                                    <div style={{ display: activeTab === 1 ? 'inline-block' : 'none', margin: '10px' }}>
                                        <input
                                            className="footer-input yt"
                                            placeholder='Order ID'
                                            type="text"
                                            value={newAttribute['orderID']} // set default value to header name
                                            name={'orderID'}
                                            onChange={handleNewAttributeChange}
                                            onKeyDown={(event) => handleKeyPress(event)}
                                        />
                                    </div>
                                    {/* Display Button except on the XReport and Restock Tabs */}
                                <div style={{ display: activeTab !== 5 && activeTab !== 6 ? 'inline-block' : 'none', margin: '10px', border: '5px' }}>
                                        <Button buttonStyle='btn--third' onClick={handlePopulateTable}>Submit</Button>
                                    </div>
                                    {/* Display Button only in the Z Report Tab */}
                                <div style={{ display: activeTab === 7 ? 'inline-block' : 'none', margin: '10px', border: '5px' }}>
                                    <Button buttonStyle = 'btn--third' onClick={handleCreateReport}>Create Z Report</Button>
                                </div>
                                {(isSubmitted || activeTab === 5 || activeTab === 6) &&
                                        <table>
                                            <thead>
                                                <tr>
                                                    {tab.headers.map((header) => (
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
                                                ))
                                                }
                                            </tbody>
                                        </table>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}


export default Reports;
