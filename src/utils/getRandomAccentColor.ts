const getRandomAccent = () => {
  const accents = [
    "bg-accent-1 text-accent-1-text",
    "bg-accent-2 text-accent-2-text",
    "bg-accent-3 text-accent-3-text",
    "bg-accent-4 text-accent-4-text",
    "bg-accent-5 text-accent-5-text",
    "bg-accent-6 text-accent-6-text",
    "bg-accent-7 text-accent-7-text",
    "bg-accent-8 text-accent-8-text",
  ];
  return accents[Math.floor(Math.random() * accents.length)];
};

export default getRandomAccent;