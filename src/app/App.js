import React from 'react';
import { Provider } from 'react-redux';  
// import { AuthProvider } from '../core/Services/AuthService'; 
import store from './store/store';  
import RootNavigator from './navigation/RootNavigator';  
const App = () => {
  return (
    <Provider store={store}>
      {/* <AuthProvider> */}
        <RootNavigator />
      {/* </AuthProvider> */}
    </Provider>
  );
};
export default App;