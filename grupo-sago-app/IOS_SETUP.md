# iOS Capacitor Setup Guide

## Prerequisites
- macOS with Xcode installed
- CocoaPods installed: `sudo gem install cocoapods`
- Node.js and npm installed

## Step-by-Step Instructions

### 1. Install Dependencies
```bash
cd grupo-sago-app
npm install
```

### 2. Build the Web App
```bash
npm run build
```

This creates an `out/` directory with the static website.

### 3. Add iOS Platform
```bash
npx cap add ios
```

This creates an `ios/` folder with your Xcode project.

### 4. Sync Web Assets to iOS
```bash
npx cap sync ios
```

### 5. Open in Xcode
```bash
npx cap open ios
```

Or manually:
```bash
open ios/App/App.xcworkspace
```

### 6. Configure in Xcode

1. **Select a Development Team**:
   - Click on "App" in the left sidebar (project navigator)
   - Under "Signing & Capabilities"
   - Select your Apple Developer account or use "Add Account"
   - For testing, you can use a personal team (free)

2. **Select a Simulator**:
   - At the top of Xcode, click the device dropdown
   - Choose "iPhone 15 Pro" (or any iOS device)

3. **Run the App**:
   - Click the ▶️ Play button (or press Cmd+R)
   - Wait for the app to build and launch in the simulator

### 7. Testing on Real Device

1. **Connect your iPhone** via USB
2. **Trust the computer** on your iPhone if prompted
3. In Xcode, **select your iPhone** from the device dropdown
4. Click **Run** (▶️)
5. On your iPhone, go to **Settings → General → VPN & Device Management**
6. **Trust your developer certificate**
7. Now you can open the app!

## Troubleshooting

### "No Development Team Found"
- Sign in with your Apple ID in Xcode → Settings → Accounts
- Or create a free Apple Developer account

### "CocoaPods not found"
```bash
sudo gem install cocoapods
cd ios/App
pod install
```

### "Build Failed"
1. Clean build folder: Xcode → Product → Clean Build Folder
2. Try again

### App Shows Blank Screen
```bash
# Rebuild and sync
npm run build
npx cap sync ios
npx cap open ios
# Then run again in Xcode
```

## Making Changes

After editing the web app code:
```bash
# 1. Rebuild
npm run build

# 2. Sync to iOS
npx cap sync ios

# 3. Run in Xcode again (Cmd+R)
```

## Important Notes

⚠️ **API Routes Won't Work**: Since this is now a static export, the API routes (`/api/*`) won't work. You'll need to:
- Deploy the web app to a server (Vercel, etc.)
- Update API calls to point to your server
- Or use Capacitor plugins for native features

For testing the full app with database and APIs, use **Option 1** (Safari in simulator) instead.
