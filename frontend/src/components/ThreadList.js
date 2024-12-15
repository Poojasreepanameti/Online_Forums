import React, { useEffect, useState } from 'react';
import { getThreads } from '../services/threadService';
import { Link } from 'react-router-dom';

const ThreadList = () => {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        const fetchThreads = async () => {
            const data = await getThreads();
            setThreads(data);
        };
        fetchThreads();
    }, []);

    return (
        <div>
            <h2>Forum Threads</h2>
            {threads.map(thread => (
                <div key={thread._id}>
                    <h3>
                        <Link to={`/threads/${thread._id}`}>{thread.title}</Link>
                    </h3>
                    <p>By: {thread.author?.username || 'Anonymous'}</p>
                </div>
            ))}
        </div>
    );
};

export default ThreadList;
