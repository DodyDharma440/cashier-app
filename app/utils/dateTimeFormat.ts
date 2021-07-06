export const dateFormatter = (date: Date) => {
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const dataDate = new Date(date);
  const month = dataDate.getMonth();
  const day = dataDate.getDate();
  const year = dataDate.getFullYear();

  const displayDate = `${day} ${monthName[month]} ${year}`;

  return displayDate;
};
