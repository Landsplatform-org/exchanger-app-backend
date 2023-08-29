export const generate = (length: number): string => {
  if (length <= 0) throw new Error("Cannot generate pin of length less than or equal to 0");
  
  const l = Math.pow(10, length);
  return (Math.floor(Math.random() * l) + l).toString().substring(1);
};
