export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = padTo2Digits(date.getDate());
  const month = padTo2Digits(date.getMonth() + 1);
  const year = date.getFullYear().toString();

  return `${day}-${month}-${year}`;
};

export const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};
