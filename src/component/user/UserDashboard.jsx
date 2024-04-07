import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Charts } from '../ExpenseCharts/Charts';
import { ExpPieChart } from '../ExpenseCharts/ExpPieChart';
import { AttachMoney, MoneyOff } from '@mui/icons-material';
import LineChart from '../ExpenseCharts/LineCharts';
import { GoalCharts } from '../ExpenseCharts/GoalCharts';
import MonthlyBarChart from '../ExpenseCharts/MonthlyBarChart';

export const UserDashboard = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [goalExpenses, setGoalExpenses] = useState({});
  const [goalExpenses2, setGoalExpenses2] = useState({});
  const [goals, setGoals] = useState([]);
  const [eachGoalTotal, setEachGoalTotal] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('');

  const getIncome = async () => {
    const res = await axios.get('http://localhost:4000/transactions/income');
    // setincome(res.data.data);
  };

  const getExpense = async () => {
    const res = await axios.get('http://localhost:4000/transactions/expense');
    // setExpense(res.data.data);
  };

  const getAllGoals = async (req, res) => {
    try {
      const res = await axios.get('http://localhost:4000/goals/goal');
      setGoals(res.data.data);

      // Extracting maxamount from each goal and storing them in an array
      const maxAmounts = data.map(goal => goal.maxamount);
      setEachGoalTotal(maxAmounts);
    } catch (error) {
      console.log('error....', error);
    }
  };

  const filterTransactionsByGoal = selectedGoal => {
    // Filter transactions based on the selected goal
    // For now, let's assume transactions are already fetched and stored in `data` state
    const filteredTransactions = data.filter(
      transaction => transaction._id === selectedGoal
    );
    prepareChartData(filteredTransactions);
  };

  const prepareChartData = transactions => {
    const goalExpensesMap = {};
    transactions.forEach(transaction => {
      const category = transaction.category.categoryName;
      if (goalExpensesMap[category]) {
        goalExpensesMap[category] += transaction.amount;
      } else {
        goalExpensesMap[category] = transaction.amount;
      }
    });
    setGoalExpenses2(goalExpensesMap);
  };

  useEffect(() => {
    getTransactionsData();
    getAllGoals();
  }, []);

  useEffect(() => {
    if (selectedGoal) {
      filterTransactionsByGoal(selectedGoal);
    }
  }, [selectedGoal]);

  useEffect(() => {
    console.log('goalExpenses....', goalExpenses);
    console.log('goals....', goals);
  }, [goalExpenses]);

  const [data, setdata] = useState([]);

 

  const getTransactionsData = async () => {
    const id = localStorage.getItem('userId');
    try {
      const res = await axios.get(
        'http://localhost:4000/transactions/transactions/' + id
      );
      console.log(res.data.data);
      setdata(res.data.data);

      let totalIncome = 0;
      let totalExpense = 0;
      let goalExpensesMap = {};

      res.data.data.forEach(transaction => {
        const transactionType = transaction.transactionType.toLowerCase();

        if (transactionType === 'income') {
          totalIncome += transaction.amount;
        } else if (transactionType === 'expense') {
          totalExpense += Math.abs(transaction.amount); // Absolute value of amount for expense

          if (transaction.goal) {
            const goalName = transaction.goal.goalName;
            const goalId = transaction.goal._id;
            const maxAmount = transaction.goal.maxamount;
            if (goalExpensesMap[goalId]) {
              goalExpensesMap[goalId].amount += transaction.amount;
            } else {
              goalExpensesMap[goalId] = {
                name: goalName,
                amount: transaction.amount,
                maxamount: maxAmount,
              };
            }
          }
        }
      });

      setIncome(totalIncome);
      setExpense(totalExpense);
      setTotalBalance(totalIncome - totalExpense);
      setGoalExpenses(goalExpensesMap);
      console.log(goalExpenses);
    } catch (error) {
      console.error(
        'Error in fetching or processing transaction details:',
        error
      );
      // Optionally, you can set some default values or display an error message to the user.
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mx-2">
         <div className="col-sm-3">
          <div className="card">
            <div className="row">
              <div className="col-md-8">
                <div class="row card-header">
                  <div class="col-md-12 card-title">
                    <h4>Income</h4>
                  </div>
                  <div class="col-md-12 card-body">
                    <p style={{ color: 'green' }}>{income}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4" >
                <img src="expense/spending-1.png" alt="image" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="card">
            <div className="row">
              <div className="col-md-7">
                <div class="row card-header">
                  <div class="col-md-12 card-title">
                    <h4>Expense</h4>
                  </div>
                  <div class="col-md-12 card-body">
                    <p style={{ color: 'red' }}>{expense}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-5">Icon</div>
            </div>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="card">
            <div className="row">
              <div className="col-md-8">
                <div class="row card-header">
                  <div class="col-md-12 card-title">
                    <h4>Balance</h4>
                  </div>
                  <div class="col-md-12 card-body">
                    <p style={{ color: 'blue' }}>{totalBalance}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">Icon</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col mx-2">
          <h3 style={{ padding: '0' }}>Goal Summary</h3>
        </div>
      </div>

      <div className="row mx-2">
        {Object.keys(goalExpenses).map(goalId => (
          <div className="col-md-4" key={goalId}>
            <div className="card">
              <div className="row">
                <div className="col-md-8">
                  <div className="row card-header">
                    <div class="col-md-12 card-title">
                      <h4>{goalExpenses[goalId].name}</h4>
                    </div>
                    <div class="col-md-12 card-body">
                      <p style={{ color: 'blue' }}>
                        {goalExpenses[goalId].amount}{' '}/{' '}
                        {goalExpenses[goalId].maxamount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-4 ">
        <div className="col-md-5">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Category Expenses</h4>
              <p className="card-category">Last Campaign Performance</p>
            </div>
            <div className="card-body ">
              <ExpPieChart />
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Income and Expense Trends</h4>
              <p className="card-category">24 Hours performance</p>
            </div>
            <div className="card-body ">
              {/* <Charts /> */}
              <LineChart />
            </div>
          </div>
        </div>
      </div>

      {/* Goal Chart */}
      <div className="row mt-3">
        <div className="col-md-5">
          {/* <h3 className="m-0">Goal Expenses</h3> */}
          <GoalCharts />
        </div>

        <div className="col-md-7">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Income and Expense Trends</h4>
              <p className="card-category">24 Hours performance</p>
            </div>
            <div className="card-body">
              <MonthlyBarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};