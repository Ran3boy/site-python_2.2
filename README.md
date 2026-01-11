# Задание 2.2. Кастомизация статического сайта и деплой с помощью GitHub Actions

## Описание работы

В рамках задания 2.2 была выполнена кастомизация статического сайта с использованием генератора документации **MkDocs** и шаблонизации **Jinja2**.  
Для сайта была разработана собственная тема оформления, настроена сборка фронтенда (HTML, CSS, JS), реализован автоматический пайплайн сборки и деплоя на **GitHub Pages** с помощью **GitHub Actions**.

Сайт собирается из Markdown-контента, интегрируемого в HTML-шаблоны, проходит валидацию и минификацию, после чего автоматически публикуется.

---

## Используемые технологии

- **MkDocs** — генерация статического сайта
- **Jinja2** — шаблонизация HTML
- **HTML5 / CSS3 / JavaScript**
- **PostCSS** — обработка и минификация CSS
- **GitHub Actions** — CI/CD пайплайн
- **GitHub Pages** — хостинг сайта

---

## Структура проекта

├── docs/ # Markdown-контент сайта
│ └── assets/ # Собранные CSS и JS файлы
├── theme/ # Кастомная тема MkDocs
│ ├── main.html # Основной layout
│ ├── home.html # Шаблон главной страницы
│ └── partials/ # Header и Footer
├── frontend/ # Исходные CSS и JS файлы
├── .github/workflows/
│ └── deploy.yml # GitHub Actions pipeline
├── mkdocs.yml # Конфигурация MkDocs
├── package.json # Зависимости для сборки фронтенда
└── README.md # Отчет по заданию


---

## Кастомизация темы

В рамках задания была создана собственная тема MkDocs:

- Реализован кастомный **header**
- Реализован кастомный **footer**
- Создан отдельный шаблон для **главной страницы**
- Добавлены метаданные сайта:
  - название
  - описание
  - автор

Метаданные подключены через конфигурацию `mkdocs.yml` и HTML-теги `<meta>`.

---

## Сборка фронтенда

Перед сборкой сайта выполняется обработка статических ресурсов:

1. Сборка CSS с помощью **PostCSS**
2. Минификация CSS
3. Минификация JavaScript
4. Подготовка ассетов для использования в MkDocs

---

## GitHub Actions Pipeline

Для автоматизации сборки и деплоя был настроен CI/CD пайплайн в GitHub Actions.

Основные этапы пайплайна:

1. Установка зависимостей
2. Сборка CSS и JS
3. Сборка сайта MkDocs
4. Валидация HTML-файлов
5. Минификация HTML
6. Деплой сайта на GitHub Pages

---

## Пример workflow (`deploy.yml`)

```yaml
name: Build and Deploy MkDocs site

on:
  push:
    branches: [ "main" ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install MkDocs
        run: pip install mkdocs

      - name: Install frontend dependencies
        run: npm install

      - name: Build frontend assets
        run: npm run build

      - name: Build site
        run: mkdocs build

      - name: Validate HTML
        run: html5validator --root site

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: site

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

## Результат

Сайт автоматически публикуется на GitHub Pages после каждого коммита в ветку `main` с использованием GitHub Actions.

**Ссылка на сайт:**  
https://ran3boy.github.io/site-python/

**Ссылка на репозиторий:**  
https://github.com/Ran3boy/site-python

---

## Вывод

В ходе выполнения задания была реализована кастомизация темы MkDocs с использованием шаблонизации Jinja2, настроена сборка фронтенда с обработкой и минификацией статических ресурсов, а также организован полный CI/CD цикл для статического сайта с автоматическим деплоем на GitHub Pages.
