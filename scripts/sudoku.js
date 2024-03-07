function Game() {

    function ajax(options) {
        const { success, data } = options;
        const conexion = new XMLHttpRequest();
        conexion.addEventListener("load", () => {
            if (conexion.status >= 200 && conexion.status < 300) {
                success(JSON.parse(conexion.response));
            }
        });
        conexion.open("GET", "http://localhost:3000/Sudoku", true);
        conexion.send(JSON.stringify(data));
    }

    ajax({
        success: (response) => {
                
            const raw = response.RawSudoku[0];
            const solved = response.SolvedSudoku[0];

            let numSelect = null;
            let casillaSelect = null;

            let errors = 0;

            function crearNumeros() {
                for (let i = 1; i <= 9; i++) {
                    let numero = document.createElement("div");
                    numero.id = i;
                    numero.innerText = i;
                    numero.classList.add("number");
                    numero.addEventListener("click", selectNumero);
                    document.querySelector("#digits").appendChild(numero);
                }
            }

            function crearTablero() {
                for (let fila = 0; fila < 9; fila++) {
                    for (let columna = 0; columna < 9; columna++) {
                        let casilla = document.createElement("div");
                        casilla.id = fila.toString() + "-" + columna.toString();

                        if (raw[fila][columna] != 0) {
                            casilla.innerText = raw[fila][columna];
                            casilla.classList.add("tile-start");
                        }

                        if (fila == 2 || fila == 5) {
                            casilla.classList.add("horizontal-line");
                        }

                        if (columna == 2 || columna == 5) {
                            casilla.classList.add("vertical-line");
                        }

                        casilla.addEventListener("click", selectCasilla);
                        casilla.classList.add("casilla");
                        document.querySelector("#board").appendChild(casilla);
                    }
                }
            }

            function selectNumero() {
                if (numSelect != null) {
                    numSelect.classList.remove("number-selected");
                }
                numSelect = this;
                numSelect.classList.add("number-selected");
            }

            function selectCasilla() {
                if (numSelect) {
                    if (this.innerText != "") {
                        return;
                    }

                    let coords = this.id.split("-");
                    let fila = parseInt(coords[0]);
                    let columna = parseInt(coords[1]);

                    if (solved[fila][columna] == numSelect.id) {
                        this.innerText = numSelect.id;
                    } else {
                        errors += 1;
                        document.querySelector("#errors").innerText = `${errors}/3`;
                    }

                    if (errors == 3) {
                        crearNumeros();
                    }
                }
            }

            crearNumeros();
            crearTablero();
        }
    });
}

Game();