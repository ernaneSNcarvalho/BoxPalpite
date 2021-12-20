import React from 'react'
import './style.module.css'

const Footer = () => {
    return (
        <div className='bg-gray-700 p=4'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" integrity="sha512-+L4yy6FRcDGbXJ9mPG8MT/3UCDzwR9gPeyFNMCtInsol++5m3bk2bXWKdZjvybmohrAsn3Ua5x8gfLnbE1YkOg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <div className='container mx-auto text-center text-white font-bold'>
                Projeto desenvolvido por: {' '}
                <a className='hover:underline' href='dicarvalho.dev.br'>Di Carvalho Web Systems</a> / {' '}
                <a className='hover:underline' href='https://www.linkedin.com/feed/'>Linkedin</a> / {' '}
                <a className='hover:underline' href='https://github.com/ernaneSNcarvalho'>GitHub</a>
                <div className='mt-2'>
                    <img className='inline p-4' src='/logo.png' />
                </div>
                <a className='text-right inline-block text-6xl mt-0' href='https://web.whatsapp.com/send?phone=5534984262755' target='_blank'><i className='fa fa-whatsapp'></i></a>
            </div>

        </div>

    )
}

export default Footer