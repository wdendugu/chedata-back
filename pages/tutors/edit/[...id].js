import Layout from '@/components/Layout';
import TutorForm from '@/components/TutorForm';
import { SpinnerCenter } from '@/components/Spinner';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditProductPage() {
    const [tutorInfo, setTutorInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        setIsLoading(true);
        axios
            .get('/api/tutors?id=' + id)
            .then(
                (response) => setTutorInfo(response.data),
                setIsLoading(false)
            );
    }, [id]);

    return (
        <Layout>
            <h1>Edit Product</h1>
            {isLoading && <SpinnerCenter />}
            {tutorInfo && <TutorForm {...tutorInfo} />}
        </Layout>
    );
}
