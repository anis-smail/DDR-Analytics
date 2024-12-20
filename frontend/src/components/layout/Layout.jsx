import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-64">
        <div className="border-b">
          <div className="flex h-16 items-center justify-between px-4">
            <Header />
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/profile')}
                className="hover:bg-gray-100 rounded-full"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
