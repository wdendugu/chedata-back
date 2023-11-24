import Layout from '@/components/Layout';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import TutorTable from '@/components/TutorTable';

export default function Tutors() {
    const [tutors, setTutors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get('/api/tutors')
            .then((response) => setTutors(response.data), setIsLoading(false));
    }, []);

    return (
        <Layout>
            <div>
                <h1>Profesores</h1>
                <Button variant="contained" size="small">
                    <Link href={'/tutors/new'}>Agregar Profesor</Link>
                </Button>
                <TutorTable data={tutors} />
            </div>
        </Layout>
    );
}
