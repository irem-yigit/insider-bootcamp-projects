function findLongestCollatz(limit) {
    let longestChain = 0;
    let startingNumber = 0;
    const cache = {}; 
  
    function collatzChainLength(n) {
      if (n === 1){
        return 1;
      } 

      if (cache[n]) {
        return cache[n];
      }

      let length;
      if (n % 2 === 0) {
        length = 1 + collatzChainLength(n / 2);
      } else {
        length = 1 + collatzChainLength(3 * n + 1);
      }
  
      cache[n] = length;
      return length;
    }
  
    for (let i = 2; i < limit; i++) {
      const length = collatzChainLength(i);
      if (length > longestChain) {
        longestChain = length;
        startingNumber = i;
      }
    }
  
    return { startingNumber, longestChain};
  }
  
  const limit = 1000000;
  const result = findLongestCollatz(limit);
  console.log(`Number of starters with the longest Collatz sequence: ${result.startingNumber}`);
  console.log(`Longest Chain: ${result.longestChain}`); 
