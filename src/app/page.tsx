'use client';

import {useEffect, useRef, useState} from 'react';
import {motion, useAnimation} from 'framer-motion';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const AnimatedIntro = () => {
  const [showContent, setShowContent] = useState(false);
  const controls = useAnimation();
  const introRef = useRef(null);

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

  return (
    <motion.div
      ref={introRef}
      className="flex flex-col items-center justify-center h-screen bg-black text-white"
      initial={{opacity: 0, y: 50}}
      animate={controls}
    >
      <div className="text-5xl font-bold mb-4">SynapseAI</div>
      <p className="text-lg">Initializing Neural Network...</p>
      {showContent && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1, transition: {duration: 1, delay: 1}}}
        >
          <p className="mt-4">Welcome to my AI-engineered portfolio.</p>
        </motion.div>
      )}
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

export default function Home() {
  return (
    <div className="bg-black text-white">
      <AnimatedIntro />
      <main className="container mx-auto px-4">
        <SkillsDisplay />
        <ProjectsShowcase />
        <ContactSection />
      </main>
    </div>
  );
}
