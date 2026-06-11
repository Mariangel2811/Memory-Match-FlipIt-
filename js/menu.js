const modeSelect=document.getElementById("gameMode");
const playerTwo=document.getElementById("playerTwo");

modeSelect.addEventListener("change",()=>{

    if(modeSelect.value==="pvp"){

        playerTwo.style.display="block";

    }else{

        playerTwo.style.display="none";

    }

});

function readConfiguration(){

    gameState.mode=document.getElementById("gameMode").value;

    gameState.difficulty=parseInt(
        document.getElementById("difficulty").value
    );

    gameState.theme=document.getElementById("theme").value;

    const p1=document.getElementById("player1").value.trim() || "Jugador";

    if(gameState.mode==="pvp"){

        const p2=document.getElementById("player2").value.trim() || "Jugador 2";

        gameState.players=[

            {
                name:p1,
                score:0
            },

            {
                name:p2,
                score:0
            }

        ];

    }else{

        gameState.players=[

            {
                name:p1,
                score:0
            }

        ];

    }

}