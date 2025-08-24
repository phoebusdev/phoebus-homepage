// Simple test to verify email functionality
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  message: 'This is a test message',
  projectType: 'web-app'
}

async function testContact() {
  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })

    const result = await response.json()
    console.log('Contact API Response:', result)
  } catch (error) {
    console.error('Contact API Error:', error)
  }
}

async function testPrototype() {
  try {
    const response = await fetch('http://localhost:3001/api/prototype', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...testData,
        source: 'Test'
      }),
    })

    const result = await response.json()
    console.log('Prototype API Response:', result)
  } catch (error) {
    console.error('Prototype API Error:', error)
  }
}

// Uncomment to test (requires server to be running)
// testContact()
// testPrototype()

console.log('Test file created. Uncomment the function calls to test the APIs when server is running.')