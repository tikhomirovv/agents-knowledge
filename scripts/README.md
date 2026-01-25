# YouTube Transcript Fetcher Scripts

Скрипты для получения транскрипций с YouTube видео и их обработки в базу знаний.

## Установка

```powershell
# Из корня проекта
bun install
```

## Использование

### Получение транскрипции

```powershell
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

После выполнения скрипта в папке `transcripts/` будут созданы два файла:

1. **`[video-id].json`** - Полная информация в формате JSON:
   - Метаданные видео (ID, URL, язык, дата получения)
   - Массив сегментов с временными метками
   - Полный текст транскрипции

2. **`[video-id].txt`** - Простой текстовый файл для удобного чтения

## Формат JSON

```json
{
  "videoId": "dQw4w9WgXcQ",
  "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "lang": "en",
  "fetchedAt": "2026-01-24T12:00:00.000Z",
  "segments": [
    {
      "text": "Hello, welcome to this video",
      "duration": 2.5,
      "offset": 0,
      "lang": "en"
    }
  ],
  "text": "Hello, welcome to this video..."
}
```

## Обработка ошибок

Скрипт обрабатывает следующие ошибки:

- **Video unavailable** - Видео недоступно или удалено
- **Transcripts disabled** - Субтитры отключены для этого видео
- **No transcript available** - Транскрипция недоступна
- **Language not available** - Транскрипция недоступна на указанном языке
- **Invalid video ID** - Неверный ID или URL видео

## Следующий шаг

После получения транскрипции используйте команду `process-to-knowledge` из `.cursor/commands/` для автоматической обработки транскрипции через LLM и создания структурированного файла знаний для агента.

**Пример использования:**
```
@transcripts/video-name.txt Обработай этот файл
```

Команда автоматически:
- Проанализирует содержимое транскрипции
- Определит подходящего агента для знаний
- Создаст структурированный файл знаний
- Обновит индекс в `role.md` агента
