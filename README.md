# rn-cli-store-init

Copy the Redux + Persist + Theme setup into any RN project:

```
npx degit AakashThakur23102000/rn-cli-store-init/template . --force && npm i @reduxjs/toolkit react-redux redux-persist @react-native-async-storage/async-storage react-native-paper react-native-safe-area-context react-native-size-matters && npm i -D @types/react-redux
```
Then wrap your entry (index.tsx/index.js) with Provider + PersistGate.


```
import { store, persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';

    
   <Provider store={store}>
            <PersistGate persistor={persistor}>
                    <PaperProvider>
                        <App />
                    <PaperProvider>
            </PersistGate>
   </Provider>
```