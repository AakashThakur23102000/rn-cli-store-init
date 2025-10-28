# rn-cli-store-init

Copy the Redux + Persist + Theme + Reusable Components setup into any new RN project:

```
npx degit AakashThakur23102000/rn-cli-store-init/template . --force && npm i @reduxjs/toolkit react-redux redux-persist @react-native-async-storage/async-storage react-native-paper react-native-safe-area-context react-native-size-matters react-native-svg && npm i -D @types/react-redux react-native-svg-transformer
```

## Step 1 - For React Native Paper add react-native-paper/babel to the plugins section in your babel.config.js for production environment. 
It should look like this in babel.config.js:
```
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
```
Refer - https://callstack.github.io/react-native-paper/docs/guides/getting-started/

## Step 2 - For react-native-svg-transformer merge the contents from your project's metro.config.js file with this config (create the file if it does not exist already).
In metro.config.js: 
```
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve(
      "react-native-svg-transformer/react-native"
    )
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"]
  }
};

module.exports = mergeConfig(defaultConfig, config);
```
Refer - https://github.com/kristerkari/react-native-svg-transformer