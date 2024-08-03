import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { urlFor, client } from "../../client";

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (key) => {
    setHovered(key);
  };
  const handleMouseLeave = () => {
    setHovered(null);
  };

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <div className="head-text text__scroll_left ">
        <span className="black__span">I Know that</span>{" "}
        <span>Good Design</span> <br />
      </div>
      <div className="head-text text__scroll_right">
        <span className="black__span">means</span> <span>Good Business </span>{" "}
      </div>
      <div className="wrapper__scroll">
        <div className="app__profiles box__container">
          {abouts.map((about, index) => {
            const key = about.title + index;
            const isHovered = hovered === key;
            return (
              <motion.div
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, type: "tween" }}
                className={`app__profile-item box__container ${isHovered && "hovered"}`}
                key={key}
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={urlFor(about.imgUrl)}
                  alt={about.title}
                  className="shadow__1"
                />
                <h2 className="bold-text" style={{ marginTop: 20 }}>
                  {about.title}
                </h2>
                <p className="p-text2" style={{ marginTop: 10 }}>
                  {about.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
