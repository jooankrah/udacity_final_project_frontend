import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Landing() {
  return (
    <div
      style={{
        background:
          "url(https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650-1024x546.jpg)",
        minHeight: "100vh",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="container py-5">
        <header className="text-center text-white py-5">
          <h1
            className="display-4 font-weight-bold mb-4"
            style={{ color: "white" }}
          >
            Welcome to Campgrounds
          </h1>
        </header>
      </div>
    </div>
  );
}
