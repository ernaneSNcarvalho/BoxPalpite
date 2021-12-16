import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'
import { fromBase64 } from '../../utils/base64'

const doc = new GoogleSpreadsheet('1f0c5yfrmfZ-hCuN2VsXwsIfDoGCDFNARAIT8k7QfZlE')

const genCupom = () => {
    const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()
    return code.substr(0, 4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4)
}

export default async (req, res) => {
    try {
        await doc.useServiceAccountAuth(
            {
                client_email: 'box-palpite@box-palpite.iam.gserviceaccount.com',
                private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDY/h/OhcpUKvRs\n7dF20NYSG4JqPLKG59g7D5fhr3Xr/DOWcJcb4EOVpC04mGpNJ6yh90QHpVJGqLDI\nianNmBXXfEgqd07XbBNwswQMTE44KtvlyKoRAG0n5DtXSTjJAklv9cob/+RiitnB\nNXlgARSgk2URgxDneJZGbFpxaYElsdcBQIhXZDBkUSyj5DrN+4DnBgbU7Da2wW+V\nuSQKKLFV3g/n2HFbT0o8shqhtDO+L6DbFuLo8xqWoiFk6nBTgkff2YN1z1dsPdeS\nPxX12FPgVqX6fihG/2yTjN4+Afr1/DrEkZukYsz4+h1+OnNldhCK/kNJ17rKcv44\npAIepBI7AgMBAAECggEAPA51iijQW2Q6Gy3lE9/v57oSacnb1We0moAR1sZDumkm\ndAQ8Zlw3CGMUmv3gKfOJnZg8jWstrt3Ac/hZ9Uua+/VrWcmEmi3Q4ZfCTo8N9RCz\npNDZdPQrwecyn1FmNIf8AE9EPWSg9r8cTpO4wJ/78AdraSHf21iuKtaRX6NGOcKQ\nw31xAL8wI/x1qYcQWOkp534J1/REeuKGCsalI1wTLmmVfU8NWsaQF1me9FD0Glu/\nwWMZiaiLD33ZtFtZ0M6P9c98of3YARXG4Gb9Rn8TFazNK8eHQjepjHfFdHW4HkVH\n01zWOshIqBNWD2pIx6OUEaRD4biC6yEM/yKJKMlopQKBgQD0pyxmqyEDCJIJXR6C\ntnPZe3fcLJtsLBXku/Zx48MaKGNXETXAXaQeZAMCwe8Ce4Qqs9QJemTX5GO6cjiw\n9WeIQlv6xGrE4w1oF9KHmlncRYi+wDBhbZ0Du6Ohv/5lYJxA1gdYGY9UEAVZ6aUu\nVKxcQ2/XJQzBA/cPfa0J9sXRvQKBgQDjDohWD12XqOW47GR9+rsbme77Oo81qXV7\nLiZ6/m5ckF6sLhU8OWfdgo10yPT32xz2MoMA/upwynbIhtZT3nLOg5B7eAHXMVBV\nMjTeRqhI5GMmYpTPYmorFJEiEXpOmWJ1fM2bDye9Et+pheoGwxZcBFB2miRiL5pT\nD7zd0K4nVwKBgDAYvW3hrre985fLqrffzp6u2z15t4RollVFbomtUSnPTthLFdof\njqg62Sytm6NNTQpoGANVAIZA7Co3UlXXqObsxNBj1OmoCXaxWD44Zfob4Wo+tkQx\nHHEjbmPaLtUXTSCh8weq3raT/7lRaZvWIZxx1YbiTcOUV/m/p0kSLomxAoGATQRi\n7n4rywO5WG6m76yaxxQB4inM5fDjLrNKzjF7kd5OnqzK+zClsJdWECUSIvip7EDZ\n+v5822FxxTcngC9WVgJ+gcMFLM9HZn6vPC5Pato9X4nU3DuPs6k4SYwQJpUUtrFs\ntIoBerrqLwCDj2OhM/kqqfBDIyLuf/o4oCzmxeUCgYAo0700WuPer0uSChX+o00d\nBgSn8thhe4q6J/5h4WgCHu/6XfrPoVrMsFiAyRl7bOFZH9f9p+UAdr+VP4dRWYsg\nganioP1CRflOMHLKdknSRCvBRl6J1drB9kSORHHJQGV/1FGrRaOPzw7KIWIfyO2S\nsNdhzi2ZafRGmEe8o6PQfA==\n-----END PRIVATE KEY-----\n"

            }
        )
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[1]
        const data = JSON.parse(req.body)

        const sheetConfig = doc.sheetsByIndex[2]
        await sheetConfig.loadCells('A2:B2')

        const mostrarPromocaoCell = sheetConfig.getCell(1, 0)
        const textoCell = sheetConfig.getCell(1, 1)

        let Cupom = genCupom()
        let Promo = ''
        if (mostrarPromocaoCell.value === 'VERDADEIRO') {
            Cupom,
                Promo = textoCell.value
        }

        await sheet.addRow({
            Nome: data.Nome,
            Email: data.Email,
            Whatsapp: data.Whatsapp,
            Nota: parseInt(data.Nota),
            'Data Preenchimento': moment().format('DD/MM/YYYY HH:mm'),
            Cupom,
            Promo
        })
        res.end(JSON.stringify({
            showCoupon: Cupom !== '',
            Cupom,
            Promo
        }))
    } catch (err) {
        console.log(err)
        console.log('error')
    }
}