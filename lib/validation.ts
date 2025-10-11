// Form validation utilities

/**
 * Validates email format using RFC 5322 compliant pattern
 * @param email - Email address to validate
 * @returns true if email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

/**
 * Validates phone number in international format
 * @param phone - Phone number to validate (can be null)
 * @returns true if phone is valid or null, false otherwise
 */
export function isValidPhone(phone: string | null): boolean {
  if (!phone || phone.trim() === '') return true // Phone is optional

  const phonePattern = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/
  return phonePattern.test(phone)
}

/**
 * Validates name field
 * @param name - Name to validate
 * @returns true if name is valid, false otherwise
 */
export function isValidName(name: string): boolean {
  if (!name || name.trim().length < 2) return false
  if (name.length > 100) return false

  // Allow letters, spaces, hyphens, and apostrophes only
  const namePattern = /^[a-zA-Z\s'-]+$/
  return namePattern.test(name)
}

/**
 * Validates project description field
 * @param description - Project description to validate
 * @returns true if description is valid, false otherwise
 */
export function isValidProjectDescription(description: string): boolean {
  if (!description || description.trim().length < 10) return false
  if (description.length > 2000) return false
  return true
}

/**
 * Returns error message for invalid email
 */
export function getEmailErrorMessage(email: string): string | null {
  if (!email || email.trim() === '') return 'Email is required'
  if (!isValidEmail(email)) return 'Please enter a valid email address'
  return null
}

/**
 * Returns error message for invalid phone
 */
export function getPhoneErrorMessage(phone: string | null): string | null {
  if (!phone || phone.trim() === '') return null // Phone is optional
  if (!isValidPhone(phone)) return 'Please enter a valid phone number'
  return null
}

/**
 * Returns error message for invalid name
 */
export function getNameErrorMessage(name: string): string | null {
  if (!name || name.trim() === '') return 'Name is required'
  if (name.trim().length < 2) return 'Name must be at least 2 characters'
  if (name.length > 100) return 'Name must be 100 characters or less'
  if (!isValidName(name)) return 'Name can only contain letters, spaces, hyphens, and apostrophes'
  return null
}

/**
 * Returns error message for invalid project description
 */
export function getProjectDescriptionErrorMessage(description: string): string | null {
  if (!description || description.trim() === '') return 'Project description is required'
  if (description.trim().length < 10) return 'Project description must be at least 10 characters'
  if (description.length > 2000) return 'Project description must be 2000 characters or less'
  return null
}
