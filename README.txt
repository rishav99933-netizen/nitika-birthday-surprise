# Birthday Surprise Website

## Run it on Windows

1. Install Python if you have not already.
2. Open this folder in VS Code.
3. Open Terminal in this folder.
4. Run:

   ```bash
   python -m pip install flask
   python app.py
   ```

5. Open http://127.0.0.1:5000 in your browser.

## Personalise it

- Open `static/js/script.js` and change `const NAME="Apeksha";` to the birthday girl's name.
- To add a photo, create `static/images/`, put your photo there as `memory.jpg`, then uncomment the two photo lines near the bottom of `script.js`.
- Edit the letter text in `templates/index.html`.
- The website needs an internet connection for the Google Fonts; the rest runs locally.

This is a recreated, editable version inspired by the supplied reel. The original reel's exact source code/assets were not available, so the page is recreated with similar scenes and interactions rather than a byte-for-byte copy.
