async function fetchNews() {
    const resp = await fetch('/api/news');
    const data = await resp.json();
    const newsEl = document.getElementById('news');
    newsEl.innerHTML = '';
    if (data.feed) {
        data.feed.slice(0, 5).forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `<a href="${item.url}" target="_blank">${item.title}</a>`;
            newsEl.appendChild(div);
        });
    }
}

async function fetchChart(id, apiEndpoint, label) {
    const resp = await fetch(apiEndpoint);
    const data = await resp.json();
    const series = data['Time Series (Daily)'];
    if (!series) return;
    const dates = Object.keys(series).slice(0, 30).reverse();
    const values = dates.map(d => parseFloat(series[d]['4. close']));
    const ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: { labels: dates, datasets: [{ label, data: values, borderColor: 'blue' }] },
        options: { scales: { x: { display: false } } }
    });
}

fetchNews();
fetchChart('vixChart', '/api/vix', 'VIX');
fetchChart('sp500Chart', '/api/sp500', 'S&P 500');
