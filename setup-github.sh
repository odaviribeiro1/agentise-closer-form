#!/bin/bash

echo "🚀 Agentise Closer Form - GitHub Setup"
echo "========================================"
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Install it with: brew install gh"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "🔐 GitHub CLI needs authentication"
    echo "Run: gh auth login"
    gh auth login
fi

# Create the repository
echo "📦 Creating GitHub repository..."
gh repo create agentise-closer-form --source=. --remote=origin --push --public

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Repository created successfully!"
    echo "📍 View your repository: https://github.com/$(gh api user -q .login)/agentise-closer-form"
else
    echo "❌ Failed to create repository"
    echo ""
    echo "You can manually create the repository on GitHub and then run:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/agentise-closer-form.git"
    echo "  git push -u origin main"
fi
