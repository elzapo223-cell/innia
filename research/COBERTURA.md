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

- [ ] "El estudiante no quiere realizar la actividad."
- [ ] "No comprende las instrucciones."
- [ ] "Se distrae constantemente."
- [ ] "Se frustró y no quiere continuar."
- [ ] "Tiene dificultad para trabajar en grupo."
- [ ] "¿Cómo puedo explicarle esta actividad de otra manera?"
