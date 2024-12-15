import React, { useEffect, useState } from 'react';
import { replyToThread } from '../services/threadService';

import axios from 'axios';
import { useParams } from 'react-router-dom';


const ThreadView = () => {
    const { id } = useParams();
    const [thread, setThread] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [replyAuthor, setReplyAuthor] = useState('');

    useEffect(() => {
        const fetchThread = async () => {
            const response = await axios.get(`http://localhost:5000/api/threads/${id}`);
            setThread(response.data);
        };
        fetchThread();
    }, [id]);

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            const reply = { content: replyContent, author: replyAuthor };
            const updatedThread = await replyToThread(id, reply);
            setThread(updatedThread);
            setReplyContent('');
            setReplyAuthor('');
        } catch (error) {
            console.error('Error posting reply:', error.message);
        }
    };

    return (
        <div>
            {thread && (
                <>
                    <h2>{thread.title}</h2>
                    <p>{thread.content}</p>
                    <h3>Replies:</h3>
                    {thread.replies.map((reply, index) => (
                        <div key={index}>
                            <p>{reply.content}</p>
                            <small>By: {reply.author || 'Anonymous'}</small>
                        </div>
                    ))}
                </>
            )}
            <form onSubmit={handleReplySubmit}>
                <h3>Post a Reply</h3>
                <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} required />
                <input
                    type="text"
                    placeholder="Your name"
                    value={replyAuthor}
                    onChange={(e) => setReplyAuthor(e.target.value)}
                    required
                />
                <button type="submit">Reply</button>
            </form>
        </div>
    );
};

export default ThreadView;
