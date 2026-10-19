import { Link, useMatch } from 'react-router-dom';

function CurrentPage(path) {
    // console.log(path);
    const match = useMatch(path);
    if (match !== null) {
        return "active";
    }
    return null
}

function Header(props) {
    const headerClass = '';
    // console.log("Header props");
    const { Navigation } = props;
    return (
        <header className="header header-">
            <div className="row">
                <div className="col-12 text-center">
                    <h1>Mon application de calcul de boissons</h1>
                    <p>Calculez la quantité de boissons</p>
                </div>
                <div className="col-12 text-center">
                    {/* Navigation */}
                    <nav>
                    {
                        Navigation.map((item, index) => (
                            <Link key={index} to={item.path} className={CurrentPage(item.path)}>{item.name}</Link>
                        ))
                    }
                    </nav>
                </div>
            </div>
        </header >
    );
};

export default Header;
