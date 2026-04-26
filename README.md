# AI Agents Management System

Система для управления конфигурациями ИИ-агентов: роли, базы знаний и навыки (skills) в формате, совместимом с Cursor.

## Два типа навыков

| Расположение | Назначение |
|--------------|------------|
| **`skills/`** | Навыки для установки в другие проекты (sharing). Можно ставить через `npx skills add` и использовать в любом репозитории. |
| **`.agents/skills/`** | Навыки для работы только внутри этого репозитория: транскрипции YouTube, добавление знаний в skill и т.п. |

## Назначение проекта

- **Shareable skills** (`skills/`) — marketer, designer и др.: агенты с базами знаний, которые можно устанавливать куда угодно
- **Локальные навыки** (`.agents/skills/`) — youtube-to-transcript, add-knowledge: утилиты для ведения этого репозитория
- **Транскрипции** — скрипт субтитров с YouTube (по умолчанию вывод в консоль; сохранение в файл — по флагу `--file`) и при желании обработка в знания
- **Команды Cursor** — process-to-knowledge (текст → знания), smart-commit (сообщения коммитов)

## Установка навыков (skills/) в другой проект

Навыки из `skills/` можно установить в любой проект через CLI:

```bash
npx skills add https://github.com/tikhomirovv/agents-knowledge/skills --skill <skill-name>
```

Примеры: `--skill marketer`, `--skill designer`. После установки подключайте нужный skill в Cursor/агента по инструкциям CLI.

## Как использовать

### Shareable-навыки (marketer, designer)

1. Установите нужный skill в проект (см. выше) или добавьте в контекст LLM `SKILL.md` и при необходимости файлы из `knowledge/`
2. Агент использует роль и базу знаний из skill

### Навыки только для этого репозитория (`.agents/skills/`)

- **youtube-to-transcript** — транскрипт с YouTube в ответ пользователю; файл — только по запросу (`--file`)
- **add-knowledge** — добавить новый файл в `knowledge/` выбранного skill и обновить индекс в SKILL.md  
Цепочка: YouTube → транскрипт → add-knowledge → новый файл знаний в `skills/<name>/knowledge/`

### Транскрипции с YouTube

**Bun** (или Node + `npx tsx` для скилла). Установка: `bun install`. Скрипт: `scripts/fetch-transcript/fetch-transcript.ts`.

```powershell
# Из корня проекта — текст в stdout
bun run fetch-transcript "https://www.youtube.com/watch?v=VIDEO_ID"
bun run fetch-transcript "https://www.youtube.com/watch?v=VIDEO_ID" --lang ru
# Сохранить в файл (путь любой)
bun run fetch-transcript "https://www.youtube.com/watch?v=VIDEO_ID" --file "transcripts/my-video.txt"
```

Подробнее: [scripts/fetch-transcript/README.md](scripts/fetch-transcript/README.md).

## Доступные навыки

### Устанавливаемые (sharing) — `skills/`

**Marketer** (`skills/marketer/`)
- Маркетинг, нейромаркетинг, контент, аналитика, брендинг. Для стратегий, кампаний, анализа конкурентов, нейрокопирайтинга. Знания в `knowledge/`.

**Designer** (`skills/designer/`)
- UI/UX, интерфейсы, дизайн-системы. Для интерфейсов, прототипов, типографики, цвета, доступности. Знания в `knowledge/` (в т.ч. refactoring_ui).

Установка в другой проект:  
`npx skills add https://github.com/tikhomirovv/agents-knowledge/skills --skill marketer` (или `designer`).

### Только для этого репозитория — `.agents/skills/`

**YouTube to Transcript** — транскрипт в ответ; файл опционально. Скрипт `scripts/fetch-transcript/`. Рантайм: **Bun**; `youtube-transcript-plus` — при необходимости **глобально через Bun** (`bun install -g`, не `npm -g`).

**Add Knowledge** — добавление файла в `knowledge/` выбранного skill и обновление индекса в SKILL.md. После транскрипта или обработки книги/текста.

## Структура проекта

```
├── README.md
├── package.json                 # bun, скрипт fetch-transcript
├── Makefile                     # install, fetch-transcript (URL=... LANG=... FILE=...)
├── skills/                      # Навыки для установки в другие проекты (sharing)
│   ├── marketer/
│   │   ├── SKILL.md
│   │   └── knowledge/
│   └── designer/
│       ├── SKILL.md
│       └── knowledge/
├── .agents/skills/              # Навыки только для работы внутри этого репозитория
│   ├── add-knowledge/          # Добавление знаний в skill
│   └── youtube-to-transcript/  # Транскрипции YouTube
├── scripts/
│   └── fetch-transcript/       # Скрипт и README для транскрипций
├── transcripts/                # Опционально: сюда можно сохранять через --file
├── management/
│   └── instructions/           # Инструкции для LLM
│       └── process_book_to_knowledge.md
├── .cursor/
│   └── commands/
│       ├── process-to-knowledge.md  # Текст → знания агента
│       └── smart-commit.md         # Генерация сообщений коммитов
└── TODO.md
```

## Добавление нового shareable-навыка

1. Создайте папку в `skills/[agent_name]/` с `SKILL.md` и при необходимости `knowledge/`
2. Добавьте описание в раздел «Доступные навыки» (под «Устанавливаемые (sharing)»)
3. Для пополнения знаний используйте skill add-knowledge или команду process-to-knowledge

## Обновлено

*Последнее обновление: 10 марта 2026*
