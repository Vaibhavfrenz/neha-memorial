# GitHub Pages Deployment Guide

This guide will walk you through deploying your memorial website to GitHub Pages, which is free and perfect for static websites.

## Step 1: Create a GitHub Account

If you don't have a GitHub account:
1. Go to [github.com](https://github.com)
2. Click "Sign up" and create an account
3. Verify your email address

## Step 2: Create a New Repository

1. **Log into GitHub**
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Fill in the details:**
   - Repository name: `memorial-website` (or any name you prefer)
   - Description: `A memorial website in loving memory`
   - Make it **Public** (required for free GitHub Pages)
   - **Don't** initialize with README (we'll upload our files)
5. **Click "Create repository"**

## Step 3: Upload Your Files

### Option A: Using GitHub Web Interface

1. **In your new repository**, click "uploading an existing file"
2. **Drag and drop** all your files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `DEPLOYMENT.md`
   - The entire `images/` folder
3. **Add a commit message** like "Initial upload of memorial website"
4. **Click "Commit changes"**

### Option B: Using Git (if you're familiar with it)

```bash
# Clone the repository
git clone https://github.com/yourusername/memorial-website.git

# Copy your files into the folder
# (copy all files from your local folder to this git folder)

# Add and commit files
git add .
git commit -m "Initial upload of memorial website"
git push origin main
```

## Step 4: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** (tab at the top)
3. **Scroll down** to "Pages" section (in the left sidebar)
4. **Under "Source"**, select "Deploy from a branch"
5. **Under "Branch"**, select "main" and "/ (root)"
6. **Click "Save"**

## Step 5: Your Website is Live!

1. **Wait a few minutes** for GitHub to build your site
2. **You'll see a message** like "Your site is published at https://yourusername.github.io/memorial-website"
3. **Click the link** to view your website!

## Step 6: Custom Domain (Optional)

If you want to use a custom domain (like `www.yourdomain.com`):

1. **Buy a domain** from a domain registrar (GoDaddy, Namecheap, etc.)
2. **In your repository Settings → Pages**
3. **Add your domain** in the "Custom domain" field
4. **Create a CNAME file** in your repository with your domain name
5. **Update your domain's DNS** to point to `yourusername.github.io`

## Troubleshooting

### Website Not Loading
- **Check the URL**: Make sure you're using the correct GitHub Pages URL
- **Wait longer**: Sometimes it takes 5-10 minutes for the first deployment
- **Check repository settings**: Ensure Pages is enabled and set to the main branch

### Images Not Showing
- **Check file paths**: Make sure images are in the `images/` folder
- **Check file names**: Ensure they match exactly (case-sensitive)
- **Check file formats**: Use .jpg, .png, or .gif

### Styling Issues
- **Check file names**: Ensure `styles.css` is named correctly
- **Check file location**: Make sure it's in the root directory
- **Clear browser cache**: Try refreshing with Ctrl+F5

## Updating Your Website

To make changes to your website:

1. **Edit files locally** on your computer
2. **Upload the updated files** to GitHub (same process as Step 3)
3. **Changes will automatically deploy** within a few minutes

## Alternative Hosting Options

If GitHub Pages doesn't work for you:

### Netlify (Very Easy)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your website folder
3. Get a URL instantly

### Vercel (Also Easy)
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Automatic deployments

### Traditional Web Hosting
- Upload files via FTP to any web hosting service
- Most hosting providers support static websites

## Need Help?

- **GitHub Pages Documentation**: [pages.github.com](https://pages.github.com)
- **GitHub Support**: [help.github.com](https://help.github.com)
- **Community Forums**: Stack Overflow, Reddit r/webdev

---

**Your memorial website will be a beautiful tribute that can be shared with family and friends around the world.** 