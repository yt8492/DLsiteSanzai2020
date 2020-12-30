const analyzeButton = document.getElementById('analyze')!!
const numbers = document.getElementById('numbers')!!
const price = document.getElementById('price')!!
const tweetButton = document.getElementById('tweet') as HTMLAnchorElement

analyzeButton.addEventListener('click', function () {
    this.textContent = "Analyzing..."
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id as number, {}, result => {
            const purchaseResult = result as PurchaseResult
            this.style.display = 'none'
            numbers.textContent = `2020年の購入作品数: ${purchaseResult.worksCount}`
            price.textContent = `総額: ${purchaseResult.totalPrice}円`
            const tweetContent = `私のDLsite散財2020\n購入作品数: ${purchaseResult.worksCount}作品\n合計金額: ${purchaseResult.totalPrice}円\n`
            tweetButton.style.display = 'block'
            tweetButton.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}&hashtags=${encodeURIComponent('DLsite散財2020')}`
        })
    })
})
