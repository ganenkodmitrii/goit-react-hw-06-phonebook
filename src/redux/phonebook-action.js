import { v4 as uuidv4 } from 'uuid';
import types from './phonebook-types';

export const addContact = (name, number) => ({
    type: types.ADD,
    payload: {
        id: uuidv4(),
        name,
        number,
    },
});

export const deleteContact = contactId => ({
    type: types.DELETE,
    payload: contactId,
});

export const changeFilter = value => ({
    type: types.CHANGE_FILTER,
    payload: value,
});
