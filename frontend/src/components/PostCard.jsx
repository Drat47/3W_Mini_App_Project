import { useState } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaRegComment, FaShareAlt } from 'react-icons/fa';

const PostCard = ({ post, user }) => {
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);
    const [commentText, setCommentText] = useState('');
    const [showComments, setShowComments] = useState(false);

    const handleLike = async () => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/posts/${post._id}/like`, { userId: user.id });
            setLikes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentText) return;

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/posts/${post._id}/comment`, { userId: user.id, text: commentText });
            setComments(res.data);
            setCommentText('');
        } catch (err) {
            console.error(err);
        }
    };

    const isLiked = likes.includes(user.id);

    return (
        <div className="post-card">
            <div className="pc-header">
                <div className="pc-user">
                    {/* Generate a consistent color based on username or just gray */}
                    <div className="pc-avatar" style={{ background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: '#555' }}>
                        {post.username[0].toUpperCase()}
                    </div>
                    <div className="pc-meta">
                        <h4>{post.username}</h4>
                        <div className="pc-handle">@{post.username.toLowerCase().replace(/\s/g, '')} • {new Date(post.createdAt).toLocaleDateString()}</div>
                    </div>
                </div>
                <button className="follow-btn">Follow</button>
            </div>

            <div style={{ marginBottom: '15px' }}>
                {post.text && <p style={{ fontSize: '0.95rem', lineHeight: '1.4', marginBottom: post.image ? '10px' : '0' }}>{post.text}</p>}
                {post.image && <img src={post.image} alt="Post" style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }} />}
            </div>

            <div className="pc-footer">
                <div className="pc-action" onClick={handleLike}>
                    {isLiked ? <FaHeart color="#e0245e" size={20} /> : <FaRegHeart size={20} />}
                    <span>{likes.length}</span>
                </div>
                <div className="pc-action" onClick={() => setShowComments(!showComments)}>
                    <FaRegComment size={20} />
                    <span>{comments.length}</span>
                </div>
                <div className="pc-action">
                    <FaShareAlt size={20} />
                    <span>0</span>
                </div>
            </div>

            {showComments && (
                <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                    {comments.map((c, i) => (
                        <div key={i} style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
                            <strong>{c.username}: </strong> {c.text}
                        </div>
                    ))}
                    <form onSubmit={handleComment} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            style={{ borderRadius: '20px', background: '#f0f2f5', border: 'none', padding: '8px 15px' }}
                        />
                        <button type="submit" style={{ background: 'none', border: 'none', color: '#007bff', fontWeight: 'bold', cursor: 'pointer' }}>Post</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PostCard;
