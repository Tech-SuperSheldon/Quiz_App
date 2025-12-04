// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   ChevronLeftIcon, 
//   ChevronRightIcon, 
//   ClockIcon,
//   CheckCircleIcon,
//   QuestionMarkCircleIcon,
//   FlagIcon,
//   XMarkIcon,
//   EyeIcon
// } from "@heroicons/react/24/outline";
// import Cookies from "js-cookie";

// interface Question {
//   question_id: string;
//   question_name: string;
//   question_options: string[];
//   correct_answer: string;
//   explanation: string;
//   difficulty_level: string;
//   question_category: string;
//   course_type: string;
//   stage_number: number;
//   user_answer: string | null;
//   is_correct: boolean;
//   question_attempted: boolean;
//   time_spent: number;
//   created_at: string;
//   updated_at: string;
//   user_id: string;
// }

// interface QuizResponse {
//   message: string;
//   questions: Question[];
// }

// export default function QuizPlatform() {
//   const router = useRouter();
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [answers, setAnswers] = useState<{[key: number]: string}>({});
//   const [marked, setMarked] = useState<number[]>([]);
//   const [review, setReview] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState(55 * 60); // 55 minutes
//   const [showFinishConfirm, setShowFinishConfirm] = useState(false);
//   const [currentStage, setCurrentStage] = useState(1);
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     const loadUserData = () => {
//       const token = Cookies.get("token");
//       if (token) {
//         setUserData(JSON.parse(token));
//       } else {
//         router.push("/auth/login");
//       }
//     };

//     loadUserData();
//   }, [router]);

//   useEffect(() => {
//     if (userData) {
//       fetchQuestions(currentStage);
//     }
//   }, [userData, currentStage]);

//   useEffect(() => {
//     // Auto-load next stage when reaching question 6
//     if (currentQuestion === 5 && questions.length > 0) { // 6th question (0-indexed)
//       loadNextStage();
//     }
//   }, [currentQuestion, questions.length]);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       handleFinishExam();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const fetchQuestions = async (stage: number) => {
//     try {
//       setLoading(true);
//       // Read token and user_id from browser cookies
//       const token = Cookies.get("token");
//       const userId = Cookies.get("user_id");
//       if (!token || !userId) {
//         throw new Error("User not authenticated");
//       }
//       const response = await fetch("https://levelupbackend.supersheldon.online/api/questions/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           user_id: userId,
//           course_type: userData?.course || "Naplap",
//           stage_number: stage
//         })
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to fetch questions: ${response.statusText}`);
//       }
//       const data: QuizResponse = await response.json();
//       setQuestions(prev => [...prev, ...data.questions]);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//       alert("Failed to load questions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadNextStage = () => {
//     const nextStage = currentStage + 1;
//     setCurrentStage(nextStage);
//     // Questions will be fetched automatically via useEffect
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleOptionSelect = (option: string) => {
//     setSelectedOption(option);
//     setAnswers(prev => ({
//       ...prev,
//       [currentQuestion]: option
//     }));

//     // Update the question in state
//     setQuestions(prev => prev.map((q, index) => 
//       index === currentQuestion 
//         ? { 
//             ...q, 
//             user_answer: option,
//             question_attempted: true,
//             is_correct: option === q.correct_answer
//           }
//         : q
//     ));
//   };

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(prev => prev + 1);
//       setSelectedOption(answers[currentQuestion + 1] || null);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(prev => prev - 1);
//       setSelectedOption(answers[currentQuestion - 1] || null);
//     }
//   };

//   const toggleMark = () => {
//     setMarked(prev => 
//       prev.includes(currentQuestion) 
//         ? prev.filter(q => q !== currentQuestion)
//         : [...prev, currentQuestion]
//     );
//   };

//   const toggleReview = () => {
//     if (answers[currentQuestion] === undefined) {
//       alert("Please answer the question first before marking for review.");
//       return;
//     }
    
//     setReview(prev => 
//       prev.includes(currentQuestion) 
//         ? prev.filter(q => q !== currentQuestion)
//         : [...prev, currentQuestion]
//     );
//   };

//   const goToQuestion = (questionIndex: number) => {
//     setCurrentQuestion(questionIndex);
//     setSelectedOption(answers[questionIndex] || null);
//   };

//   const getQuestionStatus = (index: number) => {
//     const userAnswer = answers[index];
//     const question = questions[index];
    
//     if (userAnswer !== undefined) {
//       if (userAnswer === question?.correct_answer) return "correct";
//       return "wrong";
//     }
    
//     if (review.includes(index)) return "review";
//     if (marked.includes(index)) return "marked";
    
//     return "not-visited";
//   };

//   const isOptionCorrect = (option: string) => {
//     const userAnswer = answers[currentQuestion];
//     const correctAnswer = questions[currentQuestion]?.correct_answer;
    
//     if (userAnswer === undefined) return null;
//     if (option === correctAnswer) return true;
//     if (option === userAnswer && userAnswer !== correctAnswer) return false;
//     return null;
//   };

//   const handleFinishExam = async () => {
//     try {
//       // Submit all answers to backend
//       const token = Cookies.get("token");
//       const submissionData = {
//         user_id: userData._id || userData.googleId,
//         answers: questions.map((q, index) => ({
//           question_id: q.question_id,
//           user_answer: answers[index] || null,
//           time_spent: q.time_spent,
//           is_correct: answers[index] === q.correct_answer
//         }))
//       };

//       // Send results to backend (you'll need to create this endpoint)
//       await fetch("https://levelupbackend.supersheldon.online/api/questions/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify(submissionData)
//       });

//       // Calculate score
//       const score = Object.keys(answers).reduce((acc, questionIndex) => {
//         const userAnswer = answers[parseInt(questionIndex)];
//         const correctAnswer = questions[parseInt(questionIndex)]?.correct_answer;
//         return userAnswer === correctAnswer ? acc + 1 : acc;
//       }, 0);

//       console.log(`Quiz finished! Score: ${score}/${questions.length}`);
//       router.push("/dashboard/quizzes/results");
//     } catch (error) {
//       console.error("Error submitting quiz:", error);
//       // Still redirect to results even if submission fails
//       router.push("/dashboard/quizzes/results");
//     }
//   };

//   if (loading && questions.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white/95 dark:bg-slate-900">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center"
//         >
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-300">Loading questions...</p>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Stage {currentStage}</p>
//         </motion.div>
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white/95 dark:bg-slate-900">
//         <div className="text-center">
//           <p className="text-red-600 dark:text-red-400">Please log in to access the quiz</p>
//           <button 
//             onClick={() => router.push("/auth/login")}
//             className="mt-4 text-indigo-600 hover:text-indigo-700"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const currentQ = questions[currentQuestion];
//   const isAnswered = answers[currentQuestion] !== undefined;

//   return (
//     <div className="min-h-screen bg-white/95 dark:bg-slate-900 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Top Bar with Timer and Finish Button */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-4 border border-gray-200/50 dark:border-slate-700/50 shadow-lg mb-6"
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
//                 <ClockIcon className="h-5 w-5 text-red-500" />
//                 <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
//               </div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">
//                 Question {currentQuestion + 1} of {questions.length} • Stage {currentStage}
//               </div>
//               {currentQuestion >= 5 && (
//                 <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
//                   Loading next stage...
//                 </div>
//               )}
//             </div>
            
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowFinishConfirm(true)}
//               className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-xl font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-200 flex items-center gap-2"
//             >
//               <CheckCircleIcon className="h-4 w-4" />
//               Finish Exam
//             </motion.button>
//           </div>
//         </motion.div>

//         <div className="grid lg:grid-cols-4 gap-6">
//           {/* Question Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="lg:col-span-3"
//           >
//             <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-slate-700/50 shadow-lg overflow-hidden">
//               {/* Question Header */}
//               <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-white font-semibold">
//                       Question {currentQuestion + 1}
//                     </h2>
//                     <p className="text-indigo-200 text-xs mt-1">
//                       {currentQ?.difficulty_level} • {currentQ?.question_category} • Stage {currentStage}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={toggleReview}
//                       disabled={!isAnswered}
//                       className={`p-1 rounded transition-colors ${isAnswered ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300" : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"}`}
//                     >
//                       Mark for Review
//                     <button
//                       onClick={toggleReview}
//                       disabled={!isAnswered}
//                       className={`p-1 rounded transition-colors ${isAnswered ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300" : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"}`}
//                     >
//                       Mark for Review
//                     </button>
//                   </div>
//                 </div>
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handlePrevious}
//                     disabled={currentQuestion === 0}
//                     className={`
//                       flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-all duration-200
//                       ${
//                         currentQuestion === 0
//                           ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
//                           : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-500'
//                       }
//                     `}
//                   >
//                     <ChevronLeftIcon className="h-4 w-4" />
//                     Previous
//                   </motion.button>

//                   <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
//                     <div>Stage {currentStage}</div>
//                     <div className="mt-1">
//                       {isAnswered ? "✓ Answered" : "Not answered"}
//                       {marked.includes(currentQuestion) && " • ⚐ Marked"}
//                       {review.includes(currentQuestion) && " • 👁️ Review"}
//                     </div>
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handleNext}
//                     disabled={currentQuestion === questions.length - 1}
//                     className={`
//                       flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-all duration-200
//                       ${
//                         currentQuestion === questions.length - 1
//                           ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
//                           : 'bg-indigo-600 text-white hover:bg-indigo-700'
//                       }
//                     `}
//                   >
//                     Next
//                     <ChevronRightIcon className="h-4 w-4" />
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Questions Panel */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="lg:col-span-1"
//           >
//             <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-4 border border-gray-200/50 dark:border-slate-700/50 shadow-lg sticky top-6">
//               <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
//                 <QuestionMarkCircleIcon className="h-4 w-4" />
//                 Questions • Stage {currentStage}
//               </h3>
              
