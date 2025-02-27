"use client";

import { BarChart3, FileText, Trophy, X, Menu } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Logo from "./logo.png";

export default function Home() {
  // State for statistics
  const [rank, setRank] = useState(1);
  const [percentile, setPercentile] = useState(30);
  const [correctAnswers, setCorrectAnswers] = useState(10);
  const totalQuestions = 15;

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Form state
  const [formRank, setFormRank] = useState(rank);
  const [formPercentile, setFormPercentile] = useState(percentile);
  const [formCorrectAnswers, setFormCorrectAnswers] = useState(correctAnswers);
  const [isFormValid, setIsFormValid] = useState(false);

  // Calculate progress for circular chart (circumference - (circumference * percentComplete))
  const circumference = 2 * Math.PI * 45;
  const progressOffset =
    circumference - circumference * (correctAnswers / totalQuestions);

  // Handle form submission
  const handleSubmit = () => {
    setRank(formRank);
    setPercentile(formPercentile);
    setCorrectAnswers(formCorrectAnswers);
    setIsModalOpen(false);
  };

  // Calculate graph position based on percentile
  const getPercentilePosition = () => {
    // Map percentile (0-100) to x-coordinate (0-800)
    const xPos = (percentile / 100) * 800;

    // Calculate y-coordinate based on a curve (lower in the middle, higher at edges)
    // This is a simple parabola: y = a(x - h)² + k where (h,k) is the vertex
    // We want the curve to be highest (lowest y value) around 50% and lowest at the edges
    // SVG y-axis is inverted (0 is top, 300 is bottom)
    const yPos = 280 - 230 * Math.sin((percentile / 100) * Math.PI);

    return { x: xPos, y: yPos };
  };

  useEffect(() => {
    const valid =
      formRank > 0 &&
      formPercentile >= 0 &&
      formPercentile <= 100 &&
      formCorrectAnswers >= 0 &&
      formCorrectAnswers <= totalQuestions;

    setIsFormValid(valid);
  }, [formRank, formPercentile, formCorrectAnswers, totalQuestions]);

  // Close sidebar when screen size changes to larger than mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const percentilePos = getPercentilePosition();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="md:hidden">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center">
              <Image
                src={Logo}
                alt="Logo"
                width={200}
                height={100}
                className="max-w-[150px] md:max-w-[200px]"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-slate-200 px-2 py-1 rounded">
              <Image
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="ml-2 font-medium hidden sm:inline">
                Ashish Patel
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
    onClick={() => setIsSidebarOpen(false)}
  />
)}

{/* Sidebar - hidden on mobile, shown with overlay when menu clicked */}
<div
  className={`
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    fixed top-0 left-0 z-40 w-56 bg-white border-r border-gray-200
    transition-transform duration-300 ease-in-out
    h-screen md:h-auto
    md:static md:block
  `}
>
  <div className="flex flex-col h-full">
    {/* Sidebar Header (Visible only on mobile) */}
    <div className="flex justify-between items-center p-4 border-b border-gray-200 md:hidden">
      <h2 className="font-bold">Menu</h2>
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        <X className="h-5 w-5" />
      </button>
    </div>

    {/* Sidebar Navigation */}
    <nav className="p-4 flex-grow">
      <div className="space-y-1">
        
         <a href="#"
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <BarChart3 className="mr-3 h-5 w-5 text-gray-500" />
          <span className="font-medium">Dashboard</span>
        </a>
        
        <a  href="#"
          className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-md"
        >
          <Trophy className="mr-3 h-5 w-5 text-blue-600" />
          <span className="font-medium">Skill Test</span>
        </a>
        
        <a  href="#"
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <FileText className="mr-3 h-5 w-5 text-gray-500" />
          <span>Internship</span>
        </a>
      </div>
    </nav>
  </div>
