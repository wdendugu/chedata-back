import Layout from '@/components/Layout';
import CourseForm from '@/components/CourseForm';
import { SpinnerCenter } from '@/components/Spinner';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditProductPage() {
    const [courseInfo, setCourseInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        setIsLoading(true);
        axios
            .get('/api/courses?id=' + id)
            .then(
                (response) => setCourseInfo(response.data),
                setIsLoading(false)
            );
    }, [id]);

    return (
        <Layout>
            <h1>Edit Product</h1>
            {isLoading && <SpinnerCenter />}
            {courseInfo && <CourseForm {...courseInfo} />}
        </Layout>
    );
}
