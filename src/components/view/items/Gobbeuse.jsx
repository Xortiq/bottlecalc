function Gobbeuse(props) {
    const data = props.data;
    const autresUpdateHandler = props.autresUpdateHandler;
    const buttonHandler = props.buttonHandler;
    const label = props.label;

    return (
        <>
            {Object.entries(data.value || {}).map(([subType, subValue]) => (
                <div className="col-12 col-lg-6 text-center" key={subType}>
                    <div className="bouteille-container-autres">
                        <div className="field-wrapper">
                            <div className="row">
                                <div className="col-12">
                                    <div className="label-wrapper">
                                        <label htmlFor={`${data.key}-${subType}`}>{label.gobbeuse[subType] ?? subType}</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="bouteille-wrapper">
                                        <input
                                            type="number"
                                            id={`${data.key}-${subType}`}
                                            placeholder={Math.sumPrecise(subValue)}
                                            onSubmit={(e) => autresUpdateHandler(Number(e.target.value), 'gobbeuse', subType)}
                                        />
                                        <button className="btn btn-decrement" onClick={(e) => { buttonHandler.decrement(e) }} data-target-id={`${data.key}-${subType}`}><span>-</span></button>
                                        <button className="btn btn-increment" onClick={(e) => { buttonHandler.increment(e) }} data-target-id={`${data.key}-${subType}`}><span>+</span></button>
                                    </div>
                                    <button className="btn btn-ajouter" onClick={(e) => { buttonHandler.submit(e) }} data-target-id={`${data.key}-${subType}`}>Ajouter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Gobbeuse;
