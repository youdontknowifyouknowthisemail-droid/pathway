// Bite-size concept cards — the "teaching" layer. Kept short on purpose.
export const LESSONS = [
  {
    id: 'l-variables', topic: 'Fundamentals', title: 'Variables & types',
    body: 'A variable is a named box that holds a value. Most languages have numbers, strings (text), booleans (true/false), and collections (lists/arrays). Python infers types; C makes you declare them (int x = 5;).',
    example: 'name = "Ada"\nage = 19\nis_student = True',
  },
  {
    id: 'l-loops', topic: 'Fundamentals', title: 'Loops',
    body: 'Loops repeat work. A for-loop runs a known number of times; a while-loop runs until a condition is false. Reach for a loop whenever you catch yourself copy-pasting near-identical lines.',
    example: 'for i in range(3):\n    print(i)   # 0, 1, 2',
  },
  {
    id: 'l-functions', topic: 'Fundamentals', title: 'Functions',
    body: 'A function packages reusable logic behind a name. It takes inputs (parameters), does work, and usually returns an output. Good functions do one thing and are easy to name.',
    example: 'def square(x):\n    return x * x\n\nsquare(5)  # 25',
  },
  {
    id: 'l-arrays', topic: 'Data', title: 'Arrays & lists',
    body: 'An ordered collection accessed by index, starting at 0. Lists are the workhorse of programming: iterate them with loops, transform with map, filter with conditionals.',
    example: 'nums = [10, 20, 30]\nnums[0]   # 10\nlen(nums) # 3',
  },
  {
    id: 'l-bigo', topic: 'CS', title: 'Big-O in 60 seconds',
    body: 'Big-O describes how work grows as input grows. O(1) is constant, O(n) grows linearly, O(log n) halves each step (binary search), O(n²) is nested loops. Aim for the smallest order you can.',
    example: '// O(n): one pass\nfor (const x of arr) total += x',
  },
]

export const LESSON_TOPICS = ['Fundamentals', 'Data', 'CS']
