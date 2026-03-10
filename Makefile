# AI Agents Management System — Makefile
# Использование: make [цель] или make help

.PHONY: help install submodule-init submodule-update fetch-transcript list-agents symlink-skill

# Переменные по умолчанию для fetch-transcript
URL ?=
LANG ?= en
OUTPUT ?=

# Цель по умолчанию — показать справку
help:
	@echo "AI Agents Management — доступные команды:"
	@echo ""
	@echo "  make install              — установить зависимости (bun install)"
	@echo "  make submodule-init       — инициализировать git submodule (.anthropics-skills)"
	@echo "  make submodule-update     — обновить submodule до последней версии"
	@echo "  make fetch-transcript     — скачать транскрипцию YouTube (URL=... [LANG=ru] [OUTPUT=имя])"
	@echo ""
	@echo "Примеры:"
	@echo "  make fetch-transcript URL=https://www.youtube.com/watch?v=VIDEO_ID"
	@echo "  make fetch-transcript URL=https://youtube.com/watch?v=VIDEO_ID LANG=ru OUTPUT=my-video"

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
# Использование: make fetch-transcript URL=<youtube-url> [LANG=ru] [OUTPUT=имя-файла]
fetch-transcript:
ifndef URL
	$(error Укажите URL: make fetch-transcript URL=https://www.youtube.com/watch?v=VIDEO_ID)
endif
	bun run fetch-transcript "$(URL)" --lang "$(LANG)" $(if $(OUTPUT),--output "$(OUTPUT)",)
