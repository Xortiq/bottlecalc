import png from '/src/media/open-box-blackwhite.png'

function Boites(props) {
    const storage = props.storage;
    const update = props.update;
    const bouteilleType = props.bouteilleType;
    const buttonHandler = props.buttonHandler;
    const bouteillesObj = storage?.[bouteilleType];
    const price = Number(props.price); // prix can only be 10 or 25 return null if prix is not 10 or 25
    if (price !== 10 && price !== 25) return null; // nothing rendered if prix is not 10 or 25
    if (!bouteillesObj || typeof bouteillesObj !== 'object') return null; // nothing rendered if bouteillesObj is undefined

    function handleAddBox(event) {
        event.preventDefault();
        const label = document.getElementById(`${bouteilleType}-Nouvelle-Boites-${price}`);
        const newBoxsize = Number(label.value);
        if (typeof newBoxsize === 'number' && newBoxsize > 0) {
            if (storage[bouteilleType][price].boites[newBoxsize] === undefined) {
                update.Boites(bouteilleType, price, newBoxsize, 0);
            } else {
                if (typeof storage[bouteilleType][price].boites[newBoxsize] === 'number') {
                    update.Boites(bouteilleType, price, newBoxsize, storage[bouteilleType][price].boites[newBoxsize] + 1);
                    //todo: add message box size already exist and has been incremented
                    //scroll to said box maybe ?
                }
            }
        } else {
            label.value = 0;
            //todo: add error message to user if newBoxsize is not a number or less than or equal to 0
        }
        label.value = '';
        return;
    }


    return (
        <>
            <div className="col-12">
                <div className="boites-img-wrapper">
                    <div className="img">
                        <img src={png} alt="" />
                    </div>
                </div>
            </div>
            <div className="col-12 text-center">
                <div className="row">
                    <div className="col-12" key={price}>
                        <div className="row">
                            {Object.entries(bouteillesObj[price]?.boites || {}).map(([boxsize, count]) => (
                                <div className="col-12 col-md-6" key={boxsize}>
                                    <div className="field-wrapper">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="label-wrapper">
                                                    <label htmlFor={`${bouteilleType}-Boites-${boxsize}-${price}`}>Boites * {boxsize} :</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="ajout-boite-wrapper">
                                                    <input
                                                        type="number"
                                                        id={`${bouteilleType}-Boites-${boxsize}-${price}`}
                                                        placeholder={Math.sumPrecise(count)}
                                                        onSubmit={(e) => update.Boites(bouteilleType, Number(price), Number(boxsize), Number(e.target.value))}
                                                        />
                                                    <button className="btn btn-decrement" onClick={(e) => { buttonHandler.decrement(e) }} data-target-id={`${bouteilleType}-Boites-${boxsize}-${price}`}><span>-</span></button>
                                                    <button className="btn btn-increment" onClick={(e) => { buttonHandler.increment(e) }} data-target-id={`${bouteilleType}-Boites-${boxsize}-${price}`}><span>+</span></button>
                                                </div>
                                                <button className="btn btn-ajouter" onClick={(e) => { buttonHandler.submit(e) }} data-target-id={`${bouteilleType}-Boites-${boxsize}-${price}`}>Ajouter</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="col-12">
                                <div className="field-wrapper">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="label-wrapper">
                                                <label htmlFor={`${bouteilleType}-Nouvelle-Boites-${price}`}>Ajouter un nouveaux format de boites :</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ajout-boite-wrapper">
                                                <input
                                                    type="number"
                                                    placeholder={0}
                                                    id={`${bouteilleType}-Nouvelle-Boites-${price}`}
                                                />
                                                <button className="btn btn-decrement" onClick={(e) => { buttonHandler.decrement(e) }} data-target-id={`${bouteilleType}-Nouvelle-Boites-${price}`}><span>-</span></button>
                                                <button className="btn btn-increment" onClick={(e) => { buttonHandler.increment(e) }} data-target-id={`${bouteilleType}-Nouvelle-Boites-${price}`}><span>+</span></button>
                                            </div>
                                            <button className="btn btn-ajouter" onClick={(e) => handleAddBox(e)}>Ajouter</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Boites;
