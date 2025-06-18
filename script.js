// Funções de conversão de unidades
function converterUnidade(valor, de, para) {
  if (de === 'kcal' && para === 'kJ') {
    return valor * 4.186;
  }
  if (de === 'g' && para === 'kg') {
    return valor / 1000;
  }
  if (de === 'psi' && para === 'kPa') {
    // Fator exato: 1 psi ≈ 6.89 kPa
    return valor * 6.89476;
  }
  throw new Error(`Conversão de ${de} para ${para} não implementada.`);
}

// Função de cálculo de calor sensível: Q = m · c · (T₂ – T₁)
function calcularCalorSensivel(massa, ce, t1, t2) {
  return massa * ce * (t2 - t1);
}

// Eventos no DOM
document.getElementById('btn-converter').addEventListener('click', () => {
  const valor   = parseFloat(document.getElementById('input-value').value);
  const de      = document.getElementById('input-unit').value;
  let   para;

  // Define unidade de saída com base na opção selecionada
  if (de === 'kcal') para = 'kJ';
  if (de === 'g')    para = 'kg';
  if (de === 'psi')  para = 'kPa';

  try {
    const resultadoBruto = converterUnidade(valor, de, para);
    // Formatação: 1 decimal para pressão, 3 decimais para as demais
    const casas = (para === 'kPa') ? 1 : 3;
    const resultado = resultadoBruto.toFixed(casas);
    document.getElementById('resultado-conversao')
      .textContent = `${valor} ${de} = ${resultado} ${para}`;
  } catch (err) {
    document.getElementById('resultado-conversao')
      .textContent = err.message;
  }
});

document.getElementById('btn-calcular').addEventListener('click', () => {
  const m  = parseFloat(document.getElementById('massa').value);
  const c  = parseFloat(document.getElementById('calor-especifico').value);
  const t1 = parseFloat(document.getElementById('t-inicial').value);
  const t2 = parseFloat(document.getElementById('t-final').value);
  const q  = calcularCalorSensivel(m, c, t1, t2).toFixed(1);
  document.getElementById('resultado-calor')
    .textContent = `Qₛ = ${q} kJ`;
});
