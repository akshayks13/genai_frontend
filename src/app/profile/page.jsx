'use client';

import React, { useState,useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit3, 
  Save, 
  X,
  Camera,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Settings,
  Bell,
  Shield,
  Trash2,
  Plus,
  Award,
  Target,
  TrendingUp,
  FileText,
  Download,
  Upload,
  Sparkles,
  Star,
  AlertCircle,
  CheckCircle,
  Eye,
  Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const userProfile = {
  name: 'Akshay KS',
  email: 'akshayks1005@gmail.com',
  phone: '+7530001011',
  location: 'Coimbatore, Tamil Nadu, India',
  title: 'Frontend Developer',
  company: 'TechCorp Inc.',
  bio: 'Passionate frontend developer with 3+ years of experience building scalable web applications. Love working with React, TypeScript, and modern CSS frameworks.',
  education: [
    {
      id: 1,
      school: 'Amrita Vishwa Vidyapeetham',
      degree: 'Bachelor of Science in Computer Science',
      year: '2019-2023',
      gpa: '8.5/10'
    }
  ],
  experience: [
    {
      id: 1,
      company: 'TechCorp Inc.',
      position: 'Frontend Developer',
      duration: '2023 - Present',
      location: 'San Francisco, CA',
      description: 'Building responsive web applications using React, TypeScript, and Tailwind CSS.'
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Junior Developer Intern',
      duration: 'Summer 2022',
      location: 'Remote',
      description: 'Developed component library and improved application performance by 40%.'
    }
  ],
  skills: [
    { name: 'JavaScript', level: 90, category: 'Programming' },
    { name: 'React', level: 85, category: 'Framework' },
    { name: 'TypeScript', level: 80, category: 'Programming' },
    { name: 'CSS/SCSS', level: 85, category: 'Styling' },
    { name: 'Node.js', level: 70, category: 'Backend' },
    { name: 'Git', level: 85, category: 'Tools' }
  ],
  social: {
    website: 'https://akshayks.dev',
    github: 'https://github.com/akshayks13',
    linkedin: 'https://linkedin.com/in/akshayks',
    twitter: 'https://twitter.com/akshayks'
  },
  preferences: {
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    jobAlerts: true,
    skillRecommendations: true
  }
};

const resumeData = {
  score: 85,
  lastUpdated: '2024-01-15',
  fileName: 'akshayks_Resume.pdf',
  suggestions: [
    {
      type: 'improvement',
      title: 'Add quantifiable achievements',
      description: 'Include specific metrics and numbers to showcase your impact',
      priority: 'high'
    },
    {
      type: 'missing',
      title: 'Add certifications section',
      description: 'Showcase your professional certifications and courses',
      priority: 'medium'
    },
    {
      type: 'enhancement',
      title: 'Optimize keywords',
      description: 'Include more industry-relevant keywords for ATS compatibility',
      priority: 'medium'
    },
    {
      type: 'formatting',
      title: 'Improve visual hierarchy',
      description: 'Use better spacing and typography to enhance readability',
      priority: 'low'
    }
  ],
  analysis: {
    strengths: ['Strong technical skills', 'Clear experience progression', 'Good education background'],
    weaknesses: ['Missing quantifiable achievements', 'No certifications listed', 'Could use more keywords']
  }
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userProfile);
  const [showResumePreview, setShowResumePreview] = useState(false);
  const [isProcessingResume, setIsProcessingResume] = useState(false);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [resumeFileName, setResumeFileName] = useState(resumeData.fileName);
  const fileInputRef = useRef(null);


  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'skills', label: 'Skills & Experience', icon: Target },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield }
  ];

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile data:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userProfile);
    setIsEditing(false);
  };

  const addSkill = () => {
    const newSkill = {
      name: '',
      level: 50,
      category: 'General'
    };
    setEditData({
      ...editData,
      skills: [...editData.skills, newSkill]
    });
  };

  const removeSkill = (index) => {
    const newSkills = editData.skills.filter((_, i) => i !== index);
    setEditData({
      ...editData,
      skills: newSkills
    });
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...editData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setEditData({
      ...editData,
      skills: newSkills
    });
  };

  const handleUploadResume = () => {
    setIsProcessingResume(true);
    // Simulate file upload and processing
    setTimeout(() => {
      setIsProcessingResume(false);
      alert('Resume uploaded and analyzed successfully!');
    }, 2000);
  };

  const handleGenerateResume = () => {
    setIsProcessingResume(true);
    // Simulate AI resume generation
    setTimeout(() => {
      setIsProcessingResume(false);
      alert('AI-generated resume created successfully!');
    }, 3000);
  };

  const handleEnhanceResume = () => {
    setIsProcessingResume(true);
    // Simulate AI enhancement
    setTimeout(() => {
      setIsProcessingResume(false);
      alert('Resume enhanced with AI suggestions!');
    }, 2500);
  };

  const ScoreCircle = ({ score }) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;
    
    return (
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            className={`${score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-700">{score}</span>
        </div>
      </div>
    );
  };

  const SuggestionCard = ({ suggestion }) => {
    const getIcon = (type) => {
      switch(type) {
        case 'improvement': return <TrendingUp className="h-4 w-4" />;
        case 'missing': return <AlertCircle className="h-4 w-4" />;
        case 'enhancement': return <Sparkles className="h-4 w-4" />;
        case 'formatting': return <Eye className="h-4 w-4" />;
        default: return <CheckCircle className="h-4 w-4" />;
      }
    };

    const getPriorityColor = (priority) => {
      switch(priority) {
        case 'high': return 'text-red-600 bg-red-100';
        case 'medium': return 'text-yellow-600 bg-yellow-100';
        case 'low': return 'text-green-600 bg-green-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    };

    return (
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${getPriorityColor(suggestion.priority)}`}>
            {getIcon(suggestion.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(suggestion.priority)}`}>
                {suggestion.priority}
              </span>
            </div>
            <p className="text-sm text-gray-600">{suggestion.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
              <p className="text-gray-600">Manage your personal information and preferences</p>
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button variant="outlined" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="h-4 w-4 mr-3" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Profile Strength</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completeness</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    Add more skills and experience to improve your profile visibility.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Profile Picture & Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Profile Picture */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {editData.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          {isEditing && (
                            <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                              <Camera className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">Profile Photo</p>
                      </div>

                      {/* Form Fields */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <Input
                            value={editData.name}
                            onChange={(e) => setEditData({...editData, name: e.target.value})}
                            disabled={!isEditing}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <Input
                            value={editData.email}
                            onChange={(e) => setEditData({...editData, email: e.target.value})}
                            disabled={!isEditing}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <Input
                            value={editData.phone}
                            onChange={(e) => setEditData({...editData, phone: e.target.value})}
                            disabled={!isEditing}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <Input
                            value={editData.location}
                            onChange={(e) => setEditData({...editData, location: e.target.value})}
                            disabled={!isEditing}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                          <Input
                            value={editData.title}
                            onChange={(e) => setEditData({...editData, title: e.target.value})}
                            disabled={!isEditing}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                          <Input
                            value={editData.company}
                            onChange={(e) => setEditData({...editData, company: e.target.value})}
                            disabled={!isEditing}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        value={editData.bio}
                        onChange={(e) => setEditData({...editData, bio: e.target.value})}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                    <CardDescription>Connect your social profiles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Globe className="h-4 w-4 inline mr-1" />
                          Website
                        </label>
                        <Input
                          value={editData.social.website}
                          onChange={(e) => setEditData({
                            ...editData, 
                            social: {...editData.social, website: e.target.value}
                          })}
                          disabled={!isEditing}
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Github className="h-4 w-4 inline mr-1" />
                          GitHub
                        </label>
                        <Input
                          value={editData.social.github}
                          onChange={(e) => setEditData({
                            ...editData, 
                            social: {...editData.social, github: e.target.value}
                          })}
                          disabled={!isEditing}
                          placeholder="https://github.com/username"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Linkedin className="h-4 w-4 inline mr-1" />
                          LinkedIn
                        </label>
                        <Input
                          value={editData.social.linkedin}
                          onChange={(e) => setEditData({
                            ...editData, 
                            social: {...editData.social, linkedin: e.target.value}
                          })}
                          disabled={!isEditing}
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Twitter className="h-4 w-4 inline mr-1" />
                          Twitter
                        </label>
                        <Input
                          value={editData.social.twitter}
                          onChange={(e) => setEditData({
                            ...editData, 
                            social: {...editData.social, twitter: e.target.value}
                          })}
                          disabled={!isEditing}
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Resume Tab */}
            {activeTab === 'resume' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Hidden file input */}
                <input
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setUploadedResume(URL.createObjectURL(file));
                      setResumeFileName(file.name);
                    }
                  }}
                />

                {/* Resume Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Overview</CardTitle>
                    <CardDescription>Manage and optimize your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Current Resume Info */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {uploadedResume ? resumeFileName || 'Uploaded Resume' : resumeData.fileName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Last updated: {uploadedResume ? 'Just now' : new Date(resumeData.lastUpdated).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Only show View Resume button if a resume is uploaded */}
                        {uploadedResume && (
                          <Button 
                            variant="outlined" 
                            size="sm" 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowResumePreview(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Resume
                          </Button>
                        )}
                      </div>

                      {/* Resume Score */}
                      <div className="flex flex-col items-center text-center">
                        {(() => {
                          const stableScore = resumeData.score || 82;
                          return (
                            <>
                              <ScoreCircle score={stableScore} />
                              <h3 className="font-medium text-gray-900 mt-2">Resume Score</h3>
                              <p className="text-sm text-gray-600">
                                {stableScore >= 80 ? 'Excellent' : stableScore >= 60 ? 'Good' : 'Needs Improvement'}
                              </p>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resume Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Actions</CardTitle>
                    <CardDescription>Upload, generate, or enhance your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button 
                        className="h-auto p-4 flex flex-col items-center gap-2"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isProcessingResume}
                      >
                        <Upload className="h-6 w-6" />
                        <span className="text-sm">Upload Resume</span>
                      </Button>
                      <Button 
                        variant="outlined"
                        className="h-auto p-4 flex flex-col items-center gap-2"
                        onClick={handleGenerateResume}
                        disabled={isProcessingResume}
                      >
                        <Wand2 className="h-6 w-6" />
                        <span className="text-sm">Generate Resume</span>
                      </Button>
                      <Button 
                        variant="outlined"
                        className="h-auto p-4 flex flex-col items-center gap-2"
                        onClick={handleEnhanceResume}
                        disabled={isProcessingResume}
                      >
                        <Sparkles className="h-6 w-6" />
                        <span className="text-sm">AI Enhance</span>
                      </Button>
                    </div>

                    {isProcessingResume && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-sm text-blue-700">Processing your resume...</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Resume Preview Popup */}
                {showResumePreview && uploadedResume && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-2"
    onClick={(e) => {
      if (e.target === e.currentTarget) setShowResumePreview(false);
    }}
  >
    <div className="bg-white w-full max-w-7xl h-full max-h-[95vh] p-4 rounded-lg relative shadow-2xl">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowResumePreview(false);
        }}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors z-10"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="w-full h-full pt-12">
        <iframe
          src={uploadedResume}
          className="w-full h-full rounded border"
          frameBorder="0"
        />
      </div>
    </div>
  </div>
)}

                {/* Resume Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Analysis</CardTitle>
                    <CardDescription>AI-powered insights to improve your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Strengths */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Strengths
                        </h4>
                        <ul className="space-y-2">
                          {resumeData.analysis.strengths.map((strength, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Areas for Improvement */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                          Areas for Improvement
                        </h4>
                        <ul className="space-y-2">
                          {resumeData.analysis.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></div>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Suggestions */}
                <Card>
                  <CardHeader>
                    <CardTitle>AI Suggestions</CardTitle>
                    <CardDescription>Personalized recommendations to improve your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {resumeData.suggestions.map((suggestion, index) => (
                        <SuggestionCard key={index} suggestion={suggestion} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Skills & Experience Tab */}
            {activeTab === 'skills' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Skills */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Skills</CardTitle>
                        <CardDescription>Manage your technical and soft skills</CardDescription>
                      </div>
                      {isEditing && (
                        <Button variant="outlined" onClick={addSkill}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Skill
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {editData.skills.map((skill, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
                              <Input
                                value={skill.name}
                                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                                disabled={!isEditing}
                                placeholder="e.g., JavaScript"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                              <select
                                value={skill.category}
                                onChange={(e) => updateSkill(index, 'category', e.target.value)}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                              >
                                <option value="Programming">Programming</option>
                                <option value="Framework">Framework</option>
                                <option value="Styling">Styling</option>
                                <option value="Backend">Backend</option>
                                <option value="Tools">Tools</option>
                                <option value="Soft Skills">Soft Skills</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-grey-700 mb-1">
                                Level ({skill.level}%)
                              </label>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={skill.level}
                                onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value))}
                                disabled={!isEditing}
                                className="w-full h-2 bg-grey-200 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                            <div className="flex justify-end">
                              {isEditing && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeSkill(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>Your professional background</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {editData.experience.map((exp, index) => (
                        <div key={exp.id} className="border border-grey-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-grey-900">{exp.position}</h4>
                              <p className="text-blue-600">{exp.company}</p>
                              <p className="text-sm text-grey-600">{exp.duration} • {exp.location}</p>
                              <p className="text-sm text-grey-700 mt-2">{exp.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-5 w-5 text-grey-400" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>Your educational background</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {editData.education.map((edu, index) => (
                        <div key={edu.id} className="border border-grey-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-grey-900">{edu.degree}</h4>
                              <p className="text-blue-600">{edu.school}</p>
                              <p className="text-sm text-grey-600">{edu.year} • GPA: {edu.gpa}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-5 w-5 text-grey-400" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how you want to be notified about updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(editData.preferences).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-2">
                          <div>
                            <h4 className="font-medium text-grey-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </h4>
                            <p className="text-sm text-grey-600">
                              {key === 'emailNotifications' && 'Receive updates via email'}
                              {key === 'pushNotifications' && 'Get push notifications in your browser'}
                              {key === 'weeklyReports' && 'Weekly progress and insights report'}
                              {key === 'jobAlerts' && 'Notifications about relevant job opportunities'}
                              {key === 'skillRecommendations' && 'AI-powered skill development suggestions'}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setEditData({
                                ...editData,
                                preferences: {
                                  ...editData.preferences,
                                  [key]: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-grey-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-grey-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Career Preferences</CardTitle>
                    <CardDescription>Help us personalize your experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-grey-700 mb-2">
                          Career Goals
                        </label>
                        <select className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option>Advance to Senior Developer</option>
                          <option>Transition to Management</option>
                          <option>Become a Tech Lead</option>
                          <option>Start Own Company</option>
                          <option>Switch Industries</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-grey-700 mb-2">
                          Preferred Work Environment
                        </label>
                        <select className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option>Remote</option>
                          <option>Hybrid</option>
                          <option>On-site</option>
                          <option>No preference</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-grey-700 mb-2">
                          Company Size Preference
                        </label>
                        <select className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option>Startup (1-50)</option>
                          <option>Small (51-200)</option>
                          <option>Medium (201-1000)</option>
                          <option>Large (1000+)</option>
                          <option>No preference</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Privacy & Security Tab */}
            {activeTab === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control who can see your information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="font-medium text-grey-900">Public Profile</h4>
                          <p className="text-sm text-grey-600">Make your profile visible to other users</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-grey-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-grey-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="font-medium text-grey-900">Show Contact Info</h4>
                          <p className="text-sm text-grey-600">Allow others to see your email and phone</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-grey-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-grey-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="font-medium text-grey-900">Analytics Tracking</h4>
                          <p className="text-sm text-grey-600">Help improve our service with usage analytics</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-grey-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-grey-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your account security settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outlined" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button variant="outlined" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Two-Factor Authentication
                      </Button>
                      <Button variant="outlined" className="w-full justify-start">
                        <Calendar className="h-4 w-4 mr-2" />
                        Login History
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Danger Zone</CardTitle>
                    <CardDescription>Irreversible and destructive actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outlined" className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                      <p className="text-sm text-grey-600">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}