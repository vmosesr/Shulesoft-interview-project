import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getPosts() {
        try {
            setIsLoading(true);
            setError(null);
            const res = await fetch("/api/posts");
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to fetch posts');
            }

            setPosts(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching posts:', err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (isLoading) {
        return <div className="loading">Loading posts...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="home-page">
            <div className="home-headers">
                <div className="home-links">
                    <Link to="/create" className="create-link">Create new</Link>
                </div>
                <div className="home-links">
                    <input type="text" placeholder="Search by title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input" />
                    {searchTerm && filteredPosts.length > 0 && (
                        <ul className="search-suggestions">
                            {filteredPosts.map(post => (
                                <li key={post.id}>
                                    <Link to={`/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="posts-table">
                <div className="posts-header">
                    <p>Blog posts</p>
                </div>

                {filteredPosts.length > 0 ? (
                    <ul className="posts-list">
                        {filteredPosts.map(post => (
                            <li key={post.id} className="post-item">
                                <div className="post-content">
                                    <h2 className="post-title">{post.title}</h2>
                                    <p className="read-more-content">
                                        {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                                    </p>
                                    <div className="read-more-btn">
                                        <Link to={`/posts/${post.id}`} className="read-more-btn">Read more</Link>
                                    </div>
                                </div>
                                <div className="post-author"><p><i>Shulesoft</i></p></div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-posts">
                        {searchTerm ? 'No posts found matching your search' : 'No posts available'}
                    </p>
                )}
            </div>
        </div>
    );
}