import React from 'react';
import PharmacyAddContainer from "../containers/PharmacyAddContainer.jsx";
import {useParams} from "react-router-dom";

const PharmacyAddPage = () => {
    const { userId } = useParams()
    return <PharmacyAddContainer userId={userId} />
};

export default PharmacyAddPage;