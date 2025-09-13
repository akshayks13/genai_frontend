'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Type, 
  Linkedin, 
  CheckCircle, 
  ArrowRight,
  FileText,
  Plus,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const skillCategories = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Databases',
  'Cloud Platforms',
  'Tools & Technologies',
  'Soft Skills',
  'Design Tools',
  'Analytics',
  'Project Management',
  'Marketing'
];

const suggestedSkills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Git', 'SQL', 'Docker',
  'Communication', 'Leadership', 'Project Management', 'Data Analysis',
  'UI/UX Design', 'Agile', 'Scrum', 'Machine Learning'
];

export default function SkillsPage() {
  const [activeMethod, setActiveMethod] = useState('upload');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && newSkillCategory) {
      setSkills([...skills, { 
        name: newSkill.trim(), 
        category: newSkillCategory,
        level: 'intermediate',
        id: Date.now()
      }]);
      setNewSkill('');
      setNewSkillCategory('');
    }
  };

  const removeSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const addSuggestedSkill = (skillName) => {
    if (!skills.find(skill => skill.name === skillName)) {
      setSkills([...skills, {
        name: skillName,
        category: 'General',
        level: 'intermediate',
        id: Date.now()
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-grey-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-grey-900 mb-4"
          >
            Map Your Skills
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-grey-600 max-w-2xl mx-auto"
          >
            Help us understand your expertise so we can provide personalized career recommendations
          </motion.p>
        </div>

        {/* Method Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 'upload',
                icon: Upload,
                title: 'Upload Resume',
                description: 'Upload your resume and let AI extract your skills automatically',
                color: 'bg-blue-50 text-blue-600 border-blue-200'
              },
              {
                id: 'manual',
                icon: Type,
                title: 'Manual Entry',
                description: 'Manually add your skills with proficiency levels',
                color: 'bg-green-50 text-green-600 border-green-200'
              },
              {
                id: 'linkedin',
                icon: Linkedin,
                title: 'LinkedIn Import',
                description: 'Connect your LinkedIn profile to import skills',
                color: 'bg-blue-50 text-blue-700 border-blue-200'
              }
            ].map((method) => (
              <Card 
                key={method.id}
                className={`cursor-pointer transition-all duration-200 ${
                  activeMethod === method.id 
                    ? 'ring-2 ring-blue-500 shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setActiveMethod(method.id)}
              >
                <CardHeader className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${method.color}`}>
                    <method.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Content based on selected method */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {activeMethod === 'upload' && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Resume</CardTitle>
                <CardDescription>
                  Upload your resume in PDF, DOC, or DOCX format. Our AI will extract your skills automatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-grey-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 text-grey-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-grey-900 mb-2">
                    Drop your resume here
                  </h3>
                  <p className="text-grey-600 mb-4">
                    or click to browse files
                  </p>
                  <Button>
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeMethod === 'manual' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Your Skills</CardTitle>
                  <CardDescription>
                    Manually add your skills and categorize them by expertise area.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Input
                      placeholder="Enter skill name"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <select
                      className="flex h-10 w-full rounded-lg border border-grey-300 bg-white px-3 py-2 text-sm"
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value)}
                    >
                      <option value="">Select category</option>
                      {skillCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <Button onClick={addSkill} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>

                  {/* Suggested Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-grey-700 mb-3">Suggested Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.map(skill => (
                        <button
                          key={skill}
                          onClick={() => addSuggestedSkill(skill)}
                          className="px-3 py-1 text-sm bg-grey-100 text-grey-700 rounded-full hover:bg-grey-200 transition-colors"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Added Skills */}
                  {skills.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-grey-700 mb-3">Your Skills</h4>
                      <div className="space-y-2">
                        {skills.map(skill => (
                          <div key={skill.id} className="flex items-center justify-between p-3 bg-grey-50 rounded-lg">
                            <div>
                              <span className="font-medium text-grey-900">{skill.name}</span>
                              <span className="text-sm text-grey-600 ml-2">• {skill.category}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSkill(skill.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeMethod === 'linkedin' && (
            <Card>
              <CardHeader>
                <CardTitle>Connect LinkedIn Profile</CardTitle>
                <CardDescription>
                  Import your skills directly from your LinkedIn profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Linkedin className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-lg font-medium text-grey-900 mb-4">
                  Connect Your LinkedIn Account
                </h3>
                <p className="text-grey-600 mb-6 max-w-md mx-auto">
                  We'll securely import your professional experience and skills from LinkedIn.
                </p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Linkedin className="h-5 w-5 mr-2" />
                  Connect LinkedIn
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          {(skills.length > 0 || activeMethod === 'upload') && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <Button size="lg" className="px-8">
                Get Career Recommendations
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}