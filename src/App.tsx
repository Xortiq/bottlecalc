import { useEffect, useState } from 'react'
import Header from './components/Header.jsx';
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
      // if (value < 0) {
      //   // setStorage((prevStorage: any) => {
      //   //   const boitesObj = prevStorage[type][size].boites as any;
      //   //   const { [boites_size]: _, ...remainingBoites } = boitesObj;
      //   //   return {
      //   //     ...prevStorage,
      //   //     [type]: {
      //   //       ...prevStorage[type],
      //   //       [size]: {
      //   //         ...prevStorage[type][size],
      //   //         boites: remainingBoites
      //   //       }
      //   //     }
      //   //   };
      //   // });
      //   return;
      // }
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
    }
  };

  const [alcoolStatus, setAlcoolStatus] = useState(true);

  // useEffect(() => {
  //   if (typeof document.getElementById("root") == "object") {
  //     document.body.setAttribute('data-bs-theme', document.getElementById("root").getAttribute('data-bs-theme') === 'light' ? 'light' : 'dark')
  //     document.getElementById("root").removeAttribute('data-bs-theme')
  //   }
  // }, [])
  const [colorTheme, setColorTheme] = useState(document.body.getAttribute('data-bs-theme') === 'light' ? 'light' : 'dark');


  const [storage, setStorage] = useState(() => session.load());


  useEffect(() => {
    session.save(storage);
  }, [storage]);

  const buttonHandler = {
    increment: (e:any) => {
      e.preventDefault();
      const id = e.target.getAttribute('data-target-id'); 
      const field = (document.getElementById(id) as HTMLInputElement);
      console.log(field.nodeName);
      if (field.nodeName == "INPUT") {
        const currentValue = Number(field.value) || 0;
        field.value = String(currentValue + 1);
      }
    },
    decrement: (e:any) => {
      e.preventDefault();
      const id = e.target.getAttribute('data-target-id'); 
      const field = (document.getElementById(id) as HTMLInputElement);
      console.log(field.nodeName);
      if (field.nodeName == "INPUT") {
        const currentValue = Number(field.value) || 0;
        field.value = String(currentValue - 1);
      }
    },
    submit: (e:any) => {
      e.preventDefault();
      const id = e.target.getAttribute('data-target-id');
      const field = (document.getElementById(id) as HTMLInputElement);
      if (field.nodeName == "INPUT") {
        if (Number(field.value) == 0) return
        console.log(field.nodeName);
        // trigger a submit event on field
        field.dispatchEvent(new Event('submit', { bubbles: true }));
        field.value = '';
      }

    } 
  }

  return (
    <>
      <div className="container container-wrapper">
        <Header alcoolStatus={alcoolStatus} setAlcoolStatus={setAlcoolStatus} />
        <main>
          <AlcoolSection
            alcoolStatus={alcoolStatus}
            storage={storage}
            update={update}
            buttonHandler={buttonHandler}
            />
          <hr />
          <AutresSection
            alcoolStatus={alcoolStatus}
            storage={storage}
            update={update}
            buttonHandler={buttonHandler}
          />
        </main>
      </div>
      <div className='dark-mode-toggle'>
        <button className="btn" onClick={() => {
          const newTheme = colorTheme === 'light' ? 'dark' : 'light';
          setColorTheme(newTheme);
          document.body.setAttribute('data-bs-theme', newTheme)

        }}>
          Toggle Dark Mode
        </button>
      </div>
      {/* <button className="btn" onClick={()=>session.clear()}>Reset</button> */}
    </>
  )
}

export default App
