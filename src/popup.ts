const analyzeButton = document.getElementById('analyze')!!
const numbers = document.getElementById('numbers')!!
const price = document.getElementById('price')!!
const tweetButton = document.getElementById('tweet') as HTMLAnchorElement

analyzeButton.addEventListener('click', function () {
    this.textContent = 'Analyzing...'
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        console.log(tabs)
        if (tabs.length != 0) {
            chrome.tabs.sendMessage(tabs[0].id as number, 'analyze', result => {
                if (result != null) {
                    const purchaseResult = result as PurchaseResult
                    this.style.display = 'none'
                    numbers.textContent = `2020年の購入作品数: ${purchaseResult.worksCount}`
                    price.textContent = `総額: ${purchaseResult.totalPrice}円`
                    const tweetContent = `私のDLsite散財2020\n購入作品数: ${purchaseResult.worksCount}作品\n合計金額: ${purchaseResult.totalPrice}円\n`
                    tweetButton.style.display = 'block'
                    const gitHubUrl = 'https://github.com/yt8492/DLsiteSanzai2020'

                    tweetButton.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}&hashtags=${encodeURIComponent('DLsite散財2020')}&url=${encodeURIComponent(gitHubUrl)}`
                } else {
                    this.textContent = '失敗しました。ページをリロードして再試行してください。'
                }
            })
        } else {
            this.textContent = '失敗しました。ページをリロードして再試行してください。'
        }
    })
})
