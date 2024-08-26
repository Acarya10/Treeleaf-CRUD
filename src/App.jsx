// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Form from './components/Form';
import Table from './components/Table';
import Pagination from './components/Pagination';
import Profile from './components/Profile';
import './App.css';

const App = () => {
  const recordsPerPage = 5;

  // Initialize state from local storage or set to defaults
  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem('records');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  const [currentRecord, setCurrentRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? JSON.parse(savedPage) : 1;
  });

  // Use useEffect to sync records with local storage whenever they change
  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  // Use useEffect to sync currentPage with local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentPage', JSON.stringify(currentPage));
  }, [currentPage]);

  const addOrEditRecord = (record) => {
    if (currentRecord) {
      setRecords(
        records.map((rec) => (rec.email === currentRecord.email ? record : rec))
      );
      setCurrentRecord(null);
    } else {
      setRecords([...records, record]);
    }
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
  };

  const handleDelete = (index) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedRecords = records.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <Router>
      <h1 className="heading">CRUD APPLICATION</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Form
                addOrEditRecord={addOrEditRecord}
                currentRecord={currentRecord}
                setCurrentRecord={setCurrentRecord}
              />
              <Table
                records={paginatedRecords}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              {records.length > recordsPerPage && (
                <Pagination
                  totalRecords={records.length}
                  recordsPerPage={recordsPerPage}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              )}
              <Link to="/profiles">
                <button>View All Profiles</button>
              </Link>
            </>
          }
        />
        <Route path="/profiles" element={<Profile records={records} />} />
      </Routes>
    </Router>
  );
};

export default App;
