/**
 * Constructs a complete image URL for quiz assets
 * @param fileName - The image file name/path
 * @returns Complete URL to the image resource
 * @throws Error if required environment variables are missing
 */
export function getImageURL(fileName: string): string {
  const imageDomainUrl = process.env.QUIZ_SERVICE_IMAGE_DOMAIN_URL;
  const gatewayPort = process.env.GATEWAY_PORT || '8000';
  
  if (!imageDomainUrl) {
    throw new Error('QUIZ_SERVICE_IMAGE_DOMAIN_URL environment variable is required');
  }

  // Skip processing if it's already a complete URL
  if (fileName.startsWith('http://') || fileName.startsWith('https://')) {
    return fileName;
  }

  // Ensure fileName starts with '/' for proper URL construction
  const normalizedFileName = fileName.startsWith('/') ? fileName : `/${fileName}`;
  
  // Handle localhost with port, production URLs as-is
  const baseUrl = imageDomainUrl === 'http://localhost' 
    ? `${imageDomainUrl}:${gatewayPort}` 
    : imageDomainUrl;
  
  return `${baseUrl}/api/v1/quiz/static${normalizedFileName}`;
}

/**
 * Transforms MongoDB quiz documents to include full image URLs
 * @param quizzes - Array of MongoDB quiz documents
 * @returns New array with transformed image URLs as plain objects
 */
export function modifyImagePathInQuizzes<T extends { imageUrl: string }>(
  quizzes: T[]
): T[] {
  return quizzes.map(quiz => {
    // Convert MongoDB document to plain object
    const quizObj = JSON.parse(JSON.stringify(quiz));
    
    // Transform the image URL
    quizObj.imageUrl = getImageURL(quizObj.imageUrl);
    
    return quizObj;
  });
}