import React, { useState } from 'react';

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState('');

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

    return (
        <div  style={{width: '80%', marginLeft: '9%', marginRight: '12%'} }>
            <form onSubmit={handleSubmit}>
                <h2>Leave feedback</h2>
                <textarea 
                    className='border-black border-2'
                    value={feedback} 
                    onChange={handleChange} 
                    required
                    style={{width: '100%', minHeight: '200px'}}
                />
                 <div style={{textAlign: 'right'}}>
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
                        }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FeedbackForm;
