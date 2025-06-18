// Funções de conversão de unidades
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

// Função de cálculo de calor sensível: Q = m · c · (T₂ – T₁)
function calcularCalorSensivel(massa, ce, t1, t2) {
  return massa * ce * (t2 - t1);
}

// Eventos no DOM
document.getElementById('btn-converter').addEventListener('click', () => {
  const rawValor = document.getElementById('input-value').value;
  const valor = parseFloat(rawValor.replace(',', '.'));
  const de = document.getElementById('input-unit').value;
  let para;
  if (de === 'kcal') para = 'kJ';
  if (de === 'g')    para = 'kg';
  if (de === 'psi')  para = 'kPa';

  try {
    const resultadoBruto = converterUnidade(valor, de, para);
    const casas = (para === 'kPa') ? 1 : 3;
    const resultado = resultadoBruto.toFixed(casas).replace('.', ',');
    document.getElementById('resultado-conversao')
      .textContent = `${rawValor.replace('.', ',')} ${de} = ${resultado} ${para}`;
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
  const qBruto = calcularCalorSensivel(m, c, t1, t2);
  const q = qBruto.toFixed(1).replace('.', ',');
  document.getElementById('resultado-calor')
    .textContent = `Qₛ = ${q} kJ`;
});
