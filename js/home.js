function loadArticlesList() {
    try {
        const articlesList = document.getElementById('articles-list');
        
        const articlesHTML = blogData.articles.map(article => `
            <div class="article-preview">
                <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
                <div class="article-meta">
                    <span>Опубликовано: ${article.date}</span>
                    <span>Автор: ${article.author}</span>
                </div>
                <p class="article-excerpt">${article.excerpt || article.content[0].substring(0, 150)}...</p>
            </div>
        `).join('');
        
        articlesList.innerHTML = articlesHTML;
    } catch (error) {
        console.error('Ошибка загрузки списка статей:', error);
        document.getElementById('articles-list').innerHTML = '<p>Ошибка загрузки списка статей</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadArticlesList);