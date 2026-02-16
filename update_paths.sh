#!/bin/bash
# Script to update HTML files for proper GitHub Pages path handling

# Add base tag and update CSS/JS paths

echo "Updating HTML files for GitHub Pages deployment..."

# Find all HTML files and process them
find . -name "*.html" | while read file; do
  echo "Processing $file"
  
  # Add <base> tag if it doesn't exist
  if ! grep -q "<base href=\"\.\/\">" "$file"; then
    sed -i '' 's/<head>/<head>\n    <base href=".\/">/' "$file"
    echo "  - Added <base> tag"
  fi
  
  # Update CSS paths
  if grep -q "href=\"css/" "$file"; then
    sed -i '' 's/href="css\//href="\.\/css\//g' "$file"
    echo "  - Updated CSS paths"
  fi
  
  # Update JS paths
  if grep -q "src=\"js/" "$file"; then
    sed -i '' 's/src="js\//src="\.\/js\//g' "$file"
    echo "  - Updated JS paths"
  fi
  
  # Update image paths
  if grep -q "src=\"images/" "$file"; then
    sed -i '' 's/src="images\//src="\.\/images\//g' "$file"
    echo "  - Updated image paths"
  fi
done

echo "All files updated successfully!"
echo "Please commit and push these changes to your GitHub repository."