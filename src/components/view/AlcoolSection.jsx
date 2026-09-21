import Bouteilles from './Items/Bouteilles.jsx';
function AlcoolSection(props) {

  const alcoolStatus = props.alcoolStatus;
  const storage = props.storage;
  const update = props.update;
  const buttonHandler = props.buttonHandler;

  // if (alcoolStatus) return null; // nothing rendered if alcoolStatus is true

  const bouteilleType = alcoolStatus ? 'avecAlcool' : 'sansAlcool';
  const alcDynamicAttribute = {
    frontEnd: bouteilleType == 'avecAlcool' ? 'avec alcool' : 'sans alcool',
    backEnd: bouteilleType == 'avecAlcool' ? 'avecAlcool' : 'sansAlcool',
    attribute: bouteilleType == 'avecAlcool' ? 'avec-alcool' : 'sans-alcool'
  }
  return (
    <section id={alcDynamicAttribute.attribute} className={`cal-section ${alcDynamicAttribute.attribute}`}>
      <div className="row">
        <div className="col-12 text-center">
          <h2>{alcDynamicAttribute.frontEnd}</h2>
          <p>Contenu pour la section {alcDynamicAttribute.frontEnd}.</p>
        </div>
        <div className="col-12">
          <div className="row">
            {Object.entries(storage?.[bouteilleType] || {}).map(([price, data]) => (
              <Bouteilles storage={storage} bouteilleType={bouteilleType} buttonHandler={buttonHandler} update={update} price={price} alcDynamicAttribute={alcDynamicAttribute} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlcoolSection;
