import React, { useState, useEffect, useRef } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion, useScroll, useTransform } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Work.scss";

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const workRef = useRef(null);
  //const [sorted, setSorted] = useState(false);
 // const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });


  
  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      const array0 = data.filter((work) => work.tags.includes("E-commerce"));
      const array1 = data.filter((work) => work.tags.includes("React"));
      const array2 = [...array0, ...array1, ...data].filter(
        (item, index, self) => self.indexOf(item) === index
      );

      setWorks(array2);
      setFilterWork(array2);
    });
  }, []);

  //
  const handleWorkFilter = (item) => {
    // setSorted(true);
    setActiveFilter(item);
  
    setTimeout(() => {

      if (item === "All") {
        setFilterWork(works);
      } else {
        setFilterWork(
          works.filter((work) => {
            return work.tags.includes(item);
          })
        );
      }
    }, 500);
  };

  //

  const { scrollYProgress } = useScroll({
    target: workRef,
    offset: ["0 1", "0.28 1"],
    layoutEffect: false,
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 720);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <h2 className="head-text ">
        My Creative <span className="scroll__rotate">Project</span> Section
      </h2>

      <div className="app__work-filter">
        {["JavaScript", "TypeScript", "React", "E-commerce", "All"].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text shadow__2 ${
                activeFilter === item ? "item-active" : ""
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>

      <motion.div
        className="app__work-portfolio"
        ref={workRef}
        style={{
          scale: isMobile ? "initial" : scaleProgress,
          opacity: isMobile ? "initial" : scaleProgress,
        }}
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img
                src={urlFor(work.imgUrl)}
                alt={`${work.name ? work.name : "image-work"}`}
              />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a
                  href={work.projectLink}
                  aria-label="{work.name}"
                  target="_blank"
                  rel="noreferrer"
                >
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a
                  href={work.codeLink}
                  aria-label="{work.name}"
                  target="_blank"
                  rel="noreferrer"
                >
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text2">{work.title}</h4>
              <p className="p-text2" style={{ marginTop: 10 }}>
                {work.description}
              </p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
