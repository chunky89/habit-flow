import { format } from 'date-fns';

export function getTodayDate() {
  return format(new Date(), 'yyyy-MM-dd');
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function formatTimeString(time) {
  if (!time) return '';
  const { hour, minute } = time;
  const paddedHour = hour.toString().padStart(2, '0');
  const paddedMin = minute.toString().padStart(2, '0');
  return `${paddedHour}:${paddedMin}`;
}
