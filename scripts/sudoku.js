function Game() {
    ajax({
        success: (response) => {
            let level = 0, correctCount = 0;
            let numSelect = null;
            let errors = 0;

            const raw = response.RawSudoku[level];
            const solved = response.SolvedSudoku[level];

            // Create numbers
            // id = "[1-9]" class = "numbers" onClick = "selectNumero"
            for (let i = 1; i <= 9; i++) {
                let numero = document.createElement("div");
                numero.id = i;
                numero.innerText = i;
                numero.classList.add("numbers");
                numero.addEventListener("click", selectNumero);
                document.querySelector("#digits").appendChild(numero);
            }

            // Create board
            // id = "[1-9]-[1-9]" class = "tile" ["tile-start"] ["horizontal-line"] ["verticla-line"] onClick = "selectTile"
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

            function selectNumero() {
                if (numSelect != null) {
                    numSelect.classList.remove("number-selected");
                }
                numSelect = this;
                numSelect.classList.add("number-selected");
            }

            function selectTile() {
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

                    }
                }
            }
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