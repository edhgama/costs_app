import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

import styles from './Footer.module.css'

export default function Footer() {

  return (
    <footer className={styles.footer}>
    <ul className={styles.social_list}>
      <li>
        <FaInstagram />
      </li>
      <li>
        <FaLinkedin />
      </li>
      <li>
        <FaFacebook />
      </li> 
    </ul>
    <p className={styles.copyright}><span> COSTS &copy; 2023 </span></p>
    </footer>
  )
}
