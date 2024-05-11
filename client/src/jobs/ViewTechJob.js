import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ViewTechJob() {
    const [techJob, setTechJob] = useState({
        id: null,
        name: "",
        baitText: "",
        description: "",
        seniority: "",
        education: "",
        city: "",
        budget: 0,
        currency: "",
        company: null,
    });

    const { id } = useParams();

    useEffect(() => {
        loadTechJob();
    }, []);

    const loadTechJob = async () => {
        const result = await axios.get(`http://localhost:8081/techJob/${id}`);
        setTechJob(result.data);
        console.log(result.data);
    };
    console.log(techJob);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">


                    <div className="card">
                        <div className="card-header">
                            {/* Details of Tech Job id: {techJob.id} */}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Name: </b>
                                    {techJob.name}
                                </li>

                                <li className="list-group-item">
                                    <b>Bait Text: </b>
                                    {techJob.baitText}
                                </li>

                                <li className="list-group-item">
                                    <b>Description: </b>
                                    {techJob.description}
                                </li>

                                <li className="list-group-item">
                                    <b>Seniority: </b>
                                    {techJob.seniority}
                                </li>

                                <li className="list-group-item">
                                    <b>Education: </b>
                                    {techJob.education}
                                </li>

                                <li className="list-group-item">
                                    <b>City: </b>
                                    {techJob.city}
                                </li>

                                <li className="list-group-item">
                                    <b>Budget: </b>
                                    {techJob.budget} {techJob.currency}
                                </li>

                                <li className="list-group-item">
                                    <b>Company: </b>
                                    {techJob.company ? techJob.company.name : "N/A"}
                                </li>


                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2 " to={`/applytechjob/${techJob.id}`} style={{ marginRight: "10px" }}>
                        Apply
                    </Link>
                    <Link className="btn btn-primary my-2" to="/">
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
