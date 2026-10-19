import { useEffect } from 'react'

function ResultatsSection(props) {

    const storage = props.storage;
    const update = props.update;
    const storageVal = props.storageVal;

    useEffect(() => {
        const totalFermetureSansAlcool = storageVal.prixSansAlcool(10) + storageVal.prixSansAlcool(25) + storageVal.prixBouteilles18L() + storageVal.prixGobbeuse('ecraser') + storageVal.prixGobbeuse('bouteilles') + storageVal.prixGobbeuse('canettes');
        const totalFermetureAvecAlcool = storageVal.prixAvecAlcool(10) + storageVal.prixAvecAlcool(25) + storageVal.prixCaisse24() + storageVal.prixPalette();
        update.Montant(totalFermetureSansAlcool, 'fermeture', 'sansAlcool');
        update.Montant(totalFermetureAvecAlcool, 'fermeture', 'avecAlcool');
    }, []);

    function cleanPrice(val) {
        return Number(Math.round(val * 100) / 100).toFixed(2);
    }

    function sousTotal(type) {
        if (type !== "avecAlcool" && type !== "sansAlcool") return null;
        return Number(storageVal.prixMontant("ouverture", type)) + Number(storageVal.prixMontant("caisses", type)) - Number(storageVal.prixMontant("reception", type));
    }
    function difference(type) {
        if (type !== "avecAlcool" && type !== "sansAlcool") return null;
        
        // console.log(type);
        // console.log(sousTotal(type));
        // console.log(storageVal.prixMontant("fermeture", type));
        // console.log("-------");
        return Number(sousTotal(type)) - Number(storageVal.prixMontant("fermeture", type));
    }

    console.log(storage);
    return (
        <section id="autres" className="cal-section autres">
            <div className="row">
                <div className="col-12 text-center">
                    <h2>Resultats</h2>
                </div>
                <div className="col-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th className="col-6">Sans Alcool</th>
                                <th className="col-2">Prix</th>
                                <th className="col-2">Quantité</th>
                                <th className="col-2">Montant</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Bouteilles 0.10&#36;</td>
                                <td>0.10 &#36;</td>
                                <td>{storageVal.sansAlcool(10)}</td>
                                <td>{cleanPrice(storageVal.prixSansAlcool(10))}&#36;</td>
                            </tr>
                            <tr>
                                <td>Bouteilles 0.25&#36;</td>
                                <td>0.25 &#36;</td>
                                <td>{storageVal.sansAlcool(25)}</td>
                                <td>{cleanPrice(storageVal.prixSansAlcool(25))}&#36;</td>
                            </tr>
                            <tr>
                                <td>Bouteilles 18L</td>
                                <td>10 &#36;</td>
                                <td>{storageVal.bouteilles18L()}</td>
                                <td>{cleanPrice(storageVal.prixBouteilles18L())}&#36;</td>
                            </tr>
                            <tr>
                                <td>Sac ecrasé</td>
                                <td>60 &#36;</td>
                                <td>{storageVal.gobbeuse('ecraser')}</td>
                                <td>{cleanPrice(storageVal.prixGobbeuse('ecraser'))}&#36;</td>
                            </tr>
                            <tr>
                                <td>Sac bouteilles</td>
                                <td>6 &#36;</td>
                                <td>{storageVal.gobbeuse('bouteilles')}</td>
                                <td>{cleanPrice(storageVal.prixGobbeuse('bouteilles'))}&#36;</td>
                            </tr>
                            <tr>
                                <td>Sac canettes</td>
                                <td>24 &#36;</td>
                                <td>{storageVal.gobbeuse('canettes')}</td>
                                <td>{cleanPrice(storageVal.prixGobbeuse('canettes'))}&#36;</td>
                            </tr>
                            <tr>
                                <td colSpan={2}></td>
                                <th>Total:</th>
                                <td>{cleanPrice(storageVal.prixMontant('fermeture', 'sansAlcool'))}&#36;</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th className="col-6">Avec Alcool</th>
                                <th className="col-2">Prix</th>
                                <th className="col-2">Quantité</th>
                                <th className="col-2">Montant</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Bouteilles 0.10&#36;</td>
                                <td>0.10 &#36;</td>
                                <td>{storageVal.avecAlcool(10)}</td>
                                <td>{cleanPrice(storageVal.prixAvecAlcool(10))}&#36;</td>
                            </tr>
                            <tr>
                                <td>Bouteilles 0.25&#36;</td>
                                <td>0.25 &#36;</td>
                                <td>{storageVal.avecAlcool(25)}</td>
                                <td>{cleanPrice(storageVal.prixAvecAlcool(25))}&#36;</td>
                            </tr>
                            <tr>
                                <td>Caisse de 24</td>
                                <td>2.40 &#36;</td>
                                <td>{storageVal.caisse24()}</td>
                                <td>{cleanPrice(storageVal.prixCaisse24())}&#36;</td>
                            </tr>
                            <tr>
                                <td>Palette de caisse de 24</td>
                                <td>201.60 &#36;</td>
                                <td>{storageVal.palette()}</td>
                                <td>{cleanPrice(storageVal.prixPalette())}&#36;</td>
                            </tr>
                            <tr>
                                <td colSpan={2}></td>
                                <th>Total:</th>
                                <td>{cleanPrice(storageVal.prixMontant('fermeture', 'avecAlcool'))}&#36;</td>
                            </tr>

                        </tbody>
                    </table>
                    <hr />
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th className="col-7"></th>
                                <th className="col">Avec Alcool</th>
                                <th className="col">Sans Alcool</th>
                                <th className="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key="ouverture">
                                <td>Iventaire d'ouverture</td>
                                <td>
                                    <input
                                        type="number" step=".01"
                                        id={"ouverture-avecAlcool"}
                                        value={cleanPrice(storageVal.prixMontant("ouverture", "avecAlcool"))}
                                        onChange={(e) => update.Montant(Number(e.target.value), "ouverture", "avecAlcool")}
                                        readOnly={false}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number" step=".01"
                                        id={"ouverture-sansAlcool"}
                                        value={cleanPrice(storageVal.prixMontant("ouverture", "sansAlcool"))}
                                        onChange={(e) => update.Montant(Number(e.target.value), "ouverture", "sansAlcool")}
                                        readOnly={false}
                                    />
                                </td>
                                <td>C</td>
                            </tr>
                            <tr key="caisses">
                                <td>{"(+)"} Retour bouteilles aux caisses</td>
                                <td>
                                    <input
                                        type="number" step=".01"
                                        id={"caisses-avecAlcool"}
                                        value={cleanPrice(storageVal.prixMontant("caisses", "avecAlcool"))}
                                        onChange={(e) => update.Montant(Number(e.target.value), "caisses", "avecAlcool")}
                                        readOnly={false}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number" step=".01"
                                        id={"caisses-sansAlcool"}
                                        value={cleanPrice(storageVal.prixMontant("caisses", "sansAlcool"))}
                                        onChange={(e) => update.Montant(Number(e.target.value), "caisses", "sansAlcool")}
                                        readOnly={false}
                                    />
                                </td>
                                <td>D</td>
                            </tr>
                            <tr key="reception">
                                <td>{"(-)"} Retour bouteilles à la reception</td>
                                <td>
                                    <input
                                        type="number" step=".01"
                                        id={"reception-avecAlcool"}
                                        value={cleanPrice(storageVal.prixMontant("reception", "avecAlcool"))}
                                        onChange={(e) => update.Montant(Number(e.target.value), "reception", "avecAlcool")}
                                        readOnly={false}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number" step=".01"
                                        id={"reception-sansAlcool"}
                                        value={cleanPrice(storageVal.prixMontant("reception", "sansAlcool"))}
                                        onChange={(e) => update.Montant(Number(e.target.value), "reception", "sansAlcool")}
                                        readOnly={false}
                                    />
                                </td>
                                <td>E</td>
                            </tr>
                            <tr key="sousTotal">
                                <td>Sous total</td>
                                <td>
                                    <input
                                        type="number" step=".01"
                                        id={"sousTotal-avecAlcool"}
                                        value={cleanPrice(sousTotal("avecAlcool"))}
                                        onChange={(e) => update.Montant(Number(e.target.value), "sousTotal", "avecAlcool")}
                                        readOnly={true}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number" step=".01"
                                        id={"sousTotal-sansAlcool"}
                                        value={cleanPrice(sousTotal("sansAlcool"))}
                                        onChange={(e) => update.Montant(Number(e.target.value), "sousTotal", "sansAlcool")}
                                        readOnly={true}
                                    />
                                </td>
                                <td>F</td>
                            </tr>
                            <tr key="fermeture">
                                <td>Inventaire de fermeture {"(A & B)"}</td>
                                <td>
                                    <input
                                        type="number" step=".01"
                                        id={"fermeture-avecAlcool"}
                                        value={cleanPrice(storageVal.prixMontant("fermeture", "avecAlcool"))}
                                        onChange={(e) => update.Montant(Number(e.target.value), "fermeture", "avecAlcool")}
                                        readOnly={true}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number" step=".01"
                                        id={"fermeture-sansAlcool"}
                                        value={cleanPrice(storageVal.prixMontant("fermeture", "sansAlcool"))}
                                        onChange={(e) => update.Montant(Number(e.target.value), "fermeture", "sansAlcool")}
                                        readOnly={true}
                                    />
                                </td>
                                <td>G</td>
                            </tr>
                            <tr key="difference">
                                <td>Difference $</td>
                                <td>
                                    <input
                                        type="number" step=".01"
                                        id={"difference-avecAlcool"}
                                        value={cleanPrice(difference("avecAlcool"))}
                                        onChange={(e) => update.Montant(Number(e.target.value), "difference", "avecAlcool")}
                                        readOnly={true}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number" step=".01"
                                        id={"difference-sansAlcool"}
                                        value={cleanPrice(difference("sansAlcool"))}
                                        onChange={(e) => update.Montant(Number(e.target.value), "difference", "sansAlcool")}
                                        readOnly={true}
                                    />
                                </td>
                                <td>H</td>
                            </tr>

                            {/* {
                                Object.entries(montantList || {}).map(([key, value]) => (
                                    <tr key={key}>
                                        <td>{value.name}</td>
                                        <td>
                                            <input
                                                type="number" step=".01"
                                                id={`${key}-sansAlcool`}
                                                value={cleanPrice(storage?.montant?.[key]?.quantite.sansAlcool)}
                                                onChange={(e) => update.Montant(Number(e.target.value), key, "sansAlcool")}
                                                readOnly={value.manual ? false : true}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number" step=".01"
                                                id={`${key}-avecAlcool`}
                                                value={cleanPrice(storage?.montant?.[key]?.quantite.avecAlcool)}
                                                onChange={(e) => update.Montant(Number(e.target.value), key, "avecAlcool")}
                                                readOnly={value.manual ? false : true}
                                            />
                                        </td>
                                        <td>{value.identifier}</td>
                                    </tr>
                                ))
                                // Object.entries(montantList || {}).forEach(([key, value]) => {
                                    

                                // })
                            } */}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ResultatsSection;
