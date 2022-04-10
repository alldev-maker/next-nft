import React from "react"
import {useCallback, useState, useEffect} from "react"
import styles from '../../styles/Home.module.css'
import Footer from '../layouts/footer'
import Logo from '../../public/img/repositorio_web-05.png'
import Menu from '../../public/img/repositorio_web-11.png'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import {guiaApi} from "../api/guia-api"
import { useMounted } from "../../hooks/use-mounted"

const porquegestionarcadenas = props => {

  const isMounted = useMounted();
  const [guia, setGuia] = useState(null);
  const [menuBreadcrumbs, setMenuBreadcrumbs] = useState(null);
  
  const getGuias = useCallback(async () => {
    try {
      const data = await guiaApi.getGuias();
      if (isMounted){
        setGuia(data);
      }
    } catch (err) {
      console.error(err);
    }
  });

  const getMenuBreadcrumbs = useCallback(async () => {
    try {
      const data = await guiaApi.getMenuBreadcrumbs();
      if (isMounted){
        setMenuBreadcrumbs(data);
      }
    } catch (err) {
      console.error(err);
    }
  });

  useEffect(() => {
    getGuias();
    getMenuBreadcrumbs();
  },[]);

  if (!guia){
    return null;
  }

  if (!menuBreadcrumbs){
    return null;
  }

  return (
    <div className={styles.container}>
        <Head>
          <title>Guía para la Gestión Cadena de Suministro Sostenible</title>
          <meta name="description" content="Guía para la Gestión Cadena de Suministro Sostenible" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.headerContainer}>
          <div className={styles.homeCorner}>
            <Image src={Logo} placeholder="blur" width='350' height='62'></Image>
          </div>
          <div>
            <div className={styles.headermenu}>
              <Link href={menuBreadcrumbs[0].link}><a><div className={styles.gradientcirclemenu}></div></a></Link>
              <Link href={menuBreadcrumbs[1].link}><a><div className={styles.gradientcirclemenu}></div></a></Link>
              <Link href={menuBreadcrumbs[2].link}><a><div className={styles.gradientcirclemenu}></div></a></Link>
              <Link href={menuBreadcrumbs[3].link}><a><div className={styles.gradientcirclemenu}></div></a></Link>
              <Link href={menuBreadcrumbs[4].link}><a><div className={styles.gradientcirclemenu}></div></a></Link>
              <Link href={menuBreadcrumbs[5].link}><a><div className={styles.gradientcirclemenu}></div></a></Link>
              <Link href={menuBreadcrumbs[6].link}><a><div className={styles.gradientcirclemenu}></div></a></Link>
              <div className={styles.gradientcirclecurrent}></div>
              <Link href={menuBreadcrumbs[8].link}><a><div className={styles.gradientcirclemenu}></div></a></Link>
              <Link href={menuBreadcrumbs[9].link}><a><div className={styles.gradientcirclemenu}></div></a></Link>
              <Link href={menuBreadcrumbs[10].link}><a><div className={styles.gradientcirclemenu}></div></a></Link>
            </div>
          </div>
        </div>
        <div className={styles.breadcrumb}>
            <ul className={styles.breadcrumb}>
              <li>
                <Link href="/"><a>Inicio</a></Link>
              </li>
              <li>
                <Link href="/guia_de_gestion"><a>Guía de gestión</a></Link>
              </li>
              <li className={styles.currentBreadcrumb}>
                {menuBreadcrumbs[7].label}
              </li>
            </ul>
        </div>
        <main className={styles.main}>
          
          
          <div className={styles.grid}>
            <div className={styles.gradientbox}>
              <p className={styles.boxtitle}>{guia[0].contenido[0].title}</p>
              <p className={styles.boxtext}>{guia[0].contenido[0].body}</p>
            </div>

            <div className={styles.gradientbox}>
              <p className={styles.boxtitle}>{guia[0].contenido[1].title}</p>
              <p className={styles.boxtext}>{guia[0].contenido[1].body}</p>
            </div>

            <div className={styles.gradientbox}>
              <p className={styles.boxtitle}>{guia[1].contenido[0].title}</p>
              <p className={styles.boxtext}>{guia[1].contenido[0].body}</p>
            </div>

            <div className={styles.gradientbox}>
              <p className={styles.boxtitle}>{guia[1].contenido[1].title}</p>
            </div>

            <div className={styles.gradientbox}>
              <p className={styles.boxtitle}>{guia[1].contenido[2].title}</p>
            </div>
            
          </div>
            <div className={styles.gradientbox}>
              <p className={styles.boxtitle}>{guia[1].contenido[3].title}</p>
              <p className={styles.boxtext}>
              <ul>
                <li>{guia[1].contenido[3].body[0].value}</li>
                <li>{guia[1].contenido[3].body[1].value}</li>
              </ul>

              </p>
            </div>
          <br/>
          {guia.map((page) => {
            return (
              <div className={styles.gradientbox}>
                <p className={styles.boxtitle}>{page.contenido[0].title}</p>
                <p className={styles.boxtext}>{page.contenido[0].body}</p>
              </div>
            );
          })}
          
        </main>

        <Footer/>
    </div>
  )
}
export default porquegestionarcadenas

