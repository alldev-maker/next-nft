import React, { Component } from "react";
import {useCallback, useState, useEffect, useRef} from "react";
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import styles from '../../styles/Home.module.css';
import Footer from '../layouts/footer';
import Logo from '../../public/img/repositorio_web-05.png';
import LogoSide from '../../public/img/repositorio_web-12.png';
import {guiaApi} from "../api/guia-api";
import { useMounted } from "../../hooks/use-mounted";
import * as d3 from 'd3';

class d3Path extends Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    let svgPath = d3.select(this.myRef.current);
    svgPath.style("background-color", "geen")
  }
  redner () {
    return <div ref={this.myRef}>algo</div>
  }

}
const guia = props => {

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
  
  
    const getPos = (el) => {
      for (var lx=0, ly=0;
        el != null;
        lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        return {x: lx,y: ly};
    };
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
            <div className={styles.homeCornerContent}><Image src={Logo} placeholder="blur" width='350' height='62'></Image></div>
          </div>
        </div>
        <div className={styles.breadcrumb}>
            <ul className={styles.breadcrumb}>
              <li>
                <Link href="/"><a>Inicio</a></Link>
              </li>
              <li className={styles.currentBreadcrumb}>
                Guía de gestión
              </li>
            </ul>
        </div>
        <main className={styles.mainHome}>
          <div className={styles.homeMenuGuia}>
            <div className={styles.homeSideBar}>
              <Image src={LogoSide} placeholder="blur" width='300' height='300'></Image>
            </div>
            <div className={styles.sectionmenu}>
              {menuBreadcrumbs.map((menu) => {
                return (
                    <Link href={menu.link}><a><div className={styles.sectionMenuItem}><div className={styles.gradientcirclemenu}><div className={styles.rotate}>{menu.label}</div></div></div></a></Link>
                );
              })}
            </div>
          </div>
          <div className={styles.gradientbox}>
            <p className={styles.boxtitle}>{guia[0].contenido[0].title}</p>
            <p className={styles.boxtext}>{guia[0].contenido[0].body}</p>
          </div>
        </main>
          <Footer/>
    </div>
  )
}
export default guia 