import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { useState, useEffect } from 'react';
import Container from './components/Container/Container';
import Section from './components/Section/Section';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
    const [contacts, setContacts] = useState(initialContacts);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);
        if (parsedContacts) {
            setContacts(parsedContacts);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const handleSubmit = (name, number) => {
        const validationError = validateContact(name, number);
        if (validationError) {
            displayError(validationError);
        } else {
            const contact = {
                id: uuidv4(),
                name,
                number,
            };
            setContacts(prevState => prevState.concat(contact));
        }
    };

    const deleteContact = contactId => {
        setContacts(prevState =>
            prevState.filter(contact => contact.id !== contactId),
        );
    };

    const changeFilter = e => {
        setFilter(e.currentTarget.value);
    };

    const getVisibleContacts = () => {
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter),
        );
    };

    const validateContact = (name, number) => {
        if (name === '' || number === '') {
            return 'Please add contact';
        }
        const existingContact = contacts.find(contact => contact.name === name);
        if (existingContact) {
            return `${name} is already in contacts!`;
        }
    };

    const displayError = error => {
        alert(error);
    };

    return (
        <Container>
            <Section title="Phonebook">
                <ContactForm formSubmitHandler={handleSubmit} />
            </Section>
            <Section title="Contacts">
                <Filter value={filter} onChange={changeFilter} />
                <ContactList
                    contacts={getVisibleContacts()}
                    onDeleteContact={deleteContact}
                />
            </Section>
        </Container>
    );
}
