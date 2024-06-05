import React, { useState, useEffect } from 'react';
import './toggle.css';
import 'font-awesome/css/font-awesome.min.css';

const ExpandableFab = ({ initialOpen = false, distance, children }) => {
    const [open, setOpen] = useState(initialOpen);

    useEffect(() => {
        setOpen(initialOpen);
    }, [initialOpen]);

    const toggle = () => {
        setOpen(!open);
    };

    const renderButtons = () => {
        const step = 180 / (children.length - 1);
        return children.map((child, index) => {
            const angle = 90 + step * index; // 225 degrees to start at the south-west
            const x = distance * Math.cos((angle * Math.PI) / 180);
            const y = distance * Math.sin((angle * Math.PI) / 180);
            return (
                <div
                    key={index}
                    className={`expanding-action-button ${open ? 'open' : ''}`}
                    style={{ left: `${x}px`, top: `${y}px` }}
                >
                    {child}
                </div>
            );
        });
    };


    return (
        <div className="expandable-fab">
            <div className="fab-container">
                <div className={`fab-button ${open ? 'visible' : ''}`} onClick={toggle}>
                    <i className={`fa fa-${open ? 'times' : 'plus'}`}></i>
                </div>
            </div>
            {renderButtons()}
        </div>
    );
};

export const ActionButton = ({ onClick, icon }) => {
    return (
        <button className="action-button" onClick={onClick}>
            {icon}
        </button>
    );
};

export default ExpandableFab;
