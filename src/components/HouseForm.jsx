import { useState } from 'react';

export default function HouseForm({ initialData = {}, onSubmit, submitText = "Post House" }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [location, setLocation] = useState(initialData.location || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [images, setImages] = useState(initialData.images || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, location, price, images });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {/* You can build image upload or just list image URLs */}
      {images.map((img, idx) => (
        <img key={idx} src={img} alt={`img-${idx}`} width="100" />
      ))}

      <button type="submit">{submitText}</button>
    </form>
  );
}
