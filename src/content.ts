type Work = {
    date: string
    price: number
}

type PurchaseResult = {
    worksCount: number
    totalPrice: number
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    if (message == 'analyze') {
        read2020Works(1).then(works => {
            const result = {
                worksCount: works.length,
                totalPrice: works.map(w => w.price).reduce((previousValue, currentValue) => {
                    return previousValue + currentValue
                }, 0)
            }
            console.log(result)
            sendResponse(result)
        })
    } else {
        sendResponse(null)
    }
    return true
})

async function read2020Works(page: number): Promise<Array<Work>> {
    const url = `https://www.dlsite.com/maniax/mypage/userbuy/=/type/all/start/all/sort/1/order/1/page/${page}`
    const result = await (await fetch(url)).text()
    const parser = new DOMParser()
    const document = parser.parseFromString(result, 'text/html')
    const works = Array.from(
        document.getElementsByClassName('work_list_main')[0]
            .getElementsByTagName('tbody')[0].children
    ).slice(1).map((e: Element) => {
        return {
            date: e.getElementsByClassName('buy_date')[0].textContent!!,
            price: parseInt(e.getElementsByClassName('work_price')[0].textContent!!.replace(/[^0-9]/, ''))
        }
    })
    const last = works[works.length - 1]
    const hasNextPage = Array.from(
        document.getElementsByClassName('page_no')[0]
            .getElementsByTagName('ul')[0]
            .children
    ).find(e => e.textContent == '次へ') != null
    const hasNext =  last.date.startsWith('2020') && hasNextPage
    const filteredWorks = works.filter(w => w.date.startsWith('2020'))
    if (hasNext) {
        return filteredWorks.concat(await read2020Works(page + 1))
    } else {
        return filteredWorks
    }
}
