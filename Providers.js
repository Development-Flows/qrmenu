"use client";
import { Provider } from "react-redux";
import { store} from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";

import { persistStore } from "redux-persist";
// import setupAxios from "@/lib/axios";
const Providers = ({ children }) => {
  const persistor = persistStore(store);
  // setupAxios(store);
  return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          {children}
        {/* </PersistGate> */}
      </Provider>
  );
};

export default Providers;
