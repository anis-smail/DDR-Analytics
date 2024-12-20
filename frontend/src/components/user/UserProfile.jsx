import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Key, User, Mail, Shield, LogOut } from 'lucide-react';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    department: 'Operations',
    notifications: {
      email: true,
      push: true,
      reports: true
    }
  });

  const handleSaveProfile = () => {
    console.log('Saving profile:', userInfo);
    // Add API call to save profile
  };

  const handleChangePassword = () => {
    console.log('Change password clicked');
    // Add password change logic
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Add logout logic
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select 
                  value={userInfo.role}
                  onValueChange={(value) => setUserInfo({...userInfo, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Engineer">Engineer</SelectItem>
                    <SelectItem value="Operator">Operator</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select 
                  value={userInfo.department}
                  onValueChange={(value) => setUserInfo({...userInfo, department: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={handleChangePassword}>
                <Key className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Email Notifications</label>
                <input 
                  type="checkbox"
                  checked={userInfo.notifications.email}
                  onChange={(e) => setUserInfo({
                    ...userInfo,
                    notifications: {...userInfo.notifications, email: e.target.checked}
                  })}
                  className="h-4 w-4"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Push Notifications</label>
                <input 
                  type="checkbox"
                  checked={userInfo.notifications.push}
                  onChange={(e) => setUserInfo({
                    ...userInfo,
                    notifications: {...userInfo.notifications, push: e.target.checked}
                  })}
                  className="h-4 w-4"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Daily Reports</label>
                <input 
                  type="checkbox"
                  checked={userInfo.notifications.reports}
                  onChange={(e) => setUserInfo({
                    ...userInfo,
                    notifications: {...userInfo.notifications, reports: e.target.checked}
                  })}
                  className="h-4 w-4"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
