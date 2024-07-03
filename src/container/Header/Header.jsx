import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import "./Header.scss";

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Header = () => (
  <div className="app__header app__flex">
    <motion.div
      whileInView={{ x: [-120, 0], opacity: [0, 1] }}
      transition={{ duration: 0.9 }}
      className="app__header-info app__header-badge"
    >
      <Tilt className="badge-cmp app__flex">
        <div
          style={{ margin: 7, display: "flex", flexDirection: "column" }}
          className=""
        >
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "32px",
            }}
            className="job_text2"
          >
            You can call me{" "}
          </p>
          <h1
            className="job_text"
            style={{
              fontFamily: "Lato, serif",
              fontWeight: "bold",
              fontSize: "56px",
            }}
          >
            ARTIN
          </h1>
        </div>
      </Tilt>

      <Tilt
        className="box__container job_text"
        style={{ alignItems: "center" }}
      >
        <p
          style={{
            fontFamily: "Jura, sans-serif",
            fontSize: "28px",
            fontWeight: "normal",
          }}
          className="job_text"
        >
          Web Developer <p>and Software Engineer</p>
        </p>
      </Tilt>
      {/* <Tilt className="badge-cmp">
        <img src={logo} alt="logo" />
      </Tilt> */}
      <motion.div className="badge-cmp">
        <p
          style={{
            fontFamily: "Raleway, fantasy",
            fontSize: "16px",
            color: "#777",
          }}
          className="header__text_p"
        >
          50931 Köln, NRW, Deutschland
        </p>
      </motion.div>
    </motion.div>

    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="app__header-img"
    >
      <img className="image__blury " src={images.profile} alt="profile_bg" />

      <motion.img
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        src={images.rect}
        alt="profile_circle"
        className="overlay_circle"
      />
      <div className="blur__effect "></div>
    </motion.div>

    <motion.div
      variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className="app__header-circles box__container"
    >
      {[images.redux, images.react, images.sass].map((circle, index) => (
        <Tilt
          className="circle-cmp app__flex shadow__1"
          key={`circle-${index}`}
        >
          <img src={circle} alt="profile background" />
        </Tilt>
      ))}
    </motion.div>
  </div>
);

export default AppWrap(Header, "home");
