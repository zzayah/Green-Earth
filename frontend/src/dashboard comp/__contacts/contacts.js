import React, { useState, useEffect } from 'react';
import styles from './contacts.module.css';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleClickOutsideMenu = (e) => {
        if (showMenu && !e.target.closest(`.${styles.container}`)) {
            setShowMenu(false);
        }
    };

    // Add event listener to handle clicks outside the menu
    useEffect(() => {
        document.addEventListener('click', handleClickOutsideMenu);
        return () => {
            document.removeEventListener('click', handleClickOutsideMenu);
        };
    }, [showMenu]);

    const addContact = (e) => {
        e.preventDefault();
        if (name && phone && whatsapp) {
            setContacts([...contacts, { name, phone, whatsapp }]);
            setName('');
            setPhone('');
            setWhatsapp('');
        }
    };

    const handleClickInsideMenu = (e) => {
        e.stopPropagation(); // Prevent click from propagating to the button
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCollapseMenu = () => {
        setShowMenu(false);
    };

    const sortedContacts = contacts
        .filter(contact =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className={styles.container}>
            <button className={`${styles.toggleButton} ${showMenu ? styles.active : ''}`} onClick={toggleMenu}>
                {showMenu ? 'Hide Menu' : 'Show Menu'}
                {showMenu && (
                    <div className={styles.menuContent} onClick={handleClickInsideMenu}>
                        <form className={styles.form} onSubmit={addContact}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="WhatsApp"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                            />
                            <button className={styles.button} type="submit">Save</button>
                        </form>
                        <input
                            className={styles.search}
                            type="text"
                            placeholder="Search Contacts"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <ul className={styles.list}>
                            {sortedContacts.map((contact, index) => (
                                <li key={index} className={styles.listItem}>
                                    <div><strong>Name:</strong> {contact.name}</div>
                                    <div><strong>Phone:</strong> {contact.phone}</div>
                                    <div><strong>WhatsApp:</strong> {contact.whatsapp}</div>
                                </li>
                            ))}
                        </ul>
                        <button className={styles.collapseButton} onClick={handleCollapseMenu}>Collapse Menu</button>
                    </div>
                )}
            </button>
        </div>
    );
};

export default Contacts;
