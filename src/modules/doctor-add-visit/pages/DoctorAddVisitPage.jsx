import React from 'react';
import DoctorAddVisitContainer from "../containers/DoctorAddVisitContainer.jsx";
import {useParams} from "react-router-dom";

const DoctorAddVisitPage = () => {
    const { userId } = useParams()
    return <DoctorAddVisitContainer userId={userId}/>
};

export default DoctorAddVisitPage;