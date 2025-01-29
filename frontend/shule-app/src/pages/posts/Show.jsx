/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Show() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!id) return;
        fetchPost();
    }, []);

    async function fetchPost() {
        try {
            const response = await fetch(`/api/posts/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            const data = await response.json();
            setPost(data);
        } catch (error) {
            setError(error.message);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsDeleting(false);
        }
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!post) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="read-post">
            <div>
                <p>{post.post_category}</p>
            </div>
            <div className="post-single-content">
                <div className="post-header">
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </div>
                <div className="post-action">
                    <button className="edit-btn" onClick={() => navigate(`/posts/update/${id}`)}>
                        Update
                    </button>
                    <button className="delete-btn" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}