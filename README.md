# AI Agents Management System

Система для управления конфигурациями ИИ-агентов: роли, базы знаний и навыки (skills) в формате, совместимом с Cursor.

## Назначение

- **Skills (навыки)** — агенты и утилиты в формате SKILL.md: marketer, designer, youtube-to-transcript, add-knowledge
- **Базы знаний** — структурированные файлы в `knowledge/` внутри каждого skill
- **Транскрипции** — скрипт для загрузки субтитров с YouTube в `transcripts/` с последующей обработкой в знания
- **Команды Cursor** — process-to-knowledge (текст → знания), smart-commit (сообщения коммитов)

## Как использовать

### Работа с навыками (skills)

1. **Выбор навыка**: marketer или designer — в `skills/`; add-knowledge и youtube-to-transcript — в `.agents/skills/`
2. **Контекст для LLM**: добавьте в контекст `SKILL.md` нужного навыка (и при необходимости файлы из `knowledge/`)
3. **Цепочка**: YouTube → транскрипт (youtube-to-transcript) → файл в `transcripts/` → add-knowledge → новый файл в `knowledge/` нужного skill

### Транскрипции с YouTube

Требуется **bun**. Установка: `bun install`. Скрипт: `scripts/fetch-transcript/fetch-transcript.ts`.

```powershell
# Из корня проекта
bun run fetch-transcript "https://www.youtube.com/watch?v=VIDEO_ID"
bun run fetch-transcript "https://www.youtube.com/watch?v=VIDEO_ID" --lang ru --output my-video
```

Подробнее: [scripts/fetch-transcript/README.md](scripts/fetch-transcript/README.md).

## Доступные навыки

### Marketer (`skills/marketer/`)
- **Специализация**: маркетинг, нейромаркетинг, контент, аналитика, брендинг
- **Когда использовать**: стратегии, кампании, контент, анализ конкурентов, нейрокопирайтинг
- **Знания**: в `knowledge/` (внимание, эмоции, восприятие, копирайтинг и др.)

### Designer (`skills/designer/`)
- **Специализация**: UI/UX, интерфейсы, дизайн-системы
- **Когда использовать**: интерфейсы, прототипы, типографика, цвет, доступность
- **Знания**: в `knowledge/` (в т.ч. refactoring_ui)

### YouTube to Transcript (`.agents/skills/youtube-to-transcript/`)
- Получение транскрипции с YouTube и сохранение в `transcripts/`. Использует скрипт в `scripts/fetch-transcript/`. Требуется bun и `youtube-transcript-plus`.

### Add Knowledge (`.agents/skills/add-knowledge/`)
- Добавление нового файла в `knowledge/` выбранного skill и обновление индекса в его SKILL.md. Удобно после получения транскрипта или обработки книги/текста.

## Структура проекта

```
├── README.md
├── package.json                 # bun, скрипт fetch-transcript
├── Makefile                     # install, fetch-transcript (URL=... LANG=... OUTPUT=...)
├── skills/                      # Навыки-агенты с базами знаний
│   ├── marketer/
│   │   ├── SKILL.md
│   │   └── knowledge/
│   └── designer/
│       ├── SKILL.md
│       └── knowledge/
├── .agents/skills/              # Утилитарные навыки
│   ├── add-knowledge/          # Добавление знаний в skill
│   └── youtube-to-transcript/  # Транскрипции YouTube
├── scripts/
│   └── fetch-transcript/       # Скрипт и README для транскрипций
├── transcripts/                # Сохранённые транскрипции (.txt)
├── management/
│   └── instructions/           # Инструкции для LLM
│       └── process_book_to_knowledge.md
├── .cursor/
│   └── commands/
│       ├── process-to-knowledge.md  # Текст → знания агента
│       └── smart-commit.md         # Генерация сообщений коммитов
└── TODO.md
```

## Добавление нового навыка-агента

1. Создайте папку в `skills/[agent_name]/` с `SKILL.md` и при необходимости `knowledge/`
2. Добавьте описание в раздел «Доступные навыки» этого README
3. При добавлении знаний используйте skill add-knowledge или команду process-to-knowledge

## Обновлено

*Последнее обновление: 10 марта 2026*
