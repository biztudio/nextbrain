import DocHead from './DocHead'
import PageHeader from './PageHeader';
import GlobalStyle from './GlobalStyle';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #FFF'
}

const Layout = (props) => (
  <div style={layoutStyle}>

    <DocHead title={props.title}/>

    <PageHeader  />

    {props.children}
    
   
    <GlobalStyle />
  </div>
)

export default Layout