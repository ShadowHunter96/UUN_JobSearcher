import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


const ApplyToTechJob = () => {
    let { jobId } = useParams();
    let navigate = useNavigate();
    let numberId = parseInt(jobId);

    const [techJob, setTechJob] = useState(null);
    const [applicant, setApplicant] = useState({
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        selfDescription: "",
        linkedInUrl: "",
    });

    const { name, surname, email, phoneNumber, selfDescription, linkedInUrl } = applicant;

    const onInputChange = (e) => {
        setApplicant({ ...applicant, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        const fetchTechJob = async () => {
            console.log(jobId)
            
            try {
                const response = await axios.get(`http://localhost:8081/techJob/${numberId}`);
                setTechJob(response.data);
            } catch (error) {
                console.log("Error fetching tech job details:", error);
            }
        };

        fetchTechJob();
    }, [jobId]);

    


    const onSubmit = async (e) => {
        e.preventDefault();
        // ... (validace)

        if (!name || !surname || !email || !phoneNumber || !selfDescription) {
            alert("Please fill in all fields.");
            return;
        }

        const applicantToSave = {
            name,
            surname,
            email,
            phoneNumber,
            selfDescription,
            linkedInUrl,
        };


        try {
            // Uložení nového aplikanta
            const response = await axios.post("http://localhost:8081/applicant/save", applicantToSave);
            // Zde předpokládám, že response z backendu vrací ID nově vytvořeného aplikanta
            setTimeout(3000)
            const response2 = await axios.get(`http://localhost:8081/applicant/search/by-email?email=${applicant.email}`);
            console.log(response2)
            const applicantId = response2.data; // Zde přistupujeme k tělu odpovědi
            
            
            console.log(response);
            console.log(`Applicant ID: ${applicantId}, TechJob ID: ${jobId}`);

            
            // Propojení aplikanta s pracovní pozicí, pokud uložení bylo úspěšné
            if (applicantId) {
                try {
                  await axios.post(`http://localhost:8081/applicant/${applicantId}/apply/${jobId}`);
                  if (response.status === 201) { // Toto je potřeba přesunout
                    navigate("/successpage");
                  }
                } catch (error) {
                  console.error("Error:", error);
                }
              }
            if (response.status === 201) { // příklad pro stavový kód 201 Created
                navigate("/successpage");
            }
        } catch (error) {
            console.error("Error:", error);
            // Zpracování chyby, např. zobrazení zprávy uživateli
        }
    };

    return (

        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                {techJob ? (
                    <div>
                        <h2>Applying for: {techJob.name}</h2>
                        <p>{techJob.baitText}</p>
                        {/* Zde pokračuje formulář pro aplikanta */}
                    </div>
                ) : (
                    <p>Loading job details...</p>
                )}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">
                                Surname
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter surname"
                                name="surname"
                                value={surname}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter phone number"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="selfDescription" className="form-label">
                                Self Description
                            </label>
                            <textarea
                                className="form-control"
                                placeholder="Enter self description"
                                name="selfDescription"
                                value={selfDescription}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="linkedInUrl" className="form-label">
                                LinkedIn URL
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter LinkedIn URL"
                                name="linkedInUrl"
                                value={linkedInUrl}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link to="/" className="btn btn-outline-danger mx-2">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default ApplyToTechJob;
