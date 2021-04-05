declare let Cheerio: CheerioAPI

export default function main(): void {
  const srcUrl = 'http://www.expocenter.or.jp/?page_id=7752'
  const src = UrlFetchApp.fetch(srcUrl).getContentText()

  const $ = Cheerio.load(src, { decodeEntities: false })
  $
}
