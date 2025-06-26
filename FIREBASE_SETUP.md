# Firebase Setup Guide for Neha Memorial Website

This guide will help you set up Firebase to enable real-time sharing of candles, photos, and memories across all visitors using the **FREE Firebase plan**.

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

## Step 5: Set Up Security Rules

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
    
    // Allow write access to candles, photos, memories, and visitors
    match /candles/{document} {
      allow write: if true;
    }
    
    match /photos/{document} {
      allow write: if true;
    }
    
    match /memories/{document} {
      allow write: if true;
    }
    
    match /visitors/{document} {
      allow write: if true;
    }
  }
}
```

## Step 6: Deploy Your Website

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add Firebase integration for real-time features"
   git push origin master
   ```

2. **Wait for GitHub Pages to deploy** (2-5 minutes)

## Step 7: Test the Features

1. **Visit your website**: `https://vaibhavfrenz.github.io/neha-memorial`
2. **Try lighting a candle** - it should appear for all visitors
3. **Upload a photo** - it should be visible to everyone (max 2MB)
4. **Add a memory** - it should show up in real-time

## How It Works (Free Solution)

### Photo Storage
- **Photos are stored as base64 strings** in Firestore
- **No Firebase Storage needed** (saves money)
- **Max file size: 2MB** per photo
- **Works with free Firebase plan**

### Real-time Features
- **Candles**: Stored in Firestore, real-time updates
- **Photos**: Base64 in Firestore, instant sharing
- **Memories**: Text in Firestore, live updates
- **Visitors**: Location data in Firestore, visitor statistics
- **All data shared** across all visitors

### Visitor Tracking
- **Anonymous tracking** - no personal information collected
- **Geographic data** - country, city, region (from IP address)
- **Visitor statistics** - total visitors, countries, cities
- **Recent visitors** - shows last 6 visitors with location
- **Real-time updates** - stats update automatically
- **Privacy-friendly** - only collects public IP geolocation data

## Troubleshooting

### If features don't work:
1. **Check browser console** for errors
2. **Verify Firebase config** in `firebase-config.js`
3. **Check Firestore rules** are set to allow read/write
4. **Ensure Firestore is enabled** (not Realtime Database)

### Common Issues:
- **"Firebase not initialized"**: Check if Firebase SDK is loading
- **"Permission denied"**: Check Firestore rules
- **"Upload failed"**: Check file size (max 2MB) and type (images only)
- **"Storage not found"**: We're not using Storage, only Firestore

## Security Notes

⚠️ **Important**: The current rules allow anyone to read and write data. For production use, consider:
- Adding authentication
- Implementing rate limiting
- Adding content moderation
- Setting up admin controls

## Cost Information

✅ **This setup is completely FREE**:
- **Firestore**: 1GB storage free, 50K reads/day, 20K writes/day
- **No Firebase Storage**: Using base64 in Firestore instead
- **No upgrade needed**: Works with Spark (free) plan

## Support

If you need help:
- **Firebase Documentation**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Firebase Support**: [firebase.google.com/support](https://firebase.google.com/support)

---

**Your memorial website will now have real-time features that allow everyone to share and see each other's candles, photos, and memories - all for FREE!** 🕯️📸💝 