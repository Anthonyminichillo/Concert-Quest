# Concert Quest: Design Document

_Find live classical music in Boston_

**Team:** Julian Bowen and Jerith Gurusubburam

## Project Description

Concert Quest helps people find live classical music in Boston. The scene is spread across the BSO, conservatories, churches, and small ensembles, and newcomers don't know where to look. Free student recitals are especially hard to find, and performers have few ways to reach people outside their own circles.

The app has two parts: a concert board where performers and organizers post upcoming events, and reviews where attendees share what they thought. Each part has its own MongoDB collection.

No account is needed. Posters add their name and set a passcode to protect their listing. An admin passcode allows moderation of any concert or review.

## User Personas

### Maya, a Newcomer

Maya is a grad student who recently moved to Boston and has started listening to classical music. She wants to try a live concert but finds listings scattered and doesn't know what's affordable or beginner-friendly.

- **Goals:** find affordable concerts nearby, know what to expect before going.
- **Frustrations:** listings are spread across many websites, and major orchestra tickets look expensive.

### Daniel, a Performer

Daniel is a conservatory violin student with a free recital coming up. His school calendar only reaches other students, and he wants a wider audience.

- **Goals:** reach people outside his school, post event details quickly.
- **Frustrations:** social media posts get buried within a day.

### Rosa, a Moderator

Rosa is a longtime concertgoer who keeps the board clean by removing spam and outdated or incorrect posts.

- **Goals:** fix or remove bad posts without needing technical access.
- **Frustrations:** open boards fill up with junk and drive people away.

## User Stories

### Julian Bowen: Concerts

- As Daniel, I want to post a concert with the ensemble, venue, date, program, price, and ticket link, so people outside my school can find it.
- As Maya, I want to browse upcoming concerts sorted by date and filter for free events, so I can find something I can attend soon.
- As Daniel, I want to edit or delete my concert using my passcode, so I can fix mistakes and nobody else can change my listing.

### Jerith Gurusubburam: Reviews

- As Maya, I want to open a concert's page and read reviews from people who attended, so I know what to expect.
- As Maya, I want to write a review with a rating after attending a concert, so I can share my experience.
- As a reviewer, I want to edit or delete my review using my passcode, so I can update or remove it.

### Shared

- As Rosa, I want to use an admin passcode to edit or delete any concert or review, so the board stays accurate and spam-free.

## Design Mockups

### Home Page

Lists upcoming concerts sorted by date, with a free event filter and a button to post a new concert.

![Home page mockup](docs/mockups/home.jpg)

### Post Concert Form

Form for adding a concert: ensemble, venue, date and time, program, price, free event checkbox, ticket link, poster name, and passcode. The same form is reused for editing.

![Post concert form mockup](docs/mockups/post-concert.jpg)

### Concert Detail Page

Shows full concert information, the list of reviews, and a form for writing a review.

![Concert detail page mockup](docs/mockups/concert-detail.jpg)

### Passcode Prompt

Dialog shown when a user clicks edit or delete on a concert or review. Accepts the post's passcode or the admin passcode.

![Passcode prompt mockup](docs/mockups/passcode-prompt.jpg)
