import Header from './Header';

const styleLayout = {
    padding: 25,
    margin: 25,
    border: "1px solid black",
}

const Layout = props => (
    <div style={styleLayout}>
        <Header />
        {props.children}
    </div>
)

export default Layout;