import React from "react";
import { Link } from "react-router-dom";

import SurveyList from "./surveys/SurveyList";
import TrackList from "./TrackList";

import "./Dashboard.css";

/*
<div>
  <TrackList />
  <div className="fixed-action-btn">
    <Link to="/tracks/new">
      <i className="fas fa-plus-circle upload-track"></i>
    </Link>
  </div>
</div>
 */

const Dashboard = () => {
  return (
    <div class="row margin-sizing">
      <div class="col s3 sidebar fixedsidebar">
        {/*
          <div class="searchbox">
            <input class="input-searchbar" placeholder="Search artists, genres, keywords..." />
          </div>
        */}

        <p class="category-item"><i class="far fa-star category-icon featured-icon"></i><span class="category-text">Featured</span></p>
        <p class="category-item category-item-active"><i class="far fa-heart category-icon like-icon"></i><span class="category-text">My Favourites</span></p>
        <p class="category-item"><i class="fas fa-list category-icon track-icon"></i><span class="category-text">My Tracks</span></p>
        <hr class="category-line" />

        <p class="category-item"><i class="fas fa-headphones category-icon solo-icon"></i><span class="category-text">Solo</span></p>
        <p class="category-item"><i class="fas fa-tasks category-icon collab-icon"></i><span class="category-text">In Progress</span></p>
        <p class="category-item"><i class="fas fa-check category-icon complete-icon"></i><span class="category-text">Complete</span></p>
        <hr class="category-line" />

        <p class="category-item">
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="fas fa-star category-icon rating-icon"></i>
        </p>

        <p class="category-item">
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="far fa-star category-icon rating-icon"></i>
        </p>

        <p class="category-item">
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="far fa-star category-icon rating-icon"></i>
          <i class="far fa-star category-icon rating-icon"></i>
        </p>

        <p class="category-item">
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="far fa-star category-icon rating-icon"></i>
          <i class="far fa-star category-icon rating-icon"></i>
          <i class="far fa-star category-icon rating-icon"></i>
        </p>

        <p class="category-item">
          <i class="fas fa-star category-icon rating-icon"></i>
          <i class="far fa-star category-icon rating-icon"></i>
          <i class="far fa-star category-icon rating-icon"></i>
          <i class="far fa-star category-icon rating-icon"></i>
          <i class="far fa-star category-icon rating-icon"></i>
        </p>
      </div>

      <div class="col s8 main-track-section">
        <div class="row tracklist">
          <TrackList />
        </div>
        <Link to="/tracks/new">
          <i className="fas fa-plus-circle upload-track"></i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
