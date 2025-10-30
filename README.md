# rn-cli-starter-template

Copy the Redux + Persist + Theme + Reusable Components setup into any new RN project:

```
npx degit AakashThakur23102000/rn-cli-starter-template/template . --force && npm i @reduxjs/toolkit react-redux redux-persist @react-native-async-storage/async-storage react-native-paper react-native-safe-area-context react-native-size-matters react-native-svg @tanstack/react-query && npm i -D @types/react-redux react-native-svg-transformer reactotron-react-native && adb reverse tcp:9090 tcp:9090
```

**What this does**
- **Copies template files** into your current project using `degit` (no git history; `--force` overwrites existing files if needed).
- **Installs runtime packages** for Redux, persistence, UI, sizing, and SVGs.
- **Installs dev packages** for typings, SVG import transformer, and Reactotron.
- **Sets up Android port reverse** so Reactotron (port **9090**) can connect to your device/emulator.


# Packages overview
### Runtime
- **@reduxjs/toolkit** – Batteries-included Redux (`configureStore`, `createSlice`, `createAsyncThunk`).
- **react-redux** – React bindings for Redux (`Provider`, hooks).
- **redux-persist** – Persists the Redux store to storage (state survives restarts).
- **@react-native-async-storage/async-storage** – Storage engine used by `redux-persist` in RN.
- **react-native-paper** – UI library with theming (Buttons, TextInput, etc.).
- **react-native-safe-area-context** – Handles notches/status bars; provides insets & `SafeAreaView`.
- **react-native-size-matters** – Scaled sizes (`ScaledSheet`, `ms`, `vs`) for responsive layouts.
- **react-native-svg** – SVG rendering support.
- **@tanstack/react-query** -  For Api handling.

### Dev
- **@types/react-redux** – TypeScript types for `react-redux`.
- **react-native-svg-transformer** – Import `.svg` files as React components.
- **reactotron-react-native** – Desktop debugger for RN (logs, network, performance, state via plugins). Uses port **9090**; `adb reverse` enables Android devices to reach your host during dev.




# Post‑install steps
### Step 1 - For React Native Paper add react-native-paper/babel to the plugins section in your babel.config.js for production environment. 
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

### Step 2 - For react-native-svg-transformer merge the contents from your project's metro.config.js file with this config (create the file if it does not exist already).
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

### Step 3 - For Api handling Tanstack Query is also added but we need to add provider 
- Provide the client to your App
```
  import { QueryClientProvider } from '@tanstack/react-query';
  import GlobalQueryClient from '../utils/globalQueryClient';
  const queryClient = GlobalQueryClient(navigation);
  return(
          <QueryClientProvider client={queryClient}>
            <App/>
          </QueryClientProvider>
  )
```
#### 🧠 Notes
- `useNavigation()` only works **after** the `NavigationContainer` is mounted.  
  Hence, the `QueryClientProvider` is wrapped **inside** a child component.

Refer - https://tanstack.com/query/latest/docs/framework/react/quick-start

