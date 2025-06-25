# Images Folder

Place your photos and images in this folder.

## Required Images

### hero-bg.jpg
- **Purpose**: Background image for the hero section
- **Recommended size**: 1920x1080px or larger
- **Format**: JPG or PNG
- **Description**: A beautiful, meaningful image that represents the person being remembered

### Gallery Photos
- **File names**: photo1.jpg, photo2.jpg, photo3.jpg, etc.
- **Recommended size**: 800px wide maximum
- **Format**: JPG or PNG
- **Description**: Photos to be displayed in the gallery section

## Image Optimization Tips

1. **Resize photos** to appropriate dimensions before uploading
2. **Compress images** using tools like:
   - TinyPNG (tinypng.com)
   - ImageOptim (for Mac)
   - FileOptimizer (for Windows)
3. **Use descriptive file names** that are easy to identify
4. **Keep file sizes under 500KB** for gallery images
5. **Use JPG format** for photographs, PNG for graphics with transparency

## Example Structure

```
images/
├── hero-bg.jpg          # Hero background image
├── photo1.jpg           # Gallery photo 1
├── photo2.jpg           # Gallery photo 2
├── photo3.jpg           # Gallery photo 3
├── photo4.jpg           # Gallery photo 4
├── photo5.jpg           # Gallery photo 5
├── photo6.jpg           # Gallery photo 6
└── README.md            # This file
```

## Updating the HTML

After adding your images, update the `index.html` file to reference the correct image files:

```html
<!-- For the hero background -->
<div class="hero" style="background-image: url('images/your-hero-image.jpg')">

<!-- For gallery photos -->
<img src="images/your-photo.jpg" alt="Description of the photo">
```

Remember to update the alt text for accessibility and SEO purposes. 