var socket = io();

function performWebSearch() {
    var webInput = document.getElementById('web-input');
    var query = webInput.value;
    webInput.value = '';

    socket.emit('web_search', {query: query});
}

socket.on('web_search_results', function(data) {
    var resultsContainer = document.getElementById('web-results');
    resultsContainer.innerHTML = '';

    data.results.forEach(function(result) {
        var card = document.createElement('div');
        card.className = 'result-card';

        if (result.title) {
            var titleElement = document.createElement('div');
            titleElement.className = 'result-title';
            titleElement.innerHTML = '<strong>' + result.title + '</strong>';
            card.appendChild(titleElement);
        }

        if (result.url) {
            var urlElement = document.createElement('div');
            urlElement.className = 'result-url';
            urlElement.textContent = result.url;
            card.appendChild(urlElement);
        }

        if (result.content) {
            var contentElement = document.createElement('div');
            contentElement.className = 'result-content';
            contentElement.textContent = result.content;
            card.appendChild(contentElement);
        }

        resultsContainer.appendChild(card);
    });
});

function toggleWebSearchButton() {
    var webInput = document.getElementById('web-input');
    var webSearchButton = document.getElementById('web-search-button');
    webSearchButton.disabled = webInput.value.trim() === '';
}
