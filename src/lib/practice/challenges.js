// Coding exercises. Each runs the user's function against `tests` (args + expected)
// in the browser: JavaScript in a Web Worker, Python via Pyodide.
export const CHALLENGES = [
  // ---- JavaScript ----
  {
    id: 'js-reverse', lang: 'js', title: 'Reverse a string', difficulty: 'easy', fn: 'reverseString',
    prompt: 'Return the given string reversed.',
    starter: 'function reverseString(s) {\n  // your code here\n}\n',
    tests: [{ args: ['hello'], expected: 'olleh' }, { args: [''], expected: '' }, { args: ['ab'], expected: 'ba' }],
    hints: ['A string can be split into characters with [...s] or s.split("").', 'Array has .reverse() and .join("").'],
  },
  {
    id: 'js-sum', lang: 'js', title: 'Sum an array', difficulty: 'easy', fn: 'sumArray',
    prompt: 'Return the sum of all numbers in the array. Empty array → 0.',
    starter: 'function sumArray(nums) {\n  // your code here\n}\n',
    tests: [{ args: [[1, 2, 3]], expected: 6 }, { args: [[]], expected: 0 }, { args: [[5]], expected: 5 }, { args: [[-1, 1]], expected: 0 }],
    hints: ['A for-loop or nums.reduce((a, b) => a + b, 0) both work.'],
  },
  {
    id: 'js-palindrome', lang: 'js', title: 'Palindrome check', difficulty: 'easy', fn: 'isPalindrome',
    prompt: 'Return true if the string reads the same forwards and backwards.',
    starter: 'function isPalindrome(s) {\n  // your code here\n}\n',
    tests: [{ args: ['racecar'], expected: true }, { args: ['hello'], expected: false }, { args: ['a'], expected: true }],
    hints: ['Compare the string to its reverse.'],
  },
  {
    id: 'js-fizzbuzz', lang: 'js', title: 'FizzBuzz', difficulty: 'medium', fn: 'fizzbuzz',
    prompt: 'Return an array for 1..n: multiples of 3 → "Fizz", of 5 → "Buzz", of both → "FizzBuzz", else the number.',
    starter: 'function fizzbuzz(n) {\n  // return an array of length n\n}\n',
    tests: [{ args: [5], expected: [1, 2, 'Fizz', 4, 'Buzz'] }, { args: [3], expected: [1, 2, 'Fizz'] }, { args: [15], expected: [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'] }],
    hints: ['Check divisibility by 15 first (both 3 and 5), then 3, then 5.'],
  },
  {
    id: 'js-max', lang: 'js', title: 'Max of array', difficulty: 'easy', fn: 'maxOf',
    prompt: 'Return the largest number in a non-empty array.',
    starter: 'function maxOf(nums) {\n  // your code here\n}\n',
    tests: [{ args: [[3, 7, 2]], expected: 7 }, { args: [[-1, -5]], expected: -1 }, { args: [[42]], expected: 42 }],
    hints: ['Math.max(...nums) is the one-liner, or track a running max in a loop.'],
  },

  // ---- Python ----
  {
    id: 'py-factorial', lang: 'py', title: 'Factorial', difficulty: 'easy', fn: 'factorial',
    prompt: 'Return n! (n factorial). Assume n ≥ 0, and 0! == 1.',
    starter: 'def factorial(n):\n    # your code here\n    pass\n',
    tests: [{ args: [0], expected: 1 }, { args: [5], expected: 120 }, { args: [3], expected: 6 }],
    hints: ['Loop from 1 to n multiplying, or use recursion: n * factorial(n-1).'],
  },
  {
    id: 'py-vowels', lang: 'py', title: 'Count vowels', difficulty: 'easy', fn: 'count_vowels',
    prompt: 'Return how many vowels (a, e, i, o, u) are in the string, case-insensitive.',
    starter: 'def count_vowels(s):\n    # your code here\n    pass\n',
    tests: [{ args: ['hello'], expected: 2 }, { args: ['sky'], expected: 0 }, { args: ['Apple'], expected: 2 }],
    hints: ['Lowercase the string, then sum 1 for each char in "aeiou".'],
  },
  {
    id: 'py-fizzbuzz', lang: 'py', title: 'FizzBuzz (Python)', difficulty: 'medium', fn: 'fizzbuzz',
    prompt: 'Return a list for 1..n: multiples of 3 → "Fizz", of 5 → "Buzz", of both → "FizzBuzz", else the int.',
    starter: 'def fizzbuzz(n):\n    # return a list of length n\n    pass\n',
    tests: [{ args: [5], expected: [1, 2, 'Fizz', 4, 'Buzz'] }, { args: [3], expected: [1, 2, 'Fizz'] }],
    hints: ['Build a list; check n % 15, then % 3, then % 5.'],
  },
]

export const CHALLENGE_LANGS = { js: 'JavaScript', py: 'Python' }
