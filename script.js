// Funções de conversão
function converterUnidade(valor, de, para) {
  if (de === 'kcal' && para === 'kJ') {
    return valor * 4.186;
  }
  if (de === 'g' && para === 'kg') {
    return valor / 1000;
  }
  if (de === 'psi' && para === 'kPa') {
    // Fator exato: 1 psi ≈ 6.89476 kPa
    return valor * 6.89476;
  }
  throw new Error(`Conversão de ${de} para ${para} não implementada.`);
}

// Função de calor sensível: Q = m · c · (T₂ – T₁)
function calcularCalorSensivel(massa, ce, t1, t2) {
  return massa * ce * (t2 - t1);
}

// Interação com o DOM
document.getElementById('btn-converter').addEventListener('click', () => {
  const valor = parseFloat(document.getElementById('input-value').value);
  const de = document.getElementById('input-unit').value;
  const para = document.getElementById('output-unit').value;
  try {
    const resultado = converterUnidade(valor, de, para).toFixed(3);
    document.getElementById('resultado-conversao')
      .textContent = `${valor} ${de} = ${resultado} ${para}`;
  } catch (err) {
    document.getElementById('resultado-conversao')
      .textContent = err.message;
  }
});

document.getElementById('btn-calcular').addEventListener('click', () => {
  const m = parseFloat(document.getElementById('massa').value);
  const c = parseFloat(document.getElementById('calor-especifico').value);
  const t1 = parseFloat(document.getElementById('t-inicial').value);
  const t2 = parseFloat(document.getElementById('t-final').value);
  const q = calcularCalorSensivel(m, c, t1, t2).toFixed(1);
  document.getElementById('resultado-calor')
    .textContent = `Qₛ = ${q} kJ`;
});
