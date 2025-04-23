export function getImageURL(fileName:string){
  const IMAGE_DOMAIN_URL = process.env.IMAGE_DOMAIN_URL;
  const baseURL =
    IMAGE_DOMAIN_URL === "http://localhost"
      ? `${IMAGE_DOMAIN_URL}:${process.env.PORT}`
      : IMAGE_DOMAIN_URL;
  return baseURL + "/static" + fileName
}

export function modifyImagePathInQuizes(quizes:Array<any>){
  const newQuiz = quizes.map((quiz) => {
    const quizObj = JSON.parse(JSON.stringify(quiz));
      quizObj.imageUrl = getImageURL(quizObj.imageUrl);
    return quizObj;
  });
  return newQuiz;
}