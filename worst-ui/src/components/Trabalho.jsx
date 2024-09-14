import React, { useState, useEffect } from "react";

// Função para converter texto em emojis
const converterParaEmoji = (letra) => {
  const emojiMap = {
    a: "🍎",
    b: "🍌",
    c: "🌈",
    d: "🐶",
    e: "🐘",
    f: "🐸",
    g: "🍇",
    h: "🏠",
    i: "🍦",
    j: "🍏",
    k: "🔑",
    l: "🦁",
    m: "🍉",
    n: "🌙",
    o: "🍊",
    p: "🍕",
    q: "👑",
    r: "🌹",
    s: "🐍",
    t: "🌴",
    u: "☂️",
    v: "🌋",
    w: "🍉",
    x: "❌",
    y: "🧸",
    z: "⚡",
  };
  return emojiMap[letra.toLowerCase()] || letra;
};

// Lista de informações irrelevantes
const informacoesIrrelevantes = [
  "Sabia que o ornitorrinco é um dos poucos mamíferos que põe ovos?",
  "A água-viva Turritopsis dohrnii é tecnicamente imortal.",
  "O maior deserto do mundo não é o Saara, é a Antártida.",
  "O barulho que fazemos ao estalar os dedos vem da liberação de bolhas de ar nas juntas.",
  "O nome científico do gorila é Gorilla gorilla.",
  "As bananas são naturalmente radioativas.",
  "A Terra não é uma esfera perfeita, mas um geoide.",
  "Se você gritar por 8 anos, 7 meses e 6 dias, terá produzido energia suficiente para aquecer uma xícara de café.",
  "A Coca-Cola seria verde se o corante não fosse adicionado.",
  "Em média, uma pessoa caminha o equivalente a três vezes ao redor do mundo durante a vida.",
];

