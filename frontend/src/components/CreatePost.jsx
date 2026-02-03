import { useState } from 'react';
import axios from 'axios';
import { FaImage, FaSmile, FaStream, FaBullhorn, FaPaperPlane } from 'react-icons/fa';

const CreatePost = ({ onPostCreated, user }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        if (!text && !image) return;

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/posts`,
                { userId: user.id, text, image },
                { headers: { 'x-auth-token': token } }
            );
            onPostCreated(res.data);
            setText('');
            setImage('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="create-post-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0 }}>Create Post</h3>
                <div style={{ background: '#f0f2f5', borderRadius: '15px', padding: '2px', display: 'flex' }}>
                    <div
                        style={{ padding: '6px 12px', borderRadius: '13px', background: activeTab === 'all' ? '#007bff' : 'transparent', color: activeTab === 'all' ? 'white' : '#777', fontSize: '0.8rem', cursor: 'pointer' }}
                        onClick={() => setActiveTab('all')}
                    >All Posts</div>
                    <div
                        style={{ padding: '6px 12px', borderRadius: '13px', background: activeTab === 'promo' ? '#007bff' : 'transparent', color: activeTab === 'promo' ? 'white' : '#777', fontSize: '0.8rem', cursor: 'pointer' }}
                        onClick={() => setActiveTab('promo')}
                    >Promotions</div>
                </div>
            </div>

            <textarea
                style={{ width: '100%', border: 'none', resize: 'none', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }}
                placeholder="What's on your mind?"
                rows="3"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            {image &&
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                    <img src={image} alt="Preview" style={{ maxWidth: '100%', borderRadius: '12px', maxHeight: '200px', objectFit: 'cover' }} />
                    <button onClick={() => setImage('')} style={{ position: 'absolute', top: 5, right: 5, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' }}>×</button>
                </div>
            }

            <div className="cp-actions">
                <div className="cp-icons">
                    <label style={{ cursor: 'pointer' }}>
                        <FaImage />
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    </label>
                    <FaSmile style={{ cursor: 'pointer' }} />
                    <FaStream style={{ cursor: 'pointer' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer' }}>
                        <FaBullhorn /> Promote
                    </div>
                </div>
                <button
                    className={`post-btn ${text || image ? 'active' : ''}`}
                    onClick={handleSubmit}
                    disabled={!text && !image}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaPaperPlane /> Post
                    </div>
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
