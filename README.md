**`README.md`**

````md
# MovieHub

A movie discovery dashboard built with React, TypeScript, Vite, and Tailwind CSS v4.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v6
- TanStack Query v5
- Axios
- TMDB API

## Features

- Browse Now Playing, Popular, Top Rated, and Upcoming movies
- Search and filter by genre, year, rating, and sort order
- View detailed movie info (cast, runtime, budget, revenue)
- Responsive sidebar navigation with active route highlighting
- Smart caching with TanStack Query
- Type-safe throughout with TypeScript

## Setup

### 1. Get a TMDB API key

- Create a free account at [themoviedb.org](https://www.themoviedb.org)
- Go to **Settings → API**
- Copy your **API Key (v3 auth)**

### 2. Clone and install

```bash
git clone <your-repo-url>
cd moviehub
npm install
```
````

### 3. Set up your API key

Create a `.env` file in the root directory and add your key:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |

## Environment Variables

| Variable            | Description       | Required |
| ------------------- | ----------------- | -------- |
| `VITE_TMDB_API_KEY` | Your TMDB API key | ✅ Yes   |

## Project Structure

```
src/
├── api/
│   └── tmdb.ts          # Axios client and all fetch functions
├── hooks/
│   └── useMovies.ts     # TanStack Query hooks
├── types/
│   └── index.ts         # TypeScript interfaces
├── components/
│   ├── ui/
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── SearchBar.tsx
│   └── movie/
│       ├── MovieCard.tsx
│       ├── MovieCardSkeleton.tsx
│       ├── MovieGrid.tsx
│       └── MovieSection.tsx
└── pages/
    ├── HomePage.tsx
    ├── SearchPage.tsx
    ├── MovieDetailPage.tsx
    └── ListPage.tsx
```

## Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons by [Lucide React](https://lucide.dev/)

```

```
