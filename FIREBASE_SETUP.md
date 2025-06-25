# Firebase Setup Guide for Neha Memorial Website

This guide will help you set up Firebase to enable real-time sharing of candles, photos, and memories across all visitors.

## Step 1: Create Firebase Project

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Click "Create a project"**
3. **Enter project name**: `neha-memorial-website`
4. **Enable Google Analytics** (optional but recommended)
5. **Click "Create project"**

## Step 2: Add Web App

1. **Click the web icon** (</>) to add a web app
2. **App nickname**: `neha-memorial`
3. **Click "Register app"**
4. **Copy the Firebase config** (you'll need this for the next step)

## Step 3: Update Firebase Configuration

1. **Open `firebase-config.js`** in your project
2. **Replace the placeholder values** with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

## Step 4: Enable Firestore Database

1. **In Firebase Console**, go to "Firestore Database"
2. **Click "Create database"**
3. **Choose "Start in test mode"** (for now)
4. **Select a location** (choose closest to your visitors)
5. **Click "Done"**

## Step 5: Enable Storage

1. **In Firebase Console**, go to "Storage"
2. **Click "Get started"**
3. **Choose "Start in test mode"** (for now)
4. **Select a location** (same as Firestore)
5. **Click "Done"**

## Step 6: Set Up Security Rules

### Firestore Rules
1. **Go to Firestore Database → Rules**
2. **Replace with these rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
    }
    
    // Allow write access to candles, photos, and memories
    match /candles/{document} {
      allow write: if true;
    }
    
    match /photos/{document} {
      allow write: if true;
    }
    
    match /memories/{document} {
      allow write: if true;
    }
  }
}
```

### Storage Rules
1. **Go to Storage → Rules**
2. **Replace with these rules**:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read access to all files
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Allow upload to photos folder
    match /photos/{allPaths=**} {
      allow write: if request.resource.size < 5 * 1024 * 1024 // 5MB limit
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

## Step 7: Deploy Your Website

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add Firebase integration for real-time features"
   git push origin master
   ```

2. **Wait for GitHub Pages to deploy** (2-5 minutes)

## Step 8: Test the Features

1. **Visit your website**: `https://vaibhavfrenz.github.io/neha-memorial`
2. **Try lighting a candle** - it should appear for all visitors
3. **Upload a photo** - it should be visible to everyone
4. **Add a memory** - it should show up in real-time

## Troubleshooting

### If features don't work:
1. **Check browser console** for errors
2. **Verify Firebase config** in `firebase-config.js`
3. **Check Firestore rules** are set to allow read/write
4. **Check Storage rules** allow photo uploads

### Common Issues:
- **"Firebase not initialized"**: Check if Firebase SDK is loading
- **"Permission denied"**: Check Firestore/Storage rules
- **"Upload failed"**: Check file size (max 5MB) and type (images only)

## Security Notes

⚠️ **Important**: The current rules allow anyone to read and write data. For production use, consider:
- Adding authentication
- Implementing rate limiting
- Adding content moderation
- Setting up admin controls

## Support

If you need help:
- **Firebase Documentation**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Firebase Support**: [firebase.google.com/support](https://firebase.google.com/support)

---

**Your memorial website will now have real-time features that allow everyone to share and see each other's candles, photos, and memories!** 🕯️📸💝 