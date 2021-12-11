import React from 'react'
import Link from 'next/link'

const Pesquisa = () => {
    return (
        <div>
            <div className='pt-6'>
                <h1 className='text-center font-bold mt-2 my-4 text-2xl'>Criticas e sugestoes.</h1>
                <p className='mt-6 font-bold text-center'>O restaurante X sempre busca por atender melhor seus clientes. <br /> Por isso, estamos sempre abertos a ouvir sua opiniao.</p>
            </div>
            <div className='w-1/5 mx-auto'>
                <label className='font-bold'>Seu nome:</label>
                <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' />
            </div>
        </div>
    )
}

export default Pesquisa