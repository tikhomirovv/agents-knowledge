# YouTube Transcript Fetcher

По умолчанию выводит текст транскрипции в **stdout** (в чат/терминал). Сохранение в файл — **только** с флагом `--file <путь>` (любая папка; родительские каталоги создаются).

## Установка

Зависимость `youtube-transcript-plus`: если её **нет в проекте**, ставьте **глобально** (не обязательно добавлять в `package.json`):

```powershell
npm install -g youtube-transcript-plus
# или
bun install -g youtube-transcript-plus
```

Для **Node** при глобальной установке иногда нужен `NODE_PATH` на каталог глобальных модулей, иначе `import` из скрипта не найдёт пакет:

```powershell
$env:NODE_PATH = (npm root -g)
```

Иначе — `bun install` в корне репозитория (локально в проект).

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
