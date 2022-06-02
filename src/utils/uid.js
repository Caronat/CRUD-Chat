const randomBetween = (a, b) => Math.floor(Math.random() * (b - a + 1) + a);

export const uid = (length = 12) => {
  let letters = "abcdefghijklmnopqrstuvwxyz";
  letters += letters.toUpperCase();

  const id = [...Array(length)].map((_) => {
    const x = randomBetween(0, letters.length - 1);
    return letters[x];
  });
  id.push(Date.now().toString(36));
  return id.join("");
};
