const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Serve static files from a directory
app.use(express.static(path.join(__dirname, 'files')));

// Define the route for the home page
app.get('/', (req, res) => {
  try {
    // Get the filenames of the three files
    const filenames = ['fileshare-udp.7z', 'fileshare-udp.zip', 'fileshare-udp.tar.gz'];

    // Generate HTML content for the home page
    const html = `
      <h1>Welcome to File Share Server</h1>
      <h2> Note this tool made by PawitSahare and this udpfileshare use for share 8gb file only and package loss guarantee is 55% on low level network env </h2>
      <ul>
        <li><a href="https://github.com/pawitpr/speedtest-udp/raw/main/fileshare-udp.7z">${filenames[0]}</a></li>
        <li><a href="https://github.com/pawitpr/speedtest-udp/raw/main/fileshare-udp.zip">${filenames[1]}</a></li>
        <li><a href="https://github.com/pawitpr/speedtest-udp/raw/main/fileshare-udp.tar.gz">${filenames[2]}</a></li>
      </ul>
    `;

    // Send the HTML content as the response
    res.send(html);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Define the route for downloading files
app.get('/download/:filename', (req, res) => {
  try {
    // Get the requested filename from the URL parameters
    const filename = req.params.filename;

    // Send the requested file as an attachment
    res.download(path.join(__dirname, 'files', filename));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
