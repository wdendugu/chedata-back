import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

export default function CourseTable({ data }) {
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Duracion</TableCell>
                        <TableCell align="right">Precio Arg</TableCell>
                        <TableCell align="right">Precio Ext</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.title}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{row.duration}</TableCell>
                            <TableCell align="right">{row.priceAr}</TableCell>
                            <TableCell align="right">{row.priceEx}</TableCell>
                            <TableCell align="right">
                                <Link href={'/courses/edit/' + row._id}>
                                    Edit
                                </Link>
                            </TableCell>
                            <TableCell align="right">
                                <Link href={'/courses/delete/' + row._id}>
                                    Delete
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
