'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import {useTypewriter, Cursor} from 'react-simple-typewriter';
import Image from 'next/image';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Textarea} from '@/components/ui/textarea';
import {Linkedin, Mail, Mobile, Github} from '@/components/icons';

const AnimatedIntro = () => {
  const [showContent, setShowContent] = useState(false);
  const controls = useAnimation();
  const introRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const animateIntro = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: {duration: 1, delay: 0.5},
      });
      await controls.start({
        scale: 1.05,
        transition: {duration: 1, yoyo: 2},
      });
      setShowContent(true);
    };

    animateIntro();

    // Clean up animation on unmount to prevent memory leaks
    return () => {
      controls.stop();
    };
  }, [controls]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const nodes = [];
    const particles = [];
    const numNodes = 50;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Node {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      value: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 3 + Math.random() * 3;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.value = (Math.random() * 2) - 1; // Value between -1 and 1
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();        

      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.vx = -this.vx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.vy = -this.vy;
        }

        this.draw();
      }

      throwParticle() {
        const value = (Math.random() * 2) - 1;
        particles.push(new Particle(this.x, this.y, `rgba(255, 255, 255, 0.7)`, value));
      }
    }

    class Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      value: number;

      constructor(x: number, y: number, color: string, value: number) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2 - 1; // Upward motion
        this.alpha = 1;
        this.color = color;
        this.value = value;
      }

      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.value.toFixed(2), this.x, this.y);
        ctx.globalAlpha = 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.02; // Gravity
        this.alpha -= 0.01; // Fade out

        if (this.alpha < 0) {
          return false; // Mark for removal
        }

        this.draw();
        return true;
      }
    }

    function initNodes() {
      for (let i = 0; i < numNodes; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        nodes.push(new Node(x, y));
      }
    }

    function drawConnections() {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = 'rgba(255, 255, 255, ' + (1 - distance / 150) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections();

      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        if (Math.random() < 0.01) {
          node.throwParticle();
        }
      });

      // Update and draw particles, remove faded ones
      particles.forEach((particle, index) => {
        if (!particle.update()) {
          particles.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    initNodes();
    animate();

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes.length = 0;
      initNodes();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      ref={introRef}
      className="relative flex flex-col items-center justify-center h-screen bg-black text-white overflow-hidden"
      initial={{opacity: 0, y: 50}}
      animate={controls}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-5xl font-bold mb-4">Padmavathi</div>
        <JobTitleRotator />
      </div>
    </motion.div>
  );
};

const SkillsDisplay = () => {
  const skills = [
    {name: 'Machine Learning', proficiency: 0.9},
    {name: 'Deep Learning', proficiency: 0.85},
    {name: 'Natural Language Processing', proficiency: 0.95},
    {name: 'Data Science', proficiency: 0.95},
    {name: 'Data Visualization', proficiency: 0.8},
    {name: 'Data Analytics', proficiency: 0.8},
    {name: 'Python', proficiency: 0.98},
    {name: 'Back End Development', proficiency: 0.90},
    {name: 'Generative AI', proficiency: 0.96},
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md p-6"
            whileHover={{scale: 1.05}}
            transition={{duration: 0.2}}
          >
            <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full"
                style={{width: `${skill.proficiency * 100}%`}}
              />
            </div>
            <p className="text-sm mt-2">Proficiency: {skill.proficiency * 100}%</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProjectsShowcase = () => {
  const projects = [
    {
      title: 'AI-Driven Healthcare Chatbot',
      description:
        'Developed an AI Assistant that detect the user disease.',
      techStack: ['Python', 'Chainlit', 'Generative AI'],
      demoLink: '#',
    },
    {
      title: 'NLP Chatbot for Customer Support',
      description:
        'Developed a high-quality synthetic function-calling dataset using LLaMA 3 and 3.1, achieving 90% accuracy in generating structured function-calling formats.',
      techStack: ['Python', 'Generative AI', 'Sytheticdata'],
      demoLink: '#',
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md p-6"
            whileHover={{scale: 1.03}}
            transition={{duration: 0.2}}
          >
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech, i) => (
                <Badge key={i}>{tech}</Badge>
              ))}
            </div>
            <a
              href={project.demoLink}
              className="text-accent hover:text-accent-foreground"
            >
              View Demo
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const AboutMeSection = () => {  
  const sentences = [
    "As an AI Engineer, I specialize in crafting innovative solutions that leverage the power of machine learning, deep learning, and natural language processing.",
    "My expertise spans across developing AI-driven applications, building advanced language models, and implementing data-driven strategies to enhance business outcomes.",
    "With a strong foundation in Python, coupled with hands-on experience in generative AI and backend development, I am passionate about pushing the boundaries of what's possible in the AI landscape.",
    "I am dedicated to continuous learning and exploring new methodologies to create intelligent, efficient, and scalable systems.",
    "I am open for new opportunites.",
  ];
  const [displayedSentences, setDisplayedSentences] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tokens = sentences.map((s) => s.split(/\s+/));

  const generateTokens = useCallback(() => {
    if (!isGenerating && displayedSentences.length < sentences.length) {
      setIsGenerating(true);
      let currentSentenceIndex = displayedSentences.length;
      let currentTokens = tokens[currentSentenceIndex];
      let currentTokenIndex = -1;
      const interval = setInterval(() => {
        if (currentTokenIndex < currentTokens.length - 1) {
          currentTokenIndex++;
          const displayedText = currentTokens.slice(0, currentTokenIndex + 1).join(" ");
           setDisplayedSentences(prev => {
            const newSentences = [...prev];
            if (currentSentenceIndex < newSentences.length){
               newSentences[currentSentenceIndex] = displayedText;
            }
            else {
               newSentences.push(displayedText);

            }
            return newSentences;
          });
        } else {
          clearInterval(interval);
          const tokensPerSecond = Math.floor(Math.random() * 151) + 50;
           setDisplayedSentences((prev) => {
               const newSentences = [...prev];
               newSentences[currentSentenceIndex] = `${newSentences[currentSentenceIndex]} ${tokensPerSecond} tokens/sec`;
               return newSentences;
          })
          setIsGenerating(false);
        }
      }, 70); // Adjust interval for speed
    } 
  }, [isGenerating, sentences, displayedSentences]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          generateTokens();
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [generateTokens]);

  return (
    <section ref={sectionRef} className="py-12">
      <h2 className="text-3xl font-bold mb-8">About Me</h2>
      <div className="rounded-lg p-6">
      {displayedSentences.length > 0 && (
        <p className="text-gray-400">
         {displayedSentences.map((sentence, index) => {
            const token = sentence.split(' ');
            if (token.length > 0 && token[token.length - 1].includes('tokens/sec')) {
              return (
                 <span key={index}>
                  {token.slice(0, -2).join(' ')} <span className="text-accent-foreground">{token.slice(-2).join(' ')}</span>
                   {index < displayedSentences.length - 1 ? (
                   <>  
                     <br />
                     <br />
                   </>
                 ) : null}
                </span>
              )
            }
            return (
              <span key={index}>

                {sentence}{index < displayedSentences.length - 1 ? (<><br /><br /></>) : null}
              </span>
            );
          })}
        </p>
      )}
      </div>
    </section>
  );
};



const ContactInformation = () => {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-center space-x-2">
          <Mail className="w-6 h-6" />
          <a
            href="mailto:gs.padmasv01@gmail.com"
            className="text-blue-500 hover:underline"
          >
            gs.padmasv01@gmail.com
          </a>
        </div>
        {/* Mobile */}
        <div className="flex items-center space-x-2">
          <Mobile className="w-6 h-6" />
          <a
            href="tel:+919361240086"
            className="text-blue-500 hover:underline"
          >
            +91 9361240086
          </a>
        </div>
        {/* LinkedIn */}
        <div className="flex items-center space-x-2">
          <Linkedin className="w-6 h-6" />
          <a href="https://www.linkedin.com/in/padmavathi-s-b7402b221/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          LinkedIn
          </a>
        </div>
        {/* GitHub */}
        <div className="flex items-center space-x-2">
          <Github className="w-6 h-6" />
          <a href="https://github.com/Padmavathi041101" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

const JobTitleRotator = () => {
  const jobTitles = ['AI Developer', 'AI Engineer', 'Data Scientist', 'Python developer'];
  const [text] = useTypewriter({
    words: jobTitles,
    loop: {},
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  return (
    <motion.div className="text-2xl font-semibold">
      {text}
      <Cursor />
    </motion.div>
  );
};

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'AI Developer',      
      company: 'Mani India Technologies (P) Ltd.',
      timeframe: 'Apr 2024 - Present',
      description: 'Developing AI solutions.',
      skills: ['Generative AI', 'LLM', 'Python', 'Backend', 'Database'], // Example skills
    },
    {
      title: 'Data Analyst Intern',
      company: 'Shiash Info Solutions Private Limited',
      timeframe: 'Apr 2023 - Jun 2023',
      description: 'Analyzing Data.',
      skills: ['Data Analysis'], // Example skills
    },
  ];

  const timelineElements = experiences.map((exp, index) => ({
    id: index.toString(),
    title: exp.title,
    company: exp.company,
    date: exp.timeframe,
    description: exp.description,
    skills: exp.skills,
    iconStyle: { background: 'rgb(33, 150, 243)', color: '#fff' },
    contentStyle: { background: 'rgb(25, 25, 25)', color: '#fff' },
    contentArrowStyle: { borderRight: '7px solid  rgb(25, 25, 25)' },
  }));

  const timelineItemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const descriptionVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Experience</h2>
      <VerticalTimeline>
        {timelineElements.map((element, index) => (
          <VerticalTimelineElement
            key={element.id}
            className="vertical-timeline-element--work"
            date={element.date}
            iconStyle={element.iconStyle}
            contentStyle={element.contentStyle}
            contentArrowStyle={element.contentArrowStyle}
          >
            <motion.div
              variants={timelineItemVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="vertical-timeline-element-title">{element.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">{element.company}</h4>
              <motion.p
                className="text-white"
                variants={descriptionVariants}
                initial="hidden"
                animate="visible"
              >
                {element.description}
              </motion.p>
              <div className="flex flex-wrap gap-2 mt-2">
                {element.skills.map((skill, i) => (
                  <Badge key={i} className="bg-gray-700 hover:bg-accent text-white">{skill}</Badge>
                ))}
              </div>
            </motion.div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
};

const EducationSection = () => {
  const educations = [
    {
      degree: 'Master of Science in Data science',
      university: 'St.Joseph\'s college (Autonomous) Tiruchirapalli',
      timeframe: '2022 - 2024',
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Education</h2>
      {educations.map((edu, index) => (
        <Card key={index} className="mb-4 bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>{edu.degree}</CardTitle>
            <CardDescription>{edu.university} | {edu.timeframe}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">{edu.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};


export default function Home() {
  return (
    <div className="bg-black text-white">
      <AnimatedIntro />
      <main className="container mx-auto px-4">
        <AboutMeSection />
        <ExperienceSection />
        <SkillsDisplay />
       <ProjectsShowcase />
        <EducationSection />
        <ContactInformation />
      </main>
    </div>
  );
}

