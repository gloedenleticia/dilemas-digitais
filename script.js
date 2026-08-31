/* =========================================================
   INTERNET SEGURA
   JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       CONTROLES DE ACESSIBILIDADE
       ----------------------------------------------------- */

    const aumentarFonte = document.getElementById("aumentarFonte");
    const diminuirFonte = document.getElementById("diminuirFonte");
    const altoContraste = document.getElementById("altoContraste");

    let tamanhoFonte = 18;

    aumentarFonte.addEventListener("click", () => {

        if (tamanhoFonte < 24) {
            tamanhoFonte += 1;

            document.documentElement.style.setProperty(
                "--fonte-base",
                `${tamanhoFonte}px`
            );
        }

    });

    diminuirFonte.addEventListener("click", () => {

        if (tamanhoFonte > 15) {
            tamanhoFonte -= 1;

            document.documentElement.style.setProperty(
                "--fonte-base",
                `${tamanhoFonte}px`
            );
        }

    });

    altoContraste.addEventListener("click", () => {

        document.body.classList.toggle("alto-contraste");

        const ativado =
            document.body.classList.contains("alto-contraste");

        altoContraste.setAttribute(
            "aria-pressed",
            ativado
        );

    });


    /* -----------------------------------------------------
       CHECKLIST
       ----------------------------------------------------- */

    const checkboxes =
        document.querySelectorAll(".checklist input");

    const progresso =
        document.getElementById("progressoChecklist");

    function atualizarChecklist() {

        let marcados = 0;

        checkboxes.forEach((checkbox) => {

            const label = checkbox.closest("label");

            if (checkbox.checked) {

                marcados++;

                label.classList.add("marcado");

            } else {

                label.classList.remove("marcado");

            }

        });

        progresso.textContent =
            `${marcados} de ${checkboxes.length} cuidados marcados`;

        if (marcados === checkboxes.length) {

            progresso.textContent =
                "🎉 Parabéns! Você marcou todos os cuidados!";

        }

    }

    checkboxes.forEach((checkbox) => {

        checkbox.addEventListener(
            "change",
            atualizarChecklist
        );

    });


    /* -----------------------------------------------------
       SELEÇÃO DAS ALTERNATIVAS DO QUIZ
       ----------------------------------------------------- */

    const opcoes =
        document.querySelectorAll(".opcao");

    opcoes.forEach((opcao) => {

        const radio = opcao.querySelector("input");

        radio.addEventListener("change", () => {

            const nome = radio.name;

            document
                .querySelectorAll(`input[name="${nome}"]`)
                .forEach((input) => {

                    input
                        .closest(".opcao")
                        .classList.remove("selecionada");

                });

            if (radio.checked) {
                opcao.classList.add("selecionada");
            }

        });

    });


    /* -----------------------------------------------------
       QUIZ
       ----------------------------------------------------- */

    const respostasCorretas = {
        q1: "2",
        q2: "1",
        q3: "2",
        q4: "2",
        q5: "1"
    };

    const explicacoes = {
        q1: {
            correta:
                "Mensagens com urgência e links inesperados devem ser verificadas por um canal oficial antes de qualquer ação."
        },

        q2: {
            correta:
                "Senhas fortes, diferentes e a autenticação em dois fatores ajudam a reduzir o risco de acesso indevido."
        },

        q3: {
            correta:
                "Códigos de autenticação são informações de segurança. Em caso de dúvida, desligue e procure o banco por um canal oficial."
        },

        q4: {
            correta:
                "Bloqueio de tela e atualizações ajudam a proteger o aparelho contra acessos indevidos e falhas conhecidas."
        },

        q5: {
            correta:
                "Uma mensagem pode ter sido enviada por alguém que teve a conta comprometida. Confirmar por outro meio reduz o risco de fraude."
        }
    };

    const corrigirQuiz =
        document.getElementById("corrigirQuiz");

    const resultadoQuiz =
        document.getElementById("resultadoQuiz");

    const refazerQuiz =
        document.getElementById("refazerQuiz");


    corrigirQuiz.addEventListener("click", () => {

        let pontos = 0;

        let respondidas = 0;

        Object.keys(respostasCorretas).forEach((pergunta) => {

            const selecionada =
                document.querySelector(
                    `input[name="${pergunta}"]:checked`
                );

            const todas =
                document.querySelectorAll(
                    `input[name="${pergunta}"]`
                );

            todas.forEach((input) => {

                const opcao =
                    input.closest(".opcao");

                opcao.classList.remove(
                    "resposta-correta",
                    "resposta-errada"
                );

                if (
                    input.value ===
                    respostasCorretas[pergunta]
                ) {
                    opcao.classList.add(
                        "resposta-correta"
                    );
                }

            });

            if (selecionada) {

                respondidas++;

                if (
                    selecionada.value ===
                    respostasCorretas[pergunta]
                ) {

                    pontos++;

                } else {

                    selecionada
                        .closest(".opcao")
                        .classList.add(
                            "resposta-errada"
                        );

                }

            }

        });


        if (respondidas < 5) {

            resultadoQuiz.innerHTML = `
                <h3>Quase lá!</h3>

                <p>
                    Você respondeu apenas
                    <strong>${respondidas} de 5</strong>
                    perguntas.
                </p>

                <p>
                    Responda todas as perguntas
                    para descobrir sua pontuação.
                </p>
            `;

            resultadoQuiz.classList.add("exibir");

            return;
        }


        let mensagem = "";

        if (pontos === 5) {

            mensagem =
                "Excelente! Você demonstrou ótimos conhecimentos sobre segurança na internet.";

        } else if (pontos >= 3) {

            mensagem =
                "Muito bem! Você já conhece vários cuidados importantes. Continue praticando.";

        } else {

            mensagem =
                "Você pode aprender mais! Revise as dicas desta página e tente novamente.";

        }


        resultadoQuiz.innerHTML = `
            <h3>Seu resultado</h3>

            <span class="pontuacao">
                ${pontos}/5
            </span>

            <p>
                ${mensagem}
            </p>

            <p>
                <strong>
                    Lembre-se:
                </strong>
                na dúvida, pare e verifique antes de clicar,
                pagar ou fornecer informações.
            </p>
        `;

        resultadoQuiz.classList.add("exibir");

        refazerQuiz.hidden = false;

        corrigirQuiz.disabled = true;

        resultadoQuiz.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });


    /* -----------------------------------------------------
       REFAZER QUIZ
       ----------------------------------------------------- */

    refazerQuiz.addEventListener("click", () => {

        document
            .querySelectorAll(".pergunta input")
            .forEach((input) => {

                input.checked = false;

                input
                    .closest(".opcao")
                    .classList.remove(
                        "selecionada",
                        "resposta-correta",
                        "resposta-errada"
                    );

            });

        resultadoQuiz.classList.remove("exibir");

        resultadoQuiz.innerHTML = "";

        refazerQuiz.hidden = true;

        corrigirQuiz.disabled = false;

        document
            .getElementById("quiz")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    });


    /* -----------------------------------------------------
       NAVEGAÇÃO SUAVE
       ----------------------------------------------------- */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const destino =
                    document.querySelector(
                        link.getAttribute("href")
                    );

                if (destino) {

                    event.preventDefault();

                    destino.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });

});
