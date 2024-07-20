import React from 'react';
import DoctorAddAgreementContainer from "../containers/DoctorAddAgreementContainer.jsx";
import {useParams} from "react-router-dom";

const DoctorAddAgreementPage = () => {
    const { userId } = useParams()
    return <DoctorAddAgreementContainer userId={userId} />
};

export default DoctorAddAgreementPage;