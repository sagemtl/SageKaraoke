const Counter = (arr) => {
  const count = {};
  arr.forEach((val) => {
    count[val] = (count[val] || 0) + 1;
  });
  return count;
};

export const getWordList = (data, lang) => {
  const splitToken = lang === 'en-US' ? ' ' : '';
  const linesWordsList = data
    .slice(1)
    .map((line) => line.content.trim().toLowerCase().split(splitToken))
    .reduce((a, b) => a.concat(b), []);

  const wordsCount = Counter(linesWordsList);
  return wordsCount;
};

export const getLyricsScore = (wordsCount, speech) => {
  const speechWordsList = speech.trim().toLowerCase().split('');
  let score = 0;

  speechWordsList.forEach((word) => {
    if (word in wordsCount && wordsCount[word] > 0) {
      score += 1;
      wordsCount[word] -= 1; // eslint-disable-line no-param-reassign
    }
  }, score);

  return score;
};
