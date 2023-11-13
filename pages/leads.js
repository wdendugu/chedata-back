import Layout from '@/components/Layout';
import LeadTable from '@/components/LeadTable';
import { useState, useEffect } from 'react';
import axios from 'axios';

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

    return (
        <Layout>
            <div>
                <h1>Leads</h1>
                <LeadTable rows={leads} />
            </div>
        </Layout>
    );
}
