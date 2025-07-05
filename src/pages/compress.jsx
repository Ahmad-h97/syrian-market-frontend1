import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

export default function Compress() {
  const [ultraCompressed, setUltraCompressed] = useState(null);
  const [ultraSize, setUltraSize] = useState(null);
  const [postCompressed, setPostCompressed] = useState(null);
  const [postSize, setPostSize] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);

  async function handleFileChange(event) {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    setOriginalSize((imageFile.size / 1024).toFixed(2)); // KB

    try {
      // Ultra compressed (low quality, small size)
      const ultraOptions = {
        maxSizeMB: 0.03,           // ~30 KB
        maxWidthOrHeight: 400,     // resize down
        useWebWorker: true,
        initialQuality: 0.5,
        fileType: 'image/jpeg',    // unified JPEG format
      };
      const ultraBlob = await imageCompression(imageFile, ultraOptions);
      setUltraCompressed(ultraBlob);
      setUltraSize((ultraBlob.size / 1024).toFixed(2));

      // Post compressed (better quality, under 100 KB)
      const postOptions = {
        maxSizeMB: 0.1,            // ~100 KB
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        initialQuality: 0.75,
        fileType: 'image/jpeg',
      };
      const postBlob = await imageCompression(imageFile, postOptions);
      setPostCompressed(postBlob);
      setPostSize((postBlob.size / 1024).toFixed(2));
    } catch (error) {
      console.error("Compression error:", error);
    }
  }

  function downloadFile(blob, filename) {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename; // Use .jpg for JPEG format
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Dual JPEG Image Compression</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {originalSize && <p>Original size: {originalSize} KB</p>}

      {ultraCompressed && (
        <>
          <p>Ultra compressed (listing) size: {ultraSize} KB</p>
          <button onClick={() => downloadFile(ultraCompressed, 'ultra_compressed.jpg')}>
            Download Ultra Compressed Image
          </button>
        </>
      )}

      {postCompressed && (
        <>
          <p>Post compressed (detail view) size: {postSize} KB</p>
          <button onClick={() => downloadFile(postCompressed, 'post_compressed.jpg')}>
            Download Post Compressed Image
          </button>
        </>
      )}
    </div>
  );
}
