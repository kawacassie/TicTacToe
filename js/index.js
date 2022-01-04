window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const joueurDisplay = document.querySelector('.display-joueur');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentJoueur = 'X';
    let isGameActive = true;

    const JOUEURX_GAGNE = 'JOUEURX_GAGNE';
    const JOUEURO_GAGNE = 'JOUEURO_GAGNE';
    const EGALITE = 'EGALITE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentJoueur === 'X' ? JOUEURX_GAGNE : JOUEURO_GAGNE);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(EGALITE);
    }

    const announce = (type) => {
        switch(type){
            case JOUEURO_GAGNE:
                announcer.innerHTML = 'Le joueur <span class="joueurO">O</span> a gagné !';
                break;
            case JOUEURX_GAGNE:
                announcer.innerHTML = 'Le joueur <span class="joueurX">X</span> a gagné !';
                break;
            case EGALITE:
                announcer.innerText = 'Égalité';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentJoueur;
    }

    const changeJoueur = () => {
        joueurDisplay.classList.remove(`joueur${currentJoueur}`);
        currentJoueur = currentJoueur === 'X' ? 'O' : 'X';
        joueurDisplay.innerText = currentJoueur;
        joueurDisplay.classList.add(`joueur${currentJoueur}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentJoueur;
            tile.classList.add(`joueur${currentJoueur}`);
            updateBoard(index);
            handleResultValidation();
            changeJoueur();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentJoueur === 'O') {
            changeJoueur();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('joueurX');
            tile.classList.remove('joueurO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});