const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const author = document.getElementById('author')
const twitterbtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote() {
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    author.textContent = quote.author || 'Unknown';
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    complete()
}

async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const resp = await fetch(apiUrl);
        apiQuotes = await resp.json()
        newQuote()

    } catch (error) {
        console.log(error)
    }
}

getQuotes()

newQuoteBtn.addEventListener('click', newQuote)

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank')
}

twitterbtn.addEventListener('click', tweetQuote)