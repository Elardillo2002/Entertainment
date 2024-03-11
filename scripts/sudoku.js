function Game() {
    ajax({
        success: (response) => {
            let level = 0, correctCount = 0;
            let numSelect = null;
            let errors = 0;

            // Create numbers
            // id = "[1-9]" class = "numbers" onClick = "selectNumero"
            function createNumbers() {
                for (let i = 1; i <= 9; i++) {
                    let numero = document.createElement("div");
                    numero.id = i;
                    numero.innerText = i;
                    numero.classList.add("numbers");
                    numero.addEventListener("click", selectNumber);
                    document.querySelector("#digits").appendChild(numero);
                }
            }

            // Create board
            // id = "[1-9]-[1-9]" class = "tile" ["tile-start"] ["horizontal-line"] ["verticla-line"] onClick = "selectTile"
            function createBoard() {
                const raw = response.RawSudoku[level];
                const solved = response.SolvedSudoku[level];

                for (let row = 0; row < 9; row++) {
                    for (let column = 0; column < 9; column++) {
                        let tile = document.createElement("div");
                        tile.id = row.toString() + "-" + column.toString();

                        if (raw[row][column] != 0) {
                            correctCount--;
                            tile.innerText = raw[row][column];
                            tile.classList.add("tile-start");
                        }

                        if (row == 2 || row == 5) {
                            tile.classList.add("horizontal-line");
                        }

                        if (column == 2 || column == 5) {
                            tile.classList.add("vertical-line");
                        }

                        tile.addEventListener("click", selectTile);
                        tile.classList.add("tile");
                        document.querySelector("#board").appendChild(tile);
                    }
                }
            }

            function createLevels() {
                const totalLevels = response.RawSudoku;

                for (let i = 1; i < totalLevels.length; i++) {
                    let selectLvl = document.createElement("div");
                    selectLvl.innerText = `Nivel ${i}`;
                    selectLvl.classList.add("selectLevels");
                    selectLvl.id = i - 1;
                    selectLvl.addEventListener("click", selectLevel);
                    document.querySelector("#levels").appendChild(selectLvl);
                }
            }

            function selectNumber() {
                if (numSelect != null) {
                    numSelect.classList.remove("number-selected");
                }
                numSelect = this;
                numSelect.classList.add("number-selected");
            }

            function selectTile() {
                const solved = response.SolvedSudoku[level];
                if (numSelect) {
                    if (this.innerText != "") {
                        return;
                    }

                    let coords = this.id.split("-");
                    let row = parseInt(coords[0]);
                    let column = parseInt(coords[1]);

                    if (solved[row][column] == numSelect.id) {
                        this.innerText = numSelect.id;
                    } else {
                        errors += 1;
                        document.querySelector("h2").innerText = `${errors}/3`;
                    }

                    if (errors == 3) {
                        // TODO: Se pierde el juego si se llega a 3 errores.
                    }
                }
            }

            function selectLevel() {
                level = this.id;
                let board = document.querySelector("#board");

                while (board.firstChild) {
                    board.removeChild(board.firstChild);
                }

                errors = 0, correctCount = 0;
                document.querySelector("h2").innerText = `${errors}/3`;
                
                createBoard();
            }

            createBoard();
            createLevels();
            createNumbers();
        }
    });
}

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

Game();