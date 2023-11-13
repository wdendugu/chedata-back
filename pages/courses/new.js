import Layout from '@/components/Layout';
import CourseForm from '@/components/CourseForm';
import { Course } from '@/models/Course';

export default function NewCourse() {
    console.log(availableCourses)
    return (
        <Layout>
            <div>
                <h1>Nuevo Curso</h1>
                <CourseForm/>
            </div>
        </Layout>
    );
}

