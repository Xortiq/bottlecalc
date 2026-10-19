import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import ResultatsSection from './components/view/ResultatsSection.jsx';
import AutresSection from './components/view/AutresSection.jsx';
import AlcoolSection from './components/view/AlcoolSection.jsx';
import 'bootstrap/dist/css/bootstrap.css';
// import './bootstrap/css/bootstrap.min.css'
// import './bootstrap/js/bootstrap.bundle.min.js'
import './App.css'

function App() {
  const session = {
    initState: {
      sansAlcool: {
        10: {
          quantite: [],
          boites: {
            12: [],
            24: []
          }
        },
        25: {
          quantite: [],
          boites: {
            12: [],
            24: []
          }
        }
      },
      avecAlcool: {
        10: {
          quantite: [],
          boites: {
            12: [],
            24: []
          }
        },
        25: {
          quantite: [],
          boites: {
            12: [],
            24: []
          }
        }
      },
      autres: {
        bouteilles18L: [],
        palette: [],
        etage: [],
        gobbeuse: {
          ecraser: [],
          canettes: [],
          bouteilles: []
        }
      },
      montant: {
        ouverture: {
          manual: true,
          name: "Iventaire d'ouverture",
          identifier: "C",
          quantite: {
            avecAlcool: "",
            sansAlcool: ""
          }
        },
        caisses: {
          manual: true,
          name: "(-) Retour bouteilles aux caisses",
          identifier: "D",
          quantite: {
            avecAlcool: "",
            sansAlcool: ""
          }
        },
        reception: {
          manual: true,
          name: "(+) Retour bouteilles à la reception",
          identifier: "E",
          quantite: {
            avecAlcool: "",
            sansAlcool: ""
          }
        },
        sousTotal: {
          manual: false,
          name: "Sous total",
          identifier: "F",
          quantite: {
            avecAlcool: "",
            sansAlcool: ""
          }
        },
        fermeture: {
          manual: false,
          name: "Inventaire de fermeture (A & B)",
          identifier: "G",
          quantite: {
            avecAlcool: "",
            sansAlcool: ""
          }
        },
        difference: {
          manual: false,
          name: "Difference $",
          identifier: "H",
          quantite: {
            avecAlcool: "",
            sansAlcool: ""
          }
        }
      }
    },
    name: "calStorage",
    durationDays: 7,
    save: (value: any) => {
      const payload = { ts: Date.now(), v: value };
      try {
        window.sessionStorage.setItem(session.name, JSON.stringify(payload));
      } catch (e) {
        // ignore storage errors
      }
    },
    load: () => {
      try {
        const raw = window.sessionStorage.getItem(session.name);
        if (!raw) return session.initState;
        const parsed = JSON.parse(raw);
        // If we saved with wrapper {ts, v}
        if (parsed && typeof parsed === 'object' && parsed.ts && parsed.v !== undefined) {
          const ageMs = Date.now() - parsed.ts;
          if (ageMs > (session.durationDays * 24 * 60 * 60 * 1000)) {
            window.sessionStorage.removeItem(session.name);
            return session.initState;
          }
          return parsed.v;
        }
        // older format: assume parsed is the state object
        return parsed;
      } catch (e) {
        return session.initState;
      }
    },
    clear: () => {
      console.log('reseting')
      try { window.sessionStorage.removeItem(session.name); window.location.reload() } catch { }

    }
  }
  const update = {
    Bouteilles: (type: 'sansAlcool' | 'avecAlcool', size: 10 | 25, value: number) => {
      setStorage((prevStorage: any) => ({
        ...prevStorage,
        [type]: {
          ...prevStorage[type],
          [size]: {
            ...prevStorage[type][size],
            quantite: prevStorage[type][size].quantite ? [...prevStorage[type][size].quantite, value] : [value]
          }
        }
      }));
    },
    Boites: (type: 'sansAlcool' | 'avecAlcool', size: 10 | 25, boites_size: number, value: number) => {
      setStorage((prevStorage: any) => (
        {
          ...prevStorage,
          [type]: {
            ...prevStorage[type],
            [size]: {
              ...prevStorage[type][size],
              boites: {
                ...prevStorage[type][size].boites,
                [boites_size]: prevStorage[type][size].boites[boites_size] ? [...prevStorage[type][size].boites[boites_size], value] : [value]
              }
            }
          }
        }
      ));
    },
    Gobbeuse: (value: number, type: 'ecraser' | 'canettes' | 'bouteilles') => {
      setStorage((prevStorage: any) => ({
        ...prevStorage,
        autres: {
          ...prevStorage.autres,
          gobbeuse: {
            ...prevStorage.autres.gobbeuse,
            [type]: prevStorage.autres.gobbeuse[type] ? [...prevStorage.autres.gobbeuse[type], value] : [value]
          }
        }
      }));
    },
    Palette: (value: number) => {
      setStorage((prevStorage: any) => ({
        ...prevStorage,
        autres: {
          ...prevStorage.autres,
          palette: prevStorage.autres.palette ? [...prevStorage.autres.palette, value] : [value]
        }
      }));
    },
    Etage: (value: number) => {
      setStorage((prevStorage: any) => ({
        ...prevStorage,
        autres: {
          ...prevStorage.autres,
          etage: prevStorage.autres.etage ? [...prevStorage.autres.etage, value] : [value]
        }
      }));
    },
    Bouteilles18L: (value: number) => {
      setStorage((prevStorage: any) => ({
        ...prevStorage,
        autres: {
          ...prevStorage.autres,
          bouteilles18L: prevStorage.autres.bouteilles18L ? [...prevStorage.autres.bouteilles18L, value] : [value]
        }
      }));
    },
    Montant: (value: number, source: 'ouverture' | 'caisses' | 'reception' | 'fermeture', type: 'sansAlcool' | 'avecAlcool') => {
      // console.log(value, Number(value)),
      setStorage((prevStorage: any) => ({
        ...prevStorage,
        montant: {
          ...prevStorage.montant,
          [source]: {
            ...prevStorage.montant[source],
            quantite: {
              ...prevStorage.montant[source].quantite,
              [type]: value
            }
          }
        }
      }));
    },
  };
  
  const [colorTheme, setColorTheme] = useState(document.body.getAttribute('data-bs-theme') === 'light' ? 'light' : 'dark');


  const [storage, setStorage] = useState(() => session.load());


  useEffect(() => {
    session.save(storage);
  }, [storage]);

  const buttonHandler = {
    increment: (e: any) => {
      e.preventDefault();
      const id = e.target.getAttribute('data-target-id');
      const field = (document.getElementById(id) as HTMLInputElement);
      if (field.nodeName == "INPUT") {
        const currentValue = Number(field.value) || 0;
        field.value = String(currentValue + 1);
      }
    },
    decrement: (e: any) => {
      e.preventDefault();
      const id = e.target.getAttribute('data-target-id');
      const field = (document.getElementById(id) as HTMLInputElement);
      if (field.nodeName == "INPUT") {
        const currentValue = Number(field.value) || 0;
        field.value = String(currentValue - 1);
      }
    },
    submit: (e: any) => {
      e.preventDefault();
      const id = e.target.getAttribute('data-target-id');
      const field = (document.getElementById(id) as HTMLInputElement);
      if (field.nodeName == "INPUT") {
        if (Number(field.value) == 0) return
        // trigger a submit event on field
        field.dispatchEvent(new Event('submit', { bubbles: true }));
        field.value = '';
      }

    }
  }
  
  const storageVal = {
    verifyData: (size, type) => {
      if (size !== 10 && size !== 25) return null;
      if (type !== 'sansAlcool' && type !== 'avecAlcool') return null;
      return {
        bouteilleType: type,
        price: size,
      };
    },
    getAmount: (size, type) => {
      const data = storageVal.verifyData(size, type);
      if (!data) return null;

      const liste = [];
      Object.entries(storage[data.bouteilleType][data.price].boites || {}).forEach(([boxsize, count]) => {
        if (data.bouteilleType == 'avecAlcool'&& size == 10 && boxsize == "24") return;
        const total = boxsize * Math.sumPrecise(count)
        liste.push(total);
      });
      liste.push(Math.sumPrecise(storage[data.bouteilleType][data.price].quantite));

      return Math.sumPrecise(liste);
    },
    getPrice: (size, type) => {
      return storageVal.getAmount(size, type) * (size === 10 ? 0.10 : 0.25);
    },

    sansAlcool: (size) => {
      return storageVal.getAmount(size, 'sansAlcool');
    },
    prixSansAlcool: (size) => {
      return storageVal.getPrice(size, 'sansAlcool');
    },
    avecAlcool: (size) => {
      return storageVal.getAmount(size, 'avecAlcool');
    },
    prixAvecAlcool: (size) => {
      return storageVal.getPrice(size, 'avecAlcool');
    },

    caisse24: () => {
      const caisse = storage['avecAlcool']['10'].boites[24] || {};
      const etage = storage['autres']['etage'] || {};
      return Math.sumPrecise(caisse) + Math.sumPrecise(etage) * 12;
    },
    prixCaisse24: () => {
      return storageVal.caisse24() * 2.40;
    },

    bouteilles18L: () => {
      const bouteilles18L = storage['autres']['bouteilles18L'] || {};
      return Math.sumPrecise(bouteilles18L)
    },
    prixBouteilles18L: () => {
      return storageVal.bouteilles18L() * 10;
    },

    palette: () => {
      const palette = storage['autres']['palette'] || {};
      return Math.sumPrecise(palette)
    },
    prixPalette: () => {
      return storageVal.palette() * 201.60;
    },

    gobbeuse: (type) => {
      if (type !== 'ecraser' && type !== 'canettes' && type !== 'bouteilles') return null;
      const gobbeuse = storage['autres']['gobbeuse'][type] || {};
      return Math.sumPrecise(gobbeuse)
    },
    prixGobbeuse: (type) => {
      if (type !== 'ecraser' && type !== 'canettes' && type !== 'bouteilles') return null;
      const priceListe = {
        ecraser: 60,
        canettes: 24,
        bouteilles: 6,
      }
      return storageVal.gobbeuse(type) * priceListe[type];
    },

    prixMontant:(name, type)=>{
      if (name !== 'ouverture' && name !== 'caisses' && name !== 'reception' && name !== 'fermeture') return null;
      if (type !== 'sansAlcool' && type !== 'avecAlcool') return null;
      return storage.montant[name].quantite[type]
    }
  };

  const Navigation = [
    {
      name: "Avec Alcool",
      path: "/avec-alcool",
      element: AvecAlcool(),
    },
    {
      name: "Sans Alcool",
      path: "/sans-alcool",
      element: SansAlcool(),
    },
    {
      name: "Autres",
      path: "/autres",
      element: Autres(),
    },
    {
      name: "Resultats",
      path: "/resultats",
      element: Resultats(),
    }
  ]

  function AvecAlcool() {
    return <AlcoolSection
      alcoolStatus={true}
      storage={storage}
      update={update}
      buttonHandler={buttonHandler}
    />;
  }

  function SansAlcool() {
    return <AlcoolSection
      alcoolStatus={false}
      storage={storage}
      update={update}
      buttonHandler={buttonHandler}
    />;
  }

  function Autres() {
    return <AutresSection
      storage={storage}
      update={update}
      buttonHandler={buttonHandler}
    />;
  }
  function Resultats() {
    return <ResultatsSection
      storage={storage}
      update={update}
      storageVal={storageVal}
    />;
  }


  return (
    <>
      <BrowserRouter>

        <div className="container container-wrapper">
          <Header Navigation={Navigation} />
          <main>
            {/* Routes */}
            <Routes>
              {Navigation.map((navItem, index) => {
                return (
                  <Route key={index} path={navItem.path} element={navItem.element} />
                );
              })}
              {/* <Route path="/avec-alcool" element={<AvecAlcool />} />
              <Route path="/sans-alcool" element={<SansAlcool />} />
              <Route path="/autres" element={<Autres />} /> */}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <div className='dark-mode-toggle'>
        <button className="btn" onClick={() => {
          const newTheme = colorTheme === 'light' ? 'dark' : 'light';
          setColorTheme(newTheme);
          document.body.setAttribute('data-bs-theme', newTheme)

        }}>
          Toggle Dark Mode
        </button>
      </div>
      {/* <button className="btn" onClick={() => session.clear()}>Reset</button> */}
    </>
  )
}

export default App
