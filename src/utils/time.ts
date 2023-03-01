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

export const getDisplayDateTime = (date: Date) => {
  const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const monthsOfYear = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = monthsOfYear[date.getMonth()];

  return `${dayOfWeek}, ${dayOfMonth} ${month.slice(0, 3)}`
}


export const getDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  //* return: YYYY-MM-DD
  return `${year}-${month}-${day}`;
}

export const getDateTimeAgo = (count: number, type: 'day' | 'month' | 'year') => {
  const currentDate = new Date();
  let startDate;

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

  const dateTimeAgo = startDate.toISOString().slice(0, 10);

  //* return: YYYY-MM-DD
  return dateTimeAgo
}

export const getRelativeDate = (date: 'today' | 'yesterday' | 'before-yesterday') => {
  const dayMilliseconds = 24 * 60 * 60 * 1000

  if (date === 'today') {
    const today = new Date()

    return today
  }

  if (date === 'yesterday') {
    const yesterday = new Date(
      new Date().setTime(new Date().getTime() - dayMilliseconds)
    )

    return yesterday
  }

  if (date === 'before-yesterday') {
    const beforeYesterday = new Date(
      new Date().setTime(new Date().getTime() - dayMilliseconds * 2)
    )

    return beforeYesterday
  }

  throw Error('Invalid arguments')
}

export const getRelativeDisplayDate = (date: string): 'сегодня' | 'вчера' | 'позавчера' | string => {
  const displayDate = getDisplayDateTime(new Date(date))
  const today = getDisplayDateTime(getRelativeDate('today'))
  const yesterday = getDisplayDateTime(getRelativeDate('yesterday'))
  const beforeYesterday = getDisplayDateTime(getRelativeDate('before-yesterday'))

  if (displayDate === today) {
    return 'сегодня'
  }

  if (displayDate === yesterday) {
    return 'вчера'
  }

  if (displayDate === beforeYesterday) {
    return 'позавчера'
  }

  return displayDate
}



