## Стек технологий

- React
- TypeScript
- Scss modules
- Axios
- FSD
- Ant Design
- json-server-auth

## Структура проекта (FSD)

<pre lang="markdown">
src/
├── app/                    # Точка входа, глобальные стили, маршруты
│   ├── entrypoint/         # Главный index.tsx (рендер React-приложения)
│   ├── routes/             # Основной компонент маршрутизации
│   └── styles/             # Глобальные SCSS-стили
│
├── entities/               # Базовые сущности приложения (боты и др.)
│   └── bots/               # Интерфейсы и UI компонентов ботов (BotCard)
│
├── features/               # Бизнес-логика, интерактивные формы, API
│   ├── bots/               # CRUD по ботам: формы, модалки, список
│   ├── loginForm/          # Форма логина, API и типы
│   ├── registerForm/       # Форма регистрации, API и типы
│   └── statistics/         # Отображение статистики прибыли по ботам
│
├── pages/                  # Страницы маршрутов (Login, Register, Bots)
│   ├── bots/               # Страницы для списка и создания ботов
│   ├── login/              # Страница логина
│   ├── register/           # Страница регистрации
│   ├── statistics/         # Страница статистики
│   └── NotFound/           # 404 страница
│
├── shared/                 # Общие утилиты, API-инстансы, стили, модели
│   ├── api/                # Axios-инстанс
│   ├── lib/                # Работа с cookie
│   ├── models/             # Общие интерфейсы: токены, пользователь
│   ├── config/             # Конфигурации окружения
│   └── ui/                 # Общие UI-элементы (например, Container)
│
├── widgets/                # Независимые крупные компоненты
│   └── Navbar/             # Верхняя навигация
│
├── index.tsx               # Точка входа в React-приложение
├── reportWebVitals.ts      # Аналитика производительности
└── react-app-env.d.ts      # CRA-специфичный файл типов
</pre>

<pre lang="markdown"> ```bash npm install npm run dev ``` </pre>

## Установка и запуск проекта

### Клонирование репозитория

<pre lang="markdown"> 
git clone https://github.com/Timau32/blockchain-bots.git
cd blockchain-bots
</pre>

## Установка зависимостей

<pre lang="markdown"> 
cd blockchain-bots
npm install
</pre>

## Настройка .env файлов

Создайте .env в папке blockchain-bots/:

REACT_APP_API_URL=http://localhost:3001

## Запуск Мок-сервера (json-server-auth):

<pre lang="markdown"> 
npm run start:api
</pre>

## Запуск проекта

<pre lang="markdown"> 
npm start
</pre>
