# YouTube Playlist Time Calculator

A simple web application that calculates the total duration of a YouTube playlist by fetching video lengths and summing them up.

## Features
- Input a YouTube playlist URL to get the total duration.
- Displays the total time in hours, minutes, and seconds.
- Handles long playlists efficiently.
- User-friendly interface with minimal design.
- API key is required but has been removed for security reasons.

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Manan-Singh10/YouTube-Playlist-Time-Calculator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd YouTube-Playlist-Time-Calculator
   ```
3. Install dependencies (if applicable):
   ```bash
   npm install  # or yarn install (if using package manager)
   ```
4. Add your YouTube API key:
   - Create a `.env` file in the root directory.
   - Add your API key as:
     ```env
     REACT_APP_YOUTUBE_API_KEY=your_api_key_here
     ```

## Usage
1. Start the application:
   ```bash
   npm start  # or yarn start
   ```
2. Enter a YouTube playlist URL in the input field.
3. Click on the "Calculate" button to fetch and display the total duration.

## Limitations
- Requires a valid YouTube Data API key.
- Limited by YouTube API quota restrictions.
- Does not support private playlists.

## Future Improvements
- Enhance UI/UX with a more interactive design.
- Improve error handling for invalid/empty inputs.
- Add support for multiple playlists.
- Optimize API calls to reduce quota usage.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any inquiries, you can reach out via GitHub Issues.

