

export const generateCodename = (): string => {
  const names = ["The Nightingale", "The Kraken", "Shadow Hawk", "Ghost Fang", "Red Viper"];
  return names[Math.floor(Math.random() * names.length)];
};

export const generateSuccessProbability = (): string => {
  const percent = Math.floor(Math.random() * 41) + 60; 
  return `${percent}% success probability`;
};
