$(document).ready(function () {
    const form = $('.search-box');
    const input = form.find('input[type="search"]');
    const resultsContainer = $('.results');
    const resultsCounter = $('header p');
    const eraserResults = $('#eraser');

    form.submit(function (event) {
        event.preventDefault();
        const searchTerm = input.val();
        if (searchTerm) {
            searchWikipedia(searchTerm);
        }
    });

    eraserResults.click(function () {
        clearResults();
    });

    function searchWikipedia(searchTerm) {
        const url = `https://pt.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=50&srsearch=${encodeURIComponent(searchTerm)}`;

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                displayResults(data.query.search);
            },
            error: function (error) {
                alert('Error : ' + error);
            }
        });
    }

    function displayResults(results) {
        resultsContainer.html('');
        resultsCounter.text(`Resultados : ${results.length}`);
        $.each(results, function (index, result) {
            const resultElement = $('<div>').addClass('result').html(`
                <h3>${result.title}</h3>
                <p>${result.snippet}</p>
                <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Ler mais</a>
            `);
            resultsContainer.append(resultElement);
        });
    }

    function clearResults() {
        resultsContainer.html('');
        resultsCounter.text('Resultados : 0');
    }
});
