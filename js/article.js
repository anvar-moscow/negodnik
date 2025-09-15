async function loadArticle() {
    try {
        const articleId = getArticleIdFromURL();
        const articleInfo = blogData.articles.find(a => a.id === articleId);
        
        if (articleInfo) {
            // Загружаем содержимое статьи из отдельного файла
            const response = await fetch(`articles/${articleInfo.file}`);
            if (!response.ok) {
                throw new Error('Файл статьи не найден');
            }
            
            const articleContent = await response.json();
            displayArticle(articleInfo, articleContent);
            document.title = `${articleInfo.title} - NEGODNIK`;
        } else {
            document.getElementById('article-content').innerHTML = '<p>Статья не найдена</p>';
        }
    } catch (error) {
        console.error('Ошибка загрузки статьи:', error);
        document.getElementById('article-content').innerHTML = '<p>Ошибка загрузки статьи</p>';
    }
}

function displayArticle(articleInfo, articleContent) {
    document.getElementById('article-title').textContent = articleInfo.title;
    document.getElementById('article-date').textContent = `Опубликовано: ${articleInfo.date} | Автор: ${articleInfo.author}`;
    document.getElementById('article-content').innerHTML = articleContent.content.join('');
}

// Функция для получения ID статьи из URL
function getArticleIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Запускаем загрузку статьи при полной загрузке DOM
document.addEventListener('DOMContentLoaded', loadArticle);