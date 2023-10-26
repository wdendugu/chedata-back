import Layout from '@/components/Layout';
import CourseForm from '@/components/CourseForm';

export default function NewCourse() {
    return (
        <Layout>
            <div>
                <h1>Nuevo Curso</h1>
                <CourseForm />
            </div>
        </Layout>
    );
}
