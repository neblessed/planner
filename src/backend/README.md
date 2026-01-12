project/
├── src/
│ ├── frontend/ # React приложение (Vite)
│ │ ├── public/
│ │ ├── src/
│ │ │ ├── main.tsx
│ │ │ ├── App.tsx
│ │ │ ├── components/
│ │ │ ├── store/ # Redux
│ │ │ └── ...
│ │ ├── package.json
│ │ └── vite.config.ts
│ │
│ └── backend/ # Express сервер
│ ├── src/
│ │ ├── index.ts # Точка входа
│ │ ├── app.ts # Express app
│ │ ├── controllers/ # Контроллеры
│ │ │ ├── meetings.controller.ts
│ │ │ └── spendings.controller.ts
│ │ ├── services/ # Бизнес-логика
│ │ │ ├── meetings.service.ts
│ │ │ └── spendings.service.ts
│ │ ├── models/ # Модели/Схемы
│ │ │ ├── Meeting.ts
│ │ │ └── Spending.ts
│ │ ├── routes/ # Маршруты
│ │ │ ├── meetings.routes.ts
│ │ │ └── spendings.routes.ts
│ │ ├── database/ # Работа с БД
│ │ │ ├── db.ts # Подключение к SQLite
│ │ │ ├── queries/ # SQL запросы
│ │ │ └── repositories # Паттерн репозиторий
│ │ └── utils/ # Вспомогательные функции
│ │
│ ├── package.json
│ └── tsconfig.json
│
├── package.json # Общий для скриптов (опционально)
├── start.sh # Скрипт запуска
└── README.md
