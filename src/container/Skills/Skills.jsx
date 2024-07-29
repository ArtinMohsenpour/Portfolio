import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { images } from "../../constants";
//import SkillsRows from "../../components/SkillsRows.jsx";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [companyName, setCompanyName] = useState("");

  //
  // const skillsArray = [
  //   "HTML/CSS",
  //   "JavaScript",
  //   "TypeScript",
  //   "React",
  //   "Redux",
  //   "Next.js",
  //   "Node.js",
  //   "Hooks",
  //   "REST APIs",
  //   "Python",
  //   "jQuery",
  //   "SQL",
  //   "Git",
  //   "GitHub",
  //   "Bootstrap",
  //   "SASS",
  //   "Tailwind",
  //   "Figma",
  //   "Adobe XD",
  // ];
  const softSkills = [
    { name: "Expertise in Responsive Design", src: images.resDesign },
    { name: "Professional Prompt Writer for AI", src: images.ai },
    { name: "E-Commerce Specialist", src: images.onlineshop },
    { name: "Strong Communication", src: images.conversation },
    { name: "Problem-Solving", src: images.problemsovling },
    { name: "Effective Team Collaboration", src: images.united },
    { name: "Excellent Time Management", src: images.time },
    { name: "Keen Attention to Detail", src: images.detail },
    { name: "High Accountability", src: images.dailytask },
    { name: "Scrum", src: images.scrum },
    { name: "CMS", src: images.cms },
    { name: "CI/CD", src: images.cicd },
  ];

  //

  const toggleDes = (desc, workCompany) => {
    setDesc(desc);
    setIsOpen(!isOpen);
    setCompanyName(workCompany);
  };

  useEffect(() => {
    const itemsToFind = [
      "Research Assistant",
      "Frontend Web Developer",
      "Student Work",
      "UI Design Internship",
      "Internship for bachelor degree",
      "Student Consultant",
    ];
    const fetchExperiences = async () => {
      try {
        const data = await client.fetch('*[_type == "experiences"]');
        console.log(data);
        const array1 = data.filter((el) =>
          itemsToFind.includes(el.works[0]?.name)
        );

        array1.sort((a, b) => {
          return (
            itemsToFind.indexOf(a.works[0]?.name) -
            itemsToFind.indexOf(b.works[0]?.name)
          );
        });
        console.log(array1);
        setExperiences(array1);
      } catch (error) {
        console.error("Error fetching experiences data:", error);
      }
    };

    const fetchSkills = async () => {
      try {
        const data = await client.fetch('*[_type == "skills"]');
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills data:", error);
      }
    };

    fetchExperiences();
    fetchSkills();
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <div className="app__skills-listContainer">
          {/* //<SkillsRows skills={skills} /> */}
          {skills.map((skill) => (
            <div className="app__skills-item app__flex ">
              <Tilt
                className="app__flex shadow__2"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img
                  key={skill.name + `${Math.random() * 100}`}
                  src={urlFor(skill.icon)}
                  alt={skill.name}
                />
              </Tilt>
              <p key={skill.name + `${Math.random() * 100}`} className="p-text">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
        <div className="card__container">
          {/* <motion.div
            className="card__container_card shadow__1"
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
          >
            <h2>Skills</h2>
            {skillsArray.map((skill) => (
              <Tilt
                key={skill}
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.8 }}
                className="card__container_item shadow__2"
              >
                <span className="p-text">{skill}</span>
              </Tilt>
            ))}
          </motion.div> */}
          <motion.div
            className="card__container_card shadow__1"
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
          >
            <h2 className="header__skills">Soft Skills</h2>
            {softSkills.map((skill) => (
              <div className="skill__row">
                <Tilt
                  key={skill}
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.8 }}
                  className="card__container_item shadow__2 skill__row2"
                >
                  <img
                    key={skill.name + `${Math.random() * 100}`}
                    src={skill.src}
                    alt="image-skill-sets"
                  />
                  <p className="p-text">{skill.name}</p>
                </Tilt>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="app__skills-exp">
          {experiences?.map((experience) => (
            <div key={experience.year + `${Math.random() * 100}`}>
              <motion.div
                key={experience.year + `${Math.random() * 100}`}
                className="app__skills-exp-item"
              >
                <div className="app__skills-exp-year">
                  <p className="bold-text3">{experience.year}</p>
                </div>
                <motion.div className="app__skills-exp-works">
                  {experience?.works?.map((work) => (
                    <motion.div
                      key={`${work.name}-${Math.random() * 100}`}
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <div className="container__arrow">
                        <p className="p-text">{work.company}</p>
                        <img
                          className={`arrow__down  ${
                            isOpen &&
                            companyName === work.company &&
                            "bg__arrow"
                          }`}
                          src={images.arrowdown}
                          alt="arrow"
                          onClick={() => toggleDes(work.desc, work.company)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              {experience.works[0].company === companyName && (
                <div
                  key={experience.year}
                  className={`${
                    isOpen ? "" : "hidden"
                  } p-text2 desc__container`}
                >
                  {desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
