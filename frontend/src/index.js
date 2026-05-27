import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import HomeScreen from './screens/HomeScreen';
import PropertiesScreen from './screens/PropertiesScreen';
import PropertyInfoScreen from './screens/PropertyInfoScreen';
import LoginScreen from './screens/LoginScreen';
import CreatePropertyListing from './screens/CreatePropertyListing';
import MyPropertyListingsScreen from './screens/MyPropertyListingsScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import PricingScreen from './screens/PricingScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/property" element={<PropertiesScreen />} />
      <Route path="/property/:id" element={<PropertyInfoScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/createPropertyListing" element={<CreatePropertyListing />} />
      <Route path="/myPropertyListings" element={<MyPropertyListingsScreen />} />
      <Route path="/aboutUs" element={<AboutUsScreen />} />
      <Route path="/pricing" element={<PricingScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
