window.addEventListener('load', function() {
    $('.challenge_button').click(challengePressed);

    $('.insert_result').click(insertResultPressed);


    initSetElements();
});


function initSetElements() {
    $('.set_row').each(function(index) {
        if (index === 0) {
            $(this).css('visibility', 'visible');
        } else {
            //$(this).css('visibility', 'hidden');
        }
    });


    $('.set_row').on('input', function() {
        console.log('SOMETHING HAVE CHANGED');
    });
}

function challengePressed() {
    var email = $(this).data('email'),
        userId = $(this).data('user-id'),
        ajaxData = {
            'email': email,
            'user_id': userId
        };

    $.ajax('/send_challenge', {
        data: JSON.stringify(ajaxData),
        contentType : 'application/json',
        type : 'POST',
        success: function() {
            window.location.reload();
        }
    });
}

function insertResultPressed() {
    var challengerScores = $('.set_score_challenger'),
        opponentScores = $('.set_score_opponent'),
        challengeId = $(this).data('challenge-id'),
        opponentId = $(this).data('opponent-id'),
        challengerId = $(this).data('challenger-id'),
        ajaxData = {
            opponent_id: opponentId,
            challenger_id: challengerId,
            challenge_id: challengeId,
            sets: []
        };

    for (var i = 0; i < 5; i++) {
        var challengerScore = Number($(challengerScores[i]).val()),
            opponentScore = Number($(opponentScores[i]).val());

        if (challengerScore !== 0 && opponentScore !== 0) {
            ajaxData.sets.push({
                match_set_index: i,
                challenger_score: challengerScore,
                opponent_score: opponentScore
            });
        }
    }

    $.ajax('/send_result', {
        data: JSON.stringify(ajaxData),
        contentType : 'application/json',
        type : 'POST',
        success: function() {
            window.location.reload();
        }
    });

}