# emoji-reaction-board

for an "Public Post Board" app, that should:
- allow users to create accounts
- allow logged in users to make posts {title, body, data, author}
- allow logged in users to toggle emoji-react to a post (not more than one of the same emoji per user per post though)
- allow anyone to view all posts, sorted by date, with emoji reaction counts per emoji
- allow post author to delete post

All of this in a single page with the posts, and a new post/draft thing on top, keep the login/logout section in a modal triggered by a button in top right corner, or when an login-required action (like clicking Post, or emoji) is attempted. Also have nice clean small header with app title.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/emoji-reaction-board.git
cd emoji-reaction-board
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
