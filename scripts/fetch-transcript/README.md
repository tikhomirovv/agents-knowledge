# YouTube Transcript Fetcher

По умолчанию выводит текст транскрипции в **stdout** (в чат/терминал). Сохранение в файл — **только** с флагом `--file <путь>` (любая папка; родительские каталоги создаются).

## Установка

```powershell
# Из корня проекта
bun install
```

## Использование

```powershell
# Только текст в консоль (язык по умолчанию: en)
bun run fetch-transcript "https://www.youtube.com/watch?v=VIDEO_ID"

# Другой язык
bun run fetch-transcript "https://www.youtube.com/watch?v=VIDEO_ID" --lang ru

# Сохранить в файл
bun run fetch-transcript "https://www.youtube.com/watch?v=VIDEO_ID" --file "transcripts/my-video.txt"
```

## Следующий шаг

**Add Knowledge** (`.agents/skills/add-knowledge`) — если нужно превратить сохранённый текст в знания для скилла. Укажите путь к файлу, если сохраняли через `--file`.
