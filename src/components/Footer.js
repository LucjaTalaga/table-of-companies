import React from 'react';

/**
 * A footer of application with basic data and link to repository with this project
 */
function Footer() {
    return (
        <footer className='flex-box'>
            <p>Created by: Piotr Talaga</p>
            <p>Repository avaliable at <a href='https://github.com/piotrtalaga/table-of-companies'>Github</a></p>
        </footer>
    )
}

export default Footer;