import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface AnimeDetail {
  _id: string;
  title: string;
  genre: string;
  description: string;
  videoUrl: string;
  rating: number;
}

function Watch() {
  const { id } = useParams();
  const [anime, setAnime] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/anime/${id}`);
        setAnime(response.data);
      } catch (err) {
        console.error('Lỗi khi tải anime!');
      }
      setLoading(false);
    };

    fetchAnime();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (!anime) return <p>Không tìm thấy anime!</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{anime.title}</h1>
      <video width="100%" height="500" controls style={{ marginBottom: '20px' }}>
        <source src={anime.videoUrl} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video!
      </video>
      <p><strong>Thể loại:</strong> {anime.genre}</p>
      <p><strong>Mô tả:</strong> {anime.description}</p>
      <p><strong>Đánh giá:</strong> {anime.rating}/10</p>
      <button style={{ padding: '10px 20px', marginRight: '10px' }}>Thêm vào Watchlist</button>
      <button style={{ padding: '10px 20px' }}>Đánh Giá</button>
    </div>
  );
}

export default Watch;
