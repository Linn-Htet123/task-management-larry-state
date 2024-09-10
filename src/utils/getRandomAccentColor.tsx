const getRandomAccent = () => {
  const accents = [
    "bg-accent-1",
    "bg-accent-2",
    "bg-accent-3",
    "bg-accent-4",
    "bg-accent-5",
    "bg-accent-6",
    "bg-accent-7",
    "bg-accent-8",
  ];
  return accents[Math.floor(Math.random() * accents.length)];
};

export default getRandomAccent;
