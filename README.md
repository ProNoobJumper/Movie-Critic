# CineCritic - Movie Rating API

A lightweight backend API to manage a movie catalog with ratings, built using Node.js, Express.js, and MongoDB.

## Features

- ✅ Full CRUD operations for movies
- ✅ Movie validation and business rules
- ✅ Custom middleware (logging, validation, error handling)
- ✅ Special endpoints for top-rated movies and category filtering
- ✅ MVC architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Installation

1. Navigate to the CineCritic folder:

```bash
cd CineCritic
```

2. Install dependencies:

```bash
npm install
```

3. Start MongoDB locally (if using local MongoDB)

4. Start the server:

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### CRUD Operations

| Method | Endpoint          | Description     |
| ------ | ----------------- | --------------- |
| POST   | `/api/movies`     | Add a new movie |
| GET    | `/api/movies`     | Get all movies  |
| GET    | `/api/movies/:id` | Get movie by ID |
| PUT    | `/api/movies/:id` | Update a movie  |
| DELETE | `/api/movies/:id` | Delete a movie  |

### Special Endpoints

| Method | Endpoint                         | Description                  |
| ------ | -------------------------------- | ---------------------------- |
| GET    | `/api/movies/top-rated`          | Get movies with rating ≥ 8.5 |
| GET    | `/api/movies/category/:category` | Get movies by category       |

## Movie Schema

```json
{
  "title": "string (required)",
  "category": "string (required)",
  "releaseYear": "number (required, min: 1900)",
  "rating": "number (required, 0-10)",
  "isFeatured": "boolean (optional, default: false)"
}
```

## Example Usage

### Add a Movie

```bash
POST /api/movies
{
  "title": "The Dark Knight",
  "category": "Action",
  "releaseYear": 2008,
  "rating": 9.0,
  "isFeatured": true
}
```

### Get Top-Rated Movies

```bash
GET /api/movies/top-rated
```

### Get Movies by Category

```bash
GET /api/movies/category/Action
```

## Advanced Filtering

The GET `/api/movies` endpoint supports advanced filtering with query parameters:

### Query Parameters

| Parameter | Description                              | Example      |
| --------- | ---------------------------------------- | ------------ |
| `name`    | Search by movie title (case-insensitive) | `?name=dark` |
| `year`    | Filter by release year                   | `?year=2008` |
| `sort`    | Sort alphabetically (`asc` or `desc`)    | `?sort=asc`  |
| `limit`   | Limit number of results                  | `?limit=3`   |

### Advanced Filtering Examples

```bash
# Search for movies with "dark" in title
GET /api/movies?name=dark

# Get movies from 2008
GET /api/movies?year=2008

# Get top 3 movies sorted alphabetically
GET /api/movies?limit=3&sort=asc

# Combined filters: movies with 'a' in name, from 2023, top 3, sorted A-Z
GET /api/movies?name=a&year=2023&limit=3&sort=asc

# Get all movies sorted Z-A
GET /api/movies?sort=desc
```

## Validation Rules

- All fields (title, category, releaseYear, rating) are required
- Rating must be between 0 and 10
- Release year must be 1900 or later
- Duplicate titles are not allowed (case-insensitive)

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Team Members

- **Sankalp**
