'use client';
import { useState } from 'react';
import { Plus, Calendar, Clock, Target, TrendingUp, Book, Award, X } from 'lucide-react';
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
      title: 'Data Science Specialist',
      description: 'Complete path to master data science and machine learning',
      progress: 22,
      duration: '8 months',
      startDate: '2024-02-15',
    },
    {
      id: 3,
      title: 'Mobile App Developer',
      description: 'Learn to build native and cross-platform mobile applications',
      progress: 78,
      duration: '4 months',
      startDate: '2023-09-01',
    }
  ]);

  // State for showing/hiding the add form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoadmapTitle, setNewRoadmapTitle] = useState('');
  const [newRoadmapDuration, setNewRoadmapDuration] = useState('');

  const predefinedCourses = [
    { 
      title: 'Full-Stack Developer', 
      description: 'Personalized path to become a Full-Stack Developer',
      durations: ['6 months', '9 months', '12 months', '15 months', '18 months']
    },
    { 
      title: 'Data Science Specialist', 
      description: 'Complete path to master data science and machine learning',
      durations: ['8 months', '10 months', '12 months', '15 months']
    },
    { 
      title: 'Mobile App Developer', 
      description: 'Learn to build native and cross-platform mobile applications',
      durations: ['4 months', '6 months', '8 months']
    },
    {
      title: 'UI/UX Designer',
      description: 'Master user interface and user experience design principles',
      durations: ['3 months', '4 months', '6 months', '8 months', '10 months']
    },
    {
      title: 'DevOps Engineer',
      description: 'Learn deployment, automation, and infrastructure management',
      durations: ['6 months', '9 months', '12 months']
    },
    {
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing and growth strategies',
      durations: ['2 months', '3 months', '4 months']
    },
    {
      title: 'Python Programming',
      description: 'Master Python from basics to advanced concepts',
      durations: ['2 months', '3 months', '4 months', '6 months']
    },
    {
      title: 'Cybersecurity Analyst',
      description: 'Learn cybersecurity fundamentals and advanced threat analysis',
      durations: ['8 months', '10 months', '12 months', '15 months', '18 months']
    },
    {
      title: 'Machine Learning Engineer',
      description: 'Specialized path for ML engineering and AI development',
      durations: ['10 months', '12 months', '15 months', '18 months']
    },
    {
      title: 'Web Designer',
      description: 'Focus on modern web design and frontend aesthetics',
      durations: ['2 months', '4 months', '6 months']
    }
  ];

  const handleAddRoadmap = () => {
    if (!newRoadmapTitle || !newRoadmapDuration) {
      alert('Please select a course and duration.');
      return;
    }

    const selectedCourse = predefinedCourses.find(course => course.title === newRoadmapTitle);

    if (!selectedCourse) {
        alert('Please select a valid course from the list.');
        return;
    }

    const roadmap = {
      id: roadmaps.length + 1,
      title: selectedCourse.title,
      description: selectedCourse.description,
      progress: 0,
      duration: newRoadmapDuration,
      startDate: new Date().toISOString().split('T')[0],
    };

    setRoadmaps([...roadmaps, roadmap]);
    setNewRoadmapTitle('');
    setNewRoadmapDuration('');
    setShowAddForm(false);
  };

  const handleCourseChange = (e) => {
    const title = e.target.value;
    setNewRoadmapTitle(title);
    setNewRoadmapDuration(''); // Reset duration when course changes
  };

  const getAvailableDurations = () => {
    const selectedCourse = predefinedCourses.find(course => course.title === newRoadmapTitle);
    return selectedCourse ? selectedCourse.durations : [];
  };

  const overallProgress = roadmaps.length > 0 ? Math.round(roadmaps.reduce((sum, roadmap) => sum + roadmap.progress, 0) / roadmaps.length) : 0;
  const totalMonths = roadmaps.reduce((sum, r) => sum + parseInt(r.duration), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="m-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Career Roadmaps</h1>
            <p className="text-gray-600 mt-2">Track your learning journey across multiple paths</p>
          </div>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add New Roadmap
            </button>
          )}
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Overall Progress</p>
                <p className="text-2xl font-bold text-gray-900">{overallProgress}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Book className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Roadmaps</p>
                <p className="text-2xl font-bold text-gray-900">{roadmaps.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Duration</p>
                <p className="text-2xl font-bold text-gray-900">{totalMonths} months</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{roadmaps.filter(r => r.progress === 100).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Roadmap Form - Only shows when showAddForm is true */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Start a New Learning Roadmap</h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewRoadmapTitle('');
                  setNewRoadmapDuration('');
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <label htmlFor="course-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Course
                </label>
                <select
                  id="course-select"
                  value={newRoadmapTitle}
                  onChange={handleCourseChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Choose a learning path...</option>
                  {predefinedCourses.map((course, index) => (
                    <option key={index} value={course.title}>
                      {course.title}
                    </option>
                  ))}
                </select>
                
              </div>
              <div>
                <label htmlFor="duration-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <select
                  id="duration-select"
                  value={newRoadmapDuration}
                  onChange={(e) => setNewRoadmapDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  disabled={!newRoadmapTitle}
                >
                  <option value="">Select duration...</option>
                  {getAvailableDurations().map((duration, index) => (
                    <option key={index} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddRoadmap}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1 h-10"
                >
                  <Plus size={20} />
                  Add Roadmap
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) => (
            <div key={roadmap.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{roadmap.title}</h3>
                    <p className="text-gray-600 text-sm">{roadmap.description}</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{roadmap.progress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${roadmap.progress}%` }}
                  ></div>
                </div>

                {/* Duration and Start Date */}
                <div className="space-y-3 mb-4">
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
                </div>

                {/* Progress Status */}
                <div className="bg-gray-50 rounded-lg p-3">
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
                </div>
              </div>

              <div className="px-6 py-3 bg-gray-50 border-t">
                <button
                  onClick={() => router.push(`../courseroadmap?pageId=${roadmap.id}`)}
                  className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {roadmaps.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No roadmaps yet</h3>
            <p className="text-gray-600 mb-4">Start your learning journey by adding your first roadmap</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Your First Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapDashboard;