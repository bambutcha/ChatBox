package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	yagalog "github.com/Chelaran/yagalog"
)

type Message struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Text      string    `gorm:"not null" json:"text"`
	Timestamp time.Time `gorm:"not null;default:now()" json:"timestamp"`
}

type MessageStore struct {
	db *gorm.DB
}

func NewMessageStore(db *gorm.DB) *MessageStore {
	return &MessageStore{db: db}
}

func (ms *MessageStore) AddMessage(ctx context.Context, text string) (Message, error) {
	msg := Message{
		Text:      text,
		Timestamp: time.Now(),
	}
	
	if err := ms.db.WithContext(ctx).Create(&msg).Error; err != nil {
		return Message{}, err
	}
	
	return msg, nil
}

func (ms *MessageStore) GetAllMessages(ctx context.Context) ([]Message, error) {
	var messages []Message
	if err := ms.db.WithContext(ctx).Order("timestamp ASC").Find(&messages).Error; err != nil {
		return nil, err
	}
	return messages, nil
}

type CreateMessageRequest struct {
	Text string `json:"text"`
}

type MessageResponse struct {
	ID        uint   `json:"id"`
	Text      string `json:"text"`
	Timestamp string `json:"timestamp"`
}

func toResponse(msg Message) MessageResponse {
	return MessageResponse{
		ID:        msg.ID,
		Text:      msg.Text,
		Timestamp: msg.Timestamp.Format(time.RFC3339),
	}
}

func main() {
	logger, err := yagalog.NewLogger()
	if err != nil {
		panic(fmt.Sprintf("failed to create logger: %v", err))
	}
	defer logger.Close()

	// Database connection
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "host=postgres user=postgres password=postgres dbname=chatbox port=5432 sslmode=disable"
	}

	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})
	if err != nil {
		logger.Fatal("failed to connect to database: %v", err)
	}

	// Auto migrate
	if err := db.AutoMigrate(&Message{}); err != nil {
		logger.Fatal("failed to migrate database: %v", err)
	}
	logger.Info("database migrated successfully")

	store := NewMessageStore(db)

	http.HandleFunc("/api/messages", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		
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
			messages, err := store.GetAllMessages(ctx)
			if err != nil {
				logger.Error("failed to get messages: %v", err)
				http.Error(w, "internal server error", http.StatusInternalServerError)
				return
			}
			
			responses := make([]MessageResponse, len(messages))
			for i, msg := range messages {
				responses[i] = toResponse(msg)
			}
			
			if err := json.NewEncoder(w).Encode(responses); err != nil {
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

			msg, err := store.AddMessage(ctx, req.Text)
			if err != nil {
				logger.Error("failed to add message: %v", err)
				http.Error(w, "internal server error", http.StatusInternalServerError)
				return
			}

			response := toResponse(msg)
			if err := json.NewEncoder(w).Encode(response); err != nil {
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
