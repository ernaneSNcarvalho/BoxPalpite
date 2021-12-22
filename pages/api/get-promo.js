import { GoogleSpreadsheet } from 'google-spreadsheet'
import { fromBase64 } from '../../utils/base64'

const credentials = require('../../credentials.json')

const doc = new GoogleSpreadsheet('1HvXZS1JhLYu-m4Ojok6s2qA540_9CgezMUEzIkJt-bk')

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth(credentials)
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[2]
    await sheet.loadCells('A2:B2')

    const mostrarPromocaoCell = sheet.getCell(1, 0)
    const textoCell = sheet.getCell(1, 1)

    res.end(JSON.stringify({
      showCoupon: mostrarPromocaoCell.value === 'VERDADEIRO',
      message: textoCell.value
    }))

  } catch (err) {
    res.end(JSON.stringify({
      showCoupon: false,
      message: ''
    }))
  }

}