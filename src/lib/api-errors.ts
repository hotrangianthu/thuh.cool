import { NextResponse } from 'next/server'

/**
 * Standard error response format
 */
export interface ErrorResponse {
  error: string
  code?: string
  details?: any
}

/**
 * Create standardized error response
 */
export function createErrorResponse(
  error: string,
  status: number = 500,
  code?: string,
  details?: any
): NextResponse<ErrorResponse> {
  const response: ErrorResponse = { error }
  
  if (code) {
    response.code = code
  }
  
  if (details) {
    response.details = details
  }

  return NextResponse.json(response, { status })
}

/**
 * Common HTTP error responses
 */
export const ApiErrors = {
  unauthorized: (message: string = 'Unauthorized') =>
    createErrorResponse(message, 401, 'UNAUTHORIZED'),

  forbidden: (message: string = 'Forbidden') =>
    createErrorResponse(message, 403, 'FORBIDDEN'),

  notFound: (message: string = 'Not found') =>
    createErrorResponse(message, 404, 'NOT_FOUND'),

  badRequest: (message: string = 'Bad request', details?: any) =>
    createErrorResponse(message, 400, 'BAD_REQUEST', details),

  rateLimited: (message: string = 'Too many requests', resetAt?: number) =>
    createErrorResponse(message, 429, 'RATE_LIMITED', { resetAt }),

  internalError: (message: string = 'Internal server error') =>
    createErrorResponse(message, 500, 'INTERNAL_ERROR'),

  invalidApiKey: () =>
    createErrorResponse('Invalid API key', 401, 'INVALID_API_KEY'),
}

