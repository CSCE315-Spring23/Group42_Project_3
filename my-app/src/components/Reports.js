import React, { useEffect, useState } from 'react';
import {GetOrdersTable, GetExcessReport, GetSalesReport, GetRestockReport, GetSoldTogether,
        GetXReport, GetZReport} from './pages/databaseFunctions';
import './Reports.css';

const Reports = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [newAttribute, setNewAttribute] = useState('');
    const [startDate, setStartDate] = useState('2020-01-01');
    const [endDate, setEndDate] = useState('2025-01-01');
    const [reportID, setReportID] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const xreportData = GetXReport();
    const restockData = GetRestockReport();
    //const zreportData = GetZReport(reportID);


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
            }
        }
    };

    const handlePopulateTable = (event) => {
        // update the new attribute state
        console.log(newAttribute);
        if(newAttribute){
            setStartDate(newAttribute['startDate']);
            setEndDate(newAttribute['endDate']);
            setReportID(parseInt(newAttribute['reportID']));
        }
        setIsSubmitted(true);
    };

    const formattedOrderData = (GetOrdersTable(startDate, endDate)).map((row) => {
        return {
          order_id: row.order_id,
          date_ordered: new Date(row.date_ordered).toLocaleDateString(), // use the desired date format here
          order_cost: row.order_cost
        };
    });

    const formattedXReportData = (GetXReport()).map((row) =>{
        return {
            report_id: row.report_id,
            last_order_id: row.last_order_id,
            zreport_date: new Date(row.zreport_date).toLocaleDateString(),
            report_total_cost: row.report_total_cost,
            is_zreport: row.is_zreport
        };
    });

    const tabs = [
        { id: 0, name: 'Orders',
          headers: ["ID", "Date", "Cost"],
          tableData: formattedOrderData
        },
        { id: 1, name: 'X Reports',
          headers: ["Report ID", "Last Order ID", "ZReport Date", "Total Cost", "Is Z Report?"],
          tableData: formattedXReportData
        },
        { id: 2, name: 'Z Reports',
          headers: ["Report ID", "XReport ID", "Menu Item", "Quantity"],
          tableData: GetZReport(2)
        },
        { id: 3, name: 'Restock Report',
          headers: ["ID", "Item Name", "Cost", "Quantity"],
          tableData: restockData
        },
        { id: 4, name: 'Sales Report',
          headers: ["ID", "Item Name", "Quantity"],
          tableData: GetSalesReport(startDate, endDate)
        },
        { id: 5, name: 'Excess Report',
          headers: ["Total Amount Used", "Inventory ID", "Item Name"],
          tableData: GetExcessReport(startDate, endDate)
        },
        { id: 6, name: 'Sold Together',
          headers: ["ID", "Item 1", "Item 2", "# of Times Sold Together"],
          tableData: GetSoldTogether(startDate, endDate)
        },
    ];


    const handleClick = (tabIndex) => {
        setActiveTab(tabIndex);
        setIsSubmitted(false);
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
                        <div key={tab.id} style={{ display: activeTab === tab.id ? 'block' : 'none'}}>\
                            <div>
                                <div style={{ display: activeTab === 0 || activeTab === 4 || activeTab === 5 || activeTab === 6 ? 'inline-block' : 'none', margin: '10px' }}>
                                    <input
                                        type="text"
                                        value={newAttribute['startDate'] || 'Start Date YYYY-MM-DD'} // set default value to header name
                                        name={'startDate'}
                                        onChange={handleNewAttributeChange}
                                        onKeyDown={(event) => handleKeyPress(event)}
                                    />
                                    <input
                                        type="text"
                                        value={newAttribute['endDate'] || 'End Date YYYY-MM-DD'} // set default value to header name
                                        name={'endDate'}
                                        onChange={handleNewAttributeChange}
                                        onKeyDown={(event) => handleKeyPress(event)}
                                    />
                                </div>
                                <div style={{ display: activeTab === 2 ? 'inline-block' : 'none', margin: '10px' }}>
                                    <input
                                        type="text"
                                        value={newAttribute['reportID']} // set default value to header name
                                        name={'reportID'}
                                        onChange={handleNewAttributeChange}
                                        onKeyDown={(event) => handleKeyPress(event)}
                                    />
                                </div>
                                <div style={{ display: activeTab !== 1 && activeTab !== 3 ? 'inline-block' : 'none', margin: '10px', border: '5px' }}>
                                    <button onClick={handlePopulateTable}>Submit</button>
                                </div>
                                {(isSubmitted || activeTab === 1 || activeTab === 3) &&
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
