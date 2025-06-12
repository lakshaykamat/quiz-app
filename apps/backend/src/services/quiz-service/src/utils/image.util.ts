/**
 * Constructs a complete image URL for quiz assets.
 * Handles both development and production environments.
 * 
 * @param fileName - The image file name or path.
 * @returns Complete URL to the image resource.
 * @throws Error if required environment variables are missing.
 */
export function getImageURL(fileName: string): string {
  const imageDomainUrl = process.env.QUIZ_SERVICE_IMAGE_DOMAIN_URL;
  const nodeEnv = process.env.NODE_ENV ?? 'production';

  if (!imageDomainUrl) {
    throw new Error('QUIZ_SERVICE_IMAGE_DOMAIN_URL environment variable is required');
  }

  // If fileName is already a full URL, return as-is
  if (/^https?:\/\//i.test(fileName)) {
    return fileName;
  }

  // Normalize filename to ensure starting with /
  const normalizedPath = fileName.startsWith('/') ? fileName : `/${fileName}`;

  // Development environment — always use localhost:8000
  if (nodeEnv === 'development') {
    return `http://localhost:${process.env.GATEWAY_PORT}/api/v1/quiz/static${normalizedPath}`;
  }

  // Production — use domain from env variable
  return `${imageDomainUrl}/api/v1/quiz/static${normalizedPath}`;
}

/**
 * Transforms MongoDB quiz documents to include full image URLs.
 * Converts MongoDB documents to plain objects if necessary.
 * 
 * @param quizzes - Array of quiz objects/documents.
 * @returns New array with transformed image URLs.
 */
export function modifyImagePathInQuizzes<T extends { imageUrl: string }>(quizzes: any[]): any[] {
  return quizzes.map(quiz => {
    const plainQuiz = typeof quiz.toJSON === 'function' ? quiz.toJSON() : JSON.parse(JSON.stringify(quiz));
    plainQuiz.imageUrl = getImageURL(plainQuiz.imageUrl);
    return plainQuiz;
  });
}
