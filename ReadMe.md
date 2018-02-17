# The Universal Tox Client

[![Build Status](https://travis-ci.org/Tox-Client/client.svg?branch=master)](https://travis-ci.org/Tox-Client/client) [![dependencies Status](https://david-dm.org/Tox-Client/client/status.svg)](https://david-dm.org/Tox-Client/client) [![devDependencies Status](https://david-dm.org/Tox-Client/client/dev-status.svg)](https://david-dm.org/Tox-Client/client?type=dev)

This project is a fresh start of the new Tox client I'm willing to dev. It's shared between platforms with only one codebase and can run easily on Android, iOS, Linux, OSX, Windows 10/UWP, Windows 7/8, and maybe Windows Phone.

The main goal of this project is to provide the same experience between platforms by giving users an instant messenger application that is both secure and user-friendly.

Behind the hood, it uses React (Web/Desktop) and React Native (Android/iOS) and a pattern based on `Base` component and `Renderer` components that allows us to share the application logic between every pattern but allowing platform-specific stuff in different files. Compiler (webpack/grunt) then takes care of choosing the right file to resolve depending on which platform it's being built for.

![](https://0x0.st/sshQ.png)

## Libraries/tools

This project uses libraries and tools like:

* es6 syntax and [babel](https://babeljs.io)
* [react](https://facebook.github.io/react) for the Website App and Desktop App,
* [react-native](https://facebook.github.io/react-native) for the iOS & Android Apps
* [Electron](http://electron.atom.io) to package the Desktop App
* [redux](http://redux.js.org/) to organize the data flow management
* [css-loader](https://github.com/webpack/css-loader) to integrate the styles in the builds
* [grunt](http://gruntjs.com) to create the builds
* [webpack](https://webpack.github.io) to help during the development phase with hot reloading

## Basic philosophy

All the code is contained in the `src` directory, especially the 3 main entry files that are used for the builds:

* `index.ios.js` & `index.android.js` are the ones used to build the iOS & Android Apps
* `index.js` is the one used to build the Website App and Desktop App as the code is strictly the same.

### Redux architecture actions/stores

All the [redux](http://redux.js.org/) architecture is share to 100% to all the different builds. This means that all the logic and data management code is done only once and reuse everywhere. This allows us to have an easy tests suite as well and to ensure that our code is working properly on all the devices.

### Components

The real interest of the project is in how the components have been structured to shared most of their logic and only redefined what is specific to every device.

Basically, every component has a `MainClass` which inherits a `BaseClass` containing all the logic. Then, the main component import a different Render function which has been selected during the build. The file extension `.ios.js`, `.android.js` or `.js` is used by the build tool to import only the right file.

The `.native.js` files contain code that is shared between both mobile platforms (iOS & Android). Currently, the `.ios.js` and `.android.js` files compose this `.native.js` file since all code is shared right now. However, if a component needed to be different for platform specific reasons, that code would be included in the corresponding platform specific files.

At the end, every component is defined by 6 files. If we look at the screen component, here is its structure.

```
Screen
├── index.js
├── styles.js (styles of the component)
├── ScreenBase.js
├── ScreenRender.ios.js (specific to iOS build
├── ScreenRender.android.js (specific to Android build)
├── ScreenRender.native.js (shared mobile app code - iOS & Android)
└── ScreenRender.js (used during Website and Desktop build)
```

And here is the `MainClass` (`index.js`) file which composes the files.

```js
"use strict";

import Base from "./ScreenBase";
import Render from "./ScreenRender";

export default class Screen extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return Render.call(this, this.props, this.state);
  }
}
```

### Styles

Styles are written in different fashions between React & React Native. This project use [react-native-css](https://github.com/sabeurthabti/react-native-css) to share the stylesheets between web/desktop version and mobile one. This allow for faster iteration cycle and also remove duplicate/not-in-sync styles issues.

# How to build/run the projects

## General requirements before running any specific project

* `npm install` to install all the dependencies, React and React Native among others.

### With some versions of npm (>=v3.3.10 <=v3.6.0)

Some builds from npm included bugs while `npm install`. So if you are using a npm version within the range form 3.3.10 to 3.6.0 included, you must run `npm install` twice. Those versions including npm v3.3.12 are the ones bundled by default with node from version v5.1.0 to v5.5.0.

* `npm install npm`
* `npm install npm` run it twice, because of the packages won't be installed after the first run [#10985](https://github.com/npm/npm/issues/10985)

## The Mobile Apps (iOS & Android)

### Requirements for React Native

#### iOS

* OS X
* Xcode 6.3 or higher is recommended (Xcode only runs on Mac).
* Homebrew is the recommended way to install node, watchman, and flow.
* `brew install node`
* `brew install watchman`. We recommend installing watchman, otherwise you might hit a node file watching bug.
* `brew install flow`. If you want to use flow.

#### Android

* Follow the official documentation guide here: http://facebook.github.io/react-native/docs/getting-started.html#android-setup (includes experimental Windows & Linux support)

### Running the Mobile Apps

#### iOS

* Open iosApp.xcodeproj and hit run in Xcode.
* Hit cmd+R in your iOS simulator to reload the app and see your change!

#### Android

* Open an emulator. (Genymotion or run `android avd`)
* Run the `react-native run-android` in the root of this project.
* If trying to run on a device, read the following guide: http://facebook.github.io/react-native/docs/running-on-device-android.html#content

Congratulations! You've just successfully run the project as an iOS or Android App.

## The Website App

### Requirements for React

There isn't any additional requirements since you already installed the deps with `npm install`.

### Quick start

* `npm run build` to build the project (at least the first time)
* `npm run serve:web` to preview in the browser at http://localhost:8000/index.web.html or http://localhost:8000/webpack-dev-server/index.web.html with webpack-dev-server and hot reload enabled

Congratulations! You've just successfully run the project as a Website App.

## The Desktop App

### Requirements for Electron

There isn't any additional requirements since you already installed the deps with `npm install`.

### Quick start

* `npm run build` to build the project (at least the first time)
* `npm run serve:electron` to launch the desktop app and enable livereload

Congratulations! You've just successfully run the project as a Desktop App.

# Run the tests

To run the tests, simply run:

```
npm test
```

## 💸 Donations

I currently work on this project during my free-time, but also during my work-time. As I'm my own boss, I take work time to work on personnal projects that I really believes in. But during this time, I don't win any money. I'm not doing that for money.

Anyway, if you consider support me, you can pay me a pack of Monster's cans for moore productive coding, :D.

I accept donations in form of Monero, Bitcoin, Etherum & IntenseCoin (in that order). You can also Patreon me !

[![Become a patron](https://i.imgur.com/oWouhEe.png)](https://www.patreon.com/bePatron?u=2330345)

```
1. Monero (XMR): 47XpVhUHahViCZHuZPc2Z6ivLraidX7AxbM8b2StdPcQGwjDGY14eqj9ippW7Pdrqj9d2y4xvwChzePQAqG1NvqQ775FKxg
2. Bitcoin (BTC/XBT): 18BqyV9mNbFLi5HNNnfUprnPJyJDFP59Xh
3. Etherum (ETH): 0x56E3273D42B40d47E122fF62108dEDC974A4206e
4. IntenseCoin (ITNS): iz5F814eDfX7gbUucu17E5YUBGADYGLDRhMfKQjfXwv9S1UDPaJKcgEiUUWm9vDeJ7JVcPWo7kZRmTFtcVcssc1h28zguw8iE
```

If you wish to support me, but doesn't have money for, you can still message me on Wire and give me some free hugs! :D

* Wire handle: **@SkyzohKey**

## 📎 License

This project is licensed under [The MIT License](License).
