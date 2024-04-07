import { Route, Routes } from 'react-router-dom';
import {React, useState } from 'react';
import { Sidebar } from './component/Sidebar.jsx';
import { Navbar } from './component/Navbar.jsx';
import { UserDashboard } from './component/user/UserDashboard.jsx';
import { Expenses } from './component/user/Expenses.jsx';
import { AddExpense } from './component/user/AddExpense.jsx';
import { UpdateExpense } from './component/user/UpdateExpense.jsx';
import { Login } from './component/Login.jsx';
import Signup from './component/Signup.jsx';
import { MyProfile } from './component/MyProfile.jsx';
import { MyGoals } from './component/user/MyGoals.jsx';
import { AddGoal } from './component/user/AddGoal.jsx';
import { AddingGoal } from './component/user/AddingGoal.jsx';
import { GoalExpenses } from './component/user/GoalExpenses.jsx';
import { Charts } from './component/ExpenseCharts/Charts.jsx';
import { GCharts } from './component/ExpenseCharts/GCharts.jsx';
import { MCharts } from './component/ExpenseCharts/MCharts.jsx';
import { Groups } from './component/Group Expense/Groups.jsx';
import GroupListPage from './component/Group Expense/GroupListPage.jsx';
import GroupDetails from './component/Group Expense/GroupDetails.jsx';
import { GroupExpense } from './component/Group Expense/GroupExpense.jsx';
import { AddGroupExp } from './component/Group Expense/AddGroupExp.jsx';
import { UpdateGExpense } from './component/Group Expense/UpdateGExpense.jsx';

function App() {
  const [selectedLink, setSelectedLink] = useState('UserDashboard');
  
  const handleLinkSelect = name => {
    setSelectedLink(name);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />} />
      </Routes>
    </div>
  );
}

function ProtectedRoutes() {
  return (
    <React.Fragment>
      <MainLayout />
    </React.Fragment>
  );
}

function MainLayout() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/expenses" element={<Expenses />} />
            <Route path="/expense/form" element={<AddExpense />} />
            <Route path="/expense/update/:id" element={<UpdateExpense />} />
            <Route path="/user/goal" element={<AddGoal />} />
            <Route path="/goal/add" element={<AddingGoal />} />
            <Route path="/goal/expenses/:id" element={<GoalExpenses />} />
            <Route path="/user/charts" element={<Charts />} />
            <Route path="/user/charts2" element={<GCharts />} />
            <Route path="/user/charts3" element={<MCharts />} />
            <Route path="/user/profile" element={<MyProfile />} />
            <Route path="/user/groups" element={<Groups />} />
            <Route path="/user/groups2" element={<GroupListPage />} />
            <Route path="/group-details/:id" element={<GroupDetails />} />
            <Route path="/group/expenses/:groupid" element={<GroupExpense />} />
            <Route path="/addgroupexp/:groupid" element={<AddGroupExp />} />
            <Route path="/groupexp/update/:groupid/:expenseid" element={<UpdateGExpense />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
