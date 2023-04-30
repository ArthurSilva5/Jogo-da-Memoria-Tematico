// Cria uma lista com os pares de cada personagem
const personagens = ['benson', 'benson', 'cj', 'cj', 'eileen', 'eileen',  'fantasmão', 'fantasmão', 'margaret', 'margaret', 'mordecai', 'mordecai', 'musculoso', 'musculoso', 'pairulito', 'pairulito', 'rigby', 'rigby', 'saltitão', 'saltitão', ]

function embaralhaCartas(){
    // Essa pequena função embaralha as cartas baseado na posição;
    personagens.sort(() => Math.random() - 0.5);
    return(personagens)
}
const listaEmbaralhada = embaralhaCartas(personagens);

(function criaCartas(){
    // Cria a variável que irá abrigar as cartas
    const tabuleiro = document.querySelector('.cards');
    for(let i = 0; i <= 19; i++){
        // Criação das 20 cartas
        const card = document.createElement('div');
        card.classList.add('card');
        card.value = `${personagens[i]}`
        tabuleiro.appendChild(card);

        // Implementa a foto das cartas
        const img = document.createElement('img');
        img.src = `./assets/imagens/back.jpg`;
        img.classList.add('card-img');
        card.appendChild(img);
    }
})();


let acertos = 0;
const manipulaCartas = (() => {
    const listaDeEscolhas = [];
    const pares = [];
    // Seleciona todas as cartas
    const cartas = document.querySelectorAll('.card');
    for (let i = 0; i < cartas.length; i++) {
      // Cria uma variável para armazenar a posição da carta clicada
      const cartaSelecionada = cartas[i];
      // Ao clicar na carta, chama uma função
      cartaSelecionada.addEventListener('click', function () {
        // Cria uma lista com todas imagens e seleciona a que estiver na posição [i]
        const img = document.querySelectorAll('.card-img')[i];
        // Bloqueia a carta selecionada de ser clicada duas vezes seguidas
        cartaSelecionada.style.pointerEvents = 'none'; 
        // Armazena a carta selecionada
        listaDeEscolhas.push(cartaSelecionada);

        // Caso a lista de escolhas tenha 2 elementos:
        if(listaDeEscolhas.length === 2){
            // Cria pequena função para desabilitar as cartas
            cartas.forEach((carta) =>{
                carta.style.pointerEvents = 'none';
            })

            // Se os elementos escolhidos forem iguais:
            if(listaDeEscolhas[0].value === listaDeEscolhas[1].value){
                // Irá percorrer a lista de cartas
                cartas.forEach((carta) =>{
                    // Caso a propriedade value da carta seja igual a da carta selecionada 
                    if(carta.value === listaDeEscolhas[0].value){
                        carta.style.pointerEvents = 'none'; // Desabilita o clique
                        carta.style.borderColor = '#8cc41c'
                        acertos++; // Soma os acertos
                        pares.push(carta);

                        // Chama a função para verificar se o jogo acabou:
                        condicaoParaVencer()
                    }
                    // Este else reabilita os outros elementos que não foram selecionados para serem clicados.
                    else if(carta.value != listaDeEscolhas[0].value && pares.includes(carta) === false){
                        carta.style.pointerEvents = 'auto';
                    }
                })
                listaDeEscolhas.splice(0, 2); // Remove os elementos escolhidos
            }
            // Caso os elementos escolhidos sejam diferentes:
            else{
                // Cria uma função que recoloca a foto inicial nas cartas escolhidas após 1000ms
                setTimeout(function(){
                    listaDeEscolhas.forEach((escolha) => {
                        // Adiciona a animação de giro
                        escolha.classList.add('giro-animacao');
                        // Troca as fotos das imagens
                        escolha.firstElementChild.src = `./assets/imagens/back.jpg`;

                        setTimeout(() => escolha.classList.remove('giro-animacao'), 500)})
                    listaDeEscolhas.splice(0,2)

                // Cria pequena função para reabilitar as cartas
                cartas.forEach((carta) =>{
                    if(carta.firstElementChild.src.endsWith("back.jpg") === true){
                        // Caso a carta esteja virada
                        carta.style.pointerEvents = 'auto'; 
                    }
                    else{
                        // Caso ja tenha sido achada
                        carta.style.pointerEvents = 'none';
                    }
                    })
                }, 1300);
            }
        }           

        // Condições para trocar as cartas no click:
        // Caso a foto termine com back.jpg
        if (img.src.endsWith("back.jpg") === true){
            // Captura o personagem escolhido
            const personagem = cartaSelecionada.value;
            // Atualiza a carta para a foto do personagem
            img.src = `./assets/imagens/${personagem}.jpg`;
        }
      });
    }
})();

// Função do Timer
const tempo = document.querySelector('.cabecalho-timer');
let contador = 0;

// A cada 1 segundo, incrementará +1 no timer;
setInterval(() => {
  contador++;
  tempo.innerHTML = `Tempo: ${contador}`;
}, 1000);

function condicaoParaVencer(){
    // Condição para vencer o jogo;
    if(acertos === 20){
        setTimeout(() => {
            alert(`Você venceu! \n Tempo de jogo: ${contador} segundos`);
        }, 300);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
}