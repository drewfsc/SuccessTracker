import React from 'react';
import {useClients} from "@/contexts/ClientsContext";

export default function ClientTable({clients}) {
    const { selectedClient, setSelectedClient } = useClients();

    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>FEP</th>
                    <th>Navigator</th>
                    <th>Last Activity</th>
                </tr>
                </thead>
                <tbody>
                {
                    clients.map(client => (
                        <tr key={client._id} className={`hover:bg-base-200 cursor-pointer ${selectedClient?._id === client._id ? 'bg-primary text-primary-content' : ''}`} onClick={() => setSelectedClient(client)}>
                            <th>{client.name}</th>
                            <td>{client.email}</td>
                            <td>{client.contactPhone}</td>
                            <td>{client.fep}</td>
                            <td>{client.fep}</td>
                            <td>{client.latestInteraction}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}
