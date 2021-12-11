import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials from '../../credentials.json'

const doc = new GoogleSpreadsheet('1f0c5yfrmfZ-hCuN2VsXwsIfDoGCDFNARAIT8k7QfZlE')

export default async (req, res) => {
    try {
        await doc.useServiceAccountAuth(credentials)
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[1]
        const data = JSON.parse(req.body)

        await sheet.addRow({
            Nome: data.Nome,
            Email: data.Email,
            Whatsapp: data.Whatsapp,
            Cupom: 'cupom',
            Promo: 'promocao'
        })
        res.end(req.body)
    }catch (err) {
        console.log(err)
        console.log('error')
    }
}