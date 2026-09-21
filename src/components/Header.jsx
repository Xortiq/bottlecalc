function Header(props) {
    const headerClass = 'header header-';
    // console.log("Header props");
    return (
        <header className={headerClass}>
            <div className="row">
                <div className="col-12 text-center">
                    <h1>Mon application de calcul de boissons</h1>
                    <p>Calculez la quantité de boissons</p>
                </div>
                <div className="col-12 text-center">
                    <button
                        type="button"
                        className={`toggle-alcool ${props.alcoolStatus ? "on" : "off"}`}
                        onClick={() => props.setAlcoolStatus((alcoolStatus) => !alcoolStatus)}
                    >Alcool Status is {props.alcoolStatus ? "On" : "Off"}</button>
                </div>
            </div>
        </header >
    );
};

export default Header;
