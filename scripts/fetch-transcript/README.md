# YouTube Transcript Fetcher

Скрипт для получения транскрипций с YouTube видео и сохранения в текстовый файл в папке `transcripts/` (в корне проекта).

## Установка

```powershell
# Из корня проекта
bun install
```

## Использование

### Получение транскрипции

```powershell
# Из корня проекта
# Базовое использование (язык по умолчанию: en)
bun run fetch-transcript "https://www.youtube.com/watch?v=VIDEO_ID"

# С указанием языка
bun run fetch-transcript "https://www.youtube.com/watch?v=VIDEO_ID" --lang ru

# С кастомным именем файла
bun run fetch-transcript "https://www.youtube.com/watch?v=VIDEO_ID" --output my-video-name
```

### Примеры

```powershell
# Английская транскрипция
bun run fetch-transcript "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

# Русская транскрипция
bun run fetch-transcript "https://www.youtube.com/watch?v=dQw4w9WgXcQ" --lang ru

# С кастомным именем
bun run fetch-transcript "https://www.youtube.com/watch?v=dQw4w9WgXcQ" --output marketing-tips
```

## Результат

После выполнения скрипта в папке **`transcripts/`** (в корне проекта) создаётся файл **`[video-id].txt`** или **`[output-name].txt`** с текстом транскрипции.

## Обработка ошибок

Скрипт обрабатывает следующие ошибки:

- **Video unavailable** — Видео недоступно или удалено
- **Transcripts disabled** — Субтитры отключены для этого видео
- **No transcript available** — Транскрипция недоступна
- **Language not available** — Транскрипция недоступна на указанном языке
- **Invalid video ID** — Неверный ID или URL видео

## Следующий шаг

После получения транскрипции можно использовать скилл **Add Knowledge** (`.agents/skills/add-knowledge`), чтобы превратить текст в структурированный файл знаний для нужного скилла (например, marketer или designer).

Либо указать агенту файл и целевой скилл, например: «Добавь знания из `transcripts/my-video.txt` в скилл marketer».
