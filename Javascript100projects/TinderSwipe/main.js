const DECISION_THRESHOLD = 75
let isAnimating = false;
let pullDeltaX = 0;  
// Distancia en que la card se esta arrastrando

const undo = document.getElementsByClassName('is-undo')[0]
undo.addEventListener('click', () => {
    window.location.reload()
})

const startDrag = (event) => {
    if(isAnimating) return

    // Obtener el primer elemento article
    const actualCard = event.target.closest('article')
    if (!actualCard) return
    // Obtener la posición inicial del mouse o touch
    const startX = event.pageX ?? event.touches[0].pageX


    const onMove = (event) => {
        // Posición actual del mouse o touch
        const currentX = event.pageX ?? event.touches[0].pageX
        // La distancia entre la posición inicial y la actual
        pullDeltaX = currentX - startX
        // No hay distancia recorrida
        if(pullDeltaX === 0) return
        // Cambia la vandera para indicar la animacion
        isAnimating = true
        // Calcula la rotación de la card usando la distancia
        const deg = pullDeltaX / 15
        // Aplica la transformación(efecto) a la card
        actualCard.style.transform = `translate(${pullDeltaX}px) rotate(${deg}deg)`
        // Cambia el cursor a grabbing
        actualCard.style.cursor ='grabbing'
        // Cambiar la opacidad del decisión
        const opacity = Math.abs(pullDeltaX) / 100
        const isRight = pullDeltaX > 0

        const choiceEl = isRight
        ? actualCard.querySelector('.choice.like')
        : actualCard.querySelector('.choice.nope')

        choiceEl.style.opacity = opacity
    }

    const onEnd = (event) => {
        // Remover los event listeners
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onEnd)

        document.removeEventListener('touchmove', onMove)
        document.removeEventListener('touchend', onEnd)

        // Saber si el usuario tomo una decisión
        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD

        if(decisionMade){
            const goRight = pullDeltaX >= 0

            // Agregar efecto de acuerdo a la decisión
            actualCard.classList.add(goRight ? 'go-right' : 'go-left')
            actualCard.addEventListener('transitionend', () => {
                actualCard.remove()
            })
        } else {
            actualCard.classList.add('reset')
            actualCard.classList.remove('go-right', 'go-left')

            actualCard.querySelectorAll('.choice').forEach(choice => {
                choice.style.opacity = 0
            })
        }

        // Reseteo de variables
        actualCard.addEventListener('transitionend', () => {
            actualCard.removeAttribute('style')
            actualCard.classList.remove('reset')

            pullDeltaX = 0
            isAnimating = false
        })
        
        // Resetear opacidad
        actualCard
        .querySelectorAll(".choice")
        .forEach((el) => (el.style.opacity = 0));
    }

    // Escucha los movimientos del mouse y touch
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)

    document.addEventListener('touchmove', onMove, {passive: true})
    document.addEventListener('touchend', onEnd, {passive: true})
}

document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, {passive: true})