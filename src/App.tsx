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
  
  const sumPrecise = (values: any): number => {
    if (values === undefined || values === null) return 0;
    if (typeof values === 'number') return values;
    if (typeof values === 'string') return Number(values) || 0;
    if (Array.isArray(values)) {
      return values.reduce((s: number, v: any) => s + (Number(v) || 0), 0);
    }
    if (typeof values === 'object') {
      return Object.values(values).reduce((s: number, v: any) => s + sumPrecise(v), 0);
    }
    return 0;
  };

  const storageVal = {
    verifyData: (size: any, type: any) => {
      // if (size !== 10 && size !== 25) return null;
      // if (type !== 'sansAlcool' && type !== 'avecAlcool') return null;
      return {
        bouteilleType: type,
        price: size,
      };
    },
    getAmount: (size: any, type: any) => {
      const data = storageVal.verifyData(size, type);
      // if (!data) return null;

      const liste = [];
      Object.entries(storage[data.bouteilleType][data.price].boites || {}).forEach(([boxsize, count]) => {
        if (data.bouteilleType == 'avecAlcool'&& size == 10 && boxsize == "24") return;
        const total = Number(boxsize) * sumPrecise(count)
        liste.push(total);
      });
      liste.push(sumPrecise(storage[data.bouteilleType][data.price].quantite));

      return sumPrecise(liste);
    },
    getPrice: (size: any, type: any) => {
      return storageVal.getAmount(size, type) * (size === 10 ? 0.10 : 0.25);
    },

    sansAlcool: (size: any) => {
      return storageVal.getAmount(size, 'sansAlcool');
    },
    prixSansAlcool: (size: any) => {
      return storageVal.getPrice(size, 'sansAlcool');
    },
    avecAlcool: (size: any) => {
      return storageVal.getAmount(size, 'avecAlcool');
    },
    prixAvecAlcool: (size: any) => {
      return storageVal.getPrice(size, 'avecAlcool');
    },

    caisse24: () => {
      const caisse = storage['avecAlcool']['10'].boites[24] || {};
      const etage = storage['autres']['etage'] || {};
      return sumPrecise(caisse) + sumPrecise(etage) * 12;
    },
    prixCaisse24: () => {
      return storageVal.caisse24() * 2.40;
    },

    bouteilles18L: () => {
      const bouteilles18L = storage['autres']['bouteilles18L'] || {};
      return sumPrecise(bouteilles18L)
    },
    prixBouteilles18L: () => {
      return storageVal.bouteilles18L() * 10;
    },

    palette: () => {
      const palette = storage['autres']['palette'] || {};
      return sumPrecise(palette)
    },
    prixPalette: () => {
      return storageVal.palette() * 201.60;
    },

    gobbeuse: (type: any) => {
      // accept string keys but guard and use any cast to avoid TS index errors
      const gb = storage['autres'] && storage['autres']['gobbeuse'] ? storage['autres']['gobbeuse'] as any : {};
      const gobbeuse = gb[type] || {};
      return sumPrecise(gobbeuse);
    },
    prixGobbeuse: (type: string) => {
      const priceListe: Record<string, number> = {
        ecraser: 60,
        canettes: 24,
        bouteilles: 6,
      };
      const qty = storageVal.gobbeuse(type) || 0;
      const price = priceListe[type] ?? 0;
      return qty * price;
    },

    prixMontant:(name: any, type: any)=>{
      // if (name !== 'ouverture' && name !== 'caisses' && name !== 'reception' && name !== 'fermeture') return null;
      // if (type !== 'sansAlcool' && type !== 'avecAlcool') return null;
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
