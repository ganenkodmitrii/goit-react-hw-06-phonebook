import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@reduxjs/toolkit';
// import types from './phonebook-types';

export const addContact = createAction(
    'todos/add',
    function prepare(name, number) {
        return {
            payload: {
                id: uuidv4(),
                name,
                number,
            },
        };
    },
);

export const deleteContact = createAction('todos/delete');
export const changeFilter = createAction('todos/changeFilter');

// export const addContact = (name, number) => ({
//     type: types.ADD,
//     payload: {
//         id: uuidv4(),
//         name,
//         number,
//     },
// });

// export const deleteContact = contactId => ({
//     type: types.DELETE,
//     payload: contactId,
// });

// export const changeFilter = value => ({
//     type: types.CHANGE_FILTER,
//     payload: value,
// });
