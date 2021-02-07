const {COUNTRIES_GDP_PPP_AND_LANGUAGE_RAW} = require("./dataset");


const s = COUNTRIES_GDP_PPP_AND_LANGUAGE_RAW

const parsedInfo = []

const lines = s.split('\n').filter(line => !!line)

const languageToGDP = {}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const lineCells = line.split('\t')
  const country = lineCells[1].trim()
  const countryGdp = Number(lineCells[2])
  const language = lineCells[3]
  if (language) {
    if (languageToGDP[language]) {
      languageToGDP[language] = languageToGDP[language] + countryGdp
    } else {
      languageToGDP[language] = countryGdp
    }
  }
  parsedInfo.push([country, countryGdp])
}
console.log(parsedInfo)
console.log(languageToGDP)
