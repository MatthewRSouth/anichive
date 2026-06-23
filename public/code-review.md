## APP

- stark lack of documentation throughout the app. Nothing is really explained
- variable names aren't as clear as they should be such as searchUrl, results (what do these do?)
- Function names are decently descriptive and follow best practices
- Semantic HTML is used well, but lack of footer
- Many props in one, could should probably extract them to an object
- DiscoverView and BrowseView should be in their own files, not at the bottom of app. Only makes it unnecessarily long

# Anime Card

- again stark lack of documentation, if someone else read this they may not be able to understand, or if I came back to edit something it would be difficult to find.
- comments should explain why something is there,not what they are.
- not sure if there is a more semantic version of li that I should utilize.
- variable names need work as I someone may not know what generic rating is

# Anime Modal

- variable names aren't bad, and are descriptive
- mix of tailwind and css is odd in the app, should have picked one (tailwind) from the beginning and stuck with it
- each .map should be in it's own component, it's making the file uneededly long
- the detail component probably isn't needed, but it was nice to practice a reusable component. There is a need to be more proactive with other reusable parts
- Feels like anime modal crammed everything in when it should have been split up into mutliple files.

# Empty

- Need more descriptive component name

# Hero

- Feel like I could have made anime information into a component or at least made the anime card more editable in appearence to not repeat my self so much
- again .maps should be in their own component (anime studios)

# Navigation

- Well thoughout out and has good naming conventions

# Now Airing

- no loading or error states used

# Pagination

- Personally least understood area of the project.
- mix of tailwind and reuglar css, pick one

# Top Anime

- could put TopAnime and TopAiring Anime in their own files. They are robust enough to be their own components
- .map needs its own component
- first time using a ref, haven't learned these formally yet, but it was nice and easy to use.
- a lot of data being flowed into this component, could make it look nicer in code.

# Constraints for Project 2 derived from Jikan code review

- "Each .map should be in its own component" → Project 2 forces you to extract small presentational components from the start.
- "Mix of Tailwind and CSS, should have picked one" → Project 2 commits to one styling approach upfront, with no fallback.
- "DiscoverView and BrowseView should be in their own files" → Project 2 starts with proper file organization, not as a refactor.
- "Many props in one, should extract to an object" → Project 2 forces you to think about prop interfaces (especially under TypeScript, where you'll define an explicit interface).
- "Stark lack of documentation" → Project 2 includes a documentation discipline from day one.
- "Pagination: personally least understood" → Project 2 includes a feature that uses pagination heavily so you can drill it.

# GOOD

- useFetch custom hook abstraction (debounce, cancellation, caching)
- The result-keyed-by-URL pattern (the result.url === url check) for handling race conditions
- The module-scope Map cache pattern
- The IntersectionObserver-gated fetches (lazy loading off-screen sections)
- The staggered debounce approach to rate limiting
- Component naming follows convention
- Semantic HTML usage (you noted this)

# skills to work on

- Refs (first time using them, haven't learned formally)
- Pagination (least understood area)
- variable naming
- React conventions
