import { TextField } from '@mui/material';

export function CustomTextField({ value, setValue }) {
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <TextField
            type="text"
            placeholder={value}
            value={value}
            onChange={handleChange}
            variant="outlined"
            size="small"
        />
    );
}

export function CustomNumField({ value, setValue }) {
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <TextField
            type="number"
            placeholder={value}
            value={value}
            onChange={handleChange}
            variant="outlined"
            size="small"
        />
    );
}