</div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6">
            {/* Page Title */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Skill Test
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* HTML Test Header */}
                <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="bg-orange-100 p-3 rounded-md">
                          <Image
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
                            alt="HTML5"
                            width={40}
                            height={40}
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold">
                          Hyper Text Markup Language
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                          Questions: 08 | Duration: 15 mins | Submitted on 27
                          February 2025
                        </p>
                      </div>
                    </div>
                    <button
                      className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-900 transition w-full sm:w-auto"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Update
                    </button>
                  </div>
                </div>

                {/* Quick Statistics */}
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <h3 className="text-lg font-bold mb-4">Quick Statistics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <div className="mr-4 text-yellow-500">
                        <Trophy className="h-10 w-10" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{rank}</div>
                        <div className="text-gray-500 text-sm">YOUR RANK</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 text-gray-400">
                        <div className="h-10 w-10 border-2 border-gray-300 rounded flex items-center justify-center">
                          <span className="text-gray-500">%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{percentile}%</div>
                        <div className="text-gray-500 text-sm">PERCENTILE</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 text-green-500">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">
                          {correctAnswers} / {totalQuestions}
                        </div>
                        <div className="text-gray-500 text-sm">
                          CORRECT ANSWERS
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comparison Graph */}
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <h3 className="text-lg font-bold mb-4">Comparison Graph</h3>
                  <div className="mb-4">
                    <p className="text-gray-700">
                      <span className="font-bold">
                        You scored {percentile}% percentile
                      </span>{" "}
                      which is {percentile < 72 ? "lower" : "higher"} than the
                      average percentile 72% of all the engineers who took this
                      assessment
                    </p>
                  </div>
                  <div className="relative h-64 w-full">
                    <div className="absolute inset-0 flex items-end">
                      <div className="w-full h-full relative">
                        {/* Graph SVG */}
                        <svg
                          viewBox="0 0 800 300"
                          className="w-full h-full"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0,280 C50,250 100,200 150,230 C200,260 250,180 300,150 C350,120 400,80 450,50 C500,20 550,70 600,100 C650,130 700,180 750,220 C800,260 850,280 900,280"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="3"
                          />
                          {/* Dynamic percentile marker */}
                          <circle
                            cx={percentilePos.x}
                            cy={percentilePos.y}
                            r="6"
                            fill="#6366f1"
                          />
                          <line
                            x1={percentilePos.x}
                            y1="0"
                            x2={percentilePos.x}
                            y2="300"
                            stroke="#4b5563" // Darker color
                            strokeWidth="2" // Increased thickness
                            strokeDasharray="4,2" // Shorter gaps for better visibility
                          />

                          <text
                            x={percentilePos.x - 20}
                            y="20"
                            fontSize="12"
                            fill="#6366f1"
                          >
                            your percentile
                          </text>
                        </svg>

                        {/* X-axis labels */}
                        <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500">
                          <span>0</span>
                          <span>25</span>
                          <span>50</span>
                          <span>75</span>
                          <span>100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Syllabus Analysis */}
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <h3 className="text-lg font-bold mb-8">
                    Syllabus Wise Analysis
                  </h3>
                  <div className="space-y-9 my-6">
                    <div>
                      <div className="flex justify-between mb-4">
                        <span className="text-gray-700">
                          HTML Tools, Forms, History
                        </span>
                        <span className="text-blue-600 font-medium">80%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-4">
                        <span className="text-gray-700">
                          Tags & References in HTML
                        </span>
                        <span className="text-orange-500 font-medium">60%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-4">
                        <span className="text-gray-700">
                          Tables & References in HTML
                        </span>
                        <span className="text-red-500 font-medium">24%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "24%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-4">
                        <span className="text-gray-700">
                          Tables & CSS Bascis
                        </span>
                        <span className="text-green-500 font-medium">96%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full mb-8"
                          style={{ width: "96%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Question Analysis */}
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Question Analysis</h3>
                    <span className="text-blue-600 font-bold">
                      {correctAnswers}/{totalQuestions}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-10">
                    <span className="font-bold">
                      You scored {correctAnswers} question correct out of{" "}
                      {totalQuestions}.
                    </span>
                    {correctAnswers < 12
                      ? " However it still needs some improvements"
                      : " Great job!"}
                  </p>
                  <div className="flex justify-center">
                    <div className="relative w-40 h-40">
                      {/* Circular progress */}
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="10"
                          strokeDasharray={`${circumference}`}
                          strokeDashoffset={progressOffset}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Image
                            src="https://images.unsplash.com/photo-1614036417651-efe5912149d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                            alt="Target"
                            width={40}
                            height={40}
                            className="mx-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-2xl mx-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">Update scores</h2>
              <div className="bg-orange-100 p-2 rounded-md">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
                  alt="HTML5"
                  width={30}
                  height={30}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-800 text-white">
                  <span>1</span>
                </div>
                <label className="whitespace-nowrap">
                  Update your <span className="font-bold">Rank</span>
                </label>
                <div className="w-full sm:w-40">
                  <input
                    type="number"
                    value={formRank || ""}
                    onChange={(e) => setFormRank(Number(e.target.value))}
                    className={`w-full border ${
                      !formRank ? "border-red-500" : "border-gray-300"
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    min="1"
                    required
                  />
                  {!formRank && (
                    <p className="text-red-500 text-xs mt-1">
                      Rank is required
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-800 text-white">
                  <span>2</span>
                </div>
                <label className="whitespace-nowrap">
                  Update your <span className="font-bold">Percentile</span>
                </label>
                <div className="w-full sm:w-40">
                  <input
                    type="number"
                    value={formPercentile || ""}
                    onChange={(e) => setFormPercentile(Number(e.target.value))}
                    className={`w-full border ${
                      !formPercentile ? "border-red-500" : "border-gray-300"
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    min="0"
                    max="100"
                    required
                  />
                  {!formPercentile && (
                    <p className="text-red-500 text-xs mt-1">
                      Percentile is required 1-100
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-800 text-white">
                  <span>3</span>
                </div>
                <label className="whitespace-nowrap">
                  Update your <span className="font-bold">Current Score</span>{" "}
                  (out of {totalQuestions})
                </label>
                <div className="w-full sm:w-40">
                  <input
                    type="number"
                    value={formCorrectAnswers || ""}
                    onChange={(e) =>
                      setFormCorrectAnswers(Number(e.target.value))
                    }
                    className={`w-full border ${
                      formCorrectAnswers > totalQuestions
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    min="0"
                    max={totalQuestions}
                    required
                  />
                  {formCorrectAnswers > totalQuestions && (
                    <p className="text-red-500 text-xs mt-1">
                      Score cannot exceed {totalQuestions}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-8">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 ${
                  isFormValid
                    ? "bg-blue-800 hover:bg-blue-900"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white rounded-md flex items-center justify-center`}
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                Save
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
