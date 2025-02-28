import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Navbar from "./navbar";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input type="text" placeholder="John Doe" disabled />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="johndoe@example.com" />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input type="tel" placeholder="+1 234 567 8901" />
            </div>
            <Button disabled>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Change Password</Label>
              <Input type="password" placeholder="New Password" />
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="Confirm Password" />
            </div>
            <Button disabled>Update Password</Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Email Notifications</Label>
              <Switch />
            </div>
            <div className="flex justify-between items-center">
              <Label>SMS Alerts</Label>
              <Switch />
            </div>
            <div className="flex justify-between items-center">
              <Label>Transaction Alerts</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="destructive" disabled>
              Deactivate Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
