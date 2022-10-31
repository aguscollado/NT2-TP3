new Vue({
    //Nota para acordarme. Usar los this que sino no reconoce el valor
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [],
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
        curarPoco: 10,
        curarTodo: 100,
        condicionParaCurarPoco: 90,
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },

        empezarPartida() {
            this.hayUnaPartidaEnJuego = true
            this.saludJugador = 100
            this.saludMonstruo = 100
            this.turnos = []
        },

        atacar() {
            var danio = this.calcularHeridas(this.rangoAtaque[0], this.rangoAtaque[1])
            this.saludMonstruo -= danio;
            this.turnos.unshift({
                esJugador: true,
                mensaje: `el jugador le causo ${danio} de daño al monstruo`
            });
            if (this.verificarGanador()) {
                return;
            }
            this.ataqueDelMonstruo();
        },


        ataqueEspecial() {
            var danio = this.calcularHeridas(3, 4)
            this.saludMonstruo -= danio;
            this.turnos.unshift({
                esJugador: true,
                mensaje: `el jugador ha causado un ataque especial que le causo ${danio} de daño al monstruo`
            })
            if (this.verificarGanador()) {
                return;
            }
            this.ataqueDelMonstruo();
        },


        curar() {
            if (this.saludJugador <= this.condicionParaCurarPoco) {
                this.saludJugador += this.curarPoco
                this.turnos.unshift({
                    esJugador: true,
                    mensaje: `el jugador se curo ${this.curarPoco} puntos`
                });
            } else {
                this.saludJugador = this.curarTodo
                this.turnos.unshift({
                    esJugador: true,
                    mensaje: `el jugador se curo ${this.curarTodo} puntos`
                });
            }
            this.ataqueDelMonstruo()
        },

        registrarEvento(evento) {

        },

        terminarPartida() {
            this.hayUnaPartidaEnJuego = false
        },

        ataqueDelMonstruo() {
            var danio = this.calcularHeridas(this.rangoAtaqueDelMonstruo[0], this.rangoAtaqueDelMonstruo[1]);
            this.saludJugador -= danio;
            this.turnos.unshift({
                esJugador: false,
                mensaje: `el monstruo le causo ${danio} de daño al jugador`
            });
            this.verificarGanador();
        },

        calcularHeridas(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)

        },
        verificarGanador() {
            if (this.saludMonstruo <= 0) {
                if (confirm('Ganaste! ¿queres jugar de nuevo?')) {
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            } else if (this.saludJugador <= 0) {
                if (confirm(`Perdiste... ¿queres jugar de nuevo?`)) {
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});