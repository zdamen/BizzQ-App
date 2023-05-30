import React, { useState, useEffect } from 'react';

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState('');
    const [displayFeedback, setDisplayFeedback] = useState(null);

    const handleChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/submitFeedback', {
            method: 'POST',
            body: JSON.stringify({ feedback }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Feedback submitted!');
            setFeedback('');
            
        } else {
            alert('An error occurred while submitting feedback.');
        }
    };
    
    const handleClick = async () => {
        const res = await fetch('/api/getFeedback');
        const data = await res.json();
        setDisplayFeedback(data.feedback);
    };

    return (
        <div style={{width: '80%', marginLeft: '9%', marginRight: '12%'} }>
            <form onSubmit={handleSubmit}>
                <h2>Leave feedback</h2>
                <textarea 
                    className='border-black border-2'
                    value={feedback} 
                    onChange={handleChange} 
                    required
                    style={{width: '100%', minHeight: '200px'}}
                />
                <div  style={{textAlign: 'right'}}>
                    <button 
                        type="submit" 
                        style={{
                            backgroundColor: '#007BFF', 
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '1em',
                            cursor: 'pointer',
                            marginTop: '10px',
                            marginRight: '10px',
                        }}
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className='text-right'>
            <button 
                        onClick={handleClick}
                        style={{
                            backgroundColor: '#007BFF', 
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '1em',
                            cursor: 'pointer',
                            marginTop: '10px',
                        }}
                    >
                        Get Latest Feedback
                    </button>
                    <div className='text-center'>
                    {displayFeedback && <p className='text-3xl'> Latest Feedback: {displayFeedback}</p>}
                    </div>
            
            </div>
        </div>
    );
};

export default FeedbackForm;
