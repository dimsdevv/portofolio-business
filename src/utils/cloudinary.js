/**
 * Optimizes a Cloudinary image URL by adding auto format and auto quality parameters.
 * @param {string} url - The original Cloudinary URL
 * @returns {string} - The optimized Cloudinary URL
 */
export const optimizeCloudinaryUrl = (url) => {
  if (!url || !url.includes('res.cloudinary.com')) return url;

  // Don't add if it already has transformations
  if (url.includes('/upload/q_auto') || url.includes('/upload/f_auto')) {
    return url;
  }

  // Insert q_auto,f_auto after /upload/
  return url.replace('/upload/', '/upload/q_auto,f_auto/');
};
