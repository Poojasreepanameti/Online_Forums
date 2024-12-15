import React, { useState } from 'react';
import { createThread } from '../services/threadService';

const CreateThread = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newThread = { title, content, author };
            await createThread(newThread);
            alert('Thread created successfully!');
            setTitle('');
            setContent('');
            setAuthor('');
        } catch (error) {
            console.error('Error creating thread:', error.message);
        }
    };

    return (
        <div>
            <h2>Create New Thread</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div>
                    <label>Author:</label>
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <button type="submit">Create Thread</button>
            </form>
        </div>
    );
};

export default CreateThread;
