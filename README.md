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

## How to Add/Remove Images and Videos

### Adding More Media

1. Add new `<img>` or `<video>` elements to the project's `.image-container`
2. Add corresponding dots to `.gallery-dots`
3. Update the navigation logic in `gallery-manager.js` (change the `5` to your new total)

### Removing Media

1. Remove `<img>` or `<video>` elements from `.image-container`
2. Remove corresponding dots from `.gallery-dots`
3. Update the navigation logic in `gallery-manager.js`

### Video Support

- Videos automatically loop, play without sound, and have no controls
- Use `<video>` tags with `autoplay muted loop playsinline` attributes
- Videos pause when not active and reset to beginning
- Supported formats: MP4, WebM, OGV

## Replacing Media Files

### Image Naming Convention

Images should follow this naming pattern:
- `1.1.png`, `1.2.png`, `1.3.png`, `1.4.png`, `1.5.png` (Project 1)
- `2.1.png`, `2.2.png`, `2.3.png`, `2.4.png`, `2.5.png` (Project 2)
- And so on...

### Adding Your Media

1. **Images**: Upload PNG, JPG, or WebP files to the `media/` folder
2. **Videos**: Upload MP4, WebM, or OGV files to the `media/` folder
3. **Update HTML**: Change the `src` attributes in `index.html` to match your file names
4. **Video Elements**: For videos, use `<video>` tags with `autoplay muted loop playsinline`

### Recommended Specifications

- **Images**: 1200x800px minimum, PNG or JPG format
- **Videos**: 1200x800px minimum, MP4 format, optimized for web

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

## Navigation

### Keyboard Navigation
- **Left Arrow**: Previous image in current project
- **Right Arrow**: Next image in current project

### Drag/Swipe Navigation
- **Mouse**: Click and drag left/right on any project image
- **Touch**: Swipe left/right on any project image
- **Threshold**: Minimum 50px drag distance required to trigger slide
- **Direction**: Horizontal drag takes priority over vertical drag

### Custom Cursor Navigation
- **Desktop Only**: Custom cursor with navigation hints
- **Left Half**: Cursor shows left arrow (←) for previous image
- **Right Half**: Cursor shows right arrow (→) for next image
- **Click Navigation**: Click left/right half of image to navigate
- **Mobile**: Custom cursor automatically disabled, native cursor restored
- **Visual Feedback**: Smooth cursor animations and navigation indicators
- **Push Transitions**: Smooth slide animations when switching between images

## Contact

The email button automatically copies the email address to the clipboard when clicked.
