import { Question } from "../interfaces/question.interface";

export default async function(question : Question, answer : string) {
    return question.correctAnwserIndex!.toString() === answer;
}
