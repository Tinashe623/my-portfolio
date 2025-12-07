import { useEffect, useState } from 'react'

/**
 * Hook to preload images and track loading state
 * @param {string[]} imageUrls - Array of image URLs to preload
 * @returns {boolean} - Whether all images are loaded
 */
export function useImagePreload(imageUrls) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setLoaded(true)
      return
    }

    let loadedCount = 0
    const totalImages = imageUrls.length

    const promises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          loadedCount++
          if (loadedCount === totalImages) {
            setLoaded(true)
          }
          resolve()
        }
        img.onerror = reject
        img.src = url
      })
    })

    Promise.allSettled(promises).then(() => {
      setLoaded(true)
    })
  }, [imageUrls])

  return loaded
}
