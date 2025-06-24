
gsap.registerPlugin();

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
});

function initializeAnimations() {

    const tl = gsap.timeline();
    
    tl.from('.container', {
        duration: 0.8,
        opacity: 0,
        scale: 0.95,
        ease: "power2.out"
    })
    
    .from('h1', {
        duration: 0.6,
        y: -30,
        opacity: 0,
        ease: "back.out(1.7)"
    }, "-=0.4")

    .from('.input-section', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.3")
    
    .from('h2', {
        duration: 0.4,
        x: -20,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.2")
    
    .from('.table-container, #ganttWrapper', {
        duration: 0.6,
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.2)"
    }, "-=0.3");
    
    
    addButtonAnimations();
    addInputAnimations();
}

function addButtonAnimations() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {

        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                boxShadow: "0 5px 15px rgba(102, 126, 234, 0.3)",
                ease: "power2.out"
            });
        });
        
        button.addEventListener('click', () => {
            gsap.to(button, {
                duration: 0.1,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    });
}

function addInputAnimations() {
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                duration: 0.3,
                scale: 1.02,
                boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.2)",
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                duration: 0.3,
                scale: 1,
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
                ease: "power2.out"
            });
        });
    });
}
function animateProcessAdd(row) {
    gsap.set(row, {
        opacity: 0,
        x: -20,
        backgroundColor: "#e8f5e8"
    });
    
    gsap.to(row, {
        duration: 0.5,
        opacity: 1,
        x: 0,
        ease: "power2.out"
    });
    
    gsap.to(row, {
        duration: 1,
        backgroundColor: "white",
        delay: 0.5,
        ease: "power2.out"
    });
}

function animateGanttChart() {
    const ganttBlocks = document.querySelectorAll('.gantt-block');
    const timeLabels = document.querySelectorAll('.time-label');

    const placeholder = document.querySelector('.placeholder');
    if (placeholder) {
        gsap.to(placeholder, {
            duration: 0.3,
            opacity: 0,
            onComplete: () => placeholder.remove()
        });
    }

    gsap.set(ganttBlocks, {
        scaleX: 0,
        opacity: 0
    });
    
    gsap.to(ganttBlocks, {
        duration: 0.6,
        scaleX: 1,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
        transformOrigin: "left center"
    });
    
    gsap.set(timeLabels, {
        y: 10,
        opacity: 0
    });
    
    gsap.to(timeLabels, {
        duration: 0.4,
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: 0.3,
        ease: "power2.out"
    });
    
    ganttBlocks.forEach(block => {
        block.addEventListener('mouseenter', () => {
            gsap.to(block, {
                duration: 0.3,
                scale: 1.1,
                z: 10,
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
                ease: "power2.out"
            });
        });
        
        block.addEventListener('mouseleave', () => {
            gsap.to(block, {
                duration: 0.3,
                scale: 1,
                z: 0,
                boxShadow: "none",
                ease: "power2.out"
            });
        });
    });
}

function animateResultsTable() {
    const resultRows = document.querySelectorAll('#resultTable tr:not(:first-child)');
    const averagesDiv = document.querySelector('#averages');
    
    gsap.set(resultRows, {
        opacity: 0,
        y: 20
    });
    
    gsap.to(resultRows, {
        duration: 0.5,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out"
    });
    
    if (averagesDiv && averagesDiv.innerHTML.trim()) {
        gsap.set(averagesDiv, {
            opacity: 0,
            scale: 0.9
        });
        
        gsap.to(averagesDiv, {
            duration: 0.6,
            opacity: 1,
            scale: 1,
            delay: 0.3,
            ease: "back.out(1.2)"
        });
    }
}

function animateAlgorithmChange() {
    const priorityInput = document.querySelector('#priority');
    const timeQuantumInput = document.querySelector('#timeQuantum');
    
    if (priorityInput.style.display !== 'none') {
        gsap.fromTo(priorityInput, 
            { opacity: 0, scale: 0.8 },
            { duration: 0.4, opacity: 1, scale: 1, ease: "back.out(1.2)" }
        );
    }
    
    if (timeQuantumInput.style.display !== 'none') {
        gsap.fromTo(timeQuantumInput,
            { opacity: 0, scale: 0.8 },
            { duration: 0.4, opacity: 1, scale: 1, ease: "back.out(1.2)" }
        );
    }
}