//               <div className="grid grid-cols-5 gap-1">
//                 {questions.map((_, index) => {
//                   const status = getQuestionStatus(index);
//                   const isCurrent = index === currentQuestion;
                  
//                   return (
//                     <motion.button
//                       key={index}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => goToQuestion(index)}
//                       className={`
//                         relative p-1.5 rounded text-xs font-medium transition-all duration-200
//                         ${isCurrent ? 'ring-2 ring-indigo-500 ring-offset-1' : ''}
//                         ${
//                           status === 'correct' 
//                             ? 'bg-green-500 text-white' 
//                             : status === 'wrong'
//                             ? 'bg-red-500 text-white'
//                             : status === 'review'
//                             ? 'bg-blue-500 text-white'
//                             : status === 'marked'
//                             ? 'bg-yellow-500 text-white'
//                             : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
//                         }
//                       `}
//                     >
//                       {index + 1}
//                       {status === 'marked' && (
//                         <FlagIcon className="h-2 w-2 absolute -top-0.5 -right-0.5" />
//                       )}
//                       {status === 'review' && (
//                         <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full border border-blue-600"></div>
//                       )}
//                     </motion.button>
//                   );
//                 })}
//               </div>

//               {/* Legend */}
//               <div className="mt-4 space-y-2 text-xs">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 rounded bg-green-500"></div>
//                     <span className="text-gray-600 dark:text-gray-300">Correct</span>
//                   </div>
//                   <span className="font-medium text-green-600">
//                     {Object.keys(answers).filter(index => 
//                       answers[parseInt(index)] === questions[parseInt(index)]?.correct_answer
//                     ).length}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 rounded bg-red-500"></div>
//                     <span className="text-gray-600 dark:text-gray-300">Wrong</span>
//                   </div>
//                   <span className="font-medium text-red-600">
//                     {Object.keys(answers).filter(index => 
//                       answers[parseInt(index)] !== questions[parseInt(index)]?.correct_answer
//                     ).length}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 rounded bg-yellow-500"></div>
//                     <span className="text-gray-600 dark:text-gray-300">Marked</span>
//                   </div>
//                   <span className="font-medium">{marked.length}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 rounded bg-blue-500"></div>
//                     <span className="text-gray-600 dark:text-gray-300">Review</span>
//                   </div>
//                   <span className="font-medium">{review.length}</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Finish Exam Confirmation Modal */}
//       <AnimatePresence>
//         {showFinishConfirm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-xl"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                   Finish Exam?
//                 </h3>
//                 <button
//                   onClick={() => setShowFinishConfirm(false)}
//                   className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                 >
//                   <XMarkIcon className="h-5 w-5" />
//                 </button>
//               </div>
              
//               <div className="mb-6 space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600 dark:text-gray-300">Total Questions:</span>
//                   <span className="font-medium">{questions.length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600 dark:text-gray-300">Answered:</span>
//                   <span className="font-medium text-green-600">{Object.keys(answers).length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600 dark:text-gray-300">Correct Answers:</span>
//                   <span className="font-medium text-green-600">
//                     {Object.keys(answers).filter(index => 
//                       answers[parseInt(index)] === questions[parseInt(index)]?.correct_answer
//                     ).length}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600 dark:text-gray-300">Current Stage:</span>
//                   <span className="font-medium">{currentStage}</span>
//                 </div>
//               </div>
              
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowFinishConfirm(false)}
//                   className="flex-1 py-2 px-4 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
//                 >
//                   Continue Exam
//                 </button>
//                 <button
//                   onClick={handleFinishExam}
//                   className="flex-1 py-2 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
//                 >
//                   Finish Exam
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }