import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('admin_token');
      
      if (!token && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else if (token && pathname === '/admin/login') {
        router.push('/admin/dashboard');
      } else {
        setIsAuthenticated(!!token);
      }
    };

    checkAuth();
  }, [router, pathname]);

  const logout = useCallback(() => {
    sessionStorage.removeItem('admin_token');
    router.push('/admin/login');
  }, [router]);

  return { isAuthenticated, logout };
}
