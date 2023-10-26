import Layout from '@/components/Layout';
import LeadTable from '@/components/LeadTable';
import { useState, useEffect } from 'react';
import axios from 'axios';

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Leads() {
    const [leads, setLeads] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        setIsLoading(true);
        axios
            .get('/api/leads')
            .then((response) => {
                let idCounter = 1;
                const formattedLeads = response.data.map((lead) => ({
                    id: idCounter++,
                    firstName: lead.firstName,
                    lastName: lead.lastName,
                    email: lead.email,
                    phone: lead.phone,
                    nationality: lead.nationality,
                    registerDate: formatDate(lead.createdAt),
                }));
                setLeads(formattedLeads);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching leads:', error);
                setIsLoading(false);
            });
    }, []);

    console.log(leads);
    return (
        <Layout>
            <div>
                <h1>Leads</h1>
                <LeadTable rows={leads} />
            </div>
        </Layout>
    );
}
