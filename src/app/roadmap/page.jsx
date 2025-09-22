'use client';
import { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, Target, TrendingUp, Book, Award, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";

const RoadmapDashboard = () => {
  const router = useRouter();
  const [roadmaps, setRoadmaps] = useState([
    {
      id: 1,
      title: 'Full-Stack Developer',
      description: 'Personalized path to become a Full-Stack Developer',
      progress: 35,
      duration: '6 months',
      startDate: '2024-01-01',
    },
    {
      id: 2,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing and growth strategies',
      progress: 22,
      duration: '4 months',
      startDate: '2024-02-15',
    },
    {
      id: 3,
      title: 'Photography Basics',
      description: 'Learn the fundamentals of photography and editing',
      progress: 78,
      duration: '3 months',
      startDate: '2023-09-01',
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoadmapTitle, setNewRoadmapTitle] = useState('');
  const [newRoadmapDescription, setNewRoadmapDescription] = useState('');
  const [newRoadmapDuration, setNewRoadmapDuration] = useState('');
  const [animatedProgress, setAnimatedProgress] = useState(
    roadmaps.map(() => 0)
  );
  const [isLoading, setIsLoading] = useState(false); // Remove loading state

  useEffect(() => {
    // Start progress animation immediately
    const interval = setInterval(() => {
      setAnimatedProgress((prev) =>
        prev.map((val, idx) => (val < roadmaps[idx].progress ? val + 1 : val))
      );
    }, 15);

    return () => clearInterval(interval);
  }, [roadmaps]);

  const predefinedDurations = ['1 month', '2 months', '3 months', '4 months', '6 months', '8 months', '10 months', '12 months'];

  const handleAddRoadmap = () => {
    if (!newRoadmapTitle || !newRoadmapDuration) {
      alert('Please enter course name and select duration.');
      return;
    }

    const roadmap = {
      id: roadmaps.length + 1,
      title: newRoadmapTitle,
      description: newRoadmapDescription || 'No description provided',
      progress: 0,
      duration: newRoadmapDuration,
      startDate: new Date().toISOString().split('T')[0],
    };

    setRoadmaps([...roadmaps, roadmap]);
    setNewRoadmapTitle('');
    setNewRoadmapDescription('');
    setNewRoadmapDuration('');
    setShowAddForm(false);
  };

  const overallProgress = roadmaps.length > 0 ? Math.round(roadmaps.reduce((sum, r) => sum + r.progress, 0) / roadmaps.length) : 0;
  const totalMonths = roadmaps.reduce((sum, r) => sum + parseInt(r.duration), 0);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Remove loading component entirely as we'll use direct page animations

  return (
    <motion.div
      className="min-h-screen bg-gray-50 p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-20">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8"
          variants={itemVariants}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Career Roadmaps</h1>
            <p className="text-gray-600 mt-2">Track your learning journey across multiple paths</p>
          </motion.div>
          <AnimatePresence>
            {!showAddForm && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Add New Roadmap
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
        >
          {[
            {
              icon: TrendingUp,
              label: 'Overall Progress',
              value: `${overallProgress}%`,
              color: 'blue',
              delay: 0.1
            },
            {
              icon: Book,
              label: 'Active Roadmaps',
              value: roadmaps.length,
              color: 'green',
              delay: 0.2
            },
            {
              icon: Clock,
              label: 'Total Duration',
              value: `${totalMonths} months`,
              color: 'yellow',
              delay: 0.3
            },
            {
              icon: Award,
              label: 'Completed',
              value: roadmaps.filter(r => r.progress === 100).length,
              color: 'purple',
              delay: 0.4
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border"
              variants={cardVariants}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <stat.icon className={`text-${stat.color}-600`} size={24} />
                </motion.div>
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <motion.p
                    className="text-2xl font-bold text-gray-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: stat.delay + 0.2, type: "spring", bounce: 0.4 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add Roadmap Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              className="bg-white rounded-lg shadow-sm border p-6 mb-8"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <motion.h3
                  className="text-lg font-semibold text-gray-900"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Start a New Learning Roadmap
                </motion.h3>
                <motion.button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewRoadmapTitle('');
                    setNewRoadmapDuration('');
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name
                  </label>
                  <input
                    type="text"
                    placeholder="Type your course..."
                    value={newRoadmapTitle}
                    onChange={(e) => setNewRoadmapTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <select
                    value={newRoadmapDuration}
                    onChange={(e) => setNewRoadmapDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select duration...</option>
                    {predefinedDurations.map((duration, index) => (
                      <option key={index} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleAddRoadmap}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1 h-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={20} />
                    Add Roadmap
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Roadmaps Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          <AnimatePresence>
            {roadmaps.map((roadmap, index) => (
              <motion.div
                key={roadmap.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
                variants={cardVariants}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="p-6">
                  <motion.div
                    className="flex justify-between items-start mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{roadmap.title}</h3>
                      <p className="text-gray-600 text-sm">{roadmap.description}</p>
                    </div>
                    <motion.span
                      className="text-2xl font-bold text-blue-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring", bounce: 0.5 }}
                    >
                      {animatedProgress[index]}%
                    </motion.span>
                  </motion.div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${roadmap.progress}%` }}
                      transition={{ duration: 1.5, delay: 0.7 + index * 0.1 }}
                    />
                  </div>

                  {/* Duration and Start Date */}
                  <motion.div
                    className="space-y-3 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      <span>Started: {new Date(roadmap.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>Duration: {roadmap.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Target size={16} />
                      <span>
                        Status: {roadmap.progress === 100 ? 'Completed' : 
                                 roadmap.progress > 0 ? 'In Progress' : 'Not Started'}
                      </span>
                    </div>
                  </motion.div>

                  {/* Progress Status */}
                  <motion.div
                    className="bg-gray-50 rounded-lg p-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Learning Progress</span>
                      <span className={`font-medium ${
                        roadmap.progress === 100 ? 'text-green-600' :
                        roadmap.progress > 50 ? 'text-blue-600' :
                        roadmap.progress > 0 ? 'text-yellow-600' : 'text-gray-500'
                      }`}>
                        {roadmap.progress === 100 ? 'Completed!' :
                         roadmap.progress > 50 ? 'Making great progress' :
                         roadmap.progress > 0 ? 'Getting started' : 'Ready to begin'}
                      </span>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="px-6 py-3 bg-gray-50 border-t"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <motion.button
                    onClick={() => router.push(`../courseroadmap?pageId=${roadmap.id}`)}

                    className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details →
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {roadmaps.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            >
              <Book className="text-gray-400" size={32} />
            </motion.div>
            <motion.h3
              className="text-lg font-medium text-gray-900 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              No roadmaps yet
            </motion.h3>
            <motion.p
              className="text-gray-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Start your learning journey by adding your first roadmap
            </motion.p>
            <motion.button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              Add Your First Roadmap
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RoadmapDashboard;