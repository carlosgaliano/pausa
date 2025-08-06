function verificarFullscreen() {
    if (!document.fullscreenElement) {
        pantallaFull(pantaBody);
    }
}

function pantallaFull(element: HTMLElement): void {
    if (!document.fullscreenElement) {
        element.requestFullscreen().catch(err => {
            console.log(`${err.message}`);
        });
    } else {
        document.exitFullscreen().catch(err => {
            console.log(`${err.message}`);
        });
    }
}

const pantaBody = document.getElementById("body") as HTMLElement;
const fullscreenButton = document.getElementById("btnPausa");

fullscreenButton?.addEventListener("click", () => {
    pantallaFull(pantaBody);

    document.addEventListener("fullscreenchange", () => {
        verificarFullscreen();
    });
});









const contadorElment: any = document.getElementById("contador");

let minute = 1;
const numero_pausa: any = document.getElementById("numero_pausa");

const btnPausa: any = document.getElementById("btnPausa");


const mascaraAgua = document.getElementById("mascaraAgua");
const contentDibujo: any = document.getElementById("contentDibujo");

class PausaClass {
    valor: string;
    input_: any;
    numero_pausa: number;
    contadorElment: any;

    constructor(input_: any, numero_pausa, contadorElment) {
        this.numero_pausa = numero_pausa;
        this.valor = "";
        this.input_ = input_;
        this.contadorElment = contadorElment;
        this.input_.addEventListener("focusin", this.eventFocusIn.bind(this));
        this.input_.addEventListener("input", this.eventInput.bind(this));
        this.input_.addEventListener("focusout", this.eventFocusOut.bind(this));



    }

    eventFocusIn(e) {
        this.input_.dataset.valorePrecedente = this.input_.value;
        this.input_.value = "";
        this.input_.setAttribute("placeholder", "");

    }

    eventFocusOut(e) {
        if (this.input_.value == "") {
            this.input_.value = this.input_.dataset.valorePrecedente || "";
            this.input_.setAttribute("placeholder", "mm");
        } else {
            let _pausa: any = this.numero_pausa;
            this.valor = this.input_.dataset.valorePrecedente;
            minute = parseInt(_pausa.value);
            this.contadorElment.textContent = `${minute}:00`;


        }
    }

    eventInput(e) {
        if (e.target.value.length > 2) {
            e.target.value = e.target.value.slice(0, 1);
        } else if (e.target.value < 1) {
            e.target.value = 1;
        }
        if (e.target.value > 15) {
            e.target.value = 15;
        }
        e.target.setAttribute("value", e.target.value);
        this.input_.value = e.target.value;


    }
}

const giornoPausa = new PausaClass(numero_pausa, numero_pausa, contadorElment);




setInterval(() => {
    const fecha: any = document.getElementById("tiempo");
    let inizio: any = new Date().getTime();
    inizio = inizio + (60 * 1);
    inizio = new Date(inizio).toLocaleTimeString("it-IT", {
        hour: '2-digit',
        minute: '2-digit'
    });
    fecha.innerHTML = inizio;
}, 1000);



const sonidoPajaro = new Audio('../img/chupar.mp3');
const sonidoPasos = new Audio('../img/pasos.mp3');

let contadorInerval;
let intervalo;



sessionStorage.setItem("cargo", "false");

btnPausa.addEventListener("click", function (e) {

/*     function startAnimation(): void {
        document.getElementById("contentDibujo");
    }

    startAnimation(); */
    contentDibujo.setAttribute("src", "./img/p-1-p.svg");
    sonidoPasos.play();
    sonidoPasos.loop = true;
    this.setAttribute("disabled", "disabled");
    const div: any = document.getElementById('mascaraAgua');

    numero_pausa.setAttribute("disabled", "disabled");

    let tiempo_ = numero_pausa.value * 60;




    contadorElment.textContent = `${numero_pausa.value}:00`;
    sessionStorage.setItem("cargo", "true");

    setTimeout(() => {



        setInterval(() => {
            const fecha: any = document.getElementById("tiempo");
            let inizio: any = new Date().getTime();
            inizio = inizio + (60 * 1);
            inizio = new Date(inizio).toLocaleTimeString("it-IT", {
                hour: '2-digit',
                minute: '2-digit'
            });
            fecha.innerHTML = inizio;
        }, 1000);

        const fecha: any = document.getElementById("fine");
        let inizio: any = new Date().getTime();
        inizio = inizio + (1000 * 60 * 1);
        let fine = inizio + (1000 * 60 * (parseInt(numero_pausa.value) - 1));
        fine = new Date(fine).toLocaleTimeString("it-IT", {
            hour: '2-digit',
            minute: '2-digit'
        });
        fecha.innerHTML = fine



        if (sessionStorage.getItem("cargo")) {
            // console.log("se cargo");
            clearInterval(intervalo);
            clearInterval(contadorInerval);
            // numero_pausa.value = "1";
            numero_pausa.dataset.valorePrecedente = "1";
        } else {
            // console.log("primea");
            sessionStorage.setItem("cargo", "true");
        }

        sonidoPajaro.play();
        sonidoPajaro.loop = true;
        sonidoPasos.pause();
        sonidoPasos.currentTime = 0;
        contentDibujo.setAttribute("src", "./img/p-2.svg");


        contadorInerval = setInterval(() => {




            let min = Math.floor(tiempo_ / 60);
            let seg = tiempo_ % 60;

            // console.log(tiempo_)
            /*  if (tiempo_ <= 1) {
                 sonidoPajaro.loop = false;
             } */
            if (tiempo_ <= 0) {
                sonidoPajaro.pause();
                sonidoPajaro.currentTime = 0;
                sonidoPajaro.loop = false;
                clearInterval(contadorInerval);

                sonidoPasos.play();

                setTimeout(() => {
                    contadorElment.innerHTML = "<span style='font-size: 93px;'>Pausa terminata</span>";
                    this.removeAttribute("disabled");
                    numero_pausa.removeAttribute("disabled");
                    sonidoPasos.pause();
                    sonidoPasos.currentTime = 0;

                }, 1000);

            } else {
                contadorElment.textContent = `${min}:${seg < 10 ? '0' : ''}${seg}`;
                tiempo_--;
                sonidoPajaro.loop = true;
            }
        }, 1000);


        const tiempoTotal = minute * 60;
        const alturaInicial = 51;
        let tiempoRestante = tiempoTotal;



        intervalo = setInterval(() => {
            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                contentDibujo.setAttribute("src", "./img/p-3.svg");
                setTimeout(() => {
                    div.style.height = '51px';
                }, 5000);
                return;
            }

            tiempoRestante--;

            const nuevaAltura = (tiempoRestante / tiempoTotal) * alturaInicial;
            div.style.height = `${nuevaAltura}px`;

        }, 1000);
    }, 7000);


});




