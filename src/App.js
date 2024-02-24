// import components
import React from "react";
import { About, Work, Testimonial, Skills, Header, Footer } from "./container";
import { Navbar } from "./components";
import "./App.scss";
//

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default App;
