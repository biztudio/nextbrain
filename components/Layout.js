import PageHeader from './PageHeader';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #FFF'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <PageHeader />
    {props.children}
  </div>
)

export default Layout