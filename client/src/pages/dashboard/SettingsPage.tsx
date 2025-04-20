import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserIcon, BellIcon, ShieldCheckIcon, CameraIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Profile form state
  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    clinicName: user?.clinicName || '',
    bio: user?.bio || '',
  });

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    reportSubmitted: true,
    linkRequests: true,
    systemUpdates: false
  });

  // Account settings state
  const [accountSettings, setAccountSettings] = useState({
    twoFactorEnabled: false,
    dataSharing: true,
    deleteAccount: false
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  const handleAccountSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAccountSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update notification settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAccountSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update account settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="sm:flex sm:items-center p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 sm:mt-0 sm:ml-3 text-sm text-gray-500">Manage your account and preferences</p>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'account'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Account
            </button>
          </nav>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">Settings saved successfully!</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile}>
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center">
                      {user?.firstName?.charAt(0) || <UserIcon className="h-12 w-12 text-primary-600" />}
                    </div>
                    <button 
                      type="button"
                      className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white shadow-sm border border-gray-200"
                    >
                      <CameraIcon className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{user?.firstName} {user?.lastName}</h3>
                    <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                    <p className="text-sm text-gray-500 mt-1">Member since {new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={profile.firstName}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={profile.lastName}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {user?.role === 'vet' && (
                    <div className="sm:col-span-6">
                      <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700">
                        Clinic name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="clinicName"
                          id="clinicName"
                          value={profile.clinicName}
                          onChange={handleProfileChange}
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  )}

                  <div className="sm:col-span-6">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        value={profile.bio}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {saving ? <LoadingSpinner size="small" /> : 'Save'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'notifications' && (
            <form onSubmit={handleSaveNotifications}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                    <BellIcon className="h-5 w-5 text-primary-500 mr-2" />
                    Notification Preferences
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Decide how and when you'd like to be notified.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 px-4 py-5 shadow-sm rounded-lg sm:p-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Delivery methods</h4>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="email"
                                name="email"
                                type="checkbox"
                                checked={notifications.email}
                                onChange={handleNotificationChange}
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                              <p className="text-gray-500">Get notifications via email</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="push"
                                name="push"
                                type="checkbox"
                                checked={notifications.push}
                                onChange={handleNotificationChange}
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="push" className="font-medium text-gray-700">Push notifications</label>
                              <p className="text-gray-500">Receive push notifications in the app</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="sms"
                                name="sms"
                                type="checkbox"
                                checked={notifications.sms}
                                onChange={handleNotificationChange}
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="sms" className="font-medium text-gray-700">SMS</label>
                              <p className="text-gray-500">Get text message notifications</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6">
                        <div className="mt-4">
                          <h4 className="text-base font-medium text-gray-900">Notification types</h4>
                          <div className="mt-4 space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="reportSubmitted"
                                  name="reportSubmitted"
                                  type="checkbox"
                                  checked={notifications.reportSubmitted}
                                  onChange={handleNotificationChange}
                                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="reportSubmitted" className="font-medium text-gray-700">Report submitted</label>
                                <p className="text-gray-500">When a pet owner submits a new report</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="linkRequests"
                                  name="linkRequests"
                                  type="checkbox"
                                  checked={notifications.linkRequests}
                                  onChange={handleNotificationChange}
                                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="linkRequests" className="font-medium text-gray-700">Link requests</label>
                                <p className="text-gray-500">When you receive a new link request</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="systemUpdates"
                                  name="systemUpdates"
                                  type="checkbox"
                                  checked={notifications.systemUpdates}
                                  onChange={handleNotificationChange}
                                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="systemUpdates" className="font-medium text-gray-700">System updates</label>
                                <p className="text-gray-500">News and feature updates from OncoTracker</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {saving ? <LoadingSpinner size="small" /> : 'Save preferences'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'account' && (
            <form onSubmit={handleSaveAccountSettings}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 text-primary-500 mr-2" />
                    Account Settings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your account settings and security preferences.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 px-4 py-5 shadow-sm rounded-lg sm:p-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Password</h4>
                        <div className="mt-4 space-y-4">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Change password
                          </button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-base font-medium text-gray-900">Two-factor authentication</h4>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="twoFactorEnabled"
                                name="twoFactorEnabled"
                                type="checkbox"
                                checked={accountSettings.twoFactorEnabled}
                                onChange={handleAccountSettingChange}
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="twoFactorEnabled" className="font-medium text-gray-700">Enable two-factor authentication</label>
                              <p className="text-gray-500">Add an extra layer of security to your account</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-base font-medium text-gray-900">Data sharing</h4>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="dataSharing"
                                name="dataSharing"
                                type="checkbox"
                                checked={accountSettings.dataSharing}
                                onChange={handleAccountSettingChange}
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="dataSharing" className="font-medium text-gray-700">Allow anonymous data collection</label>
                              <p className="text-gray-500">Help improve OncoTracker by sharing anonymous usage data</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-base font-medium text-red-800">Danger Zone</h4>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Delete my account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {saving ? <LoadingSpinner size="small" /> : 'Save settings'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 