function animateReset() {
    const tl = gsap.timeline();
    
    tl.to('#processTable tr:not(:first-child)', {
        duration: 0.3,
        opacity: 0,
        x: -20,
        stagger: 0.05
    })
    .to('.gantt-block', {
        duration: 0.3,
        scaleX: 0,
        opacity: 0,
        stagger: 0.05,
        transformOrigin: "right center"
    }, "-=0.2")
    .to('#resultTable tr:not(:first-child)', {
        duration: 0.3,
        opacity: 0,
        y: 20,
        stagger: 0.05
    }, "-=0.2")
    .to('#averages', {
        duration: 0.3,
        opacity: 0,
        scale: 0.9
    }, "-=0.2")
    
    .call(() => {
        const ganttChart = document.querySelector('#ganttChart');
        if (!ganttChart.querySelector('.placeholder')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder';
            placeholder.textContent = 'Run algorithm to see Gantt chart';
            ganttChart.appendChild(placeholder);
            
            gsap.fromTo(placeholder,
                { opacity: 0 },
                { duration: 0.4, opacity: 1 }
            );
        }
    });
}

function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message success';
    messageDiv.textContent = message;
    
    document.querySelector('.container').insertBefore(messageDiv, document.querySelector('h2'));
    
    gsap.set(messageDiv, {
        opacity: 0,
        y: -20,
        scale: 0.9
    });
    
    gsap.to(messageDiv, {
        duration: 0.5,
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "back.out(1.2)"
    });
    
    gsap.to(messageDiv, {
        duration: 0.5,
        opacity: 0,
        y: -20,
        scale: 0.9,
        delay: 3,
        ease: "power2.in",
        onComplete: () => messageDiv.remove()
    });
}

function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message error';
    messageDiv.textContent = message;
    
    document.querySelector('.container').insertBefore(messageDiv, document.querySelector('h2'));
    
    gsap.set(messageDiv, {
        opacity: 0,
        x: -20
    });
    
    gsap.to(messageDiv, {
        duration: 0.5,
        opacity: 1,
        x: 0,
        ease: "power2.out"
    });

    gsap.to(messageDiv, {
        duration: 0.1,
        x: 5,
        yoyo: true,
        repeat: 3,
        delay: 0.2
    });

    gsap.to(messageDiv, {
        duration: 0.5,
        opacity: 0,
        x: -20,
        delay: 4,
        ease: "power2.in",
        onComplete: () => messageDiv.remove()
    });
}

function showLoadingAnimation() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingIndicator';
    loadingDiv.innerHTML = '<div class="loading-spinner"></div><p>Processing...</p>';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        text-align: center;
        z-index: 1000;
    `;
    
    document.body.appendChild(loadingDiv);
    
    gsap.set(loadingDiv, {
        opacity: 0,
        scale: 0.8
    });
    
    gsap.to(loadingDiv, {
        duration: 0.4,
        opacity: 1,
        scale: 1,
        ease: "back.out(1.2)"
    });
    
    return loadingDiv;
}

function hideLoadingAnimation() {
    const loadingDiv = document.querySelector('#loadingIndicator');
    if (loadingDiv) {
        gsap.to(loadingDiv, {
            duration: 0.3,
            opacity: 0,
            scale: 0.8,
            ease: "power2.in",
            onComplete: () => loadingDiv.remove()
        });
    }
}

function animateElement(element, animation = 'fadeIn', duration = 0.5) {
    switch(animation) {
        case 'fadeIn':
            gsap.fromTo(element, 
                { opacity: 0 }, 
                { duration, opacity: 1, ease: "power2.out" }
            );
            break;
        case 'slideUp':
            gsap.fromTo(element, 
                { opacity: 0, y: 20 }, 
                { duration, opacity: 1, y: 0, ease: "power2.out" }
            );
            break;
        case 'scaleIn':
            gsap.fromTo(element, 
                { opacity: 0, scale: 0.8 }, 
                { duration, opacity: 1, scale: 1, ease: "back.out(1.2)" }
            );
            break;
    }
}

window.GSAPAnimations = {
    animateProcessAdd,
    animateGanttChart,
    animateResultsTable,
    animateAlgorithmChange,
    animateReset,
    showSuccessMessage,
    showErrorMessage,
    showLoadingAnimation,
    hideLoadingAnimation,
    animateElement
};