/**
 * IndexedDB Service for storing owner-uploaded gallery images and user reviews.
 * This guarantees ample storage without LocalStorage 5MB quota errors.
 */

import { GalleryItem, ReviewItem } from '../types';

const DB_NAME = 'fitness_fuel_db';
const DB_VERSION = 1;
const STORE_GALLERY = 'gallery_images';
const STORE_REVIEWS = 'reviews';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_GALLERY)) {
        db.createObjectStore(STORE_GALLERY, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_REVIEWS)) {
        db.createObjectStore(STORE_REVIEWS, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Gallery operations
export async function getCustomGalleryItems(): Promise<GalleryItem[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_GALLERY, 'readonly');
      const store = transaction.objectStore(STORE_GALLERY);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to load gallery items from IndexedDB', err);
    return [];
  }
}

export async function saveCustomGalleryItem(item: GalleryItem): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_GALLERY, 'readwrite');
    const store = transaction.objectStore(STORE_GALLERY);
    const request = store.put(item);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteCustomGalleryItem(id: string): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_GALLERY, 'readwrite');
    const store = transaction.objectStore(STORE_GALLERY);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Reviews operations
export async function getCustomReviews(): Promise<ReviewItem[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_REVIEWS, 'readonly');
      const store = transaction.objectStore(STORE_REVIEWS);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to load reviews from IndexedDB', err);
    return [];
  }
}

export async function saveCustomReview(review: ReviewItem): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_REVIEWS, 'readwrite');
    const store = transaction.objectStore(STORE_REVIEWS);
    const request = store.put(review);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteCustomReview(id: string): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_REVIEWS, 'readwrite');
    const store = transaction.objectStore(STORE_REVIEWS);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
