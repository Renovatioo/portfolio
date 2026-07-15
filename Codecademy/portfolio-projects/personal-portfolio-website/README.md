# Personal Portfolio Website

This is a static personal portfolio website built for the Codecademy portfolio project.

## Structure

- `index.html` is the home page with the hero, about text, and project cards.
- `contact.html` is the contact page with the profile photo and contact details.
- `styles.css` contains all layout, theme, responsive, and animation styling.
- `script.js` renders the shared header/footer and contains the dark mode toggle and animated background canvas.
- `images/` contains project illustrations and the profile photo.

## Project objectives

- Build a website using HTML and CSS
- Add at least one interactive feature using JavaScript
- Use Git version control
- Develop locally on a computer
- Prepare the site for GitHub Pages

## Pages

- `index.html` shows featured projects
- `contact.html` shows contact information

## Interactive feature

The navigation includes a button that switches the site between light mode and dark mode.

## Maintenance notes

- `script.js` renders the shared header and footer into `#site-header` and `#site-footer`. Add those placeholders to future pages instead of copying navigation/footer markup.
- CSS and JS links use query strings such as `?v=shared-layout` to avoid GitHub Pages/browser caching old files. Change the query string when editing `styles.css` or `script.js`.
- `html { scrollbar-gutter: stable; }` prevents the header from shifting between pages with different scroll heights.
- The canvas animation is decorative. Keep important content in HTML, not inside the canvas.
- The project is intentionally plain HTML, CSS, and JavaScript so it stays close to the Codecademy project level and remains easy to extend.
