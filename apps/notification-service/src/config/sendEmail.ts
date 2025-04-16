// Define the type of the data you're sending
interface RequestBody {
    name: string;
    email: string;
  }
  
  // Define the type of the expected response (adjust as needed)
  interface ApiResponse {
    message: string;
    data?: any;
  }
  
  // Function to send welcome email
  export async function sendEmail(name: string, email: string): Promise<void> {
    const requestBody: RequestBody = { name, email };
  
    try {
      const response = await fetch('http://localhost:4002/api/v1/notify/welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result: ApiResponse = await response.json();
    } catch (error) {
      console.error('Error hitting API:', error);
    }
  }
  
  // Example usage
  //sendEmail('John Doe', 'john@example.com');
  