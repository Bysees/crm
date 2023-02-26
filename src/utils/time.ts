export const secondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = seconds % 60;
  const formattedSeconds = secondsRemainder < 10 ? `0${secondsRemainder}` : `${secondsRemainder}`;
  return `${minutes}:${formattedSeconds}`;
}

export const getTimeOnly = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const getDisplayDateFormat = (date: Date) => {
  const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const monthsOfYear = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = monthsOfYear[date.getMonth()];

  return `${dayOfWeek}, ${dayOfMonth} ${month.slice(0, 3)}`
}

export const getDateTimeFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const getDateRange = (count: number, type: 'day' | 'month' | 'year') => {
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset() * 60000;
  let startDate;
  let endDate = new Date(Date.now() - timezoneOffset);
  
  if (type === 'day') {
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - count + 1);

  } else if (type === 'month') {
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - count, currentDate.getDate());
    startDate.setDate(startDate.getDate() + 1);

  } else if (type === 'year') {

    startDate = new Date(currentDate.getFullYear() - count, currentDate.getMonth(), currentDate.getDate());
    startDate.setDate(startDate.getDate() + 1);

  } else {
    throw new Error('Invalid type parameter');
  }

  const startDateString = startDate.toISOString().slice(0, 10);
  const endDateString = endDate.toISOString().slice(0, 10);
  
  return { startDate: startDateString, endDate: endDateString };
}


