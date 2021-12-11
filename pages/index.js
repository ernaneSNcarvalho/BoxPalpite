import React from 'react'
import Link from 'next/link'

const Index = () => {
    return (
        <div>
            <p className='mt-12 mb-2 font-bold text-center'>O restaurante X sempre busca por atender melhor seus clientes. <br /> Por isso, estamos sempre abertos a ouvir sua opiniao.</p>
            <div className='text-center mt-12 my-12 font-bold'>
                <Link href='/pesquisa'>
                    <a className='bg-blue-400 px-6 py-4 font-bold rounded-lg shadow-lg hover:shadow'>Dar opiniao ou sugestao</a>
                </Link>
            </div>
            <p className='mt-12 mb-2 font-bold text-center'>Desconto</p>
        </div>

    )
}

export default Index