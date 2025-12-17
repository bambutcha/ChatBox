# ChatBox - Telegram Clone

Тестовое задание: чат-приложение в стиле Telegram с сохранением сообщений на бекенде.
## Структура проекта

```
ChatBox/
├── backend/          # Go REST API сервер
├── frontend/         # React + TypeScript приложение
├── docker-compose.yml
├── PLAN.md           # План выполнения задания
├── RETROSPECTIVE.md  # Саморевью и ретроспектива
└── .env.example
```

## Технологии

- **Backend**: Go 1.25.3, стандартный `net/http`, GORM
- **Database**: PostgreSQL 16
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

- `PORT` - порт для бекенда (по умолчанию: 8080)
- `DATABASE_URL` - строка подключения к PostgreSQL (по умолчанию: host=postgres user=postgres password=postgres dbname=chatbox port=5432 sslmode=disable)
- `BACKEND_PORT` - порт для маппинга бекенда в Docker (по умолчанию: 8080)
- `VITE_API_URL` - URL бекенда для фронтенда (опционально, по умолчанию используется относительный путь `/api`)

## Особенности реализации

- Хранение сообщений в PostgreSQL с использованием GORM
- Автоматические миграции базы данных
- Thread-safe операции через GORM
- CORS настроен для работы фронтенда
- Логирование через самописный логгер `yagalog`
- Telegram-like дизайн с зеленым градиентным фоном и контурными рисунками
- Адаптивный дизайн для мобильных и десктопных устройств
- Автоматическая прокрутка к новым сообщениям
- Сохранение истории сообщений после перезагрузки страницы
- Бесшовный паттерн фона

## Деплой

### Локальный деплой через CloudPub

1. Запустите сервисы локально:
```bash
docker compose up -d --build
```

2. Создайте публикацию в CloudPub:
   - Локальный адрес: `http://localhost:3000`
   - Протокол: `HTTP`

3. Получите публичный URL для доступа к приложению

### Продакшн деплой

Для деплоя на продакшн платформу (Railway, Render, Fly.io):

1. Настройте переменные окружения на платформе деплоя
2. Убедитесь, что `DATABASE_URL` указывает на вашу PostgreSQL БД
3. Установите `VITE_API_URL` на публичный URL бекенда (если фронтенд и бекенд на разных доменах)
4. Соберите и задеплойте оба сервиса
