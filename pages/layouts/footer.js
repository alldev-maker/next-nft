import styled from 'styled-components'
import Image from 'next/image'
import Logo from '../../public/img/repositorio_web-07.png'

const FooterStyle = styled.footer`
    background-color: #0066FF;
`;
const ImageContainerStyle = styled.div`
    float: right;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 10px;
`;

const Footer = () => {
    return (
        <FooterStyle>
            <ImageContainerStyle>
                <Image src={Logo} placeholder="blur" width='151' height='58'></Image>
            </ImageContainerStyle>
        </FooterStyle>
    )
}
export default Footer;