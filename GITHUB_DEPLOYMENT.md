# GitHub Pages Deployment Guide

This guide will help you successfully deploy this AI Pricing application to GitHub Pages with proper rendering.

## Path Issues in GitHub Pages

GitHub Pages can sometimes have issues with file paths when deployed. This is usually because:

1. GitHub Pages hosts your site at a base URL like `username.github.io/repository-name/` instead of at the root `/`
2. Relative paths might need to be adjusted to account for this base path

## Step-by-Step Deployment Guide

### 1. Create a GitHub Repository

Create a new repository on GitHub (e.g., `AI_Pricing_Deploy`).

### 2. Upload or Push the Files

Either:
- Use GitHub's web interface to upload the files
- Or push via Git command line:
  ```
  cd /Users/vishal.dubey2/Desktop/AI_Pricing_Deploy
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/AI_Pricing_Deploy.git
  git push -u origin main
  ```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to "GitHub Pages" section
4. Select the branch you want to deploy (usually `main`)
5. Select the folder (usually `/` root)
6. Click "Save"

GitHub will provide you with a URL where your site is published (usually `https://YOUR_USERNAME.github.io/AI_Pricing_Deploy/`).

### 4. Fix Any Path Issues

If you notice rendering issues with the deployed site (styles or scripts not loading):

1. Check browser console for 404 errors on resources
2. Update paths in HTML files to use relative paths with `./` prefix:
   - Example: change `href="css/styles.css"` to `href="./css/styles.css"`
   - Example: change `src="js/scenarios.js"` to `src="./js/scenarios.js"`

3. Add a `<base>` tag to the HTML files:
   ```html
   <head>
     <base href="./">
     <!-- other head elements -->
   </head>
   ```

4. Commit and push the changes:
   ```
   git add .
   git commit -m "Fix paths for GitHub Pages"
   git push
   ```

### 5. Advanced: Use Jekyll's `site.baseurl`

If you're still having issues, you can use Jekyll's site.baseurl feature:

1. Create a `_config.yml` file in your repository root:
   ```yaml
   baseurl: "/AI_Pricing_Deploy"
   ```

2. Update your HTML files to use this baseurl:
   ```html
   <link rel="stylesheet" href="{{ site.baseurl }}/css/styles.css">
   <script src="{{ site.baseurl }}/js/scenarios.js"></script>
   ```

## Troubleshooting

If you're still experiencing issues:

1. Check that all file paths use relative notation (`./`)
2. Verify case sensitivity (GitHub Pages is case-sensitive)
3. Make sure all referenced files exist in the repository
4. Check browser console for specific 404 errors
5. Try adding `.nojekyll` file to the repository root if using custom front-end frameworks

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)