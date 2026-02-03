import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaBell, FaWallet, FaUserCircle } from 'react-icons/fa';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

const Feed = ({ user, logout }) => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('All Post');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const filters = ['All Post', 'Most Liked', 'Most Commented', 'Most Shared'];

    return (
        <div className="app-container">
            {/* Header */}
            <div className="feed-header">
                <div className="header-title">Social</div>
                <div className="header-icons">
                    <FaBell size={24} color="#777" />
                    <FaUserCircle size={24} color="#007bff" onClick={logout} style={{ cursor: 'pointer' }} title="Logout" />
                </div>
            </div>

            {/* Search */}
            <div className="search-container">
                <div className="search-bar">

                    <input type="text" placeholder="Search promotions, users, posts..." style={{ background: 'transparent', border: 'none', padding: 0, margin: 0, flex: 1, outline: 'none' }} />
                    <FaSearch color="white" style={{ background: '#007bff', padding: '8px', borderRadius: '50%', fontSize: '1.5rem' }} />
                </div>
            </div>

            <CreatePost onPostCreated={handlePostCreated} user={user} />

            {/* Filters */}
            <div className="feed-tabs">
                {filters.map(f => (
                    <div
                        key={f}
                        className={`filter-chip ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </div>
                ))}
            </div>

            <div className="feed-posts">
                {posts.map(post => (
                    <PostCard key={post._id} post={post} user={user} />
                ))}
            </div>

        </div>
    );
};

export default Feed;
