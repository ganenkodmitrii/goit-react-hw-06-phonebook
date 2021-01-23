import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import {
    addContact,
    deleteContact,
    changeFilter,
} from './redux/phonebook-action';
import Container from './components/Container/Container';
import Section from './components/Section/Section';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

function App() {
    const contacts = useSelector(state => state.contacts.items);
    const filter = useSelector(state => state.contacts.filter);

    const dispatch = useDispatch();

    const handleSubmit = (name, number) => {
        const validationError = validateContact(name, number);
        if (validationError) {
            displayError(validationError);
        } else {
            dispatch(addContact(name, number));
        }
    };

    const handleDeleteContact = contactId => {
        dispatch(deleteContact(contactId));
    };

    const handleFilter = e => {
        dispatch(changeFilter(e.currentTarget.value));
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
                <Filter value={filter} onChange={handleFilter} />
                <ContactList
                    contacts={getVisibleContacts()}
                    onDeleteContact={handleDeleteContact}
                />
            </Section>
        </Container>
    );
}

export default App;
