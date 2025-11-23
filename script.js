document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }

  const chatBox = document.getElementById("chatBox");
  const optionsContainer = document.getElementById("optionsContainer");

  const servicesInfo = {
    "análise": `
      <strong>O que é Análise?</strong><br>
      A Análise é um processo terapêutico profundo que busca compreender emoções,
      comportamentos e padrões internos. Ideal para quem deseja se conhecer melhor,
      entender suas dores emocionais e promover mudanças reais na vida.  
      <br><br><strong>Valor:</strong> R$ 120  
      <br><strong>Duração:</strong> 50 minutos
    `,
    "terapia de casal": `
      <strong>O que é Terapia de Casal?</strong><br>
      A Terapia de Casal ajuda parceiros a reconstruírem a comunicação, fortalecerem
      o vínculo, resolverem conflitos e encontrarem um caminho mais leve para a relação.
      É um espaço seguro para diálogo e reconexão.  
      <br><br><strong>Valor:</strong> R$ 150  
      <br><strong>Duração:</strong> 50 minutos
    `,
    "psicanálise": `
      <strong>O que é Psicanálise?</strong><br>
      A Psicanálise trabalha o inconsciente — aquilo que sentimos, desejamos e tememos,
      mas nem sempre compreendemos. Ajuda a identificar padrões repetitivos e promover
      mudanças profundas e emocionais.  
      <br><br><strong>Valor:</strong> R$ 130  
      <br><strong>Duração:</strong> 50 minutos
    `,
    "psicopedagogia": `
      <strong>O que é Psicopedagogia?</strong><br>
      A Psicopedagogia auxilia no processo de aprendizagem, identificando dificuldades,
      bloqueios ou inseguranças que podem afetar o desempenho escolar, profissional ou
      emocional. Ajuda crianças, jovens e adultos.  
      <br><br><strong>Valor:</strong> R$ 110  
      <br><strong>Duração:</strong> 50 minutos
    `,
    "orientação parental": `
      <strong>O que é Orientação Parental?</strong><br>
      A Orientação Parental é um suporte para mães e pais lidarem melhor com comportamentos,
      emoções e necessidades dos filhos. Ajuda a criar estratégias mais leves e eficazes
      para o dia a dia familiar.  
      <br><br><strong>Valor:</strong> R$ 140  
      <br><strong>Duração:</strong> 50 minutos
    `,
    "avaliação emocional": `
      <strong>O que é Avaliação Emocional?</strong><br>
      A Avaliação Emocional é um mapeamento completo das emoções, traços e comportamentos.
      Permite identificar pontos de vulnerabilidade e potencial, ajudando no planejamento
      terapêutico ideal.  
      <br><br><strong>Valor:</strong> R$ 160  
      <br><strong>Duração:</strong> 50 minutos
    `
  };

  function addBotMessage(text) {
    const typing = document.createElement("div");
    typing.classList.add("message", "bot");
    typing.innerHTML = `
      <img src="alessa.png" class="avatar">
      <div class="bubble bot-bubble typing">Digitando...</div>
    `;
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      typing.querySelector(".bubble").innerHTML = text;
      typing.querySelector(".bubble").classList.remove("typing");
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1200); 
  }

  function addUserMessage(text) {
    chatBox.innerHTML += `
      <div class="message user">
        <div class="bubble user-bubble">${text}</div>
        <img src="user.png" class="avatar">
      </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function selectService(service) {
    addUserMessage(`Quero saber sobre ${service}.`);

    setTimeout(() => {
      addBotMessage(servicesInfo[service]);
      confirmService(service);
    }, 500);
  }

  function confirmService(service) {
    setTimeout(() => {
      addBotMessage(`Deseja agendar <strong>${service}</strong>?`);

      optionsContainer.innerHTML = `
        <button class="option-btn" data-service="${service}" data-action="finalizar">Sim, quero!</button>
        <button class="option-btn" data-action="reset">Quero ver outro serviço</button>
      `;
    }, 800);
  }

  function resetChat() {
    chatBox.innerHTML = `
      <div class="message bot">
        <img src="alessa.png" class="avatar">
        <div class="bubble bot-bubble typing">Olá! 😊 Eu sou o assistente da <strong>Alessa Fidalgo</strong>.<br><br>Sobre qual serviço você deseja saber mais?</div>
      </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      chatBox.querySelector(".bubble").classList.remove("typing");
    }, 1200);

    optionsContainer.innerHTML = `
      <button class="option-btn" data-service="análise" data-action="select">Análise</button>
      <button class="option-btn" data-service="terapia de casal" data-action="select">Terapia de Casal</button>
      <button class="option-btn" data-service="psicanálise" data-action="select">Psicanálise</button>
      <button class="option-btn" data-service="psicopedagogia" data-action="select">Psicopedagogia</button>
      <button class="option-btn" data-service="orientação parental" data-action="select">Orientação Parental</button>
      <button class="option-btn" data-service="avaliação emocional" data-action="select">Avaliação Emocional</button>
    `;
  }

  function finalizar(service) {
    addUserMessage("Sim, quero!");

    setTimeout(() => {
      addBotMessage("Perfeito! Vou te encaminhar para o WhatsApp da Alessa.");

      const mensagem = encodeURIComponent(
        `Olá! Gostaria de agendar uma sessão de ${service} com a Alessa Fidalgo.`
      );

      setTimeout(() => {
        window.open(`https://wa.me/5521992890612?text=${mensagem}`, "_blank");

        chatBox.innerHTML = `
          <div class="message bot">
            <img src="alessa.png" class="avatar">
            <div class="bubble bot-bubble">Chat encerrado. Obrigada pelo contato! 💛</div>
          </div>
        `;
        optionsContainer.innerHTML = "";
      }, 1500);
    }, 800);
  }

  optionsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".option-btn");
    if (!btn) return;

    const action = btn.dataset.action;
    const service = btn.dataset.service;

    if (action === "select") selectService(service);
    if (action === "reset") resetChat();
    if (action === "finalizar") finalizar(service);
  });
});
