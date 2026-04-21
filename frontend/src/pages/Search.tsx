import React, { useState } from 'react';
import axios from 'axios';

interface Anime {
  _id: string;
  title: string;
  genre: string;
  description: string;
}

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/anime/search?query=${searchTerm}`
      );
      setAnimeList(response.data);
    } catch (err) {
      console.error('Tìm kiếm thất bại!');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tìm Kiếm Anime</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nhập tên anime..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Tìm Kiếm
        </button>
      </form>

      {loading && <p>Đang tải...</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {animeList.map((anime) => (
          <div key={anime._id} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <h3>{anime.title}</h3>
            <p>Thể loại: {anime.genre}</p>
            <p>{anime.description}</p>
            <button>Xem Ngay</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
