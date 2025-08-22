# Portfolio Website

A clean, responsive portfolio website built with HTML, CSS, and JavaScript.

## Features

- **12 Projects**: Each project has its own row with 5 images
- **Gallery Navigation**: Left/right arrows and dot indicators for each project
- **Responsive Design**: Breakpoints at 1920px, 1440px, 1280px, and 375px mobile
- **Typography**: Instrument Serif Italic for titles, Inter for body text
- **Easy Customization**: Simple structure for adding/removing projects and images

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Responsive CSS with breakpoints
├── gallery-manager.js  # Handles image navigation
├── main.js            # Core functionality (email copy)
├── media/             # Images and media files
└── README.md          # This file
```

## How to Add/Remove Projects

### Adding a New Project

1. Copy an existing project section in `index.html`
2. Update the `data-project` attribute to the next number
3. Update all function calls (`previousImage()`, `nextImage()`, `goToImage()`)
4. Update image sources and alt text
5. Add the project to the `initializeProjects()` function in `gallery-manager.js`

### Removing a Project

1. Delete the project section from `index.html`
2. Remove the project from `projectStates` in `gallery-manager.js`
3. Renumber remaining projects if needed

## How to Add/Remove Images

### Adding More Images

1. Add new `<img>` elements to the project's `.image-container`
2. Add corresponding dots to `.gallery-dots`
3. Update the navigation logic in `gallery-manager.js` (change the `5` to your new total)

### Removing Images

1. Remove `<img>` elements from `.image-container`
2. Remove corresponding dots from `.gallery-dots`
3. Update the navigation logic in `gallery-manager.js`

## Replacing Placeholder Images

1. Replace the placeholder images in the `media/` folder
2. Update the `src` attributes in `index.html` to point to your actual images
3. Ensure images are properly sized (recommended: 1200x800px minimum)

## Responsive Breakpoints

- **1920px+**: Large desktop displays
- **1440px**: Standard desktop displays
- **1280px**: Small desktop/laptop displays
- **768px and below**: Mobile devices

## Browser Support

- Modern browsers with ES6+ support
- Fallback clipboard functionality for older browsers
- Responsive design works on all screen sizes

## Customization

### Colors
The current color scheme uses:
- Background: `#f5f5f5`
- Text: `#000` (black)
- UI elements: `#e0e0e0` (light gray)
- Active states: `#666` (dark gray)

### Fonts
- **Titles**: Instrument Serif (italic)
- **Body**: Inter (various weights)

## Keyboard Navigation

- **Left Arrow**: Previous image in current project
- **Right Arrow**: Next image in current project

## Contact

The email button automatically copies the email address to the clipboard when clicked.
