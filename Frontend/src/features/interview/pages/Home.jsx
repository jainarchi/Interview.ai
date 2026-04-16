import React, { useState, useRef , useEffect } from 'react'
import "../styles/home.scss"
import { useInterview } from '../hooks/useInterview.jsx'
import { useNavigate } from 'react-router'
import { validateInterviewForm } from '../validators/interview.validator'
import { set } from 'zod'

const Home = () => {

    const { loading, handleGenerateReport , handleGetAllReports, handleDeleteReport, reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ resumeFile , setResumeFile ] = useState(null)
    const [ errors, setErrors ] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
       handleGetAllReports()
    
    }, [])
    

    const generateReport = async () => {
        console.log(resumeFile)
        
        const validation = validateInterviewForm({
            jobDescription,
            selfDescription,
            resumeFile
        })

        if (!validation.success) {
            setErrors(validation.errors)
            // console.error("Validation errors:", validation.errors)
            return
        }

        setErrors({})
        setJobDescription("")
        setSelfDescription("")
        setResumeFile(null)
        const newReport = await handleGenerateReport({ jobDescription, selfDescription, resumeFile })

        // console.log(newReport)
        const url = `/interview/${newReport._id}`
        navigate(`${url}`)
    }
   
    

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className='home-page'>

            {/* Page Header */}
            <header className='page-header'>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>{jobDescription.length} / 2000 chars</div>
                        {errors.jobDescription && <div className='error-message'>{errors.jobDescription}</div>}
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            <label className='dropzone' htmlFor='resume'>
                                <span className='dropzone__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                             
                                
                                <p className='dropzone__title'>{ resumeFile ? resumeFile.name : 'Click to upload or drag &amp; drop'}</p>
                                <p className='dropzone__subtitle'>PDF or DOCX (Max 3MB)</p>
                                <input 
                                // ref={resumeInputRef}
                                 hidden 
                                 type='file' 
                                 id='resume' 
                                 name='resume' 
                                 accept='.pdf,.docx'
                                 onChange={(e) => setResumeFile(e.target.files[0])}
                                 />
                            </label>
                            {errors.resumeFile && <div className='error-message'>{errors.resumeFile}</div>}
                        </div>

                       
                        <hr  className='hr'/>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <div  className='panel__header' >
                            <label className='section-label' htmlFor='selfDescription'>Self-Description</label>
                            <span className='badge badge--required'>Required</span>
                            </div>

                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                            <div className='char-counter'>{selfDescription.length} / 300 chars</div>
                            {errors.selfDescription && <div className='error-message'>{errors.selfDescription}</div>}
                        </div>

                     
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>AI-Powered Strategy Generation • Approx 30s</span>
                    <button
                        onClick={generateReport}
                        className='btn-generate'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>

                                <div className="head">
                                  <h3>{report.title || 'Untitled Position'}</h3>
                                  <span className='trash-btn' 
                                  onClick={(e) =>{
                                    e.stopPropagation();
                                    handleDeleteReport(report._id)
                                    }}>
                                        Trash
                                    </span>
                                </div>

                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>

                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Page Footer */}
            <footer className='page-footer'>
              <p> AI-generated insights may include hallucinations or incorrect information. Please review carefully before using in interviews or decisions.</p>
            </footer>
        </div>
    )
}

export default Home