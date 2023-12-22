const myWord = "heart";
var index = 0;
var notLimit = true;
var forBackspace = 0;
var inputWord = "";
var state = true;


$(document).on("keydown", function(event){
    if(state){
        var keyPressed = event.key;
        everything(keyPressed);
    }
    
});
$("button").on("click",function(){
    if(state){
        var keyPressed = $(this).html();
        everything(keyPressed);
    }
    
})

function everything(keyPressed){
    if(keyPressed.match(/^[a-zA-Z]$/) && notLimit){//for key presses from a to z
        $("p:eq("+ index + ")").text(keyPressed.toUpperCase());
        inputWord += keyPressed.toLowerCase();          // the keyboard input and the inbuilt keyboard input have to be the same case
        index++;
        if (index % 5 === 0 && index !== 0  ) {
            notLimit = false;
        }
    }
    if(keyPressed === "Enter" && index % 5 === 0){   // when enter is pressed for a 5 letter word 
        var currentAns = inputWord.slice(-5);
        $("h1").fadeOut(0);
        if(currentAns === myWord){
            $("h1").text("🥇Correct🥇");
            $("h1").fadeIn(400);
        }
        else{
            $("h1").text("Incorrect😣");
            $("h1").fadeIn(400);
        }
        changeColor(currentAns,index);
        notLimit = true;
        forBackspace = index ;
    }
    if((keyPressed === "Backspace" || keyPressed === "Back") && index !== 0 && index > forBackspace){   //for removing letters
        index--;
        $("p:eq("+ index + ")").text("");
        inputWord = inputWord.slice(0,-1);
        notLimit = true;
    }
    if (currentAns === myWord) {
        state = false;
    }
}

function changeColor(currentAns,currentIndex){
    let cellPosition = currentIndex - 5;
    
    for (let i = 0 ; i < 5; i++) {
        let flag = false;
        for (let j = 0; j < 5; j++) {
            if(currentAns[i] === myWord[j]){
                flag = true;
            } 
        }
        if (currentAns[i] === myWord[i]) {
            $(".cell:eq("+ cellPosition +")").addClass("green");
        }
        else if(flag){
            $(".cell:eq("+ cellPosition +")").addClass("yellow");
        }
        else{
            $(".cell:eq("+ cellPosition +")").addClass("grey");
        }
        cellPosition++;
    }
}










