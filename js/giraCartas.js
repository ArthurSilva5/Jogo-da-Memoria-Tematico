const cartas = document.querySelectorAll('.card');
for (let i = 0; i < cartas.length; i++) {
  const cartaSelecionada = cartas[i];
  // Ao clicar na carta, chama uma função
  cartaSelecionada.addEventListener('click', function() {
    cartaSelecionada.classList.add('giro-animacao');
    setTimeout(() => cartaSelecionada.classList.remove('giro-animacao'), 1000)
  })
}
