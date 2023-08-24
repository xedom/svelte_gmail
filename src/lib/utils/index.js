import dayjs from 'dayjs';

export const randomDate = () => {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const parseDate = (dayjs_date) => {
  dayjs_date = dayjs(dayjs_date);

  if (!dayjs_date.isBefore(dayjs(), 'day')) return dayjs_date.format('HH:mm')
  if (!dayjs_date.isBefore(dayjs(), 'year')) return dayjs_date.format('DD MMMM')
  return dayjs_date.format('DD/MM/YYYY');
}