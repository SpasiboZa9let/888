// src/data/markers.js
import { photo } from '../utils/assetPath.js';

// Базовый массив маркеров (координаты в долях от ширины/высоты)
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

// 1) находим максимальную исходную y
const maxY = Math.max(...baseMarkers.map(m => m.y));

// 2) вычисляем сдвиг так, чтобы маркер с maxY оказался на y = 1.0
const AUTO_OFFSET_Y = 1 - maxY;

// 3) (опционально) при желании можно добавить «дополнительное» смещение
// const EXTRA_OFFSET = 0.02;  
// const OFFSET_Y = AUTO_OFFSET_Y + EXTRA_OFFSET;

// если EXTRA_OFFSET не нужен, просто:
const OFFSET_Y = AUTO_OFFSET_Y;

// 4) экспортируем уже скорректированный массив
export const MARKERS = baseMarkers.map(marker => ({
  ...marker,
  y: marker.y + OFFSET_Y
}));
