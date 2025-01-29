/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        post_category: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getPost() {
        try {
            const response = await fetch(`/api/posts/${id}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch post');
            }

            setFormData({
                title: data.title,
                content: data.content,
                post_category: data.post_category,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update post');
            }

            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    if (loading && !formData.title) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="posts-form">
            <h1>Update post</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleUpdate}>
                <input type="text" name="title"  placeholder="Title"  className="posts-title"  value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <textarea  name="content"  cols="30"  rows="10" placeholder="Post content" className="posts-content" value={formData.content} 
                    onChange={(e) => setFormData({...formData, content: e.target.value})}></textarea>
                <select name="post_category" className="posts-category" value={formData.post_category} onChange={(e) => setFormData({...formData, post_category: e.target.value})}>
                    <option value="SPORTS">Sports</option>
                    <option value="ECONOMY">Economy</option>
                    <option value="RELIGION">Religion</option>
                </select>
                <button type="submit" className="create-btn" disabled={loading}>{loading ? 'Updating...' : 'Update post'}</button>
            </form>
        </div>
    );
}