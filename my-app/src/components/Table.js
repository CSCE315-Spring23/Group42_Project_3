import React, { useState } from 'react';
import './Table.css';

const Table = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, name: 'Inventory', tableData: [
            { id: 1, item_name: 'item', cost: 0.5, quantity: 5 },
            { id: 2, item_name: 'item2', cost: 1.5, quantity: 20 },
        ]},
        { id: 1, name: 'MenuItems', tableData: [
            { id: 1, item_name: 'item', cost: 0.5, quantity: 5 },
            { id: 2, item_name: 'item2', cost: 1.5, quantity: 20 },
        ]}
    ]
}

const handleClick = (tabIndex) => {
    setActiveTab(tabIndex);
}

return (
    <div> //The container that would show all the tables
        <div> //Divide every single tab
            {tabs.map((tab) => (
                <div
                    key = {tab.id}
                    onClick={() => handleClick(tab.id)}
                >
                    {tab.name}
                </div>
            ))}
        </div>

    </div>
)

export default Table;
