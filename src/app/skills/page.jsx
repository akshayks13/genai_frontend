'use client';
import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Upload, Send, Search, MessageSquare, Clock, Trash2, Download, Volume2, VolumeX } from "lucide-react";

// Add a brain icon (or similar) for branding
import { Brain } from 'lucide-react'; // Make sure to install lucide-react if you haven't: npm install lucide-react

const MODES = [
  { id: "learning", label: "Learning Mode", desc: "Explain concepts, step-by-step." },
  { id: "interview", label: "Interview Mode", desc: "Mock interviews & feedback." },
  { id: "mentorship", label: "Mentorship Mode", desc: "Career advice & action steps." },
  { id: "explore", label: "Exploration Mode", desc: "Discover role-options & hybrids." },
  { id: "roadmap", label: "Roadmap Mode", desc: "Actionable milestones & timeline." },
];

const MODE_SUGGESTIONS = {
  learning: [
    {
      title: "Explain Data Structures",
      prompt: "Can you explain the most important data structures for software engineering interviews with examples?",
      icon: "🧠"
    },
    {
      title: "System Design Basics",
      prompt: "Walk me through the fundamentals of system design that I should know for tech interviews.",
      icon: "⚙️"
    },
    {
      title: "Algorithms Explained",
      prompt: "Explain common algorithm patterns like two pointers, sliding window, and dynamic programming with examples.",
      icon: "📊"
    },
    {
      title: "Programming Languages",
      prompt: "What are the key differences between Python, Java, and JavaScript for backend development?",
      icon: "💻"
    }
  ],
  interview: [
    {
      title: "Technical Interview Prep",
      prompt: "Give me a mock technical interview question for a software engineer position and provide feedback on my approach.",
      icon: "🎯"
    },
    {
      title: "Behavioral Questions",
      prompt: "Ask me common behavioral interview questions and help me structure better STAR method responses.",
      icon: "🗣️"
    },
    {
      title: "System Design Interview",
      prompt: "Give me a system design interview question and guide me through the solution step by step.",
      icon: "🏗️"
    },
    {
      title: "Salary Negotiation",
      prompt: "Help me practice salary negotiation scenarios and provide tips for discussing compensation.",
      icon: "💰"
    }
  ],
  mentorship: [
    {
      title: "Career Transition Plan",
      prompt: "I want to transition from [current role] to [target role]. Help me create a detailed action plan.",
      icon: "🚀"
    },
    {
      title: "Skill Gap Analysis",
      prompt: "Analyze my current skills and identify gaps I need to fill for my target role in tech.",
      icon: "📈"
    },
    {
      title: "Network Building",
      prompt: "Give me actionable strategies to build a professional network in the tech industry.",
      icon: "🤝"
    },
    {
      title: "Personal Brand",
      prompt: "Help me develop my personal brand and online presence for career advancement.",
      icon: "✨"
    }
  ],
  explore: [
    {
      title: "Tech Role Explorer",
      prompt: "Show me different career paths in tech and help me understand which might fit my interests and skills.",
      icon: "🔍"
    },
    {
      title: "Emerging Technologies",
      prompt: "What are the most promising emerging technology fields and career opportunities they offer?",
      icon: "🌟"
    },
    {
      title: "Remote Work Options",
      prompt: "Explore remote-friendly career paths and companies that offer flexible work arrangements.",
      icon: "🌍"
    },
    {
      title: "Industry Comparison",
      prompt: "Compare working at startups vs big tech companies vs consulting firms - pros and cons of each.",
      icon: "⚖️"
    }
  ],
  roadmap: [
    {
      title: "90-Day Career Plan",
      prompt: "Create a detailed 90-day roadmap to improve my chances of landing a software engineer role.",
      icon: "📅"
    },
    {
      title: "Learning Schedule",
      prompt: "Design a weekly learning schedule to master full-stack development in 6 months.",
      icon: "📚"
    },
    {
      title: "Project Portfolio",
      prompt: "Help me plan and prioritize projects to build an impressive portfolio for job applications.",
      icon: "📁"
    },
    {
      title: "Certification Path",
      prompt: "Recommend certifications and their timeline for advancing in cloud computing/data science/AI.",
      icon: "🏆"
    }
  ]
};

