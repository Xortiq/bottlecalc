function Footer(props) {
    

    const menuList = <ul> {props.menu.map((item, index) => (
        <li key={index}><a href={item.url}>{item.name}</a></li>
    ))} </ul>;
    return (
        <footer>
            <div className="topfooter-container">
                <div className="container-fluid">
                    <div className="row justify-content-between">
                        <div className="col-12 col-md col-xl-3 mb-3 mb-md-0">
                            <div className="logo-wrapper">
                                <a href="/" className="d-block">
                                    <img src="https://scrawguild.com/application/files/8616/9854/0586/scraw_144.png" className="fluid-image center" alt="Company Logo" />
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-3 col-xl-3 col-xxl-2 d-none d-xl-block">
                            <div className="footer-menu">
                                {menuList}
                            </div>
                        </div>
                        <div className="col-md-4 col-xl-3 col-xxl-2">
                            <div className="info-wrapper">
                                <p>Schedule:<br />
                                    Tuesday / Thursday<br />
                                        8pm to 11pm EST</p>

                                    <p>Overtime is for nerds</p>
                                </div>
                            </div>
                            <div className="col-12 col-md col-xl-3 d-xl-flex flex-column align-items-center">
                                <div className="cta-wrapper">
                                    <p><a href="#" className="btn btn-secondary">Learn more here!</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </footer>
    );
};

export default Footer;
