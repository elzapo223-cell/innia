# Cobertura de la base curada de INNIA

Matriz **condición × área**. Marcar el número de entradas por celda a medida que se
redactan (el validador imprime el conteo real; esta tabla es la meta).

Meta v1: ≥ 2 entradas por celda **relevante**. No todas las celdas aplican por igual
(p. ej. `sensorial` es central en TEA y marginal en TDAH).

| Área \ Condición        | TDAH | TEA | ambos |
|-------------------------|:----:|:---:|:-----:|
| atencion                |  ✔   |  ·  |   ·   |
| comunicacion            |  ·   |  ✔  |   ·   |
| interaccion-social      |  ·   |  ✔  |   ·   |
| regulacion-emocional    |  ✔   |  ✔  |   ·   |
| instrucciones           |  ✔   |  ✔  |   ✔   |
| aprendizaje             |  ✔   |  ✔  |   ✔   |
| trabajo-en-grupo        |  ✔   |  ✔  |   ·   |
| motivacion-tareas       |  ✔   |  ·  |   ·   |
| sensorial               |  ·   |  ✔  |   ·   |

(✔ = objetivo v1 · = opcional/no prioritario)

## Checklist de situaciones del cliente (obligatorio 6/6 al cierre)

El validador (`node scripts/validate.mjs --strict`) exige que cada una aparezca en al
menos un `situacionesRapidas`.

- [x] "El estudiante no quiere realizar la actividad." → `tdah-motivacion-iniciar-tarea`
- [x] "No comprende las instrucciones." → `tdah-instrucciones-claras-cortas`, `tea-comunicacion-lenguaje-claro`, `ambos-instrucciones-dua-multiples-formas`
- [x] "Se distrae constantemente." → `tdah-atencion-entorno-ubicacion`
- [x] "Se frustró y no quiere continuar." → `tdah-regulacion-frustracion`
- [x] "Tiene dificultad para trabajar en grupo." → `tdah-grupo-roles-estructura`, `tea-grupo-roles-previsibilidad`
- [x] "¿Cómo puedo explicarle esta actividad de otra manera?" → `ambos-aprendizaje-dua-explicar-de-otra-manera`, `tdah-aprendizaje-multisensorial`

**Cobertura de situaciones del cliente verificada: 6/6** (`node scripts/validate.mjs --strict` pasa).
