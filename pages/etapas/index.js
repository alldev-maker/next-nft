import React, { Component } from "react";
import {useCallback, useState, useEffect, useRef} from "react";
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import styles from '../../styles/Home.module.css';
import Footer from '../layouts/footer';
import Logo from '../../public/img/repositorio_web-05.png';
import Menu from '../../public/img/repositorio_web-11.png';
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
const etapas = props => {

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
  
  const [d3data, setData] = useState([25, 30, 45, 60, 20]);
  const svgRef = useRef();

  
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
    useEffect(() => {

      const svg = d3.select(svgRef.current);
      
      
      
      const w = 600;
      const h = 30;
      
      
      const d3Line = d3.line()
      .x((value , index) => index *50)
      .y(value => value);

    svg
      .selectAll('path')
      .data([d3data])
      .join("path")
      .attr("d", value => d3Line(value))
      .attr("fill", "none")
      .attr("stroke", "#0055ff")
      
   
  },[d3data]);

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
            <Image src={Menu} placeholder="blur" width='1000' height='56'></Image>
            <div id="d3MenuLine"><svg ref={svgRef}></svg></div>
            <br/>
            <br/>
            <br/>
            <div className={styles.sectionmenu}>
            {menuBreadcrumbs.map((menu) => {
              return (
                  <Link href={menu.link}><a><div className={styles.sectionMenuItem}><div className={styles.gradientcirclemenu}><div className={styles.rotate}>{menu.label}</div></div></div></a></Link>
              );
            })}
             
            </div>
          </div>
          <d3Path />
 
        </div>

            
            

    </div>
  )
}
export default etapas 