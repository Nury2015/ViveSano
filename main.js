document.getElementById("calc-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const edad = parseInt(this.edad.value);
    const sexo = this.sexo.value;
    const peso = parseFloat(this.peso.value);
    const altura = parseFloat(this.altura.value);
    const actividad = parseFloat(this.actividad.value);
  
    let TMB;
  
    if (sexo === "masculino") {
      TMB = 10 * peso + 6.25 * altura - 5 * edad + 5;
    } else {
      TMB = 10 * peso + 6.25 * altura - 5 * edad - 161;
    }
  
    const GET = Math.round(TMB * actividad);
  
    const proteinas = Math.round(peso * 1.8); // g/día
    const grasas = Math.round((GET * 0.25) / 9); // 25% de las calorías
    const carbohidratos = Math.round((GET * 0.5) / 4); // 50% de las calorías
  
    document.getElementById("resultado").innerHTML = `
      <h2>Resultados</h2>
      <p><strong>GET (Gasto Energético Total):</strong> ${GET} kcal/día</p>
      <p><strong>Proteínas:</strong> ${proteinas} g/día</p>
      <p><strong>Grasas:</strong> ${grasas} g/día</p>
      <p><strong>Carbohidratos:</strong> ${carbohidratos} g/día</p>
    `;
  });
  