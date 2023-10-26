import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function DeleteCoursePage() {
    const [courseInfo, setCourseInfo] = useState();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/courses?id=' + id).then((response) => {
            setCourseInfo(response.data);
        });
    }, [id]);

    function goBack() {
        router.push('/courses');
    }

    async function deleteProduct() {
        await axios.delete('/api/courses?id=' + id);
        goBack();
    }

    return (
        <Layout>
            <h1 className="text-center">
                Do you really want to delete `&ldquo;`{courseInfo?.name}
                `&ldquo;`?
            </h1>
            <div className="flex gap-2 justify-center">
                <button onClick={deleteProduct} className="btn-red">
                    Yes
                </button>
                <button onClick={goBack} className="btn-default">
                    No
                </button>
            </div>
        </Layout>
    );
}
