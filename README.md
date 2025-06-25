# Memorial Website - In Loving Memory

A beautiful, respectful memorial website created to honor and remember a loved one. This static website features elegant design, photo galleries, memories, and a life timeline.

## Features

- **Elegant Hero Section** - Beautiful landing page with name, dates, and meaningful quote
- **Photo Gallery** - Responsive grid layout for sharing precious memories
- **Memories & Tributes** - Cards displaying heartfelt messages from family and friends
- **Life Timeline** - Chronological display of important life milestones
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Lightweight** - Fast loading with optimized images and minimal dependencies
- **GitHub Pages Ready** - Easy deployment with no complex setup required

## Quick Start

1. **Clone or Download** this repository to your local machine
2. **Customize Content** - Edit the HTML file to add personal information
3. **Add Photos** - Place your photos in the `images/` folder
4. **Deploy** - Upload to GitHub Pages or any web hosting service

## Customization Guide

### 1. Personal Information
Edit `index.html` and replace the placeholder text:

```html
<!-- Replace [Her Name] with the actual name -->
<h2 class="hero-name">[Her Name]</h2>

<!-- Replace with actual dates -->
<p class="hero-dates">[Birth Date] - [Date of Passing]</p>

<!-- Update the quote or use the existing one -->
<p class="hero-quote">"Those we love don't go away, they walk beside us every day."</p>
```

### 2. About Section
Update the description in the about section:

```html
<p class="about-text">
    [Her Name] touched the lives of everyone she met with her warmth, kindness, and beautiful spirit. 
    This memorial website is a tribute to her life and the countless memories we shared together.
</p>
```

### 3. Photo Gallery
- Add your photos to the `images/` folder
- Update the image sources in the HTML:
```html
<img src="images/your-photo.jpg" alt="Memory of [Her Name]" loading="lazy">
<div class="photo-caption">Your photo caption here</div>
```

### 4. Memories & Tributes
Replace the placeholder memories with real ones:

```html
<div class="memory-card">
    <div class="memory-content">
        <p>"Your heartfelt memory or tribute here..."</p>
        <div class="memory-author">- [Person's Name]</div>
    </div>
</div>
```

### 5. Life Timeline
Add important milestones:

```html
<div class="timeline-item">
    <div class="timeline-date">2020</div>
    <div class="timeline-content">
        <h3>Graduation</h3>
        <p>Graduated from university with honors</p>
    </div>
</div>
```

### 6. Hero Background Image
- Add a beautiful background image to `images/hero-bg.jpg`
- This will be used as the hero section background
- Recommended size: 1920x1080px or larger

## File Structure

```
memorial-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── images/             # Photo folder
│   ├── hero-bg.jpg     # Hero background image
│   ├── photo1.jpg      # Gallery photos
│   ├── photo2.jpg
│   └── ...
└── README.md           # This file
```

## Deployment Options

### GitHub Pages (Recommended)

1. **Create a GitHub Repository**
   - Go to GitHub.com and create a new repository
   - Name it something like `memorial-website` or `in-loving-memory`

2. **Upload Files**
   - Upload all files to the repository
   - Make sure `index.html` is in the root directory

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Your Website is Live**
   - GitHub will provide a URL like: `https://yourusername.github.io/repository-name`

### Other Hosting Options

- **Netlify**: Drag and drop the folder to netlify.com
- **Vercel**: Connect your GitHub repository
- **Traditional Web Hosting**: Upload files via FTP
- **Local Testing**: Open `index.html` in any web browser

## Image Optimization

For best performance:

1. **Resize Photos**: Keep gallery images under 800px wide
2. **Compress Images**: Use tools like TinyPNG or ImageOptim
3. **Use WebP Format**: For better compression (with JPG fallback)
4. **Hero Background**: Use a high-quality image (1920x1080px recommended)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization Tips

### Colors
The website uses a gentle color palette:
- Primary Blue: `#3498db`
- Dark Blue: `#2c3e50`
- Light Gray: `#f8f9fa`
- Text Gray: `#555`

To change colors, edit the CSS variables in `styles.css`.

### Fonts
The website uses Google Fonts:
- Headings: Playfair Display (elegant serif)
- Body: Source Sans Pro (clean sans-serif)

### Adding More Sections
You can easily add new sections by copying the existing section structure and updating the content.

## Support

This is a simple, static website designed to be easy to customize and maintain. If you need help with:

- **Customization**: Edit the HTML and CSS files
- **Deployment**: Follow the GitHub Pages instructions above
- **Technical Issues**: Check that all files are in the correct locations

## License

This template is free to use for personal memorial websites. Please respect the memory of loved ones and use this template appropriately.

---

**Created with love and respect for those we remember.** 