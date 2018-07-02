import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return(
    <div>
      <h1>Dashboard</h1>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to='/surveys/new' className="btn-floating btn-large red">
          <i className="large material-icons"style={{fontSize:"30px"}}>add</i>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
