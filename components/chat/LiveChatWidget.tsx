"use client";

import { useEffect, useRef, useState } from "react";
import {
  getBotReply,
  getMissingQualificationField,
  inferNeedFromText,
  promptFor,
  QUICK_REPLIES,
  shouldPromptAfterReply,
  type ChatMessage,
  type Qualification,
} from "@/lib/chat/liveChat";
import { readSessionStorage, writeSessionStorage } from "@/hooks/useLocalStorage";

const STORAGE_KEY = "rdcLiveChatSession";
const EXPERT_EMAIL = "info@royaldencapital.ca";
const EXPERT_PHONE = "19056091818";

interface ChatState {
  messages: ChatMessage[];
  qualification: Qualification;
  collecting: keyof Qualification | null;
}

const EMPTY_QUALIFICATION: Qualification = { name: "", email: "", phone: "", need: "", timeline: "" };

const GREETING =
  "Hi, I am the Royal Den Capital assistant. I can answer basic mortgage questions, qualify your request, and transfer the full chat to an expert.";

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<ChatState>({ messages: [], qualification: EMPTY_QUALIFICATION, collecting: null });
  const [inputValue, setInputValue] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    const saved = readSessionStorage<ChatState>(STORAGE_KEY);
    if (saved) {
      setState({
        messages: Array.isArray(saved.messages) ? saved.messages : [],
        qualification: { ...EMPTY_QUALIFICATION, ...saved.qualification },
        collecting: saved.collecting ?? null,
      });
    } else {
      setState({
        messages: [{ sender: "bot", text: GREETING, time: new Date().toISOString() }],
        qualification: EMPTY_QUALIFICATION,
        collecting: null,
      });
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    writeSessionStorage(STORAGE_KEY, state);
  }, [state]);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [state.messages]);

  const addMessage = (sender: "user" | "bot", text: string) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, { sender, text, time: new Date().toISOString() }].slice(-60),
    }));
  };

  const requestExpertTransfer = () => {
    const missing = getMissingQualificationField(state.qualification);
    if (missing) {
      setState((prev) => ({ ...prev, collecting: missing }));
      addMessage("bot", promptFor(missing));
      return;
    }

    const transcript = state.messages
      .slice(-24)
      .map((message) => `${message.sender === "user" ? "Visitor" : "Assistant"}: ${message.text}`)
      .join("\n");
    const subject = `Website live chat - ${state.qualification.need || "Mortgage inquiry"}`;
    const leadSummary =
      `Please follow up with this website chat lead.\n\n` +
      `Name: ${state.qualification.name}\n` +
      `Phone: ${state.qualification.phone}\n` +
      `Email: ${state.qualification.email}\n` +
      `Need: ${state.qualification.need}\n` +
      `Timeline: ${state.qualification.timeline}\n` +
      `Page: ${window.location.href}\n\n` +
      `Chat transcript:\n${transcript}`;

    const fields: Record<string, string> = {
      _subject: subject,
      _captcha: "false",
      _template: "table",
      _next: `${window.location.origin}/apply/thank-you/`,
      source: "Website live chat assistant",
      name: state.qualification.name,
      email: state.qualification.email,
      phone: state.qualification.phone,
      need: state.qualification.need,
      timeline: state.qualification.timeline,
      page: window.location.href,
      transcript,
      message: leadSummary,
    };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = `https://formsubmit.co/${EXPERT_EMAIL}`;
    form.hidden = true;
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    addMessage("bot", "Thanks. I am submitting this full chat to the Royal Den Capital team now.");
    form.submit();
  };

  const saveCollectedAnswer = (text: string): boolean => {
    const field = state.collecting;
    if (!field) return false;
    const nextQualification = { ...state.qualification, [field]: text.trim() };
    const nextMissing = getMissingQualificationField(nextQualification);
    setState((prev) => ({ ...prev, qualification: nextQualification, collecting: nextMissing ?? null }));
    if (nextMissing) {
      addMessage("bot", promptFor(nextMissing));
    } else {
      addMessage("bot", "Thanks. I have the basics now. I can transfer this full chat to an expert, or you can call 905-609-1818 now.");
    }
    return true;
  };

  const handleUserMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage("user", trimmed);
    setInputValue("");

    window.setTimeout(() => {
      if (saveCollectedAnswer(trimmed)) return;
      const inferredNeed = inferNeedFromText(trimmed);
      if (inferredNeed) {
        setState((prev) => ({
          ...prev,
          qualification: prev.qualification.need ? prev.qualification : { ...prev.qualification, need: inferredNeed },
        }));
      }
      const reply = getBotReply(trimmed);
      addMessage("bot", reply);
      if (shouldPromptAfterReply(trimmed, reply)) {
        const missing = getMissingQualificationField(state.qualification);
        if (missing) {
          setState((prev) => ({ ...prev, collecting: missing }));
          addMessage("bot", promptFor(missing));
        }
      }
    }, 220);
  };

  return (
    <section className={isOpen ? "live-chat is-open" : "live-chat"} aria-label="Royal Den Capital live chat assistant">
      <div className="chat-attention" aria-hidden="true">
        <img src="/assets/rdc-lion-wave-chat.gif" alt="" />
        <div className="chat-typing-bubble">
          <span />
          <span />
          <span />
        </div>
      </div>
      <button
        className="chat-launcher"
        type="button"
        aria-label="Open live chat"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        <i className="bi bi-chat-dots-fill" />
        <span>Live Chat</span>
      </button>
      {isOpen && (
        <div className="chat-panel">
          <header className="chat-panel-header">
            <div>
              <span className="chat-status">
                <span aria-hidden="true" /> Online assistant
              </span>
              <strong>Royal Den Capital</strong>
            </div>
            <button className="chat-icon-button" type="button" aria-label="Close live chat" onClick={() => setIsOpen(false)}>
              <i className="bi bi-x-lg" />
            </button>
          </header>
          <div className="chat-messages" role="log" aria-live="polite" ref={messagesRef}>
            {state.messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender === "user" ? "from-user" : "from-bot"}`}>
                <span>{message.sender === "user" ? "You" : "RDC Assistant"}</span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-quick-replies" aria-label="Quick chat options">
            {QUICK_REPLIES.map((reply) => (
              <button key={reply} type="button" onClick={() => handleUserMessage(reply)}>
                {reply}
              </button>
            ))}
          </div>
          <form
            className="chat-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              handleUserMessage(inputValue);
            }}
          >
            <label className="visually-hidden" htmlFor="liveChatInput">
              Type your message
            </label>
            <input
              id="liveChatInput"
              type="text"
              autoComplete="off"
              placeholder="Type your question..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <button type="submit" aria-label="Send message">
              <i className="bi bi-send-fill" />
            </button>
          </form>
          <div className="chat-actions">
            <a href={`tel:${EXPERT_PHONE}`}>
              <i className="bi bi-telephone-fill" /> Call now
            </a>
            <button type="button" onClick={requestExpertTransfer}>
              <i className="bi bi-person-lines-fill" /> Transfer to expert
            </button>
            <a href="/apply/" className="chat-apply-link">
              <i className="bi bi-clipboard-check-fill" /> Full application
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
