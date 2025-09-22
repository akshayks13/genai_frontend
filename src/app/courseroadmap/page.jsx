"use client";

import React, { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Circle,
  Clock,
  Star,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const roadmapData = {
  title: "Full-Stack Developer",
  totalDuration: "12 months",
  completionRate: 35,
  phases: [
    {
      id: 1,
      title: "Frontend Fundamentals",
      duration: "3 months",
      status: "completed",
      progress: 100,
      milestones: [
        {
          id: 1,
          title: "HTML & CSS Mastery",
          type: "course",
          duration: "2 weeks",
          status: "completed",
          provider: "freeCodeCamp",
        },
        {
          id: 2,
          title: "JavaScript ES6+",
          type: "course",
          duration: "4 weeks",
          status: "completed",
          provider: "MDN Web Docs",
        },
        {
          id: 3,
          title: "Responsive Design Project",
          type: "project",
          duration: "2 weeks",
          status: "completed",
          provider: "Portfolio",
        },
      ],
    },
    {
      id: 2,
      title: "React Development",
      duration: "2 months",
      status: "in-progress",
      progress: 60,
      milestones: [
        {
          id: 4,
          title: "React Fundamentals",
          type: "course",
          duration: "3 weeks",
          status: "completed",
          provider: "React Official Docs",
        },
        {
          id: 5,
          title: "State Management with Redux",
          type: "course",
          duration: "2 weeks",
          status: "in-progress",
          provider: "Redux Toolkit",
        },
        {
          id: 6,
          title: "React E-commerce App",
          type: "project",
          duration: "3 weeks",
          status: "pending",
          provider: "Portfolio",
        },
      ],
    },
    {
      id: 3,
      title: "Backend Development",
      duration: "3 months",
      status: "pending",
      progress: 0,
      milestones: [
        {
          id: 7,
          title: "Node.js & Express",
          type: "course",
          duration: "4 weeks",
          status: "pending",
          provider: "Node.js Official",
        },
        {
          id: 8,
          title: "Database Design (MongoDB)",
          type: "course",
          duration: "3 weeks",
          status: "pending",
          provider: "MongoDB University",
        },
        {
          id: 9,
          title: "REST API Development",
          type: "project",
          duration: "2 weeks",
          status: "pending",
          provider: "Portfolio",
        },
        {
          id: 10,
          title: "Authentication & Security",
          type: "course",
          duration: "2 weeks",
          status: "pending",
          provider: "Auth0",
        },
      ],
    },
    {
      id: 4,
      title: "Full-Stack Integration",
      duration: "2 months",
      status: "pending",
      progress: 0,
      milestones: [
        {
          id: 11,
          title: "Deployment & DevOps",
          type: "course",
          duration: "3 weeks",
          status: "pending",
          provider: "Vercel/Netlify",
        },
        {
          id: 12,
          title: "Testing (Jest & Cypress)",
          type: "course",
          duration: "2 weeks",
          status: "pending",
          provider: "Testing Library",
        },
        {
          id: 13,
          title: "Full-Stack Portfolio Project",
          type: "project",
          duration: "3 weeks",
          status: "pending",
          provider: "Portfolio",
        },
      ],
    },
    {
      id: 5,
      title: "Professional Development",
      duration: "2 months",
      status: "pending",
      progress: 0,
      milestones: [
        {
          id: 14,
          title: "System Design Basics",
          type: "course",
          duration: "4 weeks",
          status: "pending",
          provider: "System Design Primer",
        },
        {
          id: 15,
          title: "AWS Cloud Practitioner",
          type: "certification",
          duration: "3 weeks",
          status: "pending",
          provider: "AWS",
        },
        {
          id: 16,
          title: "Interview Preparation",
          type: "course",
          duration: "1 week",
          status: "pending",
          provider: "LeetCode",
        },
      ],
    },
  ],
};

const certifications = [
  {
    name: "AWS Cloud Practitioner",
    provider: "Amazon Web Services",
    difficulty: "Beginner",
    duration: "3-4 weeks",
    value: "High",
    priority: "Recommended",
  },
  {
    name: "Google Cloud Associate",
    provider: "Google Cloud",
    difficulty: "Intermediate",
    duration: "6-8 weeks",
    value: "High",
    priority: "Optional",
  },
  {
    name: "React Developer Certification",
    provider: "Meta",
    difficulty: "Intermediate",
    duration: "4-6 weeks",
    value: "Medium",
    priority: "Recommended",
  },
];

export default function RoadmapPage() {
  const [selectedPhase, setSelectedPhase] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Circle className="h-5 w-5 text-grey-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-grey-100 text-grey-600";
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-grey-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-grey-900 mb-2">
                  Your Career Roadmap
                </h1>
                <p className="text-grey-600">
                  Personalized path to become a {roadmapData.title}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {roadmapData.completionRate}%
                </div>
                <div className="text-sm text-grey-600">Complete</div>
              </div>
            </div>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-grey-900">
                    Overall Progress
                  </h3>
                  <span className="text-sm text-grey-600">
                    Est. completion: {roadmapData.totalDuration}
                  </span>
                </div>
                <div className="w-full bg-grey-200 rounded-full h-3 mb-4">
                  <motion.div
                    className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${roadmapData.completionRate}%` }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {roadmapData.phases.map((phase, index) => (
                    <div key={phase.id} className="text-center">
                      <div
                        className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                          phase.status === "completed"
                            ? "bg-green-600"
                            : phase.status === "in-progress"
                            ? "bg-blue-600"
                            : "bg-grey-300"
                        }`}
                      />
                      <div className="text-xs font-medium text-grey-900">
                        {phase.title}
                      </div>
                      <div className="text-xs text-grey-600">
                        {phase.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Roadmap */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {roadmapData.phases.map((phase, phaseIndex) => (
                  <Card key={phase.id} className="overflow-hidden">
                    <CardHeader
                      className={`cursor-pointer ${
                        phase.status === "completed"
                          ? "bg-green-50"
                          : phase.status === "in-progress"
                          ? "bg-blue-50"
                          : "bg-grey-50"
                      }`}
                      onClick={() =>
                        setSelectedPhase(
                          selectedPhase === phase.id ? null : phase.id
                        )
                      }
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(phase.status)}
                          <div>
                            <CardTitle className="text-lg">
                              {phase.title}
                            </CardTitle>
                            <CardDescription>{phase.duration}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              phase.status
                            )}`}
                          >
                            {phase.status.replace("-", " ")}
                          </div>
                          <div className="text-sm text-grey-600 mt-1">
                            {phase.progress}% complete
                          </div>
                        </div>
                      </div>
                      {phase.progress > 0 && (
                        <div className="w-full bg-grey-200 rounded-full h-2 mt-3">
                          <motion.div
                            className={`h-2 rounded-full ${
                              phase.status === "completed"
                                ? "bg-green-600"
                                : phase.status === "in-progress"
                                ? "bg-blue-600"
                                : "bg-grey-400"
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${phase.progress}%` }}
                            transition={{
                              duration: 1,
                              delay: phaseIndex * 0.1,
                            }}
                          />
                        </div>
                      )}
                    </CardHeader>

                    {selectedPhase === phase.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            {phase.milestones.map((milestone) => (
                              <div
                                key={milestone.id}
                                className="flex items-center justify-between p-3 border border-grey-200 rounded-lg"
                              >
                                <div className="flex items-center space-x-3">
                                  {getStatusIcon(milestone.status)}
                                  <div>
                                    <h4 className="font-medium text-grey-900">
                                      {milestone.title}
                                    </h4>
                                    <div className="flex items-center space-x-2 text-sm text-grey-600">
                                      <span>{milestone.provider}</span>
                                      <span>•</span>
                                      <span>{milestone.duration}</span>
                                      <span>•</span>
                                      <span className="capitalize">
                                        {milestone.type}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Button variant="outlined" size="sm">
                                  {milestone.status === "completed"
                                    ? "Review"
                                    : milestone.status === "in-progress"
                                    ? "Continue"
                                    : "Start"}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </Card>
                ))}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Next Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Next Actions</CardTitle>
                    <CardDescription>
                      Your immediate focus areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-1">
                          Complete Redux Course
                        </h4>
                        <p className="text-sm text-blue-700">
                          2 hours remaining • Due in 3 days
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-medium text-yellow-900 mb-1">
                          Start E-commerce Project
                        </h4>
                        <p className="text-sm text-yellow-700">
                          Apply React skills • 3 weeks duration
                        </p>
                      </div>
                    </div>
                    <Button className="w-full mt-4">
                      Continue Learning
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recommended Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Certifications</CardTitle>
                    <CardDescription>Boost your credibility</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="border border-grey-200 rounded-lg p-3"
                        >
                          <h4 className="font-medium text-grey-900 mb-1">
                            {cert.name}
                          </h4>
                          <p className="text-sm text-grey-600 mb-2">
                            {cert.provider}
                          </p>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-grey-500">
                              {cert.duration}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full ${
                                cert.priority === "Recommended"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-grey-100 text-grey-700"
                              }`}
                            >
                              {cert.priority}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Study Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Study Schedule</CardTitle>
                    <CardDescription>
                      Optimize your learning time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-grey-600">
                          Daily Goal
                        </span>
                        <span className="font-medium">2 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-grey-600">This Week</span>
                        <span className="font-medium text-green-600">
                          12/14 hours
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-grey-600">Streak</span>
                        <span className="font-medium text-blue-600">
                          7 days
                        </span>
                      </div>
                    </div>
                    <Button variant="outlined" className="w-full mt-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Study Time
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
