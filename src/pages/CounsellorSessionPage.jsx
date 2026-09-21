import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useApp } from '../context/AppContext';
import {
  Video, VideoOff, Mic, MicOff, PhoneOff, Send, User, ShieldCheck, Clock,
  MessageSquare, AlertCircle, Sparkles, CheckCircle2, UserCheck, RefreshCw, ArrowLeft, Users
} from 'lucide-react';

export const CounsellorSessionPage = () => {
  const {
    currentCase, addToast, addAuditLog, activeCounsellingSession,
    endCounsellingSession: endContextSession, setActivePage, userRole
  } = useApp();

  // WebRTC & Socket state
  const activeRoomId = activeCounsellingSession?.sessionId || currentCase?.id || 'COUNSELLOR-ROOM-101';
  const [roomId] = useState(activeRoomId);
  const [sessionJoined, setSessionJoined] = useState(false);
  const [isCounsellorConnected, setIsCounsellorConnected] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Audio/Video Toggles
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  // Chat State
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Refs
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const timerRef = useRef(null);

  // STUN Servers configuration
  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  // Timer effect
  useEffect(() => {
    if (sessionJoined) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [sessionJoined]);

  // Clean up WebRTC & socket on unmount
  useEffect(() => {
    return () => {
      endSession();
    };
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = async () => {
    try {
      addToast("Requesting camera and microphone access...", "info");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setSessionJoined(true);
      addToast("Local media connected. Connecting to signaling room...", "success");

      // Connect Socket.IO
      const socket = io(window.location.origin, {
        reconnectionAttempts: 3
      });
      socketRef.current = socket;

      socket.on('connect', () => {
        socket.emit('join-room', { roomId, role: 'user' });
      });

      socket.on('user-joined', ({ userId, role }) => {
        addToast(`Counsellor connected to session room`, "success");
        setIsCounsellorConnected(true);
        createOffer();
      });

      socket.on('offer', async ({ offer }) => {
        handleOffer(offer);
      });

      socket.on('answer', async ({ answer }) => {
        if (peerConnectionRef.current) {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        }
      });

      socket.on('ice-candidate', async ({ candidate }) => {
        if (peerConnectionRef.current && candidate) {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });

      socket.on('chat-message', (msgData) => {
        setMessages(prev => [...prev, msgData]);
      });

      addAuditLog("Counsellor Session Started", `Joined WebRTC room: ${roomId}`);
    } catch (err) {
      console.error("Media permission error:", err);
      addToast("Camera or Microphone permission denied. Starting audio/demo mode.", "error");
      setSessionJoined(true);
    }
  };

  const createPeerConnection = () => {
    if (peerConnectionRef.current) return peerConnectionRef.current;

    const pc = new RTCPeerConnection(iceServers);

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        pc.addTrack(track, localStreamRef.current);
      });
    }

    pc.ontrack = (event) => {
      if (remoteVideoRef.current && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setIsCounsellorConnected(true);
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit('ice-candidate', {
          roomId,
          candidate: event.candidate
        });
      }
    };

    peerConnectionRef.current = pc;
    return pc;
  };

  const createOffer = async () => {
    const pc = createPeerConnection();
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    if (socketRef.current) {
      socketRef.current.emit('offer', { roomId, offer });
    }
  };

  const handleOffer = async (offer) => {
    const pc = createPeerConnection();
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    if (socketRef.current) {
      socketRef.current.emit('answer', { roomId, answer });
    }
  };

  const toggleMic = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    } else {
      setIsMicOn(!isMicOn);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    } else {
      setIsVideoOn(!isVideoOn);
    }
  };

  const enableDemoCounsellorMode = () => {
    setIsDemoMode(true);
    setIsCounsellorConnected(true);
    addToast("Demo Counsellor Mode active. Interactive simulation connected.", "success");
    
    // Add simulated counsellor greeting
    setMessages(prev => [
      ...prev,
      {
        sender: 'Dr. Ananya Sharma (Demo Counsellor)',
        text: 'Hello, I am Dr. Ananya Sharma from the SAHAY Support Cell. Take a deep breath. We are here in a safe and confidential space. How are you feeling right now?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const msgData = {
      sender: 'You',
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, msgData]);

    if (socketRef.current) {
      socketRef.current.emit('chat-message', { roomId, message: msgData });
    }

    setChatInput('');

    // Demo automated counsellor response if in demo mode
    if (isDemoMode) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            sender: 'Dr. Ananya Sharma (Demo Counsellor)',
            text: 'Thank you for sharing that with me. Your feelings are completely valid, and you do not have to carry this alone. I am listening.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1200);
    }
  };

  const endSession = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    setSessionJoined(false);
    setIsCounsellorConnected(false);
    addToast("Counsellor video session ended.", "info");
  };

  return (
    <div className="space-y-6 py-2 max-w-6xl mx-auto">
      
      {/* Session Top Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActivePage('counselling-queue')}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors border border-slate-200 mr-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Counselling Queue</span>
              </button>

              <span className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-0.5 rounded font-mono flex items-center gap-1">
                <Video className="w-3.5 h-3.5" />
                SAHAY COUNSELLOR CONNECT
              </span>
              <span className="text-xs text-slate-700 font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                WebRTC Peer Room: {roomId}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
              {activeCounsellingSession ? `Session: ${activeCounsellingSession.patientName} (${activeCounsellingSession.caseId})` : 'Direct Confidential Video Session'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {activeCounsellingSession 
                ? `Language: ${activeCounsellingSession.language} • SVI Score: ${activeCounsellingSession.svi}/100 (${activeCounsellingSession.riskCategory})` 
                : 'Connect with a certified counsellor for immediate trauma support and guided assistance.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePage('counselling-queue')}
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5 cursor-pointer border border-slate-300 transition-colors shrink-0"
            >
              <Users className="w-4 h-4 text-slate-700" />
              <span>View Queue</span>
            </button>

            {sessionJoined && (
              <div className="flex items-center gap-2 bg-slate-900 text-white px-3.5 py-2 rounded-lg font-mono text-xs shrink-0">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{formatTimer(callDuration)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pre-Call Joining Card if not joined */}
      {!sessionJoined ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-6 max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-800">
            <Video className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">Ready to join your session?</h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Please ensure your camera and microphone permissions are granted. You can test in Demo Mode or connect to a active room.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-left text-xs space-y-2 max-w-lg mx-auto">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span>Privacy & Safety Safeguards</span>
            </div>
            <ul className="text-slate-600 text-[11px] space-y-1 list-disc list-inside">
              <li>No audio or video streams are stored on backend servers.</li>
              <li>Peer-to-peer signaling operates via secure Socket.IO WebRTC protocols.</li>
              <li>You may mute audio or turn off video at any point during the session.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={startSession}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <Video className="w-4 h-4" />
              <span>Start WebRTC Video Call</span>
            </button>

            <button
              onClick={() => {
                startSession();
                enableDemoCounsellorMode();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Sparkles className="w-4 h-4 text-slate-700" />
              <span>Start Demo Counsellor Mode</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Video Call Interface */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Video Area (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Video Canvas Container */}
            <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative aspect-video flex items-center justify-center shadow-lg">
              
              {/* Remote Video Stream (Counsellor) */}
              {isCounsellorConnected ? (
                isDemoMode ? (
                  /* Demo Counsellor Avatar View */
                  <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center space-y-3 p-6 text-center">
                    <div className="w-24 h-24 bg-slate-800 border-2 border-emerald-500 rounded-full flex items-center justify-center relative">
                      <UserCheck className="w-12 h-12 text-emerald-400" />
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">Dr. Ananya Sharma</div>
                      <div className="text-xs text-slate-400">Senior Trauma Counsellor (SAHAY Cell)</div>
                      <span className="inline-block mt-2 text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded font-mono">
                        LIVE DEMO COUNSELLOR CONNECTED
                      </span>
                    </div>
                  </div>
                ) : (
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                /* Waiting for Counsellor State */
                <div className="text-center p-6 space-y-3">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-amber-400 animate-pulse">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Waiting for counsellor to join...</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                      Share room ID <strong>{roomId}</strong> with counsellor or launch Demo Mode below.
                    </p>
                  </div>
                  <button
                    onClick={enableDemoCounsellorMode}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer border border-slate-700"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Launch Demo Counsellor Mode</span>
                  </button>
                </div>
              )}

              {/* Local Self Video Overlay (Bottom Right) */}
              <div className="absolute bottom-4 right-4 w-36 sm:w-44 aspect-video bg-slate-900 rounded-lg overflow-hidden border-2 border-slate-700 shadow-md">
                {isVideoOn ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400 text-[10px]">
                    <User className="w-6 h-6 mb-1 text-slate-500" />
                    <span>Camera Off</span>
                  </div>
                )}
                <div className="absolute bottom-1 left-1 bg-slate-950/80 px-1.5 py-0.5 rounded text-[9px] text-white font-mono">
                  You
                </div>
              </div>

            </div>

            {/* Media Controls Toolbar */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMic}
                  className={`p-3 rounded-lg border font-semibold text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                    isMicOn
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
                      : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  <span>{isMicOn ? 'Mute Mic' : 'Unmute Mic'}</span>
                </button>

                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-lg border font-semibold text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                    isVideoOn
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
                      : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  <span>{isVideoOn ? 'Stop Camera' : 'Start Camera'}</span>
                </button>
              </div>

              <button
                onClick={endSession}
                className="px-5 py-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Session</span>
              </button>
            </div>

          </div>

          {/* Right Column: In-Meeting Text Chat */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between h-[520px] shadow-xs">
            
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <MessageSquare className="w-4 h-4 text-slate-800" />
                  <span>Session Chat</span>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                  Room: {roomId.slice(0, 12)}
                </span>
              </div>

              {/* Message List */}
              <div className="space-y-3 overflow-y-auto max-h-[380px] pt-3 pr-1">
                {messages.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs space-y-1">
                    <p>No messages exchanged yet.</p>
                    <p className="text-[11px] text-slate-400">Type a message below to communicate in text.</p>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const isSelf = msg.sender === 'You';
                    return (
                      <div
                        key={index}
                        className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'} space-y-0.5`}
                      >
                        <span className="text-[10px] text-slate-400 font-semibold px-1">
                          {msg.sender} • {msg.timestamp}
                        </span>
                        <div
                          className={`p-2.5 rounded-lg text-xs leading-relaxed max-w-[85%] ${
                            isSelf
                              ? 'bg-slate-900 text-white rounded-tr-none'
                              : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-slate-500 font-medium text-slate-900"
              />
              <button
                type="submit"
                className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg cursor-pointer transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>
      )}

      {/* Advisory Note */}
      <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl text-xs text-slate-600 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-slate-700 shrink-0" />
        <p className="italic text-[11px] leading-relaxed">
          SAHAY Counsellor Connect provides real-time WebRTC audio/video signaling. For emergency crisis assistance, call Tele-MANAS (14416) or National Emergency Helpline (112).
        </p>
      </div>

    </div>
  );
};
