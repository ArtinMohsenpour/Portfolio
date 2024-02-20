import React, { useState } from "react";
import { images } from "../../constants/index";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import "./Navbar.scss";
import resume from "../../assets/resume.pdf";
import downloadIcon from "../../assets/download-icon.png";
//

const Navbar = ({ setDarkMode, darkMode }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <a href="#home">
          <img src={images.logo} alt="logo" />
        </a>
        <p className="p-text">Portfolio</p>
      </div>
      <ul className="app__navbar-links">
        <div className="app__flex link__container">
          {["home", "about", "work", "skills", "contact"].map((item) => {
            return (
              <li
                className="app__flex p-text"
                key={`link-${item}`}
                role="button"
              >
                <div />
                <a href={`#${item}`}>{item}</a>
              </li>
            );
          })}
          <li role="button" className="app__flex p-text">
            <div />
            <a
              className="icon__container"
              href={resume}
              download="resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setToggle(!toggle)}
            >
              Resume
              <img
                className="icon app__navbar-logo"
                src={downloadIcon}
                alt="download icon"
              />
            </a>
          </li>
        </div>
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(!toggle)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [150, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX
              className="HiX"
              onClick={() => setToggle(!toggle)}
              cursor="pointer"
            />
            <ul className="app__navbar-links">
              {["home", "about", "work", "skills", "contact"].map((item) => {
                return (
                  <li key={`${item}`} role="button">
                    <a href={`#${item}`} onClick={() => setToggle(!toggle)}>
                      {item}
                    </a>
                  </li>
                );
              })}
              <li role="button" className="app__flex p-text">
                <a
                  className="icon__container"
                  href={resume}
                  download="Abolfazl-Mohsenpour-CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setToggle(!toggle)}
                >
                  Resume
                  <img
                    className="icon app__navbar-logo"
                    src={downloadIcon}
                    alt="download icon"
                  />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
