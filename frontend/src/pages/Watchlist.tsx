import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WatchlistItem {
  _id: string;
  animeTitle: string;
  genre: string;
  addedAt: string;
}

function Watchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/watchlist', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWatchlist(response.data);
      } catch (err) {
        console.error('Lỗi khi tải danh sách yêu thích!');
      }
      setLoading(false);
    };

    fetchWatchlist();
  }, []);

  if (loading) return <p>Đang tải...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Danh Sách Yêu Thích</h1>
      {watchlist.length === 0 ? (
        <p>Danh sách trống!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {watchlist.map((item) => (
            <div key={item._id} style={{ border: '1px solid #ddd', padding: '10px' }}>
              <h3>{item.animeTitle}</h3>
              <p>Thể loại: {item.genre}</p>
              <p>Thêm lúc: {new Date(item.addedAt).toLocaleDateString()}</p>
              <button>Xóa</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
