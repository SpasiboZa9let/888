// src/data/markers.js
import { photo } from '../utils/assetPath.js';

// 1. Базовый массив маркеров (без caption)
const baseMarkers = [
  { x: 0.50,  y: 0.20, img: photo('1.jpg'),  title: 'Свет сквозь занавески' },
  { x: 0.659, y: 0.271,img: photo('2.jpg'),  title: 'Завтрак в полутоне' },
  { x: 0.780, y: 0.420,img: photo('3.jpg'),  title: 'На балконе' },
  { x: 0.780, y: 0.580,img: photo('4.jpg'),  title: 'Случайный снимок' },
  { x: 0.659, y: 0.729,img: photo('5.jpg'),  title: 'Жаркое небо' },
  { x: 0.50,  y: 0.80, img: photo('6.jpg'),  title: 'Тени под деревом' },
  { x: 0.341, y: 0.729,img: photo('7.jpg'),  title: 'Поцелуй за киоском' },
  { x: 0.220, y: 0.580,img: photo('8.jpg'),  title: 'Трамвайный звон' },
  { x: 0.220, y: 0.420,img: photo('9.jpg'),  title: 'Закат в переулке' },
  { x: 0.341, y: 0.271,img: photo('10.jpg'), title: 'Ночная тишина' }
];

// 2. Определяем желаемое дополнительное смещение (например, 0.1 = 10% от высоты)
const EXTRA_OFFSET_Y = 0.1;

// 3. Клэмпим так, чтобы y не выходило за [0, 1]
export const MARKERS = baseMarkers.map(marker => {
  // посчитали новое y
  const shifted = marker.y + EXTRA_OFFSET_Y;
  // и «зафиксировали» его в диапазоне [0,1]
  const y = Math.min(1, Math.max(0, shifted));
  return { ...marker, y };
});
