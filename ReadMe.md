# 🔒 The Universal Tox Client

[![Greenkeeper badge](https://badges.greenkeeper.io/Tox-Client/client.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/Tox-Client/client.svg?branch=master)](https://travis-ci.org/Tox-Client/client) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This project is a fresh start of the new Tox client I'm willing to dev. It's shared between platforms with only one codebase and can run easily on Android, iOS, Linux, OSX, Windows 10/UWP, Windows 7/8, and maybe Windows Phone.

The main goal of this project is to provide the same experience between platforms by giving users an instant messenger application that is both secure and user-friendly.

## Table of Contents

* [Roadmap](#-roadmap)
* [Compiling](#-compiling)
  * [Android](#android)
  * [iOS](#ios)
  * [Web](#web)
  * [Desktop (Electron)](#desktop-electron)
* [Build for production](#-build-for-production)
  * [Android/iOS](#androidios)
  * [Web](#web-1)
* [Donations](#-donations)
* [License](#-license)

## 🍾 Roadmap

### Milestone 1 (v0.1.0-alpha)

Create a library (and publish it on NPM) containing the UI elements that will be used in the client. That means a LOT of small and bigger components that needs to be reusable and that MUST performs/looks the same not depending if that's run on the browser, the desktop client, or the mobile one.

### Milestone 2 (v0.2.0-alpha to v0.5.0-alpha)

Create a library (and publish it on NPM) that allows to use c-toxcore on mobile devices. I will need to create a wrapper for Android in Java (I mostly know that language, so shouldn't be too hard) and one for iOS in Obj-C/Swift, which are languages I have never tried nor used, and that I'll have to learn to get this milestone right.

### Milestone 3 (v0.6.0-alpha to v0.8.0-alpha)

Wire's all the components to redux and map redux actions creators to the `react-toxcore` library done in the previous milestone. Have everything properly working on every platform, whether it's in the browser, iOS, Android, Linux, Windows or OSX. Everything has to look exactly the same, and works the same, and even have the same bugs!

### Milestone 4 (no release)

Take a break with the client development and create a small promotional website, with a blog and stuffs to aid in getting the app in user's hands. _This website will need to be clear, simple and attractive. The blog will serves as a distribution channel, and thus needs to be polished and localized._

### Milestone 5 (v0.9.0-beta)

Publish the app on respective App Stores _(App Store, Play Store, Windows Store, and get it in AUR + Fedora + Ubuntu + Solus repos)_ in beta test mode, spread the word and collect users feedbacks.

### Milestone 6 (v1.0.0-rc1)

Fix all the issues reported during the beta-test period and update the branding a little bit to gives beta-tester new "features", giving them more enjoyment ! Release a pre-release for 2 weeks extra bugs reports.

### Milestone 7 (v1.0.0-rc2)

Finally fixes all the issues from last pre-release 2 weeks time (as they appears) and do release a 1st stable version to peoples.

### Milestone 8 (v1.0.0-rc3)

Take some time to build a list of all the app's strings, prepare them for localization (ICU format), setup tooling to enable people to translate in their languages. Wait 2 weeks for translations to be done, then release.

## 🔬 Compiling

Before targeting a specific platform, you need to clone the repository and to install required dependencies.

```bash
# Clone the directory as `toxclient`.
$ git clone https://github.com/Tox-Client/client.git toxclient
$ cd toxclient/

# Now install the dependencies with Yarn:
$ yarn
# Or with NPM:
$ npm install
```

### Android

```bash
$ react-native run-android
```

### iOS

```bash
$ react-native run-ios
```

### Web

You can use Yarn or NPM for the following step, depending on your preference.

```bash
# Using Yarn:
$ yarn web

# Using NPM:
$ npm run web
```

### Windows

```bash
$ react-native windows
$ react-native run-windows
```

### Desktop (Electron)

You can use Yarn or NPM for the following step, depending on your preference.

```bash
# Using Yarn:
$ yarn electron

# Using NPM:
$ npm run electron
```

## 🥁 Build for production

### Android/iOS

[This will help](https://facebook.github.io/react-native/docs/running-on-device.html)

### Web

`npm/yarn run build` (this will build your production ready bundle)

## 💸 Donations

I currently work on this project during my free-time, but also during my work-time. As I'm my own boss, I take work time to work on personnal projects that I really believes in. But during this time, I don't win any money. I'm not doing that for money.

Anyway, if you consider support me, you can pay me a pack of Monster's cans for moore productive coding, :D.

I accept donations in form of Monero, Bitcoin and Etherum. You can also Patreon me !

#### Monero

```
47XpVhUHahViCZHuZPc2Z6ivLraidX7AxbM8b2StdPcQGwjDGY14eqj9ippW7Pdrqj9d2y4xvwChzePQAqG1NvqQ775FKxg
```

#### Bitcoin

```
18BqyV9mNbFLi5HNNnfUprnPJyJDFP59Xh
```

#### Ethereum

```
0xe96357E4Dabd51970Bf8fcF9633Cc0c70712466e
```

#### Patreon

[![Become a patron](https://i.imgur.com/oWouhEe.png)](https://www.patreon.com/bePatron?u=2330345)

If you wish to support me, but doesn't have money for, you can still message me on Wire and give me some free hugs! :D

* Wire handle: **@SkyzohKey**

## 📎 License

This project is licensed under [The MIT License](License).
