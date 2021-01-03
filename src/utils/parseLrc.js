const LRC_LINE = /^(\[[0-9]+:[0-9]+(\.[0-9]+)?\])+.*/;
const LRC_TIMESTAMP_WITH_BRACKET = /\[[0-9]+:[0-9]+(\.[0-9]+)?\]/g;
const LRC_TIMESTAMP = /[0-9]+/g;

const getRandomString = () => Math.random().toString(36).substring(7);

export default (lrc) => {
  const lrcLineList = [];
  const lineList = lrc.split('\n');
  lineList.forEach((line) => {
    if (!LRC_LINE.test(line)) {
      return;
    }
    const timeStringList = line.match(LRC_TIMESTAMP_WITH_BRACKET);
    const content = line.replace(LRC_TIMESTAMP_WITH_BRACKET, '');
    timeStringList.forEach((timeString) => {
      const [minute, second, millisecond = '0'] = timeString.match(
        LRC_TIMESTAMP,
      );
      lrcLineList.push({
        id: getRandomString(),
        millisecond:
          Number.parseInt(minute, 10) * 60 * 1000 +
          Number.parseInt(second, 10) * 1000 +
          Number.parseInt(millisecond, 10),
        content,
      });
    });
  });
  return lrcLineList.sort((a, b) => a.millisecond - b.millisecond);
};
