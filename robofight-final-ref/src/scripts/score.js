function scoreCounter() {
    if (!localStorage['scoreObj']) {
        var scoreEmptyObj = [];
        localStorage["scoreObj"] = JSON.stringify(scoreEmptyObj);
    }
    localStorage["currentPlayerPoints"] = 0;
    localStorage["currentPlayerName"] = '';
}

function finalScore() {
    localStorage["currentPlayerName"] = document.querySelector(".game-over__input").value || "No name";

    var scoreList = JSON.parse(localStorage["scoreObj"]);
    scoreList[scoreList.length] = [localStorage["currentPlayerName"], localStorage["currentPlayerPoints"]];

    scoreList.sort(function (a, b) {
        if (+a[1] > +b[1]) { return -1; };
        if (+a[1] < +b[1]) { return 1; };
        return 0;
    });

    if (scoreList.length > 10) { scoreList.length = 10; };

    localStorage["scoreObj"] = JSON.stringify(scoreList);

    var scoreListItems = [...document.querySelectorAll('.score-list li')];
    var parsedHighScoreListObject = JSON.parse(localStorage["scoreObj"]);

    for (var p = 0; p < parsedHighScoreListObject.length; p++) {
        scoreListItems[p].innerHTML = parsedHighScoreListObject[p][0] + " : " + parsedHighScoreListObject[p][1] + " wins";
    }
    document.querySelector(".score-container").style.zIndex = 30;
}

export { scoreCounter, finalScore };

