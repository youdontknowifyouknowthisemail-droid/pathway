// Bite-size concept cards — the "teaching" layer, organised by topic like a
// W3Schools tutorial sidebar. Original explanations, kept short on purpose.
export const LESSON_TOPICS = ['Fundamentals', 'Data', 'Web', 'SQL', 'Git', 'CS']

export const LESSONS = [
  // Fundamentals
  {
    id: 'l-variables', topic: 'Fundamentals', title: 'Variables & types',
    body: 'A variable is a named box that holds a value. Common types: numbers, strings (text), booleans (true/false), and collections. Python infers types; C makes you declare them (int x = 5;).',
    example: 'name = "Ada"\nage = 19\nis_student = True',
  },
  {
    id: 'l-conditionals', topic: 'Fundamentals', title: 'Conditionals',
    body: 'if / else if / else run different code depending on a condition. The condition is a boolean expression; comparisons (==, <, >, !=) and logic (and/or/not) build them up.',
    example: 'if score >= 50:\n    print("pass")\nelse:\n    print("retake")',
  },
  {
    id: 'l-loops', topic: 'Fundamentals', title: 'Loops',
    body: 'Loops repeat work. A for-loop runs a known number of times; a while-loop runs until a condition is false. Reach for a loop whenever you are copy-pasting near-identical lines.',
    example: 'for i in range(3):\n    print(i)   # 0, 1, 2',
  },
  {
    id: 'l-functions', topic: 'Fundamentals', title: 'Functions',
    body: 'A function packages reusable logic behind a name. It takes inputs (parameters), does work, and usually returns an output. Good functions do one thing and are easy to name.',
    example: 'def square(x):\n    return x * x\n\nsquare(5)  # 25',
  },

  // Data
  {
    id: 'l-arrays', topic: 'Data', title: 'Arrays & lists',
    body: 'An ordered collection accessed by index, starting at 0. Iterate with loops, transform with map, narrow with filter. The workhorse of programming.',
    example: 'nums = [10, 20, 30]\nnums[0]    # 10\nlen(nums)  # 3',
  },
  {
    id: 'l-objects', topic: 'Data', title: 'Objects & dictionaries',
    body: 'Key→value stores. JavaScript calls them objects; Python calls them dictionaries. Use them when each value has a name rather than a position.',
    example: 'user = { "name": "Ada", "age": 19 }\nuser["name"]  # "Ada"',
  },

  // Web
  {
    id: 'l-html', topic: 'Web', title: 'HTML structure',
    body: 'HTML describes content with nested tags. A page has <head> (metadata) and <body> (visible content). Prefer semantic tags (<header>, <nav>, <main>, <article>) over generic <div>s.',
    example: '<article>\n  <h1>Title</h1>\n  <p>Some text.</p>\n</article>',
  },
  {
    id: 'l-css', topic: 'Web', title: 'CSS selectors',
    body: 'CSS styles HTML by selecting elements. Use a tag name (p), a class (.box), or an id (#main), then declare properties inside { }.',
    example: '.button {\n  color: white;\n  background: #0ea5e9;\n}',
  },
  {
    id: 'l-boxmodel', topic: 'Web', title: 'The box model',
    body: 'Every element is a box: content, then padding (space inside the border), then border, then margin (space outside). Knowing the order fixes most layout surprises.',
    example: '.card {\n  padding: 16px;   /* inside */\n  margin: 12px;    /* outside */\n}',
  },

  // SQL
  {
    id: 'l-sql', topic: 'SQL', title: 'SELECT basics',
    body: 'SQL queries read rows from tables. SELECT chooses columns, FROM names the table, WHERE filters rows, ORDER BY sorts. It is declarative — you say what you want, not how to get it.',
    example: 'SELECT name, age\nFROM students\nWHERE age >= 18\nORDER BY name;',
  },

  // Git
  {
    id: 'l-git', topic: 'Git', title: 'Git in three steps',
    body: 'Git tracks versions of your code. The everyday loop: stage what changed (add), snapshot it locally (commit), then upload it (push). Commit small and often with clear messages.',
    example: 'git add .\ngit commit -m "Add login form"\ngit push',
  },

  // CS
  {
    id: 'l-bigo', topic: 'CS', title: 'Big-O in 60 seconds',
    body: 'Big-O describes how work grows as input grows. O(1) is constant, O(n) linear, O(log n) halves each step (binary search), O(n²) is nested loops. Aim for the smallest order you can.',
    example: '// O(n): one pass\nfor (const x of arr) total += x',
  },
]
