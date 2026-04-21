import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Review {
  _id: string;
  user: string;
  animeTitle: string;
  rating: number;
  comment: string;
}

function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data);
      } catch (err) {
        console.error('Lỗi khi tải đánh giá!');
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Đang tải...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Đánh Giá Anime</h1>
      {reviews.map((review) => (
        <div key={review._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
          <h3>{review.animeTitle}</h3>
          <p><strong>Người đánh giá:</strong> {review.user}</p>
          <p><strong>Đánh giá:</strong> {review.rating}/10</p>
          <p><strong>Bình luận:</strong> {review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
