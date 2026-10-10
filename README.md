# Concert Quest

Find live classical music in Boston. CS5610 Project 2: Node + Express + MongoDB
backend with a vanilla JavaScript, client-side rendered frontend.

- **Authors:** Julian Bowen and Jerith Gurusubburam
- **Class link:** https://johnguerra.co/classes/webDevelopment_online_fall_2026/index.html
- **Live site:** TODO
- **Design document:** [docs/DESIGN.md](docs/DESIGN.md)
- **Demo video:** TODO
- **Slides:** TODO

## Project Objective

TODO

## Screenshot

TODO: `docs/screenshot.png`

## Instructions to Build

Requires Node 22.9+ and a MongoDB database (Atlas or local).

```bash
npm install
cp .env.example .env   # then fill in MONGO_URI and ADMIN_PASSCODE
npm run dev            # http://localhost:3000, restarts on save
```

Before committing:

```bash
npm run format  # Prettier, writes in place
npm run check   # Prettier + ESLint, read-only
```

## How to Use

TODO

## Project Structure

```
backend/
  server.js           Express app: serves frontend/ and mounts /api routes
  db/connection.js    Mongo connector (the only file that reads MONGO_URI)
  db/concerts.js      concerts collection (Julian Bowen)
  db/reviews.js       reviews collection (Jerith Gurusubburam)
  routes/concerts.js  /api/concerts CRUD (Julian Bowen)
  routes/reviews.js   /api/reviews CRUD (Jerith Gurusubburam)
  passcode.js         poster/admin passcode check, shared by both routers
frontend/
  index.html          concert list + free filter
  concert-form.html   post / edit a concert
  concert.html        concert detail, reviews, review form, passcode dialog
  css/                base.css + one file per component
  js/                 api.js, passcode-dialog.js, one entry module per page
docs/DESIGN.md        design document
```

## Use of GenAI Tools

TODO

## Checklist

Tracking the assignment rubric.

- [x] Design document (description, personas, user stories, mockups)
- [ ] Accomplishes all approved requirements
- [ ] Usable, with instructions
- [ ] Useful to a real user
- [x] ESLint config, no errors
- [x] Code organized: each page its own file, DB separate, CSS in folders
- [x] JS organized in modules (DB connector, API client)
- [ ] Client-side rendering with vanilla JS only
- [ ] At least one form
- [ ] Deployed on a public server
- [ ] 2 Mongo collections with full CRUD (concerts, reviews)
- [x] Node + Express
- [x] Formatted with Prettier
- [x] Standard tags only (no `div` buttons; passcode prompt uses `<dialog>`)
- [x] CSS organized by module
- [ ] README: author, class link, objective, screenshot, build instructions
- [x] No exposed secrets (`.env` is gitignored, `.env.example` committed)
- [x] `package.json` listing dependencies
- [x] MIT license
- [ ] No leftover unused code
- [ ] Google Form submission
- [ ] Short public narrated video
- [ ] Code frozen 24 hours before class
- [x] ES modules only, no `require`
- [x] No Mongoose, no template engines
- [ ] Code review completed

## License

[MIT](LICENSE)
