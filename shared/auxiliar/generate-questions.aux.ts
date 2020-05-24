import { easyQuestions } from "../../misc/questions";
import { mediumQuestions } from "../../misc/questions";
import { hardQuestions } from "../../misc/questions";
import  random  from './random.aux';
import { GameDifficulty } from "../enums/game-difficulty.enum";

/**
 * 
 * @param score Current player score
 * Selects a question for the player based on its current score.
 * Then removes the question from the array to avoid duplicated questions.
 */
export default async function(score : number) {

    let chosen_question : any = {};
    let difficulty : string = '';
    let position = 0;

    difficulty  = await generate_difficulty(score);
    position    = await generate_position(difficulty);

    switch(difficulty) {
        case GameDifficulty.EASY:
            chosen_question = easyQuestions[position];
            easyQuestions.splice(position, 1);
        break;
        case GameDifficulty.MEDIUM:
            chosen_question = mediumQuestions[position];
            mediumQuestions.splice(position, 1);
        break;
        case GameDifficulty.HARD:
            chosen_question = hardQuestions[position];
            hardQuestions.splice(position, 1);
        break;
    }

    return chosen_question;
}

/**
 * 
 * @param score Current player score.
 * Returns a string with 'easy', 'medium' or 'hard' based on the current score.
 */
async function generate_difficulty(score : number) {
    if(score >= 0 && score < 5) {
        return GameDifficulty.EASY;
    }
    if(score >= 5 && score < 10) {
        return GameDifficulty.MEDIUM;
    }
    if(score >= 10) {
        return GameDifficulty.HARD;
    }

    return '';
}


/**
 * 
 * @param difficulty String may be 'easy', 'medium' or 'hard.
 * Generates a number between 0 and the size of questions array (n-1).
 */
async function generate_position(difficulty : string) {
    if(difficulty === GameDifficulty.EASY) {
        return await random(0, easyQuestions.length - 1);
    }
    if(difficulty === GameDifficulty.MEDIUM) {
        return await random(0, mediumQuestions.length - 1);
    }
    if(difficulty === GameDifficulty.HARD) {
        return await random(0, hardQuestions.length - 1);
    }

    return 0;
}



