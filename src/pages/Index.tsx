
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import TeacherDashboard from '../components/TeacherDashboard';
import AdminDashboard from '../components/AdminDashboard';

const Index = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  const handleLogin = (userData, type) => {
    setUser(userData);
    setUserType(type);
  };

  const handleLogout = () => {
    setUser(null);
    setUserType(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {userType === 'teacher' ? (
        <TeacherDashboard user={user} onLogout={handleLogout} />
      ) : (
        <AdminDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
