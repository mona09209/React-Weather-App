import React from "react";

function WeatherSkeleton() {
  return (
    <div className="weather-card">

      {/* HEADER */}
      <div className="header">
        <div className="header-left">
          <div className="skeleton circle" />

          <div className="header-text">
            <div className="skeleton line short" />
            <div className="skeleton line tiny" />
          </div>
        </div>

        <div className="temp">
          <div className="skeleton temp-main" />
          <div className="skeleton line tiny" />
        </div>
      </div>

      {/* SELECT */}
      <div className="skeleton select" />

      {/* DETAILS */}
      <div className="state skeleton">
        <div className="skeleton line short" />
        <div className="skeleton line tiny" />
      </div>

      <div className="state skeleton">
        <div className="skeleton line short" />
        <div className="skeleton line tiny" />
      </div>

      <div className="state skeleton">
        <div className="skeleton line short" />
        <div className="skeleton line tiny" />
      </div>

      {/* WEEKLY */}
      <div className="weekly">
        {[1, 2, 3, 4, 5].map((i) => (
          <div className="day" key={i}>
            <div className="skeleton line tiny" />
            <div className="skeleton icon-small" />
            <div className="skeleton line tiny" />
          </div>
        ))}
      </div>

    </div>
  );
}

export default WeatherSkeleton;