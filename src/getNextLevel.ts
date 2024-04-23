export default function getNextLevel(): () => number[] {
  const sequence: number[] = [];

  return () => {
    const getRandNumber = () => Math.floor(Math.random() * 9);

    let num = getRandNumber();
    while (!sequence.includes(num)) {
      num = getRandNumber();
      sequence.push(num);
    }

    return sequence;
  };
}