function ChatHistory({ sessions, currentSessionId, searchHistory, setSearchHistory, onLoadSession, onDeleteSession, onNewSession }) {
  const [filterMode, setFilterMode] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredSessions = sessions
    .filter(session => {
      // Search filter
      const matchesSearch = !searchHistory ||
        session.title.toLowerCase().includes(searchHistory.toLowerCase()) ||
        session.preview.toLowerCase().includes(searchHistory.toLowerCase());

      // Mode filter
      const matchesMode = filterMode === 'all' || session.mode === filterMode;

      return matchesSearch && matchesMode;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'messages') return b.messageCount - a.messageCount;
      return a.title.localeCompare(b.title);
    });

  const formatDate = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return new Date(date).toLocaleDateString();
  };

  const getModeColor = (mode) => {
    const colors = {
      learning: 'bg-blue-100 text-blue-700',
      interview: 'bg-green-100 text-green-700',
      mentorship: 'bg-purple-100 text-purple-700',
      explore: 'bg-orange-100 text-orange-700',
      roadmap: 'bg-indigo-100 text-indigo-700'
    };
    return colors[mode] || 'bg-gray-100 text-gray-700';
  };

  const exportSession = (session) => {
    const content = session.messages?.map(m =>
      `${m.role.toUpperCase()}: ${m.text}`
    ).join('\n\n') || 'No messages';

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${session.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sticky top-6 space-y-4">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
            <MessageSquare size={20} className="text-blue-500" />
            Chat History
          </h3>
          <button
            onClick={onNewSession}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            New Chat
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchHistory}
            onChange={(e) => setSearchHistory(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4">
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white focus:ring-1 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Modes</option>
            {MODES.map(mode => (
              <option key={mode.id} value={mode.id}>{mode.label}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white focus:ring-1 focus:ring-blue-500 outline-none"
          >
            <option value="date">Latest First</option>
            <option value="messages">Most Active</option>
            <option value="title">Alphabetical</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <div className="text-xl font-bold text-blue-600">{sessions.length}</div>
            <div className="text-xs text-blue-600">Total Chats</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
            <div className="text-xl font-bold text-green-600">
              {sessions.reduce((sum, s) => sum + s.messageCount, 0)}
            </div>
            <div className="text-xs text-green-600">Messages</div>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="max-h-96 overflow-y-auto custom-scrollbar"> {/* Added custom-scrollbar class */}
          {filteredSessions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No conversations found</p>
              {searchHistory && (
                <button
                  onClick={() => setSearchHistory('')}
                  className="text-xs text-blue-600 mt-1 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    currentSessionId === session.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                  }`}
                  onClick={() => onLoadSession(session.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-gray-900 line-clamp-2 flex-1">
                      {session.title}
                    </h4>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          exportSession(session);
                        }}
                        className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                        title="Export chat"
                      >
                        <Download size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(session.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete chat"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getModeColor(session.mode)}`}>
                      {MODES.find(m => m.id === session.mode)?.label.split(' ')[0] || session.mode}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} className="opacity-70" />
                      {formatDate(session.date)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {session.preview}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{session.messageCount} messages</span>
                    {session.lastMessage && (
                      <span className="line-clamp-1 max-w-32 truncate">
                        {session.lastMessage.substring(0, 30)}...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SuggestionCards({ mode, suggestions, onSuggestionClick }) {
  const currentMode = MODES.find(m => m.id === mode);

  return (
    <div className="mb-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
          Welcome to {currentMode.label}!
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {currentMode.desc} Explore the suggestions below or type your own query to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
        {suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            onClick={() => onSuggestionClick(suggestion)}
            className="group relative bg-white border border-gray-200 rounded-xl p-5 cursor-pointer shadow-sm hover:shadow-lg hover:border-blue-300 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
                {suggestion.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {suggestion.prompt}
                </p>
              </div>
            </div>
            <div className="absolute bottom-3 right-4">
              <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                Ask Now <Send size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModeSelector({ mode, setMode }) {
  return (
    <div className="flex justify-center bg-gray-100 rounded-full p-1.5 shadow-sm border border-gray-200 max-w-fit mx-auto mt-4">
      {MODES.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`
            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
            ${
              mode === m.id
                ? "bg-blue-600 text-white shadow-md transform scale-105"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }
          `}
        >
          {m.label.split(' ')[0]}
        </button>
      ))}
    </div>
  );
}

function MessageBubble({ m, onSpeakMessage }) {
  if (m.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] bg-blue-600 text-white p-4 rounded-3xl rounded-br-lg shadow-md break-words">
          <div className="whitespace-pre-wrap">{m.text}</div>
          {m.files && m.files.map((f, i) => <AttachmentPreview key={i} f={f} />)}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex">
        <div className="max-w-[75%] bg-gray-100 text-gray-800 p-4 rounded-3xl rounded-bl-lg shadow-md break-words">
          <div className="flex items-start justify-between mb-2">
            <div className="whitespace-pre-wrap flex-1">{m.text}</div>
            <button
              onClick={() => onSpeakMessage(m.text)}
              className="ml-3 p-1 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-200"
              title="Read message aloud"
            >
              <Volume2 size={18} />
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {m.files && m.files.map((f, i) => (
              <div key={i}><AttachmentPreview f={f} /></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function AttachmentPreview({ f }) {
  if (!f) return null;

  if (f.type && f.type.startsWith("image")) {
    return <img src={f.url} alt={f.name} className="mt-3 max-h-48 w-full object-cover rounded-lg shadow-sm border border-gray-200" />;
  }

  if (f.type === "application/pdf" || (f.url && f.url.endsWith(".pdf"))) {
    return (
      <div className="mt-3 bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
        <a href={f.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
          📄 {f.name || "View PDF"}
        </a>
        {/* <iframe src={f.url} className="w-full h-48 mt-2 border rounded" title={f.name}></iframe> */}
      </div>
    );
  }

  return (
    <a href={f.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 mt-2">
      🔗 {f.name || f.url}
    </a>
  );
}

export default function ChatPage() {
  const [mode, setMode] = useState("learning");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [searchHistory, setSearchHistory] = useState("");
  const inputRef = useRef();
  const messagesRef = useRef(null);
  const textareaRef = useRef(null);

  // Speech recognition (browser)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = "en-US";

    const onResult = (e) => {
      const text = e.results[0][0].transcript;
      setInput((s) => s ? s + " " + text : text);
      setListening(false);
    };
    const onEnd = () => setListening(false);

    recog.onresult = onResult;
    recog.onend = onEnd;

    inputRef.current = recog;
    return () => {
      recog.onresult = null;
      recog.onend = null;
    };
  }, []);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  // Show suggestions when mode changes and no messages exist
  useEffect(() => {
    if (messages.length === 0) {
      setShowSuggestions(true);
    }
  }, [mode, messages.length]);

  const startListening = () => {
    const recog = inputRef.current;
    if (!recog) return alert("SpeechRecognition not supported in this browser.");
    setListening(true);
    recog.start();
  };

  const stopListening = () => {
    const recog = inputRef.current;
    if (!recog) return;
    recog.stop();
    setListening(false);
  };

  const speakMessage = (text) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    if (speaking) {
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    setFilePreview({ name: f.name, url: URL.createObjectURL(f), file: f, type: f.type });
  };

  // Initialize with sample chat history
  useEffect(() => {
    const sampleSessions = [
      {
        id: '1',
        title: 'Data Structures Interview Prep',
        mode: 'interview',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        messageCount: 8,
        preview: 'Can you give me a mock technical interview question...',
        lastMessage: 'Great practice! Focus on explaining your thought process clearly.',
        messages: [{ role: 'user', text: 'Can you give me a mock technical interview question?' }, { role: 'ai', text: 'Certainly! Let\'s begin. Here\'s your first question: Describe a time you faced a significant technical challenge...' }]
      },
      {
        id: '2',
        title: 'Career Transition to Tech',
        mode: 'mentorship',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        messageCount: 12,
        preview: 'I want to transition from marketing to software engineering...',
        lastMessage: 'Here\'s your 6-month roadmap with specific milestones.',
        messages: [{ role: 'user', text: 'I want to transition from marketing to software engineering, what should I do?' }, { role: 'ai', text: 'That\'s a great goal! Let\'s map out a strategy for your transition. First, we need to assess your current skills...' }]
      },
      {
        id: '3',
        title: 'System Design Fundamentals',
        mode: 'learning',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        messageCount: 15,
        preview: 'Explain the basics of system design for interviews...',
        lastMessage: 'Remember to always start with requirements gathering!',
        messages: [{ role: 'user', text: 'Explain the basics of system design for interviews.' }, { role: 'ai', text: 'System design interviews test your ability to design scalable, reliable, and maintainable systems. Let\'s start with understanding the core components...' }]
      }
    ];
    setChatSessions(sampleSessions);
  }, []);

  const createNewSession = () => {
    if (messages.length > 0 && currentSessionId) {
      // Save current session
      updateCurrentSession();
    }

    const newSessionId = Date.now().toString();
    setCurrentSessionId(newSessionId);
    setMessages([]);
    setShowSuggestions(true);
    setInput("");
    setFilePreview(null);
  };

  const updateCurrentSession = () => {
    if (!currentSessionId || messages.length === 0) return;

    const userMessages = messages.filter(m => m.role === 'user');
    const aiMessages = messages.filter(m => m.role === 'ai');
    const firstUserMessage = userMessages[0];
    const lastAiMessage = aiMessages[aiMessages.length - 1];

    const title = firstUserMessage ?
      firstUserMessage.text.substring(0, 50) + (firstUserMessage.text.length > 50 ? '...' : '') :
      'Untitled Chat';

    const sessionData = {
      id: currentSessionId,
      title,
      mode,
      date: new Date(),
      messageCount: messages.length,
      preview: firstUserMessage?.text || '',
      lastMessage: lastAiMessage?.text || '',
      messages: [...messages]
    };

    setChatSessions(prev => {
      const existingIndex = prev.findIndex(s => s.id === currentSessionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = sessionData;
        return updated;
      } else {
        return [sessionData, ...prev];
      }
    });
  };

  const loadSession = (sessionId) => {
    // Save current session first
    if (messages.length > 0 && currentSessionId) {
      updateCurrentSession();
    }

    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages || []);
      setMode(session.mode);
      setShowSuggestions(session.messages?.length === 0);
      setInput("");
      setFilePreview(null);
    }
  };

  const deleteSession = (sessionId) => {
    setChatSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      createNewSession();
    }
  };

  const ask = async (customPrompt = null) => {
    const promptText = customPrompt || input;
    if (!promptText && !filePreview) return;

    // Create new session if none exists
    let activeSessionId = currentSessionId;
    if (!activeSessionId) {
      activeSessionId = Date.now().toString();
      setCurrentSessionId(activeSessionId);
    }

    const userMsg = {
      role: "user",
      text: promptText || (filePreview && `Uploaded: ${filePreview.name}`),
      files: filePreview ? [filePreview] : [],
      mode
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setFilePreview(null);
    setShowSuggestions(false);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        learning: "Here's a detailed explanation of the concept you asked about. Let me break it down step by step...",
        interview: "Great question for interview prep! Let me give you a mock scenario and then provide feedback...",
        mentorship: "Based on your career goals, here's my advice and actionable steps you can take...",
        explore: "Let me show you some interesting career paths and opportunities in this area...",
        roadmap: "Here's a structured roadmap with specific milestones and timelines for your goal..."
      };

      const aiMsg = {
        role: "ai",
        text: responses[mode] + " " + promptText,
        files: []
      };
      setMessages((m) => [...m, aiMsg]);

      // Update session after AI response
      setChatSessions(prev => {
        const updatedMessages = [...messages, userMsg, aiMsg];
        const userMsgsInSession = updatedMessages.filter(m => m.role === 'user');
        const aiMsgsInSession = updatedMessages.filter(m => m.role === 'ai');
        const firstUserMsgInSession = userMsgsInSession[0];
        const lastAiMsgInSession = aiMsgsInSession[aiMsgsInSession.length - 1];

        const title = firstUserMsgInSession ?
          firstUserMsgInSession.text.substring(0, 50) + (firstUserMsgInSession.text.length > 50 ? '...' : '') :
          'Untitled Chat';

        const sessionData = {
          id: activeSessionId,
          title,
          mode,
          date: new Date(),
          messageCount: updatedMessages.length,
          preview: firstUserMsgInSession?.text || '',
          lastMessage: lastAiMsgInSession?.text || '',
          messages: updatedMessages
        };

        const existingIndex = prev.findIndex(s => s.id === activeSessionId);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = sessionData;
          return updated;
        } else {
          return [sessionData, ...prev];
        }
      });

    }, 1000);
  };

  // Auto-save current session periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSessionId && messages.length > 0) {
        updateCurrentSession();
      }
    }, 30000); // Save every 30 seconds

    return () => clearInterval(interval);
  }, [currentSessionId, messages, mode]);

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.prompt);
    setShowSuggestions(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  };

  const clearChat = () => {
    createNewSession();
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 font-sans">
      <div className="mx-20">
        <header className="mb-10 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {speaking && (
                <button
                  onClick={stopSpeaking}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center gap-2 shadow-md"
                >
                  <VolumeX size={16} />
                  Stop Reading
                </button>
              )}
            </div>
          </div>
          {/* Mode selector moved below the main header line */}
          <ModeSelector mode={mode} setMode={setMode} />
        </header>
        {/* --- END UPDATED HEADER SECTION --- */}


        <main className="grid grid-cols-12 gap-6">
          <section className="col-span-8 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-[70vh] flex flex-col">
              <div ref={messagesRef} className="flex-1 overflow-auto p-6">
                {messages.length === 0 && showSuggestions && (
                  <SuggestionCards
                    mode={mode}
                    suggestions={MODE_SUGGESTIONS[mode]}
                    onSuggestionClick={handleSuggestionClick}
                  />
                )}

                <div className="space-y-4">
                  {messages.map((m, idx) => (
                    <MessageBubble key={idx} m={m} onSpeakMessage={speakMessage} />
                  ))}
                </div>
              </div>

              <div className="border-t bg-gray-50 p-4">
                <div className="flex gap-3 mb-3">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Ask anything in ${MODES.find(m => m.id === mode).label}... (Enter to send)`}
                    className="resize-none flex-1 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows={2}
                  />
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => listening ? stopListening() : startListening()}
                      className={`p-3 rounded-lg transition-all ${
                        listening
                          ? "bg-red-500 text-white shadow-lg"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                      title={listening ? "Stop listening" : "Start voice input"}
                    >
                      {listening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                    <button
                      onClick={() => ask()}
                      className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      title="Send message"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Upload size={16} />
                    Upload File
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={(e) => handleFiles(e.target.files)}
                      className="hidden"
                    />
                  </label>

                  {filePreview && (
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                      <span className="text-sm text-blue-700">{filePreview.name}</span>
                      <button 
                        onClick={() => setFilePreview(null)} 
                        className="text-blue-500 hover:text-red-500 transition-colors"
                        title="Remove file"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {!showSuggestions && messages.length > 0 && (
                    <button
                      onClick={() => setShowSuggestions(true)}
                      className="px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Show suggestions
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          <aside className="col-span-4">
            <ChatHistory 
              sessions={chatSessions}
              currentSessionId={currentSessionId}
              searchHistory={searchHistory}
              setSearchHistory={setSearchHistory}
              onLoadSession={loadSession}
              onDeleteSession={deleteSession}
              onNewSession={createNewSession}
            />
          </aside>
        </main>
      </div>
    </div>
  );
}