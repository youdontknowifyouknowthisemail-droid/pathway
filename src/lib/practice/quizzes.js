// Curated multiple-choice bank — original questions in the style of W3Schools /
// Exercism quizzes (not copied). `answer` is the index of the correct option.
export const QUIZ_TOPICS = ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL', 'C', 'Git', 'CS']

export const QUIZZES = [
  // ---- Python ----
  { id: 'py-len', topic: 'Python', difficulty: 'easy', q: 'What does len("hello") return?', options: ['4', '5', '6', 'Error'], answer: 1, explain: 'len() counts items; "hello" has 5 characters.' },
  { id: 'py-slice', topic: 'Python', difficulty: 'medium', q: 'What is "python"[1:4]?', options: ['"pyt"', '"yth"', '"ytho"', '"pyth"'], answer: 1, explain: 'Slicing [1:4] takes indices 1,2,3 → "yth" (end index is exclusive).' },
  { id: 'py-div', topic: 'Python', difficulty: 'easy', q: 'What is the type of 3 / 2 in Python 3?', options: ['int', 'float', 'str', 'Error'], answer: 1, explain: '/ always returns a float (3/2 == 1.5). Use // for integer division.' },
  { id: 'py-listcomp', topic: 'Python', difficulty: 'medium', q: 'Which makes a list of squares 0..4?', options: ['[x*2 for x in range(5)]', '[x**2 for x in range(5)]', '{x**2 for x in range(5)}', '(x**2 for x in range(5))'], answer: 1, explain: 'x**2 squares; [] makes a list, {} a set, () a generator.' },
  { id: 'py-dict', topic: 'Python', difficulty: 'easy', q: 'How do you read the value for key "a" in dict d?', options: ['d.a', 'd["a"]', 'd->a', 'd(a)'], answer: 1, explain: 'Dictionaries are indexed by key in square brackets: d["a"].' },
  { id: 'py-append', topic: 'Python', difficulty: 'easy', q: 'Which method adds to the end of a list?', options: ['.add()', '.append()', '.push()', '.insert()'], answer: 1, explain: 'Lists use .append(). Sets use .add(); JS arrays use .push().' },
  { id: 'py-range', topic: 'Python', difficulty: 'medium', q: 'What does range(2, 8, 2) produce?', options: ['2, 4, 6', '2, 4, 6, 8', '2..7', '0, 2, 4, 6'], answer: 0, explain: 'Start 2, step 2, stop 8 (exclusive) → 2, 4, 6.' },
  { id: 'py-fstring', topic: 'Python', difficulty: 'easy', q: 'What is f"{2 + 2}"?', options: ['"2 + 2"', '"4"', '"{4}"', 'Error'], answer: 1, explain: 'f-strings evaluate the expression inside {} → "4".' },
  { id: 'py-in', topic: 'Python', difficulty: 'easy', q: 'What does 3 in [1, 2, 3] return?', options: ['True', 'False', '3', 'Error'], answer: 0, explain: 'in tests membership; 3 is in the list → True.' },
  { id: 'py-strip', topic: 'Python', difficulty: 'easy', q: 'What is " hi ".strip()?', options: ['"hi"', '" hi"', '"hi "', '"  hi  "'], answer: 0, explain: 'strip() removes leading and trailing whitespace.' },
  { id: 'py-split', topic: 'Python', difficulty: 'medium', q: 'What is "a,b,c".split(",")?', options: ["['a', 'b', 'c']", "'abc'", "['a,b,c']", 'Error'], answer: 0, explain: 'split(",") breaks the string on commas into a list of parts.' },
  { id: 'py-none', topic: 'Python', difficulty: 'easy', q: 'What is Python\'s "no value" object?', options: ['null', 'None', 'nil', 'undefined'], answer: 1, explain: 'None represents the absence of a value in Python.' },
  { id: 'py-tuple', topic: 'Python', difficulty: 'medium', q: 'Which of these is immutable?', options: ['list', 'dict', 'tuple', 'set'], answer: 2, explain: 'Tuples cannot be changed after creation; lists/dicts/sets can.' },
  { id: 'py-enumerate', topic: 'Python', difficulty: 'medium', q: 'enumerate(["a", "b"]) yields pairs of…', options: ['(index, value)', '(value, index)', 'just values', 'just indices'], answer: 0, explain: 'enumerate gives (index, value) pairs — handy in for-loops.' },

  // ---- JavaScript ----
  { id: 'js-eqeq', topic: 'JavaScript', difficulty: 'medium', q: 'What does 0 == "0" evaluate to?', options: ['true', 'false', 'Error', 'undefined'], answer: 0, explain: '== coerces types, so "0" becomes 0 → true. Prefer === (false here).' },
  { id: 'js-typeof', topic: 'JavaScript', difficulty: 'medium', q: 'typeof null returns?', options: ['"null"', '"object"', '"undefined"', '"number"'], answer: 1, explain: 'A long-standing JS quirk: typeof null is "object".' },
  { id: 'js-const', topic: 'JavaScript', difficulty: 'easy', q: 'Which keyword prevents reassignment?', options: ['var', 'let', 'const', 'static'], answer: 2, explain: 'const blocks reassignment (object contents can still mutate).' },
  { id: 'js-map', topic: 'JavaScript', difficulty: 'medium', q: '[1,2,3].map(x => x*2) returns?', options: ['[1,2,3]', '[2,4,6]', '6', '[1,4,9]'], answer: 1, explain: 'map() returns a new array with the function applied to each element.' },
  { id: 'js-scope', topic: 'JavaScript', difficulty: 'medium', q: 'let is scoped to the…', options: ['whole function', 'nearest block { }', 'whole file', 'global object'], answer: 1, explain: 'let and const are block-scoped; var is function-scoped.' },
  { id: 'js-json', topic: 'JavaScript', difficulty: 'easy', q: 'What does JSON.parse() do?', options: ['object → string', 'string → object', 'pretty-prints', 'validates a URL'], answer: 1, explain: 'JSON.parse turns a JSON string into a value; JSON.stringify reverses it.' },
  { id: 'js-arrow', topic: 'JavaScript', difficulty: 'hard', q: 'Arrow functions do NOT bind their own…', options: ['name', 'this', 'return value', 'parameters'], answer: 1, explain: 'Arrow functions inherit this from the enclosing scope.' },
  { id: 'js-ternary', topic: 'JavaScript', difficulty: 'easy', q: 'What is `5 > 3 ? "a" : "b"`?', options: ['"a"', '"b"', 'true', 'Error'], answer: 0, explain: 'The condition is true, so the ternary yields the first value, "a".' },
  { id: 'js-push', topic: 'JavaScript', difficulty: 'easy', q: 'Which adds an item to the end of an array?', options: ['.append()', '.push()', '.add()', '.insert()'], answer: 1, explain: 'Arrays use .push() to append; .pop() removes from the end.' },
  { id: 'js-template', topic: 'JavaScript', difficulty: 'easy', q: '`Hi ${name}` is a…', options: ['regex', 'template literal', 'comment', 'tag'], answer: 1, explain: 'Backtick strings are template literals; ${} interpolates values.' },
  { id: 'js-includes', topic: 'JavaScript', difficulty: 'easy', q: 'What does [1,2,3].includes(2) return?', options: ['true', 'false', '"2"', 'Error'], answer: 0, explain: 'includes() checks membership and returns a boolean.' },
  { id: 'js-spread', topic: 'JavaScript', difficulty: 'medium', q: 'What does [...a, ...b] do?', options: ['subtracts b from a', 'concatenates a and b into a new array', 'intersects them', 'errors'], answer: 1, explain: 'The spread operator expands both arrays into a new combined array.' },
  { id: 'js-async', topic: 'JavaScript', difficulty: 'hard', q: 'await can be used inside…', options: ['any function', 'an async function (or a module top level)', 'a for-loop only', 'a class body'], answer: 1, explain: 'await needs an async function (or top-level await in modules).' },
  { id: 'js-length', topic: 'JavaScript', difficulty: 'easy', q: 'What is "abc".length?', options: ['2', '3', '4', 'Error'], answer: 1, explain: '.length is the number of characters — 3.' },

  // ---- HTML ----
  { id: 'html-semantic', topic: 'HTML', difficulty: 'easy', q: 'Which is a semantic element?', options: ['<div>', '<span>', '<article>', '<b>'], answer: 2, explain: '<article> conveys meaning; <div>/<span> are generic.' },
  { id: 'html-anchor', topic: 'HTML', difficulty: 'easy', q: 'Which tag creates a hyperlink?', options: ['<link>', '<a>', '<href>', '<nav>'], answer: 1, explain: '<a href="…"> is the anchor tag. <link> loads resources like CSS.' },
  { id: 'html-alt', topic: 'HTML', difficulty: 'easy', q: 'Which <img> attribute gives alternative text?', options: ['title', 'alt', 'desc', 'caption'], answer: 1, explain: 'alt describes the image for screen readers and broken images.' },
  { id: 'html-ol', topic: 'HTML', difficulty: 'easy', q: 'Which tag is a numbered list?', options: ['<ul>', '<ol>', '<li>', '<dl>'], answer: 1, explain: '<ol> is ordered (numbers); <ul> is bullets; <li> is an item.' },
  { id: 'html-doctype', topic: 'HTML', difficulty: 'medium', q: 'What does <!DOCTYPE html> declare?', options: ['the charset', 'an HTML5 document', 'a comment', 'the CSS version'], answer: 1, explain: 'It tells the browser to use standards mode for HTML5.' },
  { id: 'html-input-email', topic: 'HTML', difficulty: 'medium', q: 'Which input type validates email format?', options: ['text', 'email', 'mail', 'address'], answer: 1, explain: '<input type="email"> validates the format and shows an email keyboard.' },
  { id: 'html-comment', topic: 'HTML', difficulty: 'easy', q: 'How do you write an HTML comment?', options: ['// ...', '/* ... */', '<!-- ... -->', '# ...'], answer: 2, explain: 'HTML comments are wrapped in <!-- and -->.' },
  { id: 'html-get', topic: 'HTML', difficulty: 'medium', q: 'Which form method puts data in the URL?', options: ['POST', 'GET', 'PUT', 'SEND'], answer: 1, explain: 'GET appends form data to the URL as a query string; POST sends it in the body.' },
  { id: 'html-br', topic: 'HTML', difficulty: 'easy', q: 'Which tag is a line break?', options: ['<break>', '<br>', '<lb>', '<newline>'], answer: 1, explain: '<br> inserts a single line break.' },
  { id: 'html-class', topic: 'HTML', difficulty: 'easy', q: 'Which attribute assigns a CSS class?', options: ['id', 'class', 'style', 'name'], answer: 1, explain: 'class="…" hooks an element up to a CSS class selector (.name).' },

  // ---- CSS ----
  { id: 'css-class', topic: 'CSS', difficulty: 'easy', q: 'How do you select elements with class "box"?', options: ['#box', '.box', 'box', '*box'], answer: 1, explain: '. selects by class; # selects by id.' },
  { id: 'css-justify', topic: 'CSS', difficulty: 'medium', q: 'In a default flex row, justify-content aligns along which axis?', options: ['vertical', 'horizontal (main)', 'both', 'none'], answer: 1, explain: 'Default flex-direction is row → justify-content controls the horizontal main axis.' },
  { id: 'css-boxmodel', topic: 'CSS', difficulty: 'medium', q: 'Which is the OUTERMOST box-model layer?', options: ['padding', 'border', 'margin', 'content'], answer: 2, explain: 'Inside-out: content → padding → border → margin.' },
  { id: 'css-color', topic: 'CSS', difficulty: 'easy', q: 'Which property sets text colour?', options: ['text-color', 'color', 'font-color', 'fill'], answer: 1, explain: 'color sets text colour; background-color sets the background.' },
  { id: 'css-display-none', topic: 'CSS', difficulty: 'medium', q: 'What does display: none do?', options: ['hides it and removes it from layout', 'hides but keeps its space', 'greys it out', 'disables clicks only'], answer: 0, explain: 'display:none removes the element entirely; visibility:hidden keeps the space.' },
  { id: 'css-rem', topic: 'CSS', difficulty: 'hard', q: 'A rem unit is relative to…', options: ['the parent font-size', 'the root (html) font-size', 'the viewport width', "the element's own size"], answer: 1, explain: 'rem = root em (relative to <html>). em is relative to the parent.' },
  { id: 'css-id', topic: 'CSS', difficulty: 'easy', q: 'How do you select the element with id "main"?', options: ['.main', '#main', 'main', '*main'], answer: 1, explain: '# selects by id; ids should be unique on a page.' },
  { id: 'css-flex', topic: 'CSS', difficulty: 'medium', q: 'Which display value starts a flexbox?', options: ['block', 'flex', 'grid', 'inline'], answer: 1, explain: 'display: flex makes an element a flex container for its children.' },
  { id: 'css-hover', topic: 'CSS', difficulty: 'easy', q: 'Which selects an element on mouse-over?', options: [':hover', ':click', ':over', ':active'], answer: 0, explain: ':hover styles an element while the pointer is over it.' },
  { id: 'css-important', topic: 'CSS', difficulty: 'medium', q: 'Which forces a declaration to win?', options: ['!force', '!important', '!override', '!win'], answer: 1, explain: '!important raises specificity — use sparingly, it is hard to override.' },

  // ---- SQL ----
  { id: 'sql-select', topic: 'SQL', difficulty: 'easy', q: 'Which statement retrieves data?', options: ['GET', 'SELECT', 'FETCH', 'PULL'], answer: 1, explain: 'SELECT … FROM … reads rows from a table.' },
  { id: 'sql-where', topic: 'SQL', difficulty: 'easy', q: 'Which clause filters rows?', options: ['FILTER', 'WHERE', 'LIMIT', 'ORDER BY'], answer: 1, explain: 'WHERE filters by a condition; ORDER BY sorts; LIMIT caps the count.' },
  { id: 'sql-pk', topic: 'SQL', difficulty: 'medium', q: 'A PRIMARY KEY…', options: ['can repeat across rows', 'uniquely identifies each row', 'must be text', 'is decoration'], answer: 1, explain: 'A primary key is unique and not null — it identifies each row.' },
  { id: 'sql-count', topic: 'SQL', difficulty: 'easy', q: 'What does COUNT(*) return?', options: ['the sum of a column', 'the number of rows', 'distinct values only', 'an error'], answer: 1, explain: 'COUNT(*) counts rows in the result set.' },
  { id: 'sql-join', topic: 'SQL', difficulty: 'medium', q: 'Which combines rows from two tables on a match?', options: ['UNION', 'JOIN', 'MERGE', 'LINK'], answer: 1, explain: 'JOIN matches rows across tables; UNION stacks result sets.' },
  { id: 'sql-orderby', topic: 'SQL', difficulty: 'easy', q: 'Which clause sorts results?', options: ['SORT', 'ORDER BY', 'GROUP BY', 'ARRANGE'], answer: 1, explain: 'ORDER BY sorts rows; add DESC for descending.' },
  { id: 'sql-insert', topic: 'SQL', difficulty: 'easy', q: 'Which statement adds a new row?', options: ['ADD', 'INSERT INTO', 'CREATE ROW', 'PUSH'], answer: 1, explain: 'INSERT INTO table (cols) VALUES (…) adds rows.' },
  { id: 'sql-distinct', topic: 'SQL', difficulty: 'medium', q: 'SELECT DISTINCT …', options: ['removes duplicate rows from the result', 'deletes rows', 'counts rows', 'sorts rows'], answer: 0, explain: 'DISTINCT collapses duplicate rows in the output.' },
  { id: 'sql-groupby', topic: 'SQL', difficulty: 'hard', q: 'GROUP BY is typically used with…', options: ['JOINs only', 'aggregate functions like COUNT/SUM', 'ORDER BY only', 'nothing'], answer: 1, explain: 'GROUP BY collapses rows into groups so aggregates compute per-group.' },

  // ---- C ----
  { id: 'c-char', topic: 'C', difficulty: 'medium', q: 'What is sizeof(char) guaranteed to be?', options: ['1', '2', '4', 'depends on CPU'], answer: 0, explain: 'sizeof(char) is always 1 — the unit other sizes are measured in.' },
  { id: 'c-deref', topic: 'C', difficulty: 'hard', q: 'If int *p; what does *p give you?', options: ['the address of p', 'the value p points to', 'a new pointer', 'the size of an int'], answer: 1, explain: '* dereferences: it reads the value at the address in p. & gives an address.' },
  { id: 'c-strterm', topic: 'C', difficulty: 'medium', q: 'How are C strings terminated?', options: ['with a newline', 'with a null byte \\0', 'with a length prefix', 'they are not'], answer: 1, explain: 'C strings are char arrays ending in \\0.' },
  { id: 'c-printf', topic: 'C', difficulty: 'easy', q: 'Which printf specifier prints an int?', options: ['%s', '%d', '%c', '%f'], answer: 1, explain: '%d prints an int; %s a string, %c a char, %f a float.' },
  { id: 'c-include', topic: 'C', difficulty: 'easy', q: 'What does #include <stdio.h> do?', options: ['runs main()', 'brings in declarations like printf', 'defines a variable', 'is a comment'], answer: 1, explain: 'It includes a header so its functions (e.g. printf) are declared.' },
  { id: 'c-main', topic: 'C', difficulty: 'medium', q: 'main() conventionally returns…', options: ['void', 'an int (0 = success)', 'a string', 'a float'], answer: 1, explain: 'main returns int; 0 signals success to the OS.' },
  { id: 'c-index', topic: 'C', difficulty: 'easy', q: 'The first index of a C array is…', options: ['1', '0', '-1', 'undefined'], answer: 1, explain: 'Arrays are zero-indexed: the first element is arr[0].' },

  // ---- Git ----
  { id: 'git-add', topic: 'Git', difficulty: 'easy', q: 'Which command stages changes?', options: ['git save', 'git add', 'git push', 'git track'], answer: 1, explain: 'git add moves changes into the staging area.' },
  { id: 'git-commit', topic: 'Git', difficulty: 'easy', q: 'What does git commit do?', options: ['uploads to the remote', 'records staged changes into history', 'stages files', 'creates a branch'], answer: 1, explain: 'commit snapshots staged changes locally; push uploads them.' },
  { id: 'git-clone', topic: 'Git', difficulty: 'easy', q: 'git clone <url> …', options: ['copies a remote repo to your machine', 'deletes a repo', 'merges branches', 'renames a repo'], answer: 0, explain: 'clone downloads a full copy of a remote repository.' },
  { id: 'git-merge', topic: 'Git', difficulty: 'medium', q: 'Which command integrates one branch into another?', options: ['git split', 'git merge', 'git fork', 'git clone'], answer: 1, explain: 'git merge brings another branch\'s commits into the current one.' },
  { id: 'git-status', topic: 'Git', difficulty: 'easy', q: 'Which shows which files have changed?', options: ['git list', 'git status', 'git log only', 'git show'], answer: 1, explain: 'git status reports staged, unstaged, and untracked files.' },
  { id: 'git-pull', topic: 'Git', difficulty: 'medium', q: 'What does git pull do?', options: ['uploads commits', 'fetches and merges remote changes', 'deletes a branch', 'stages files'], answer: 1, explain: 'pull = fetch + merge: it brings the remote\'s changes into your branch.' },
  { id: 'git-checkout', topic: 'Git', difficulty: 'medium', q: 'Which switches to another branch (classic command)?', options: ['git switchto', 'git checkout', 'git goto', 'git move'], answer: 1, explain: 'git checkout <branch> switches branches; newer Git also has git switch.' },

  // ---- CS fundamentals ----
  { id: 'cs-bigo', topic: 'CS', difficulty: 'medium', q: 'Time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 1, explain: 'It halves the search space each step → O(log n). Needs sorted input.' },
  { id: 'cs-stack', topic: 'CS', difficulty: 'easy', q: 'A stack is…', options: ['FIFO', 'LIFO', 'sorted', 'random access'], answer: 1, explain: 'Stacks are Last-In-First-Out.' },
  { id: 'cs-queue', topic: 'CS', difficulty: 'easy', q: 'A queue is…', options: ['LIFO', 'FIFO', 'sorted', 'random access'], answer: 1, explain: 'Queues are First-In-First-Out, like a line at a shop.' },
  { id: 'cs-binary', topic: 'CS', difficulty: 'easy', q: 'What is binary 1011 in decimal?', options: ['9', '11', '13', '7'], answer: 1, explain: '8 + 0 + 2 + 1 = 11.' },
  { id: 'cs-byte', topic: 'CS', difficulty: 'easy', q: 'How many bits are in a byte?', options: ['4', '8', '16', '32'], answer: 1, explain: 'A byte is 8 bits.' },
  { id: 'cs-and', topic: 'CS', difficulty: 'easy', q: 'What is (true AND false)?', options: ['true', 'false', 'error', 'null'], answer: 1, explain: 'AND is true only when both operands are true.' },
  { id: 'cs-recursion', topic: 'CS', difficulty: 'medium', q: 'A function that calls itself is…', options: ['iterative', 'recursive', 'static', 'asynchronous'], answer: 1, explain: 'Recursion solves a problem in terms of smaller versions of itself.' },
  { id: 'cs-linear', topic: 'CS', difficulty: 'medium', q: 'Worst case of linear search over n items?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 2, explain: 'You may need to check every element → O(n).' },

  // ---- more ----
  { id: 'py-falsy', topic: 'Python', difficulty: 'medium', q: 'Which of these is falsy in Python?', options: ['"0"', '[]', '"False"', '1'], answer: 1, explain: 'An empty list [] is falsy. Non-empty strings (even "0"/"False") are truthy.' },
  { id: 'py-comment', topic: 'Python', difficulty: 'easy', q: 'How do you start a comment in Python?', options: ['//', '#', '/*', '--'], answer: 1, explain: '# begins a comment to the end of the line.' },
  { id: 'js-filter', topic: 'JavaScript', difficulty: 'medium', q: 'What is [1,2,3,4].filter(x => x % 2 === 0)?', options: ['[2, 4]', '[1, 3]', '[2, 4, 6]', '2'], answer: 0, explain: 'filter keeps elements where the test is true — the even numbers.' },
  { id: 'js-concat', topic: 'JavaScript', difficulty: 'easy', q: 'What is "a" + "b" in JavaScript?', options: ['"ab"', '"a b"', 'Error', '2'], answer: 0, explain: '+ concatenates strings → "ab".' },
  { id: 'html-head', topic: 'HTML', difficulty: 'easy', q: 'Which tag holds metadata not shown on the page?', options: ['<body>', '<head>', '<main>', '<footer>'], answer: 1, explain: '<head> holds title/meta/links; <body> holds visible content.' },
  { id: 'html-strong', topic: 'HTML', difficulty: 'medium', q: 'Which marks text as important (and bold)?', options: ['<b>', '<strong>', '<big>', '<bold>'], answer: 1, explain: '<strong> conveys importance semantically; <b> is just visual bold.' },
  { id: 'css-padding', topic: 'CSS', difficulty: 'medium', q: 'Padding is the space…', options: ['outside the border', 'inside the border, around the content', 'between letters', 'around the page'], answer: 1, explain: 'Padding sits between content and border; margin is outside the border.' },
  { id: 'css-bg', topic: 'CSS', difficulty: 'easy', q: 'Which property sets the background colour?', options: ['color', 'background-color', 'fill', 'bgcolor'], answer: 1, explain: 'background-color sets the background; color sets the text colour.' },
  { id: 'sql-update', topic: 'SQL', difficulty: 'easy', q: 'Which statement changes existing rows?', options: ['ALTER', 'UPDATE', 'MODIFY', 'CHANGE'], answer: 1, explain: 'UPDATE … SET … WHERE … edits rows. ALTER changes table structure.' },
  { id: 'sql-delete', topic: 'SQL', difficulty: 'medium', q: 'Which removes rows from a table?', options: ['DROP', 'DELETE', 'REMOVE', 'CLEAR'], answer: 1, explain: 'DELETE removes rows; DROP removes the entire table.' },
  { id: 'c-while', topic: 'C', difficulty: 'easy', q: 'Which is a loop keyword in C?', options: ['repeat', 'while', 'foreach', 'loop'], answer: 1, explain: 'C has for, while, and do-while loops.' },
  { id: 'git-init', topic: 'Git', difficulty: 'easy', q: 'Which command creates a new repository?', options: ['git start', 'git init', 'git new', 'git create'], answer: 1, explain: 'git init initialises a new repo in the current folder.' },
  { id: 'cs-index', topic: 'CS', difficulty: 'medium', q: 'Accessing an array element by index is…', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], answer: 1, explain: 'Arrays give constant-time O(1) access by index.' },
]