const ChaoticGuessingGame = () => {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [randomNumber, setRandomNumber] = useState(null);
  const [formVisible, setFormVisible] = useState(true);
  const [buttonHidden, setButtonHidden] = useState(false);
  const [informacao, setInformacao] = useState("");
  const [formularioAtivo, setFormularioAtivo] = useState(true);
  const [reclamacao, setReclamacao] = useState("");
  const [nome, setNome] = useState("");
  const [botaoPula, setBotaoPula] = useState(false);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 10));
  }, []);

  const checkGuess = (e) => {
    e.preventDefault();
    const randomResponse = Math.random();
    if (randomResponse < 0.3) {
      setMessage("Muito longe! Tente novamente!");
    } else if (randomResponse < 0.6) {
      setMessage("Quase... mas não! Tente mais uma vez!");
    } else {
      setMessage("Errado, como sempre! Tente outra vez!");
    }
    setGuess("");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFormVisible(!formVisible);
    }, 7000);
    return () => clearInterval(interval);
  }, [formVisible]);

  const hideButton = (e) => {
    e.preventDefault();
    setButtonHidden(true);
    const infoAleatoria =
      informacoesIrrelevantes[
        Math.floor(Math.random() * informacoesIrrelevantes.length)
      ];
    setInformacao(infoAleatoria);
    setTimeout(() => setButtonHidden(false), 4000);
  };

  useEffect(() => {
    if (buttonHidden === false && informacao) {
      const novaInformacao =
        informacoesIrrelevantes[
          Math.floor(Math.random() * informacoesIrrelevantes.length)
        ];
      setInformacao(novaInformacao);
    }
  }, [buttonHidden]);

  const handleNomeChange = (e) => {
    const nomeDigitado = e.target.value;
    const nomeComEmoji = nomeDigitado
      .split("")
      .map((letra) => converterParaEmoji(letra))
      .join("");
    setNome(nomeComEmoji);
  };

  const handleSubmitFormulario = (e) => {
    e.preventDefault();
    setReclamacao(
      "Reclamação: Por que você digitou isso? Formulário inválido!"
    );
    setFormularioAtivo(false);
  };

  const moverBotao = () => {
    setBotaoPula(true);
    setTimeout(() => setBotaoPula(false), 1000);
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        backgroundColor: "#ffcc00",
        color: "#000",
        fontFamily: "Comic Sans MS",
        overflowX: "hidden",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          color: "#ff00ff",
          textShadow: "2px 2px 5px lime",
          marginBottom: "50px",
          animation: "blink 1s infinite alternate",
        }}
      >
        Jogo de Adivinhação... ou Não!
      </h1>

      {formVisible ? (
        <form
          onSubmit={checkGuess}
          style={{
            marginBottom: "30px",
            animation: "shake 0.5s infinite alternate",
          }}
        >
          <label
            htmlFor="guess"
            style={{
              fontSize: "20px",
              color: "#0000ff",
              backgroundColor: "#ffff00",
              padding: "10px",
              border: "3px solid red",
              display: "block",
              marginBottom: "10px",
            }}
          >
            Tente adivinhar o número (de 0 a 10):
          </label>
          <input
            type="number"
            id="guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Digite seu palpite"
            style={{
              padding: "10px",
              fontSize: "18px",
              backgroundColor: "lightblue",
              border: "2px solid purple",
              marginBottom: "20px",
            }}
          />
          <div>
            <button
              onMouseEnter={hideButton}
              type="submit"
              style={{
                backgroundColor: "#ff3333",
                color: "white",
                fontSize: "20px",
                padding: "15px 30px",
                cursor: "pointer",
                border: "5px solid green",
                visibility: buttonHidden ? "hidden" : "visible",
              }}
            >
              Enviar Palpite (Não vai acertar)
            </button>

            <button
              onClick={() => setGuess("")}
              style={{
                backgroundColor: "#33ff33",
                color: "black",
                fontSize: "20px",
                padding: "15px 30px",
                marginLeft: "20px",
                cursor: "pointer",
                border: "5px solid purple",
              }}
            >
              Limpar (Ou não)
            </button>
          </div>
        </form>
      ) : (
        <p
          style={{
            fontSize: "25px",
            color: "#ff0000",
          }}
        >
          O formulário desapareceu! Espere um pouco...
        </p>
      )}

      {formularioAtivo ? (
        <div style={{ marginTop: "30px" }}>
          <h2>Envie algo inútil aqui!</h2>
          <form onSubmit={handleSubmitFormulario}>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={handleNomeChange}
              style={{
                padding: "10px",
                fontSize: "18px",
                border: "2px solid red",
                marginBottom: "10px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#ff6666",
                color: "#fff",
                cursor: "pointer",
                border: "3px solid blue",
                position: botaoPula ? "absolute" : "static",
                left: botaoPula ? `${Math.random() * 80}%` : "auto",
                top: botaoPula ? `${Math.random() * 80}%` : "auto",
                transition: "left 0.5s, top 0.5s",
              }}
              onMouseEnter={moverBotao}
            >
              Enviar (vai dar errado)
            </button>
          </form>
        </div>
      ) : (
        <p style={{ color: "red", fontSize: "20px", marginTop: "30px" }}>
          {reclamacao}
        </p>
      )}

      <div
        style={{
          backgroundColor: "#ff00ff",
          color: "#fff",
          padding: "20px",
          fontSize: "30px",
          marginTop: "20px",
          border: "5px solid lime",
          animation: "shake 0.5s infinite alternate",
        }}
      >
        {message}
      </div>

      <div
        style={{
          backgroundColor: "#00ffcc",
          color: "#fff",
          padding: "20px",
          fontSize: "30px",
          marginTop: "50px",
          border: "5px solid red",
          animation: "blink 1s infinite alternate",
        }}
      >
        O Número Correto é: {randomNumber} (Mas você nunca vai acertar!)
      </div>

      {informacao && (
        <div
          style={{
            backgroundColor: "#00ccff",
            color: "#fff",
            padding: "15px",
            fontSize: "25px",
            marginTop: "30px",
            border: "3px solid orange",
            animation: "shake 1s infinite alternate",
          }}
        >
          Informação Irrelevante: {informacao}
        </div>
      )}
    </div>
  );
};

export default ChaoticGuessingGame;
