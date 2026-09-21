import Bouteilles from './Items/Gobbeuse.jsx';
function AutresSection(props) {

    const alcoolStatus = props.alcoolStatus;
    const storage = props.storage;
    const update = props.update;
    const buttonHandler = props.buttonHandler;

    function autresUpdateHandler(value, type, subType) {
        if (type == "gobbeuse") {
            if (subType == undefined) return;
            update.Gobbeuse(value, subType);
            return
        }
        if (type == "bouteilles18L") {
            update.Bouteilles18L(value);
            return
        }
        if (type == "palette") {
            update.Palette(value);
            return
        }
        if (type == "etage") {
            update.Etage(value);
            return
        }
    }
    
    const label = {
        gobbeuse: {
            ecraser: "Sac Ecraser",
            canettes: "Sac Canettes",
            bouteilles: "Sac Bouteilles Plastique"
        },
        bouteilles18L: "Bouteilles 18L",
        palette: "Palette de bierre"

    }
    
    return (
        <section id="autres" className="cal-section autres">
            <div className="row">
                <div className="col-12 text-center">
                    <h2>Autres</h2>
                    <p>Contenu pour la section autres.</p>
                </div>

                {Object.entries(storage?.autres || {}).map(([type, value]) => {
                    const key = String(type);
                    // Render Gobbeuse (case-insensitive) subfields differently
                    if (key.toLowerCase() === 'gobbeuse') {
                        // console.log("Rendering Gobbeuse with data:", { key, value });
                        return <Bouteilles data={{ key, value }} autresUpdateHandler={autresUpdateHandler} buttonHandler={buttonHandler} label={label} />;
                    }

                    // Generic rendering for other autres entries (palette, bouteilles18L, etc.)
                    return (
                        <div className="col-12 col-lg-6 text-center" key={key}>
                            <div className="bouteille-container-autres">
                                <div className="field-wrapper">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="label-wrapper">
                                                <label htmlFor={key}>{label[key] ?? key}</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="bouteille-wrapper">
                                                <input
                                                    type="number"
                                                    id={key}
                                                    placeholder={Math.sumPrecise(value)}
                                                    onSubmit={(e) => autresUpdateHandler(Number(e.target.value), type)}
                                                    readOnly
                                                />
                                                <button className="btn btn-decrement" onClick={(e)=>{buttonHandler.decrement(e)}} data-target-id={key}><span>-</span></button>
                                                <button className="btn btn-increment" onClick={(e)=>{buttonHandler.increment(e)}} data-target-id={key}><span>+</span></button>
                                            </div>
                                            <button className="btn btn-ajouter" onClick={(e)=>{buttonHandler.submit(e)}} data-target-id={key}>Ajouter</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
                }
            </div>
        </section>
    );
};

export default AutresSection;
