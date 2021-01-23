import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import { useState } from 'react';

function ContactForm({ formSubmitHandler }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = e => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break;

            default:
                return;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        formSubmitHandler(name, number);
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="">
                <Typography variant="h6" gutterBottom>
                    Name
                </Typography>
                <TextField
                    label="Enter name"
                    variant="outlined"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="">
                <Typography variant="h6" gutterBottom>
                    Number
                </Typography>
                <TextField
                    label="Enter number"
                    variant="outlined"
                    type="text"
                    name="number"
                    value={number}
                    onChange={handleChange}
                />
            </label>

            <Button
                style={{
                    display: 'block',
                    marginTop: '10px',
                }}
                type="submit"
                variant="contained"
                color="primary"
            >
                Add contacts
            </Button>
        </form>
    );
}

ContactForm.propTypes = {
    formSubmitHandler: PropTypes.func.isRequired,
};

export default ContactForm;
