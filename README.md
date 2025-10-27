# rn-cli-store-init

Copy the Redux + Persist + Theme setup into any RN project:

npx degit AakashThakur23102000/rn-cli-store-init/template . \
&& npm i @reduxjs/toolkit react-redux redux-persist @react-native-async-storage/async-storage \
&& npm i -D @types/react-redux

Then wrap your entry (index.tsx/index.js) with Provider + PersistGate.
