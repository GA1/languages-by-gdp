const {COUNTRIES_GDP_PPP_AND_LANGUAGE_RAW} = require("./dataset");


const s = COUNTRIES_GDP_PPP_AND_LANGUAGE_RAW

const parsedInfo = []

const lines = s.split('\n').filter(line => !!line)

const languageToGDP = new Map()

let worldGDP = 0

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const lineCells = line.split('\t')
  const country = lineCells[1].trim()
  const countryGdp = Number(lineCells[2])
  worldGDP += countryGdp
  const language = lineCells[3]
  if (language) {
    if (languageToGDP.has(language)) {
      languageToGDP.set(language, languageToGDP.get(language) + countryGdp)
    } else {
      languageToGDP.set(language, countryGdp)
    }
  }
  parsedInfo.push([country, countryGdp])
}

const languageToGdpSequence = Array.from(languageToGDP, ([language, gdp]) => ({language, gdp}))
languageToGdpSequence.sort((a, b) => b.gdp - a.gdp)

console.log(`worldGDP is ${worldGDP}`)
// console.log(parsedInfo)
console.log(languageToGdpSequence.map((x, index) => `${index}, ${x.language}, ${x.gdp}, ${String(x.gdp/worldGDP*100).substring(0,5)}%`))
// console.log(languageToGDP)
