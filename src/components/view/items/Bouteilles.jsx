import Boites from './Boites.jsx';

import png_beer from '/src/media/beer.png'
import png_soda from '/src/media/soda.png'
function Bouteilles(props) {
    const storage = props.storage;
    const update = props.update;
    const price = props.price;
    const bouteilleType = props.bouteilleType;
    const alcDynamicAttribute = props.alcDynamicAttribute
    const buttonHandler = props.buttonHandler;


    const png = bouteilleType == 'avecAlcool' ? png_beer : png_soda;

    return (
        <div className="col-12 col-lg-6 text-center">
            <div className="bouteille-container-avec-alcool-10">
                <div className="row">
                    <div className="col-12">
                        <div className="bouteille-img-wrapper">
                            <div className="img">
                                <img src={png} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="field-wrapper">
                            <div className="row">
                                <div className="col-12">
                                    <div className="label-wrapper">
                                        <label htmlFor={`bouteilles-${alcDynamicAttribute.attribute}-${price}`}>Bouteilles {alcDynamicAttribute.frontEnd} {price} cents:</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="bouteille-wrapper">
                                        <input
                                            type="number"
                                            id={`bouteilles-${alcDynamicAttribute.attribute}-${price}`}
                                            placeholder={Math.sumPrecise(storage?.[bouteilleType]?.[price].quantite)}
                                            onSubmit={(e) => update.Bouteilles(bouteilleType, price, Number(e.target.value))}
                                            readOnly
                                        />
                                        <button className="btn btn-decrement" onClick={(e)=>{buttonHandler.decrement(e)}} data-target-id={`bouteilles-${alcDynamicAttribute.attribute}-${price}`}><span>-</span></button>
                                        <button className="btn btn-increment" onClick={(e)=>{buttonHandler.increment(e)}} data-target-id={`bouteilles-${alcDynamicAttribute.attribute}-${price}`}><span>+</span></button>
                                    </div>
                                    <button className="btn btn-ajouter" onClick={(e)=>{buttonHandler.submit(e)}} data-target-id={`bouteilles-${alcDynamicAttribute.attribute}-${price}`}>Ajouter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <hr />
                    </div>
                    <Boites storage={storage} bouteilleType={bouteilleType} buttonHandler={buttonHandler} update={update} price={price} />
                </div>
            </div>
        </div>
    );
}

export default Bouteilles;
