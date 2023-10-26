import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Nombre', width: 130 },
    { field: 'lastName', headerName: 'Apellido', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'phone', headerName: 'Telefono', width: 130 },
    { field: 'nationality', headerName: 'Pais', width: 130 },
    { field: 'registerDate', headerName: 'Fecha de registro', width: 130 },
];

export default function DataTable({ rows }) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
