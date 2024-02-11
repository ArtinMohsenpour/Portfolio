import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Work.scss";

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  //const [sorted, setSorted] = useState(false);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      const array1 = data.map((work) => {
        if (work.tags.includes("React")) return work;
        return;
      });

      const array2 = [...array1, ...data].filter((item) => item !== undefined);

      const array3 = array2.filter((item, index) => {
        return array2.indexOf(item) === index;
      });

      // setFilterWork(newWorks);
      // console.log(data);
      setWorks(array3);
      setFilterWork(array3);
    });
  }, []);

  // useEffect(() => {
  //   if (works.length > 1) {
  //     const timeoutId = setTimeout(sortData, 2000);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [sorted]);

  // //
  // const sortData = () => {
  //   {
  //     works && console.log("works");
  //     const firstSorted = works.map((work) => {
  //       if (work.tags.includes("E-commerce")) return work;
  //       return;
  //     });
  //     console.log(firstSorted);
  //     const secondSorted = works.map((work) => {
  //       if (work.tags.includes("React")) return work;
  //       return;
  //     });
  //     console.log(secondSorted);
  //     const thirdSorted = works.map((work) => {
  //       if (work.tags.includes("JavaScript")) return work;
  //       return;
  //     });
  //     console.log(thirdSorted);

  //     const sortedWorks = [
  //       ...firstSorted,
  //       ...secondSorted,
  //       ...thirdSorted,
  //     ].filter((item) => item !== undefined);
  //     const sortedWorks2 = sortedWorks.filter((item, index) => {
  //       // Return true only for the first occurrence of each item
  //       return sortedWorks.indexOf(item) === index;
  //     });

  //     console.log(sortedWorks2);
  //     setWorks(sortedWorks2);
  //     setSorted(true);
  //   }
  // };

  //
  const handleWorkFilter = (item) => {
    // setSorted(true);
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      console.log(item);
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

  return (
    <>
      <h2 className="head-text ">
        My Creative <span className="scroll__rotate">Project</span> Section
      </h2>

      <div className="app__work-filter">
        {["JavaScript", "React", "E-commerce", "All"].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl)} alt={work.name} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target="_blank" rel="noreferrer">
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
