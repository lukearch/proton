export default function getTimestamp() {
  const date = new Date();
  const hours = date.getHours().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const minutes = date.getMinutes().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const seconds = date.getSeconds().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const milliseconds = date.getMilliseconds().toLocaleString('en-US', {
    minimumIntegerDigits: 3,
    useGrouping: false
  });

  const day = date.getDate().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const month = (date.getMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const year = date.getFullYear();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}:${milliseconds}`;
}
