// Функция для добавления или обновления параметра в URL
function updateURLParameter(param, value) {
    var baseUrl = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');
    var urlQueryString = document.location.search;
    var newParam = param + '=' + value;
    var params = '?' + newParam;

    // Если уже есть параметры в URL, обновляем их
    if (urlQueryString) {
        var keyRegex = new RegExp('([?&])' + param + '[^&]*');

        // Если параметр уже существует, заменяем его
        if (urlQueryString.match(keyRegex) !== null) {
            params = urlQueryString.replace(keyRegex, "\$1" + newParam);
        } else { // Если нет, добавляем параметр к существующим
            params = urlQueryString + '&' + newParam;
        }
    }
    window.history.replaceState({}, "", baseUrl + params);
}

// Слушатель событий для всех ссылок с хэшем
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        var hash = this.getAttribute('href');
        var param = hash.replace('#', ''); // Или любой другой параметр, который вы хотите добавить
        updateURLParameter('param', param);
    });
});


