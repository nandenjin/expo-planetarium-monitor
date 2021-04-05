declare let Cheerio: cheerio.CheerioAPI

export default function main(): void {
  const srcUrl = 'http://www.expocenter.or.jp/?page_id=7752'
  const src = UrlFetchApp.fetch(srcUrl).getContentText()

  const $ = Cheerio.load(src, { decodeEntities: false })
  $('table#zyou tr').each((_, elm) => {
    const e = $(elm)

    // Skip header
    if (e.html().indexOf('上映開始時間') > -1) return

    const [timeCell, titleCell, countCell] = e.find('td').toArray()

    const [, hh, mm] = $(timeCell)
      .text()
      .match(/([0-9]{2}):([0-9]{2})/)
    const [, category, title] = $(titleCell)
      .text()
      .match(/\s*(.+?番組)\s+(.+)/)

    let countMatch: RegExpMatchArray, remains: number
    if (
      (countMatch = $(countCell)
        .text()
        .match(/\(([0-9]+)\)/))
    ) {
      remains = +countMatch[1]
    } else {
      remains = -1
    }

    console.log(hh, mm, category, title, remains)
  })
}
