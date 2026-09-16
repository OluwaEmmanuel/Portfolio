// Comprehensive persistent storage for user-uploaded profile photo.
// Uses a 3-layer persistence model:
// 1. IndexedDB (handles arbitrary file sizes, resilient across sessions & reloads)
// 2. LocalStorage (optimized compressed dataURL for instant 0ms synchronous load)
// 3. Container FileSystem via /api/upload-profile (saves to public/profile.jpg)

const DB_NAME = 'AbigailPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'profileMedia';
const KEY_NAME = 'current_profile_image';
const STORAGE_KEY = 'abigail_custom_profile_image';

export const DEFAULT_PROFILE_IMAGE = '/profile-default.jpg';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getProfileImageFromDB(): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_NAME);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function saveProfileImageToDB(dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, KEY_NAME);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB write warning:', err);
  }
}

export async function removeProfileImageFromDB(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY_NAME);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // ignore
  }
}

/**
 * Synchronously retrieves stored image from localStorage for instant 0ms render
 */
export function getStoredProfileSync(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Compresses an image file onto a canvas to ensure it is lightweight (~100-250KB)
 * while retaining high visual sharpness (up to 1200px portrait).
 */
export function processAndCompressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        // Draw and compress to high quality JPEG
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image into element'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Saves image across all 3 layers: IndexedDB, LocalStorage, and container public disk.
 */
export async function persistProfileImage(file: File): Promise<string> {
  const dataUrl = await processAndCompressImage(file);

  // 1. Save to LocalStorage for instant 0ms synchronous access
  try {
    localStorage.setItem(STORAGE_KEY, dataUrl);
  } catch (err) {
    console.warn('LocalStorage quota issue, falling back to IndexedDB:', err);
  }

  // 2. Save to IndexedDB (virtually unlimited quota, survives cache clears)
  await saveProfileImageToDB(dataUrl);

  // 3. Post to backend/vite middleware to write to /public/profile.jpg
  try {
    await fetch('/api/upload-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: dataUrl }),
    });
  } catch {
    // Non-blocking in client-only preview
  }

  // 4. Notify all components on the page immediately
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('profile-image-changed', { detail: dataUrl }));
  }

  return dataUrl;
}

/**
 * Resets profile image across all persistence layers
 */
export async function resetProfileImage(): Promise<void> {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }

  await removeProfileImageFromDB();

  try {
    await fetch('/api/upload-profile', { method: 'DELETE' });
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('profile-image-changed', { detail: null }));
  }
}
