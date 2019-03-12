import DocHead from './DocHead'
import PageHeader from './PageHeader';
import GlobalStyle from './GlobalStyle';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #FFF'
}

const layoutStyleCopyright = {
  display:'flex',
  width:'98%',
  justifyContent:'flex-end',
  fontSize: 12
}

const date = new Date();

const Layout = (props) => (
  <div className='nextbrainlayout'>
    <DocHead title={props.title}/>
    <div style={layoutStyle}>

      <PageHeader />

      {props.children}
      
    
    </div>

    <div style={layoutStyleCopyright}>
      ©2018, {date.getFullYear()} Biztudio.
    </div>

    <GlobalStyle />

    <style jsx>{`
      .nextbrainlayout{
        display:flex;
        flex-direction:column;
      }
    `}</style>  
  </div>
)

export default Layout