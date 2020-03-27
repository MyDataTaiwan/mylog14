# mylog14

## Build & Run

### Prerequisites

1. Install Node.js

2. Install Ionic CLI

```
$ npm i -g @ionic/cli
```

3. Run

```
$ git clone https://github.com/MyDataTaiwan/mylog14.git
$ cd mylog14
$ npm i
$ ionic build
```

### Run in browser

```
$ ionic serve
```

### Run with iOS Simulator

1. Install XCode, XCode command line tools, cocoapods

2. Run

```
$ ionic capacitor add ios
$ ionic capacitor run ios
```

Then run the App in XCode.

### Run with Android Emulator

1. Install Android Studio and Android SDK.

1. Add `"linuxAndroidStudioPath": "<...>/android-studio/bin/studio.sh"` into `capacitor.config.json`.

1. Run

```
$ ionic capacitor add android
$ ionic capacitor run android
```

Then run the App in Android Studio.
