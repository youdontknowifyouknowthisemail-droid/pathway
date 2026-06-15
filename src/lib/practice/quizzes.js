// Curated multiple-choice question bank. `answer` is the index of the correct
// option. `explain` teaches the concept regardless of right/wrong.
export const QUIZ_TOPICS = ['Python', 'JavaScript', 'C', 'Web', 'CS']

export const QUIZZES = [
  // Python
  { id: 'py-len', topic: 'Python', difficulty: 'easy', q: 'What does len("hello") return?', options: ['4', '5', '6', 'Error'], answer: 1, explain: 'len() counts items; the string "hello" has 5 characters.' },
  { id: 'py-slice', topic: 'Python', difficulty: 'medium', q: 'What is "python"[1:4]?', options: ['"pyt"', '"yth"', '"ytho"', '"pyth"'], answer: 1, explain: 'Slicing [1:4] takes indices 1,2,3 → "yth" (end index is exclusive).' },
  { id: 'py-type', topic: 'Python', difficulty: 'easy', q: 'What is the type of 3 / 2 in Python 3?', options: ['int', 'float', 'str', 'Error'], answer: 1, explain: 'The / operator always returns a float in Python 3 (3/2 == 1.5). Use // for integer division.' },
  { id: 'py-list', topic: 'Python', difficulty: 'medium', q: 'Which creates a list of squares 0..4?', options: ['[x*2 for x in range(5)]', '[x**2 for x in range(5)]', '{x**2 for x in range(5)}', '(x**2 for x in range(5))'], answer: 1, explain: 'x**2 is "x squared". [] makes a list; {} a set; () a generator.' },

  // JavaScript
  { id: 'js-eqeq', topic: 'JavaScript', difficulty: 'medium', q: 'What does 0 == "0" evaluate to?', options: ['true', 'false', 'Error', 'undefined'], answer: 0, explain: '== does type coercion, so "0" becomes 0 and the comparison is true. Prefer === which would be false.' },
  { id: 'js-typeof', topic: 'JavaScript', difficulty: 'medium', q: 'typeof null returns?', options: ['"null"', '"object"', '"undefined"', '"number"'], answer: 1, explain: 'A long-standing JS quirk: typeof null is "object".' },
  { id: 'js-const', topic: 'JavaScript', difficulty: 'easy', q: 'Which keyword declares a value that cannot be reassigned?', options: ['var', 'let', 'const', 'static'], answer: 2, explain: 'const prevents reassignment (though object contents can still mutate).' },
  { id: 'js-map', topic: 'JavaScript', difficulty: 'medium', q: '[1,2,3].map(x => x*2) returns?', options: ['[1,2,3]', '[2,4,6]', '6', '[1,4,9]'], answer: 1, explain: 'map() returns a new array with the function applied to each element.' },

  // C
  { id: 'c-int', topic: 'C', difficulty: 'medium', q: 'In C, what is sizeof(char) guaranteed to be?', options: ['1', '2', '4', 'Depends on CPU'], answer: 0, explain: 'sizeof(char) is always 1 by definition in C — it is the unit all other sizes are measured in.' },
  { id: 'c-ptr', topic: 'C', difficulty: 'hard', q: 'If int *p; what does *p give you?', options: ['The address of p', 'The value p points to', 'A new pointer', 'The size of an int'], answer: 1, explain: 'The * (dereference) operator reads the value stored at the address held in p. & gives an address.' },
  { id: 'c-string', topic: 'C', difficulty: 'medium', q: 'How are C strings terminated?', options: ['With a newline', 'With a null byte \\0', 'With a length prefix', 'They are not'], answer: 1, explain: 'C strings are arrays of chars ending in the null terminator \\0, so functions know where they stop.' },

  // Web
  { id: 'web-semantic', topic: 'Web', difficulty: 'easy', q: 'Which is a semantic HTML element?', options: ['<div>', '<span>', '<article>', '<b>'], answer: 2, explain: '<article> conveys meaning about its content; <div>/<span> are generic containers.' },
  { id: 'web-flex', topic: 'Web', difficulty: 'medium', q: 'In CSS flexbox, which axis does justify-content control by default?', options: ['Vertical', 'The main (horizontal) axis', 'Both', 'None'], answer: 1, explain: 'By default flex-direction is row, so justify-content aligns items along the horizontal main axis.' },
  { id: 'web-status', topic: 'Web', difficulty: 'medium', q: 'What does HTTP status 404 mean?', options: ['Server error', 'Not found', 'Unauthorized', 'OK'], answer: 1, explain: '404 = the resource was not found. 5xx are server errors, 401 is unauthorized, 200 is OK.' },

  // CS fundamentals
  { id: 'cs-bigo', topic: 'CS', difficulty: 'medium', q: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 1, explain: 'Binary search halves the search space each step → O(log n). It requires sorted input.' },
  { id: 'cs-stack', topic: 'CS', difficulty: 'easy', q: 'A stack is which kind of structure?', options: ['FIFO', 'LIFO', 'Sorted', 'Random'], answer: 1, explain: 'A stack is Last-In-First-Out: the most recently pushed item is popped first. A queue is FIFO.' },
  { id: 'cs-binary', topic: 'CS', difficulty: 'easy', q: 'What is binary 1011 in decimal?', options: ['9', '11', '13', '7'], answer: 1, explain: '1×8 + 0×4 + 1×2 + 1×1 = 11.' },
]
