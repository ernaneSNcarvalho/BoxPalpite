import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'

const Pesquisa = () => {
    const [form, setForm] = useState({
        Nome: 'ciclano',
        Email: 'beltra@fulano.com',
        Whatsapp: '34099994994',
        Nota: 0
    })
    const notas = [0, 1, 2, 3, 4, 5]
    const [sucess, setSuccess] = useState(false)
    const [retorno, setRetorno] = useState({})

    const save = async () => {
        const response = await fetch('/api/save', {
            method: 'POST',
            body: JSON.stringify(form)
        })
        const data = await response.json()
        setSuccess(true)
        setRetorno(data)
    }

    const onChange = evt => {
        const value = evt.target.value
        const key = evt.target.name
        setForm(old => ({
            ...old,
            [key]: value
        }))
    }
    return (
        <div>
            <div className='pt-6'>
                <PageTitle title='Pesquisa' />
                <h1 className='text-center font-bold mt-2 my-4 text-2xl'>Criticas e sugestoes.</h1>
                <p className='mt-6 font-bold text-center'>O restaurante X sempre busca por atender melhor seus clientes. <br /> Por isso, estamos sempre abertos a ouvir sua opiniao.</p>
            </div>

            {!sucess && <div className='w-1/5 mx-auto'>
                <label className='font-bold'>Seu nome:</label>
                <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' onChange={onChange} placeholder='Nome' name='Nome' value={form.Nome} />
                <label className='font-bold'>E-mail:</label>
                <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='E-mail' onChange={onChange} name='Email' value={form.Email} />                
                <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Whatsapp' onChange={onChange} name='Whatsapp' value={form.Whatsapp} />
                <label className='font-bold'>Nota:</label>
                <div className='flex py-6'>
                    {notas.map(nota => {
                        return (<label className='block w-1/6 text-center'>{nota}<input type='radio' name='Nota' value={nota} onChange={onChange} /></label>)
                    })}
                </div>
                <button className='bg-blue-400 px-12 py-4 rounded-lg font-bold shadow-lg hover:shadow mb-2' onClick={save}>Salvar</button>
            </div>}
            {sucess && <div className='w-1/5 mx-auto'>
                <p className='mb-6 bg-blue-100 text-center font-bold border-t border-b border-blue-500 text-blue-700 px-4 py-4 mb-2 mt-2'>Obrigado pela contribuição!</p>
                {
                    retorno.showCoupon && <div className='text-center border p-4 mt-2'>
                        Seu cupom: <br />
                        <span className='font-bold'>{retorno.Cupom}</span>
                    </div>
                }
                {
                    retorno.showCoupon && <div className='text-center border p-4 mb-4 mt-2'>
                        <span className='font-bold'>{retorno.Promo}</span>
                        <br />
                        <span className='italic'> Tire um print ou foto desta tela para apresentar ao estabelecimento.</span>
                    </div>
                }
            </div>}
        </div>
    )
}

export default Pesquisa