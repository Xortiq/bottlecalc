
function Rows(props) {
    const storage = props.storage;
    const update = props.update;
    const key = props.key;
    const value = props.value;
    const isManuel = value.manual ? false : true

    return (
        <>
            <tr key={key}>
                <td>{value.name}</td>
                <td>
                    <input
                        type="number" step=".01"
                        id={`${key}-sansAlcool`}
                        placeholder={storage?.montant.ouverture.quantite.sansAlcool}
                        onChange={(e) => update.Montant(Number(e.target.value), "ouverture", "sansAlcool")}
                        readOnly={isManuel}
                        />
                </td>
                <td>{value.sansAlcool}</td>
                <td>{value.identifier}</td>
            </tr>
        </>
    )
}

export default Rows;
