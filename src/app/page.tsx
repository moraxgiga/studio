'use client';

import {useEffect, useRef, useState} from 'react';
import {motion, useAnimation} from 'framer-motion';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useTypewriter, Cursor} from 'react-simple-typewriter';
import Image from 'next/image';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Textarea} from '@/components/ui/textarea';

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
    const numNodes = 50;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Node {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 3 + Math.random() * 3;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.color = 'rgba(255, 255, 255, 0.7)';
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
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
      nodes.forEach(node => node.update());
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
    {name: 'Natural Language Processing', proficiency: 0.75},
    {name: 'Data Visualization', proficiency: 0.95},
    {name: 'Predictive Analytics', proficiency: 0.8},
    {name: 'Python', proficiency: 0.9},
    {name: 'Back End Development', proficiency: 0.7},
    {name: 'Generative AI', proficiency: 0.8},
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
      title: 'AI-Driven Healthcare Diagnostics',
      description:
        'Developed an AI model for early detection of diseases using medical imaging.',
      techStack: ['Python', 'TensorFlow', 'Medical Imaging'],
      demoLink: '#',
    },
    {
      title: 'NLP Chatbot for Customer Support',
      description:
        'Created a chatbot using NLP to automate customer support interactions.',
      techStack: ['Node.js', 'React', 'Dialogflow'],
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

const ContactSection = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Simulate a response from a chatbot
    setResponse(`AI: Thank you for your message: "${message}". I will get back to you soon.`);
  };

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Contact</h2>
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle>Chatbot Interface</CardTitle>
          <CardDescription>Type your message below to interact.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Textarea
              placeholder="Enter your message here..."
              value={message}
              onChange={handleInputChange}
              className="bg-gray-700 text-white border-gray-600"
            />
            <Button type="submit" className="bg-accent hover:bg-accent-foreground">
              Send
            </Button>
          </form>
          {response && (
            <div className="mt-4 p-4 bg-gray-900 rounded-md">
              {response}
            </div>
          )}
        </CardContent>
      </Card>
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
    <div className="text-2xl font-semibold">
      {text}
      <Cursor />
    </div>
  );
};

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'AI Developer',
      company: 'Mani India Technologies (P) Ltd.',
      timeframe: 'Apr 2024 - Present',
      description: '',
      skills: ['Deep Learning', 'NLP', 'Python', 'TensorFlow'], // Example skills
    },
    {
      title: 'Data Analyst Intern',
      company: 'Shiash Info Solutions Private Limited',
      timeframe: 'Apr 2023 - Jun 2023',
      description: 'REST APIs, Python and +1 skill',
      skills: ['REST APIs', 'Python', 'Data Analysis'], // Example skills
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Experience</h2>
      <VerticalTimeline>
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{opacity: 0, x: index % 2 === 0 ? -50 : 50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5, delay: index * 0.2}}
          >
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date={exp.timeframe}
              iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
              contentStyle={{background: 'rgb(25, 25, 25)', color: '#fff'}}
              contentArrowStyle={{borderRight: '7px solid  rgb(25, 25, 25)'}}
            >
              <h3 className="vertical-timeline-element-title">{exp.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">{exp.company}</h4>
              <p>{exp.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {exp.skills.map((skill, i) => (
                  <Badge key={i} className="bg-gray-700 hover:bg-accent text-white">{skill}</Badge>
                ))}
              </div>
            </VerticalTimelineElement>
          </motion.div>
        ))}
      </VerticalTimeline>
    </section>
  );
};

const EducationSection = () => {
  const educations = [
    {
      degree: 'Master of Science in Artificial Intelligence',
      university: 'Stanford University',
      timeframe: '2018 - 2020',
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      university: 'University of California, Berkeley',
      timeframe: '2014 - 2018',
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
        <SkillsDisplay />
        <ExperienceSection />
        <EducationSection />
        <ProjectsShowcase />
        <ContactSection />
      </main>
    </div>
  );
}
