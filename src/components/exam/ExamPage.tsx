'use client';

import React, { useState, useEffect } from 'react';
import { Question, QuestionStatus, ExamState } from '../types';
import { Clock, AlertTriangle, ChevronDown } from 'lucide-react';
import { Button } from '../../components/uinew/button';
import { motion } from 'framer-motion';

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correctAnswer: 1,
    explanation: "The SI unit of force is Newton (N). It is named after Sir Isaac Newton and is defined as the force required to accelerate a mass of one kilogram at a rate of one meter per second squared.",
    subject: "Physics"
  },
  {
    id: 2,
    question: "What is the speed of light in vacuum?",
    options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁷ m/s", "3 × 10⁹ m/s"],
    correctAnswer: 0,
    explanation: "The speed of light in vacuum is approximately 3 × 10⁸ meters per second (299,792,458 m/s). This is a fundamental constant of nature.",
    subject: "Physics"
  },
  {
    id: 3,
    question: "What is Newton's First Law of Motion?",
    options: [
      "F = ma",
      "An object at rest stays at rest unless acted upon by a force",
      "Action and reaction are equal and opposite",
      "Energy cannot be created or destroyed"
    ],
    correctAnswer: 1,
    explanation: "Newton's First Law, also known as the Law of Inertia, states that an object at rest will remain at rest, and an object in motion will remain in motion with constant velocity unless acted upon by an external force.",
    subject: "Physics"
  },
  {
    id: 4,
    question: "What is the unit of electric current?",
    options: ["Volt", "Ampere", "Ohm", "Coulomb"],
    correctAnswer: 1,
    explanation: "The unit of electric current is Ampere (A). It is defined as one coulomb of charge passing through a point in one second.",
    subject: "Physics"
  },
  {
    id: 5,
    question: "What is the acceleration due to gravity on Earth?",
    options: ["9.8 m/s²", "10 m/s²", "9.8 km/s²", "8.9 m/s²"],
    correctAnswer: 0,
    explanation: "The acceleration due to gravity on Earth is approximately 9.8 m/s² (or 9.81 m/s² to be more precise). This value varies slightly depending on location.",
    subject: "Physics"
  },
  {
    id: 6,
    question: "What is Ohm's Law?",
    options: ["V = IR", "P = VI", "F = ma", "E = mc²"],
    correctAnswer: 0,
    explanation: "Ohm's Law states that V = IR, where V is voltage, I is current, and R is resistance. It describes the relationship between voltage, current, and resistance in an electrical circuit.",
    subject: "Physics"
  },
  {
    id: 7,
    question: "What type of lens is used to correct myopia?",
    options: ["Convex", "Concave", "Bifocal", "Cylindrical"],
    correctAnswer: 1,
    explanation: "A concave (diverging) lens is used to correct myopia (nearsightedness). It helps to diverge the light rays before they enter the eye, allowing the image to form on the retina.",
    subject: "Physics"
  },
  {
    id: 8,
    question: "What is the principle of conservation of energy?",
    options: [
      "Energy can be created but not destroyed",
      "Energy can be destroyed but not created",
      "Energy cannot be created or destroyed, only transformed",
      "Energy is always constant"
    ],
    correctAnswer: 2,
    explanation: "The principle of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another. The total energy in an isolated system remains constant.",
    subject: "Physics"
  },
  {
    id: 9,
    question: "What is the formula for kinetic energy?",
    options: ["KE = mgh", "KE = ½mv²", "KE = mc²", "KE = Fd"],
    correctAnswer: 1,
    explanation: "The formula for kinetic energy is KE = ½mv², where m is mass and v is velocity. This represents the energy possessed by an object due to its motion.",
    subject: "Physics"
  },
  {
    id: 10,
    question: "What is the SI unit of power?",
    options: ["Joule", "Newton", "Watt", "Volt"],
    correctAnswer: 2,
    explanation: "The SI unit of power is Watt (W). One watt is defined as one joule of energy transferred or converted per second (1 W = 1 J/s).",
    subject: "Physics"
  },
  {
    id: 11,
    question: "What is the relationship between frequency and wavelength?",
    options: [
      "Directly proportional",
      "Inversely proportional",
      "No relationship",
      "Exponentially related"
    ],
    correctAnswer: 1,
    explanation: "Frequency and wavelength are inversely proportional. The relationship is given by c = fλ, where c is the speed of light, f is frequency, and λ is wavelength.",
    subject: "Physics"
  },
  {
    id: 12,
    question: "What is the charge of an electron?",
    options: ["-1.6 × 10⁻¹⁹ C", "+1.6 × 10⁻¹⁹ C", "-1.6 × 10⁻¹⁸ C", "0 C"],
    correctAnswer: 0,
    explanation: "The charge of an electron is -1.6 × 10⁻¹⁹ coulombs. This is a fundamental constant in physics and represents the elementary charge.",
    subject: "Physics"
  },
  {
    id: 13,
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: 0,
    explanation: "Paris is the capital and most populous city of France. It has been the capital since the 12th century and is known for its art, culture, and history.",
    subject: "General Knowledge"
  },
  {
    id: 14,
    question: "What is Planck's constant used for?",
    options: [
      "Classical mechanics",
      "Quantum mechanics",
      "Thermodynamics",
      "Electromagnetism"
    ],
    correctAnswer: 1,
    explanation: "Planck's constant (h ≈ 6.626 × 10⁻³⁴ J·s) is fundamental in quantum mechanics. It relates the energy of a photon to its frequency (E = hf).",
    subject: "Physics"
  },
  {
    id: 15,
    question: "What is the first law of thermodynamics?",
    options: [
      "Energy conservation",
      "Entropy always increases",
      "Absolute zero is unattainable",
      "Heat flows from hot to cold"
    ],
    correctAnswer: 0,
    explanation: "The first law of thermodynamics is the law of energy conservation: the total energy of an isolated system is constant. Energy can be transformed but not created or destroyed.",
    subject: "Physics"
  },
  {
    id: 16,
    question: "What is the SI unit of frequency?",
    options: ["Hertz", "Second", "Meter", "Radian"],
    correctAnswer: 0,
    explanation: "The SI unit of frequency is Hertz (Hz). One hertz equals one cycle per second.",
    subject: "Physics"
  },
  {
    id: 17,
    question: "What is the refractive index of water?",
    options: ["1.0", "1.33", "1.5", "2.0"],
    correctAnswer: 1,
    explanation: "The refractive index of water is approximately 1.33. This means light travels 1.33 times slower in water than in vacuum.",
    subject: "Physics"
  },
  {
    id: 18,
    question: "What is Archimedes' principle?",
    options: [
      "Buoyant force equals weight of displaced fluid",
      "Force equals mass times acceleration",
      "Energy is conserved",
      "Pressure is force per unit area"
    ],
    correctAnswer: 0,
    explanation: "Archimedes' principle states that the buoyant force on an object submerged in a fluid is equal to the weight of the fluid displaced by the object.",
    subject: "Physics"
  },
  {
    id: 19,
    question: "What is the unit of magnetic field strength?",
    options: ["Tesla", "Weber", "Henry", "Gauss"],
    correctAnswer: 0,
    explanation: "The SI unit of magnetic field strength is Tesla (T). One tesla is a very strong magnetic field; Earth's magnetic field is about 0.00005 T.",
    subject: "Physics"
  },
  {
    id: 20,
    question: "What is the Doppler effect?",
    options: [
      "Change in frequency due to relative motion",
      "Bending of light",
      "Splitting of light into colors",
      "Interference of waves"
    ],
    correctAnswer: 0,
    explanation: "The Doppler effect is the change in frequency or wavelength of a wave in relation to an observer moving relative to the wave source. Common examples include the changing pitch of a siren as it passes.",
    subject: "Physics"
  },
  {
    id: 21,
    question: "What is the mass of a proton?",
    options: [
      "1.67 × 10⁻²⁷ kg",
      "9.11 × 10⁻³¹ kg",
      "1.67 × 10⁻²⁴ kg",
      "1.0 kg"
    ],
    correctAnswer: 0,
    explanation: "The mass of a proton is approximately 1.67 × 10⁻²⁷ kg. This is about 1836 times the mass of an electron.",
    subject: "Physics"
  },
  {
    id: 22,
    question: "What is Hooke's Law?",
    options: ["F = -kx", "F = ma", "V = IR", "P = F/A"],
    correctAnswer: 0,
    explanation: "Hooke's Law states that F = -kx, where F is the restoring force, k is the spring constant, and x is the displacement. The negative sign indicates the force opposes the displacement.",
    subject: "Physics"
  },
  {
    id: 23,
    question: "What is the critical angle?",
    options: [
      "Angle of minimum deviation",
      "Angle of total internal reflection",
      "Angle of incidence equals angle of reflection",
      "90 degrees"
    ],
    correctAnswer: 1,
    explanation: "The critical angle is the angle of incidence beyond which total internal reflection occurs when light travels from a denser to a rarer medium.",
    subject: "Physics"
  },
  {
    id: 24,
    question: "What is specific heat capacity?",
    options: [
      "Heat required to raise 1 kg by 1°C",
      "Heat required to melt a substance",
      "Heat required to boil a substance",
      "Total heat in a substance"
    ],
    correctAnswer: 0,
    explanation: "Specific heat capacity is the amount of heat energy required to raise the temperature of 1 kilogram of a substance by 1 degree Celsius.",
    subject: "Physics"
  },
  {
    id: 25,
    question: "What is Young's modulus?",
    options: [
      "Stress/Strain",
      "Force/Area",
      "Mass/Volume",
      "Work/Time"
    ],
    correctAnswer: 0,
    explanation: "Young's modulus is the ratio of stress to strain in elastic materials. It measures the stiffness of a solid material.",
    subject: "Physics"
  },
  {
    id: 26,
    question: "What is the escape velocity from Earth?",
    options: ["11.2 km/s", "9.8 m/s", "3 × 10⁸ m/s", "7.9 km/s"],
    correctAnswer: 0,
    explanation: "The escape velocity from Earth is approximately 11.2 km/s. This is the minimum speed needed for an object to escape Earth's gravitational field.",
    subject: "Physics"
  },
  {
    id: 27,
    question: "What is Faraday's law of electromagnetic induction?",
    options: [
      "Induced EMF is proportional to rate of change of magnetic flux",
      "Voltage equals current times resistance",
      "Magnetic field is perpendicular to electric field",
      "Like charges repel"
    ],
    correctAnswer: 0,
    explanation: "Faraday's law states that the induced electromotive force (EMF) in a circuit is proportional to the rate of change of magnetic flux through the circuit.",
    subject: "Physics"
  },
  {
    id: 28,
    question: "What is the Heisenberg Uncertainty Principle?",
    options: [
      "Cannot measure position and momentum precisely simultaneously",
      "Energy is quantized",
      "Wave-particle duality",
      "Matter waves exist"
    ],
    correctAnswer: 0,
    explanation: "The Heisenberg Uncertainty Principle states that it is impossible to simultaneously measure the exact position and exact momentum of a particle with absolute precision.",
    subject: "Physics"
  },
  {
    id: 29,
    question: "What is the coefficient of friction?",
    options: [
      "Ratio of frictional force to normal force",
      "Force per unit area",
      "Work done against friction",
      "Heat generated by friction"
    ],
    correctAnswer: 0,
    explanation: "The coefficient of friction is the ratio of the frictional force between two surfaces to the normal force pressing them together. It is dimensionless.",
    subject: "Physics"
  },
  {
    id: 30,
    question: "What is Boyle's Law?",
    options: [
      "PV = constant (at constant temperature)",
      "V/T = constant",
      "P/T = constant",
      "PV/T = constant"
    ],
    correctAnswer: 0,
    explanation: "Boyle's Law states that at constant temperature, the pressure of a gas is inversely proportional to its volume (PV = constant).",
    subject: "Physics"
  }
];

