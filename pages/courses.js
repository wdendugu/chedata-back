import Layout from '@/components/Layout';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SpinnerTable } from '../components/Spinner';
import { Button } from '@mui/material';
import CourseTable from '@/components/CourseTable';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get('/api/courses')
            .then((response) => setCourses(response.data), setIsLoading(false));
    }, []);

    return (
        <Layout>
            <div>
                <h1>Cursos</h1>
                <Button variant="contained" size="small">
                    <Link href={'/courses/new'}>Agregar curso</Link>
                </Button>
                <CourseTable data={courses} />
            </div>
        </Layout>
    );
}
