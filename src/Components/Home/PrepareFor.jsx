import React from 'react'
import './PrepareFor.css'
import { motion } from 'framer-motion'
import company from '../../assets/company.png'

const PrepareFor = () => {
    return (
        <section className="PrepareFor_section">
            <div className="PrepareFor_grid">
                <motion.div className='PrepareFor_Header'
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}>
                    <p className='PrepareFor_title'>Prepare</p>
                    <p className='PrepareFor_content'><span>For All the Companies and <br /> Get offers</span></p>
                    <p className='PrepareFor_slogan'>Unlock Your Potential, Excel with Aptitude Test Prep !</p>
                </motion.div>
                <div className="company_div">
                    <img src={company} alt="company" className='company' />
                </div>
            </div>
        </section>
    )
}

export default PrepareFor