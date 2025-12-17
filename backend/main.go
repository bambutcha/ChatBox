package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"sync"
	"time"

	yagalog "github.com/Chelaran/yagalog"
)

type Message struct {
	ID        int    `json:"id"`
	Text      string `json:"text"`
	Timestamp string `json:"timestamp"`
}

type MessageStore struct {
	mu       sync.RWMutex
	messages []Message
	nextID   int
}

func NewMessageStore() *MessageStore {
	return &MessageStore{
		messages: make([]Message, 0),
		nextID:   1,
	}
}

func (ms *MessageStore) AddMessage(text string) Message {
	ms.mu.Lock()
	defer ms.mu.Unlock()

	msg := Message{
		ID:        ms.nextID,
		Text:      text,
		Timestamp: time.Now().Format(time.RFC3339),
	}
	ms.messages = append(ms.messages, msg)
	ms.nextID++
	return msg
}

func (ms *MessageStore) GetAllMessages() []Message {
	ms.mu.RLock()
	defer ms.mu.RUnlock()

	result := make([]Message, len(ms.messages))
	copy(result, ms.messages)
	return result
}

type CreateMessageRequest struct {
	Text string `json:"text"`
}

func main() {
	logger, err := yagalog.NewLogger()
	if err != nil {
		panic(fmt.Sprintf("failed to create logger: %v", err))
	}
	defer logger.Close()

	store := NewMessageStore()

	http.HandleFunc("/api/messages", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		switch r.Method {
		case "GET":
			messages := store.GetAllMessages()
			if err := json.NewEncoder(w).Encode(messages); err != nil {
				logger.Error("failed to encode messages: %v", err)
				http.Error(w, "internal server error", http.StatusInternalServerError)
				return
			}
			logger.Info("GET /api/messages: returned %d messages", len(messages))

		case "POST":
			var req CreateMessageRequest
			if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
				logger.Error("failed to decode request: %v", err)
				http.Error(w, "invalid request body", http.StatusBadRequest)
				return
			}

			if req.Text == "" {
				http.Error(w, "text is required", http.StatusBadRequest)
				return
			}

			msg := store.AddMessage(req.Text)
			if err := json.NewEncoder(w).Encode(msg); err != nil {
				logger.Error("failed to encode message: %v", err)
				http.Error(w, "internal server error", http.StatusInternalServerError)
				return
			}
			logger.Info("POST /api/messages: created message ID %d", msg.ID)

		default:
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		}
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	port = ":" + port
	logger.Info("starting server on port %s", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		logger.Fatal("server failed: %v", err)
	}
}
