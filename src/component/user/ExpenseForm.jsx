import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const ExpenseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [data, setdata] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const submitHandler = async data => {
    console.log('data...', data);
  };

  const loadData = async () => {
    const response = await axios.get(
      'http://localhost:4000/transactions/transaction'
    );
    console.log(response.data);
  };

  useEffect(() => {
   
    loadData();
    // fetchData();
  }, []);

  useEffect(() => {
    // Extract unique categories and subcategories
    const uniqueCategories = Array.from(new Set(data.map(transaction => transaction.category.categoryName)));
    const uniqueSubcategories = Array.from(new Set(data.map(transaction => transaction.subcategory.SubCategoryName)));

    setCategories(uniqueCategories);
    setSubcategories(uniqueSubcategories);
  }, [data]);


  return (
    <div className="container">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="name">Payee</label>
          <input type="text" {...register('payee')}></input>
        </div>
        <div>
          <label htmlFor="Amount">Amount</label>
          <input type="number" {...register('amount')}></input>
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" {...register('expDateTime')}></input>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <div>
            <select name="" {...register('category')} id="">
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="subcategory">Sub Category</label>
          <div>
          <select {...register('subcategory')}>
            {subcategories.map(subcategory => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
          </div>
        </div>
        <div>
          <label htmlFor="paymentmethod">Payment Method</label>
          <div>
            Credit card{' '}
            <input
              type="checkbox"
              value="credit card"
              {...register('paymentMethod')}
              name="payment"
            ></input>
            Cash{' '}
            <input
              type="checkbox"
              value="cash"
              {...register('paymentMethod')}
              name="payment"
            ></input>
            UPI{' '}
            <input
              type="checkbox"
              value="upi"
              {...register('paymentMethod')}
              name="payment"
            ></input>
          </div>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <div>
            Clear{' '}
            <input
              type="checkbox"
              value="clear"
              {...register('status')}
              name="status"
            ></input>
            Unclear{' '}
            <input
              type="checkbox"
              value="unclear"
              {...register('status')}
              name="status"
            ></input>
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id=""
            {...register('description')}
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div>
          <label htmlFor="status">Transaction Type</label>
          <div>
            Income{' '}
            <input
              type="checkbox"
              value="income"
              {...register('transactionType')}
              name="transaction"
            ></input>
            Expense{' '}
            <input
              type="checkbox"
              value="expense"
              {...register('transactionType')}
              name="transaction"
            ></input>
          </div>
        </div>
        <div>
          <input type="submit" value="Submit" reset></input>
        </div>
      </form>
    </div>
  );
};