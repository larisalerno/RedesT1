import { easyQuestions } from "../../misc/questions";
import { mediumQuestions } from "../../misc/questions";
import { hardQuestions } from "../../misc/questions";
import  random  from './random.aux';

export default async function(difficulty : string) {

    let chosen_question : any = {};
    let number : number = await random(0, 4);

    switch(difficulty) {
        case 'easy':
            easyQuestions.map((question, value) => {
                console.log(question);
                chosen_question = question;
            });
        break;
        case 'medium':
            mediumQuestions.map((question, value) => {
                console.log(question);
                chosen_question = question;
            });
        break;
        case 'hard':
            hardQuestions.map((question, value) => {
                console.log(question);
                chosen_question = question;
            });
        break;
    }

    return chosen_question;
}



