// Curated multiple-choice bank — original questions in the style of W3Schools /
// Exercism quizzes (not copied from them). `answer` is the index of the correct
// option; `explain` teaches the concept either way.
export const QUIZ_TOPICS = ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL', 'C', 'Git', 'CS']

export const QUIZZES = [
  // ---- Python ----
  { id: 'py-len', topic: 'Python', difficulty: 'easy', q: 'What does len("hello") return?', options: ['4', '5', '6', 'Error'], answer: 1, explain: 'len() counts items; "hello" has 5 characters.' },
  { id: 'py-slice', topic: 'Python', difficulty: 'medium', q: 'What is "python"[1:4]?', options: ['"pyt"', '"yth"', '"ytho"', '"pyth"'], answer: 1, explain: 'Slicing [1:4] takes indices 1,2,3 → "yth" (the end index is exclusive).' },
  { id: 'py-div', topic: 'Python', difficulty: 'easy', q: 'What is the type of 3 / 2 in Python 3?', options: ['int', 'float', 'str', 'Error'], answer: 1, explain: '/ always returns a float in Python 3 (3/2 == 1.5). Use // for integer division.' },
  { id: 'py-listcomp', topic: 'Python', difficulty: 'medium', q: 'Which makes a list of squares 0..4?', options: ['[x*2 for x in range(5)]', '[x**2 for x in range(5)]', '{x**2 for x in range(5)}', '(x**2 for x in range(5))'], answer: 1, explain: 'x**2 is "x squared". [] makes a list; {} a set; () a generator.' },
  { id: 'py-dict', topic: 'Python', difficulty: 'easy', q: 'How do you read the value for key "a" in dict d?', options: ['d.a', 'd["a"]', 'd->a', 'd(a)'], answer: 1, explain: 'Dictionaries are indexed by key with square brackets: d["a"].' },
  { id: 'py-append', topic: 'Python', difficulty: 'easy', q: 'Which method adds an item to the end of a list?', options: ['.add()', '.append()', '.push()', '.insert()'], answer: 1, explain: 'Lists use .append(). (Sets use .add(); JS arrays use .push().)' },
  { id: 'py-range', topic: 'Python', difficulty: 'medium', q: 'What does range(2, 8, 2) produce?', options: ['2, 4, 6', '2, 4, 6, 8', '2, 3, 4, 5, 6, 7', '0, 2, 4, 6'], answer: 0, explain: 'Start 2, step 2, stop 8 (exclusive) → 2, 4, 6.' },
  { id: 'py-fstring', topic: 'Python', difficulty: 'easy', q: 'What is f"{2 + 2}"?', options: ['"2 + 2"', '"4"', '"{4}"', 'Error'], answer: 1, explain: 'f-strings evaluate the expression inside {} → "4".' },

  // ---- JavaScript ----
  { id: 'js-eqeq', topic: 'JavaScript', difficulty: 'medium', q: 'What does 0 == "0" evaluate to?', options: ['true', 'false', 'Error', 'undefined'], answer: 0, explain: '== coerces types, so "0" becomes 0 → true. Prefer === (which is false here).' },
  { id: 'js-typeof', topic: 'JavaScript', difficulty: 'medium', q: 'typeof null returns?', options: ['"null"', '"object"', '"undefined"', '"number"'], answer: 1, explain: 'A long-standing JS quirk: typeof null is "object".' },
  { id: 'js-const', topic: 'JavaScript', difficulty: 'easy', q: 'Which keyword prevents reassignment?', options: ['var', 'let', 'const', 'static'], answer: 2, explain: 'const blocks reassignment (object contents can still mutate).' },
  { id: 'js-map', topic: 'JavaScript', difficulty: 'medium', q: '[1,2,3].map(x => x*2) returns?', options: ['[1,2,3]', '[2,4,6]', '6', '[1,4,9]'], answer: 1, explain: 'map() returns a new array with the function applied to each element.' },
  { id: 'js-scope', topic: 'JavaScript', difficulty: 'medium', q: 'let is scoped to the…', options: ['whole function', 'nearest block { }', 'whole file', 'global object'], answer: 1, explain: 'let and const are block-scoped; var is function-scoped.' },
  { id: 'js-json', topic: 'JavaScript', difficulty: 'easy', q: 'What does JSON.parse() do?', options: ['object → string', 'string → object', 'pretty-prints JSON', 'validates a URL'], answer: 1, explain: 'JSON.parse turns a JSON string into a value; JSON.stringify does the reverse.' },
  { id: 'js-arrow', topic: 'JavaScript', difficulty: 'hard', q: 'Arrow functions do NOT bind their own…', options: ['name', 'this', 'return value', 'parameters'], answer: 1, explain: 'Arrow functions inherit this from the enclosing scope — a common reason to use (or avoid) them.' },
  { id: 'js-ternary', topic: 'JavaScript', difficulty: 'easy', q: 'What is `5 > 3 ? "a" : "b"`?', options: ['"a"', '"b"', 'true', 'Error'], answer: 0, explain: 'The condition 5 > 3 is true, so the ternary yields the first value, "a".' },

  // ---- HTML ----
  { id: 'html-semantic', topic: 'HTML', difficulty: 'easy', q: 'Which is a semantic element?', options: ['<div>', '<span>', '<article>', '<b>'], answer: 2, explain: '<article> conveys meaning about its content; <div>/<span> are generic.' },
  { id: 'html-anchor', topic: 'HTML', difficulty: 'easy', q: 'Which tag creates a hyperlink?', options: ['<link>', '<a>', '<href>', '<nav>'], answer: 1, explain: '<a href="…"> is the anchor (link) tag. <link> loads resources like CSS.' },
  { id: 'html-alt', topic: 'HTML', difficulty: 'easy', q: 'Which <img> attribute gives alternative text?', options: ['title', 'alt', 'desc', 'caption'], answer: 1, explain: 'alt describes the image for screen readers and when it fails to load.' },
  { id: 'html-ol', topic: 'HTML', difficulty: 'easy', q: 'Which tag is a numbered (ordered) list?', options: ['<ul>', '<ol>', '<li>', '<dl>'], answer: 1, explain: '<ol> is ordered (numbered); <ul> is unordered (bullets); <li> is a list item.' },
  { id: 'html-doctype', topic: 'HTML', difficulty: 'medium', q: 'What does <!DOCTYPE html> declare?', options: ['the charset', 'an HTML5 document', 'a comment', 'the CSS version'], answer: 1, explain: 'It tells the browser to use standards mode for an HTML5 document.' },
  { id: 'html-input-email', topic: 'HTML', difficulty: 'medium', q: 'Which input type gives built-in email validation?', options: ['text', 'email', 'mail', 'address'], answer: 1, explain: '<input type="email"> validates the format and shows an email keyboard on mobile.' },

  // ---- CSS ----
  { id: 'css-class', topic: 'CSS', difficulty: 'easy', q: 'How do you select elements with class "box"?', options: ['#box', '.box', 'box', '*box'], answer: 1, explain: '. selects by class, # selects by id.' },
  { id: 'css-justify', topic: 'CSS', difficulty: 'medium', q: 'In a default flex row, justify-content aligns items along which axis?', options: ['vertical', 'horizontal (main)', 'both', 'none'], answer: 1, explain: 'Default flex-direction is row, so justify-content controls the horizontal main axis.' },
  { id: 'css-boxmodel', topic: 'CSS', difficulty: 'medium', q: 'Which is the OUTERMOST layer of the box model?', options: ['padding', 'border', 'margin', 'content'], answer: 2, explain: 'Order inside-out: content → padding → border → margin.' },
  { id: 'css-color', topic: 'CSS', difficulty: 'easy', q: 'Which property sets text colour?', options: ['text-color', 'color', 'font-color', 'fill'], answer: 1, explain: 'color sets text colour; background-color sets the background.' },
  { id: 'css-display-none', topic: 'CSS', difficulty: 'medium', q: 'What does display: none do?', options: ['hides it and removes it from layout', 'hides it but keeps its space', 'greys it out', 'disables clicks only'], answer: 0, explain: 'display:none removes the element from the layout entirely; visibility:hidden keeps the space.' },
  { id: 'css-rem', topic: 'CSS', difficulty: 'hard', q: 'A rem unit is relative to…', options: ['the parent font-size', 'the root (html) font-size', 'the viewport width', "the element's own size"], answer: 1, explain: 'rem = root em, relative to the <html> font-size. em is relative to the parent.' },

  // ---- SQL ----
  { id: 'sql-select', topic: 'SQL', difficulty: 'easy', q: 'Which statement retrieves data?', options: ['GET', 'SELECT', 'FETCH', 'PULL'], answer: 1, explain: 'SELECT … FROM … reads rows from a table.' },
  { id: 'sql-where', topic: 'SQL', difficulty: 'easy', q: 'Which clause filters rows?', options: ['FILTER', 'WHERE', 'LIMIT', 'ORDER BY'], answer: 1, explain: 'WHERE filters rows by a condition; ORDER BY sorts; LIMIT caps the count.' },
  { id: 'sql-pk', topic: 'SQL', difficulty: 'medium', q: 'A PRIMARY KEY…', options: ['can repeat across rows', 'uniquely identifies each row', 'must be text', 'is optional decoration'], answer: 1, explain: 'A primary key is unique and not null — it identifies each row.' },
  { id: 'sql-count', topic: 'SQL', difficulty: 'easy', q: 'What does COUNT(*) return?', options: ['the sum of a column', 'the number of rows', 'distinct values only', 'an error'], answer: 1, explain: 'COUNT(*) counts rows in the result set.' },
  { id: 'sql-join', topic: 'SQL', difficulty: 'medium', q: 'Which combines rows from two tables on a matching column?', options: ['UNION', 'JOIN', 'MERGE', 'LINK'], answer: 1, explain: 'JOIN matches rows across tables on a condition; UNION stacks result sets.' },

  // ---- C ----
  { id: 'c-char', topic: 'C', difficulty: 'medium', q: 'What is sizeof(char) guaranteed to be?', options: ['1', '2', '4', 'depends on CPU'], answer: 0, explain: 'sizeof(char) is always 1 — the unit every other size is measured in.' },
  { id: 'c-deref', topic: 'C', difficulty: 'hard', q: 'If int *p; what does *p give you?', options: ['the address of p', 'the value p points to', 'a new pointer', 'the size of an int'], answer: 1, explain: '* dereferences: it reads the value at the address stored in p. & gives an address.' },
  { id: 'c-strterm', topic: 'C', difficulty: 'medium', q: 'How are C strings terminated?', options: ['with a newline', 'with a null byte \\0', 'with a length prefix', 'they are not'], answer: 1, explain: 'C strings are char arrays ending in \\0 so functions know where they stop.' },
  { id: 'c-printf', topic: 'C', difficulty: 'easy', q: 'Which printf format specifier prints an int?', options: ['%s', '%d', '%c', '%f'], answer: 1, explain: '%d prints an int; %s a string, %c a char, %f a float.' },

  // ---- Git ----
  { id: 'git-add', topic: 'Git', difficulty: 'easy', q: 'Which command stages changes for commit?', options: ['git save', 'git add', 'git push', 'git track'], answer: 1, explain: 'git add moves changes into the staging area, ready to commit.' },
  { id: 'git-commit', topic: 'Git', difficulty: 'easy', q: 'What does git commit do?', options: ['uploads to the remote', 'records staged changes into history', 'stages files', 'creates a branch'], answer: 1, explain: 'commit snapshots the staged changes locally; push then uploads them.' },
  { id: 'git-clone', topic: 'Git', difficulty: 'easy', q: 'git clone <url> …', options: ['copies a remote repo to your machine', 'deletes a repo', 'merges two branches', 'renames a repo'], answer: 0, explain: 'clone downloads a full copy of a remote repository, including history.' },
  { id: 'git-merge', topic: 'Git', difficulty: 'medium', q: 'Which command integrates one branch into another?', options: ['git split', 'git merge', 'git fork', 'git clone'], answer: 1, explain: 'git merge brings the commits of one branch into the current one.' },

  // ---- CS fundamentals ----
  { id: 'cs-bigo', topic: 'CS', difficulty: 'medium', q: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 1, explain: 'It halves the search space each step → O(log n). Requires sorted input.' },
  { id: 'cs-stack', topic: 'CS', difficulty: 'easy', q: 'A stack is…', options: ['FIFO', 'LIFO', 'sorted', 'random access'], answer: 1, explain: 'Stacks are Last-In-First-Out; the most recent push is popped first.' },
  { id: 'cs-queue', topic: 'CS', difficulty: 'easy', q: 'A queue is…', options: ['LIFO', 'FIFO', 'sorted', 'random access'], answer: 1, explain: 'Queues are First-In-First-Out, like a line at a shop.' },
  { id: 'cs-binary', topic: 'CS', difficulty: 'easy', q: 'What is binary 1011 in decimal?', options: ['9', '11', '13', '7'], answer: 1, explain: '8 + 0 + 2 + 1 = 11.' },
]
