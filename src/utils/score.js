const data = [
  {
    content: '你问我爱你有多深',
    id: 'b62onl',
    millisecond: 11036,
  },
  {
    content: '我爱你有几分',
    id: 'ijeuq',
    millisecond: 17039,
  },
];

const Counter = (arr) => {
  const count = {};
  arr.forEach((val) => {
    count[val] = (count[val] || 0) + 1;
  });
  return count;
};

const getScore = (speech) => {
  const linesWordsList = data
    .map((line) => line.content.trim().toLowerCase().split(''))
    .reduce((a, b) => a.concat(b), []);

  const speechWordsList = speech.trim().toLowerCase().split('');
  const wordsCount = Counter(linesWordsList);

  let score = 0;

  speechWordsList.forEach((word) => {
    if (word in wordsCount && wordsCount[word] > 0) {
      score += 1;
      wordsCount[word] -= 1;
    }
  }, score);

  return score;
};

export default getScore;
