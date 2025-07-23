export const formatTime = (isoString: string) => {
  if (!isoString) return "";

  const date = new Date(isoString);

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2); 

  return `${hour}:${minute}  ${day}.${month}.${year}`;
};
