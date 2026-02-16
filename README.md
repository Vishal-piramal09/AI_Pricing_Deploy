# AI Pricing Scenario Application

This is an interactive web application for AI-driven pricing scenarios and deviation management. The application allows users to explore different pricing scenarios, understand their impacts, and make informed commercial decisions.

## Application Structure

- **index.html**: Main landing page
- **rm-interface.html**: Relationship Manager interface
- **approver-interface.html**: Approver Portal interface  
- **mobile-single-screen.html**: Mobile-optimized interface
- **mobile-approver-interface.html**: Mobile approver interface
- **css/**: Contains styling files
- **js/**: Contains JavaScript logic

## Local Development

To run this application locally:

```bash
# Navigate to the project directory
cd /path/to/AI_Pricing_Deploy

# Start a local HTTP server (Python 3)
python -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in your web browser.

## Deployment Options

The application is ready for deployment using any of the following methods:

### 1. GitHub Pages (Recommended)

1. Create a new GitHub repository
2. Push the contents of this folder to the repository
3. Enable GitHub Pages in the repository settings
4. The site will be available at https://{username}.github.io/{repository-name}

### 2. Netlify

1. Create an account at [Netlify](https://www.netlify.com/)
2. Drag and drop this folder onto the Netlify dashboard
3. Your site will be deployed with a unique URL

### 3. Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to this directory and run `vercel`
3. Follow the prompts to deploy

### 4. AWS S3 Static Website Hosting

1. Create an S3 bucket
2. Enable static website hosting
3. Upload all files in this directory to the bucket
4. Configure bucket permissions

## Features

- Interactive pricing scenario exploration
- Deviation impact analysis
- Mobile responsive design
- Relationship Manager and Approver interfaces

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge