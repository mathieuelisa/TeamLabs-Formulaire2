import { useState } from "react";
import "./App.scss";
import Header from "./Components/Header";

import { db } from "./firebase"

function App() {
  const [messageSubmitted, setMessageSubmitted] = useState(false)
  const [state, setState] = useState({
    menuApprecie : "",
    platsAppecie : "",
    platsVoyage: "",
    aAmeliorer: "",
    voyageEnAsie : ""
  })



  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  function submit(e) {
    e.preventDefault();
    
    db.collection("contacts").add({
      menuApprecie: state.menuApprecie,
      platsAppecie : state.platsAppecie,
      platsVoyage: state.platsVoyage,
      aAmeliorer: state.aAmeliorer,
      voyageEnAsie : state.voyageEnAsie
    }).then(()=>{
      setMessageSubmitted(true)
    }).catch((err)=>{
      alert(err.message)
    })
  }

  console.log(state)

  return (
    <div className="App">
      <Header />

      {messageSubmitted ? 
      <div className="messageAfterSubmitted__container">
        <div className="messageAfterSubmitted__container-text">
            <h1 className="messageAfterSubmitted__container-thanks">Un grand merci 	&#10084;</h1>
            <p className="messageAfterSubmitted__container-mainText">Ton retour me permettra d'ameliorer si besoin cette experience pour les futurs participants ou pour toi même 
            car ça serai un plaisir de te revoir.
            </p>

            <p className="messageAfterSubmitted__container-mainText">Pour te remercier je t'offre <strong id="reduc">10%</strong> sur ta prochaine venue, valable <strong id="reduc">6 mois</strong> et <strong id="reduc">10%</strong> sur les personnes qui t'accompagneront</p>

            <p className="messageAfterSubmitted__container-mainText-code">Voici ton code: <strong id="code">CHLABS10</strong></p>
        </div>
      </div> : 
      <> 
        <div className="text__container">
          <h3 className="text__container-first">
            Ca y est tu fais partie des membres élites de Chill labs, félicitation
            🏆 !!
          </h3>

            <ol className="text__container-second">
            Cela signifie que:
              <li>
                Tu n'auras plus besoin d'un parrain / marraine pour participer aux
                events.
              </li>
              <li>
                Tu es un parrain / marraine, tu as donc la possibilité d'inviter
                ou recommander ton entourage aux futurs events.
              </li>
            </ol>


          <h4 className="text__container-third">
            Peut-on revenir rapidement sur ton expérience ?{" "}
          </h4>
        </div>

        <form className="formulaire">
          <div className="formulaire-inputs">
            <label className="form__input-label">
              As-tu apprecié le menu qui t'a été proposé ?
              <div className="form__input">
                <textarea
                  className="form__input-firstQuestion"
                  type="text"
                  name="menuApprecie"
                  onChange={handleChange}
                />
              </div>
            </label>

            <label className="form__input-label">
              Quel(s) plat(s) as-tu le plus apprecié ?
              <div className="form__input">
                <textarea
                  className="form__input-secondQuestion"
                  type="text"
                  name="platsAppecie"
                  onChange={handleChange}
                />
              </div>
            </label>

            <label className="form__input-label">
              Quel(s) plat(s) t'as vraiment fait voyager ?
              <div className="form__input">
                <textarea
                  className="form__input-thirdQuestion"
                  type="text"
                  name="platsVoyage"
                  onChange={handleChange}
                />
              </div>
            </label>

            <label className="form__input-label">
              Qu'est ce que tu aimerais améliorer ?
              <div className="form__input">
                <textarea
                  className="form__input-fourthQuestion"
                  type="text"
                  name="aAmeliorer"
                />
              </div>
            </label>

            <label className="form__input-label">
              Considères- tu que tu as voyagé le temps d'un repas en Asie ?
              <div className="form__input">
                <textarea
                  className="form__input-fifthQuestion"
                  type="text"
                  name="voyageEnAsie"
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>
        
            <div className="form__input-button">
              <button onClick={submit} className="form__input-button-validate"> VALIDE </button>
            </div>

        </form>
      </>
      
      }

    </div>
  );
}

export default App;
