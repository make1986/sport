export const DateAndTime = date => {
  let dateTime = new Date(date);
  let mnth = dateTime.getMonth();
  let month = "";
  switch (mnth) {
    case 0:
      month = "января";
      break;
    case 1:
      month = "февраля";
      break;
    case 2:
      month = "марта";
      break;
    case 3:
      month = "апреля";
      break;
    case 4:
      month = "мая";
      break;
    case 5:
      month = "июня";
      break;
    case 6:
      month = "июля";
      break;
    case 7:
      month = "августа";
      break;
    case 8:
      month = "сентября";
      break;
    case 9:
      month = "октября";
      break;
    case 10:
      month = "ноября";
      break;
    case 11:
      month = "декабря";
      break;
  }

  function setNull(num) {
    if (num > 9) {
      return num;
    } else {
      return `0${num}`;
    }
  }

  const newDate = `${setNull(
    dateTime.getDate()
  )} ${month} ${dateTime.getFullYear()}`;

  const newTime = `${setNull(dateTime.getHours())}:${setNull(
    dateTime.getMinutes()
  )}`;

  const newDateWithoutYear = `${setNull(dateTime.getDate())} ${month}`;

  return { date: newDate, time: newTime, dateWithoutYear: newDateWithoutYear };
};
