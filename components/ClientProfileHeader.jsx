import React from 'react';
import {XCircle} from "phosphor-react";
import {useClients} from "@/contexts/ClientsContext";

export default function ClientProfileHeader({setEditing}) {
    const {selectedClient, setSelectedClient} = useClients();
    const getBGColor = (status) => {
        switch (status) {
            case "Active":
                return "bg-error text-error-content text-white";
            case "Inactive":
                return "bg-warning text-warning-content";
            case "In Progress":
                return "bg-success text-success-content";
            case "Graduated":
                return "bg-info text-info-content text-white";
            default:
                return "bg-primary text-primary-content";
        }
    }

    return (
        <div
            className={` h-16 font-extralight absolute flex justify-between items-center px-6 left-0 right-0 shadow-lg ${getBGColor(selectedClient.clientStatus)} text-accent-content`}>
            <div className={`w-4/5 flex justify-between gap-4 items-center`}>
                <div
                    className={`-mt-[4px] py-0 text-3xl`}>{selectedClient && !selectedClient.name ? selectedClient.first_name + " " + selectedClient.last_name : selectedClient.name}</div>
                <div><span className={`font-medium`}>Case: </span>{selectedClient && selectedClient.caseNumber}</div>
                <div><span className={`font-medium`}>Group: </span>{selectedClient && selectedClient.group}</div>
                <div><span className={`font-medium`}>FEP: </span>{selectedClient && selectedClient.fep}</div>
                <div><span className={`font-medium`}>Navigator: </span>{selectedClient && selectedClient?.navigator}</div>
                <div><span className={`py-[2px] px-3 rounded-full border font-normal text-sm $${selectedClient.clientStatus === "Active" || selectedClient.clientStatus === "Graduated" ? "border-white" : "border-black"}`}>{selectedClient && selectedClient.clientStatus}</span></div>
            </div>
            <div onClick={() => {
                setEditing(null)
                setSelectedClient(null)
            }}
                 className={``}>
                <XCircle size={33} color={selectedClient.clientStatus === "Active" || selectedClient.clientStatus === "Graduated" ? "white" : "black"}/>
            </div>
        </div>
    );
}
