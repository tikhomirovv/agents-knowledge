# AI Agents Management System — Makefile
# Использование: make [цель] или make help

.PHONY: help install submodule-init submodule-update fetch-transcript list-agents symlink-skill

# Переменные по умолчанию для fetch-transcript
URL ?=
LANG ?= en
# Optional: FILE=path/to/file.txt — сохранить; иначе только stdout
FILE ?=

# Цель по умолчанию — показать справку
help:
	@echo "AI Agents Management — доступные команды:"
	@echo ""
	@echo "  make install              — установить зависимости (bun install)"
	@echo "  make submodule-init       — инициализировать git submodule (.anthropics-skills)"
	@echo "  make submodule-update     — обновить submodule до последней версии"
	@echo "  make fetch-transcript     — транскрипт YouTube (URL=... [LANG=ru] [FILE=путь/к/файлу.txt])"
	@echo ""
	@echo "Примеры:"
	@echo "  make fetch-transcript URL=https://www.youtube.com/watch?v=VIDEO_ID"
	@echo "  make fetch-transcript URL=https://youtube.com/watch?v=VIDEO_ID LANG=ru FILE=transcripts/my.txt"

# Установка зависимостей
install:
	bun install

# Инициализация submodule (при первом клоне)
submodule-init:
	git submodule update --init --recursive

# Обновление submodule до последней версии
submodule-update:
	git submodule update --remote

# Получение транскрипции с YouTube
# Использование: make fetch-transcript URL=<youtube-url> [LANG=ru] [FILE=путь/к/файлу.txt]
fetch-transcript:
ifndef URL
	$(error Укажите URL: make fetch-transcript URL=https://www.youtube.com/watch?v=VIDEO_ID)
endif
	bun run fetch-transcript "$(URL)" --lang "$(LANG)" $(if $(FILE),--file "$(FILE)",)
