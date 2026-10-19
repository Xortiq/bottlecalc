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
                <div className="col-12 d-flex justify-content-center">
                    {/* Navigation */}
                    <nav className='navbar navbar-expand-lg navbar-light bg-ligh'>
                        <ul className='navbar-nav mr-auto'>
                            {
                                Navigation.map((item, index) => (
                                    <li className='nav-item'>
                                        <Link key={index} to={item.path} className={`nav-link ${CurrentPage(item.path)}`}>{item.name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </header >
    );
};

export default Header;
