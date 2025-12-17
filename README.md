# ChatBox - Telegram Clone

Тестовое задание: чат-приложение в стиле Telegram с сохранением сообщений на бекенде.

## Структура проекта

```
ChatBox/
├── backend/          # Go REST API сервер
├── frontend/         # React + TypeScript приложение
├── docker-compose.yml
└── .env.example
```

## Технологии

- **Backend**: Go 1.25.3, стандартный `net/http`
- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Deployment**: Docker, Docker Compose, Nginx

## Быстрый старт

### С использованием Docker

1. Скопируйте `.env.example` в `.env`:
```bash
cp .env.example .env
```

2. Запустите сервисы:
```bash
docker-compose up --build
```

3. Откройте браузер: http://localhost:3000

### Локальная разработка

#### Backend

```bash
cd backend
go mod download
go run main.go
```

Backend будет доступен на http://localhost:8080

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен на http://localhost:3000

## API Endpoints

- `GET /api/messages` - получить все сообщения
- `POST /api/messages` - создать новое сообщение
  ```json
  {
    "text": "Текст сообщения"
  }
  ```

## Переменные окружения

См. `.env.example` для списка доступных переменных:

- `BACKEND_PORT` - порт для бекенда (по умолчанию: 8080)
- `VITE_API_URL` - URL бекенда для фронтенда (по умолчанию: http://localhost:8080)

## Особенности реализации

- Хранение сообщений в оперативной памяти (in-memory)
- Thread-safe операции с использованием mutex
- CORS настроен для работы фронтенда
- Логирование через yagalog
- Telegram-like дизайн с зеленым градиентным фоном
- Автоматическая прокрутка к новым сообщениям
- Сохранение истории сообщений после перезагрузки страницы

## Деплой

Для деплоя на продакшн:

1. Настройте переменные окружения на платформе деплоя
2. Убедитесь, что `VITE_API_URL` указывает на публичный URL бекенда
3. Соберите и задеплойте оба сервиса
