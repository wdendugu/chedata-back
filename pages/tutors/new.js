import Layout from '@/components/Layout';
import TutorForm from '@/components/TutorForm';

export default function NewTutor() {
    return (
        <Layout>
            <div>
                <h1>Nuevo Profesor</h1>
                <TutorForm />
            </div>
        </Layout>
    );
}
