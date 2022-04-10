import styled from 'styled-components'

const HomeLayoutRoot = styled.div`
height: '100%';
    margin: 0;
    background-image: url('../../public/img/repositorio_web-13.png');
    background-size: cover;
    background-repeat: no-repeat;
`;
const HomeLayout = ({children}) =>
{
    return (
        <>
            <HomeLayoutRoot>
                {children}
            </HomeLayoutRoot>
                
        </>
     );
}
export default HomeLayout