# YouTube Download API

A simple API for downloading YouTube videos as MP3 or MP4 files.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Generate API Key
`POST /generate-key`

Response:
```json
{
  "apiKey": "your-api-key"
}
```

### Download MP3
`GET /download/mp3?url=YOUTUBE_URL`

Headers:
```
x-api-key: YOUR_API_KEY
```

### Download MP4
`GET /download/mp4?url=YOUTUBE_URL`

Headers:
```
x-api-key: YOUR_API_KEY
```

## Example Usage

1. Generate an API key:
   ```bash
   curl -X POST http://localhost:3000/generate-key
   ```

2. Download MP3:
   ```bash
   curl -H "x-api-key: YOUR_API_KEY" -o audio.mp3 "http://localhost:3000/download/mp3?url=YOUTUBE_URL"
   ```

3. Download MP4:
   ```bash
   curl -H "x-api-key: YOUR_API_KEY" -o video.mp4 "http://localhost:3000/download/mp4?url=YOUTUBE_URL"
