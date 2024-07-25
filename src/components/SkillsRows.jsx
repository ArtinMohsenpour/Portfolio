//import { useInView } from "framer-motion";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
//import { motion } from "framer-motion";
//import { Tilt } from "react-tilt";
//import { images } from "../../constants";
//import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../client";
import "./SkillsRows.scss";

const SkillsRows = ({ skills, ...props }) => {
  console.log("Skills: ", skills);
  const rowRef = useRef(null);
  const msPerPixel = { ...(props ?? 0) };
  console.log("msPerPixel: ", msPerPixel);

  const [rowHeight, setRowHeight] = useState(0);
  //const duration = `${rowHeight * msPerPixel}ms`;
  const duration = `$200ms`;

  useEffect(() => {
    if (!rowRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setRowHeight(rowRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(rowRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const skills1 = skills.slice(0, 7);
  const skills2 = skills.slice(7);
  // console.log(skills1);
  // console.log(skills2);

  return (
    <div
      ref={rowRef}
      className="app__skills-list animate_1 animate-marquee"
      style={{ "--marquee-duration": duration }}
    >
      {skills.map((skill) => (
        <Skill skill={skill} />
      ))}
      
    </div>
  );
};


const Skill = ({ skill, ...props }) => {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];
  //console.log(animationDelay);

  return (
    <div
      className="app__skills-item app__flex animate-fade-in"
      style={{ animationDelay }}
    >
      <div
        className="app__flex shadow__2 "
        style={{ backgroundColor: skill.bgColor }}
        key={skill.name + `${Math.random() * 100}`}
      >
        <img src={urlFor(skill.icon)} alt={skill.name} />
      </div>
      <p key={skill.name + `${Math.random() * 100}`} className="p-text">
        {skill.name}
      </p>
    </div>
  );
};

export default SkillsRows;
