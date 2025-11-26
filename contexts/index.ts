/**
 * Contexts - Centralized React Context Exports
 *
 * WHY: Single import point for all context providers and hooks
 * Principle: CORRESPONDENCE - Organized exports mirror organized code
 *
 * USAGE:
 *   import { AuthProvider, useAuth, useRequireAuth } from '@/contexts';
 */

export {
  AuthProvider,
  useAuth,
  useRequireAuth,
  useOptionalAuth,
  type AuthContextType,
} from './AuthContext';