interface ExamPageProps {
  onSubmit: (state: ExamState, questions: Question[]) => void;
}

export default function ExamPage({ onSubmit }: ExamPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>(
    MOCK_QUESTIONS.map(q => ({
      questionId: q.id,
      status: 'unattempted' as const,
      selectedAnswer: null
    }))
  );
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [warnings, setWarnings] = useState(0);
  const [notes, setNotes] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Visibility change detection for warnings
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings(prev => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleAutoSubmit = () => {
    const examState: ExamState = {
      currentQuestion,
      questionStatuses,
      timeLeft,
      warnings,
      notes
    };
    onSubmit(examState, MOCK_QUESTIONS);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hours, minutes, seconds: secs };
  };

  const handleSelectAnswer = (optionIndex: number) => {
    setQuestionStatuses(prev => prev.map(qs => {
      if (qs.questionId === MOCK_QUESTIONS[currentQuestion].id) {
        return {
          ...qs,
          selectedAnswer: optionIndex,
          status: qs.status === 'marked' ? 'answered-marked' : 'attempted'
        };
      }
      return qs;
    }));
  };

  const handleClearResponse = () => {
    setQuestionStatuses(prev => prev.map(qs => {
      if (qs.questionId === MOCK_QUESTIONS[currentQuestion].id) {
        return {
          ...qs,
          selectedAnswer: null,
          status: qs.status === 'answered-marked' ? 'marked' : 'unattempted'
        };
      }
      return qs;
    }));
  };

  const handleMarkForReview = () => {
    setQuestionStatuses(prev => prev.map(qs => {
      if (qs.questionId === MOCK_QUESTIONS[currentQuestion].id) {
        return {
          ...qs,
          status: qs.selectedAnswer !== null ? 'answered-marked' : 'marked'
        };
      }
      return qs;
    }));
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleQuestionClick = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleSubmitTest = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmit = () => {
    const examState: ExamState = {
      currentQuestion,
      questionStatuses,
      timeLeft,
      warnings,
      notes
    };
    onSubmit(examState, MOCK_QUESTIONS);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'attempted': return 'bg-green-500 text-white';
      case 'unattempted': return 'bg-gray-300 text-gray-700';
      case 'marked': return 'bg-yellow-500 text-white';
      case 'answered-marked': return 'bg-orange-500 text-white';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  const getStatusCounts = () => {
    const attempted = questionStatuses.filter(qs => qs.status === 'attempted').length;
    const unattempted = questionStatuses.filter(qs => qs.status === 'unattempted').length;
    const marked = questionStatuses.filter(qs => qs.status === 'marked').length;
    const answeredMarked = questionStatuses.filter(qs => qs.status === 'answered-marked').length;
    return { attempted, unattempted, marked, answeredMarked };
  };

  const time = formatTime(timeLeft);
  const counts = getStatusCounts();
  const currentQ = MOCK_QUESTIONS[currentQuestion];
  const currentStatus = questionStatuses.find(qs => qs.questionId === currentQ.id);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / MOCK_QUESTIONS.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-lg p-4 shadow-sm">
              <div className="text-sm text-indigo-700">Batch - 1</div>
              <div className="font-semibold text-indigo-900">UPSC - Physics Exam Online</div>
              <div className="text-xs text-indigo-600 mt-1">
                Question {currentQuestion + 1} of {MOCK_QUESTIONS.length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-lg p-4 flex items-center justify-between cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <span className="font-semibold text-indigo-900">Select Subject</span>
              <ChevronDown className="w-4 h-4 text-indigo-700" />
            </div>
            <div className={`rounded-lg p-4 flex items-center gap-2 shadow-sm ${
              warnings >= 4 ? 'bg-red-200 animate-pulse' : warnings >= 2 ? 'bg-orange-100' : 'bg-yellow-50'
            }`}>
              <AlertTriangle className={`w-5 h-5 ${
                warnings >= 4 ? 'text-red-600' : warnings >= 2 ? 'text-orange-500' : 'text-yellow-600'
              }`} />
              <span className={`font-semibold ${
                warnings >= 4 ? 'text-red-700' : warnings >= 2 ? 'text-orange-700' : 'text-yellow-700'
              }`}>
                Warnings: {warnings}/5
              </span>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Attempted : {counts.attempted}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                <span>Unattempted : {counts.unattempted}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>Mark As Review : {counts.marked}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span>Answered & Mark As Review : {counts.answeredMarked}</span>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm min-h-[400px]">
            <h2 className="text-xl mb-6">
              Q {currentQ.id}. {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    currentStatus?.selectedAnswer === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => handleSelectAnswer(index)}
                >
                  <div className="flex items-center justify-center w-5 h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={currentStatus?.selectedAnswer === index}
                      onChange={() => handleSelectAnswer(index)}
                      className="w-4 h-4 accent-indigo-600"
                    />
                  </div>
                  <div>
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Previous
            </Button>
            <Button
              onClick={handleClearResponse}
              variant="outline"
              className="border-2 border-gray-300"
            >
              Clear Response
            </Button>
            <Button
              onClick={handleMarkForReview}
              variant="outline"
              className="border-2 border-yellow-500 text-yellow-700 hover:bg-yellow-50"
            >
              Mark For Review
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentQuestion === MOCK_QUESTIONS.length - 1}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Next
            </Button>
            <Button
              onClick={handleSubmitTest}
              className="bg-indigo-700 hover:bg-indigo-800 ml-auto"
            >
              Submit Test
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Time Left */}
          <div className="bg-indigo-100 rounded-lg p-4">
            <div className="text-center mb-3 font-semibold">Time Left</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-2xl font-bold">{String(time.hours).padStart(2, '0')}</div>
                <div className="text-xs text-gray-600">Hours</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{String(time.minutes).padStart(2, '0')}</div>
                <div className="text-xs text-gray-600">Minutes</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{String(time.seconds).padStart(2, '0')}</div>
                <div className="text-xs text-gray-600">Seconds</div>
              </div>
            </div>
          </div>

          {/* Question Overview */}
          <div className="bg-indigo-100 rounded-lg p-4">
            <div className="text-center mb-3 font-semibold">Question Overview</div>
            <div className="grid grid-cols-7 gap-2">
              {MOCK_QUESTIONS.map((q, index) => {
                const status = questionStatuses.find(qs => qs.questionId === q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionClick(index)}
                    className={`aspect-square rounded-md flex items-center justify-center text-sm font-semibold transition-all ${
                      getStatusColor(status?.status || 'unattempted')
                    } ${currentQuestion === index ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-indigo-100 rounded-lg p-4">
            <div className="text-center mb-3 font-semibold">Notes</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-32 p-3 rounded-lg border-2 border-indigo-200 focus:border-indigo-400 outline-none resize-none"
              placeholder="Add your notes here..."
            />
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      {showSubmitDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4">Confirm Submission</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit the test? You have attempted {counts.attempted} out of {MOCK_QUESTIONS.length} questions.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                onClick={() => setShowSubmitDialog(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmSubmit}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Submit Test
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
