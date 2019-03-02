import PageHeader from './PageHeader';
import GlobalStyle from '../components/GlobalStyle';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #FFF'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <PageHeader />
    {props.children}
    
   
    <GlobalStyle />
  </div>
)

export default Layout